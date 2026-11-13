import React, { useState } from 'react';
import { CustomRewardRequest } from '../types';
import { playPopSound, playFanfareSound } from '../utils/audio';

interface ParentRewardRequestsModalProps {
  isOpen: boolean;
  requests: CustomRewardRequest[];
  onClose: () => void;
  onApproveRequest: (requestId: string, approvedCost: number) => void;
  onRejectRequest: (requestId: string) => void;
  onDeleteRequest: (requestId: string) => void;
}

export const ParentRewardRequestsModal: React.FC<ParentRewardRequestsModalProps> = ({
  isOpen,
  requests,
  onClose,
  onApproveRequest,
  onRejectRequest,
  onDeleteRequest,
}) => {
  // Store customized cost per request before approving
  const [editedCosts, setEditedCosts] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending');

  if (!isOpen) return null;

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const otherRequests = requests.filter((r) => r.status !== 'pending');
  const displayedRequests = activeTab === 'pending' ? pendingRequests : requests;

  const getCostFor = (req: CustomRewardRequest) => {
    if (editedCosts[req.id] !== undefined) {
      return editedCosts[req.id];
    }
    return req.proposedCost;
  };

  const handleCostChange = (reqId: string, delta: number) => {
    playPopSound();
    setEditedCosts((prev) => {
      const current = prev[reqId] !== undefined ? prev[reqId] : requests.find((r) => r.id === reqId)?.proposedCost || 20;
      const next = Math.max(1, Math.min(200, current + delta));
      return { ...prev, [reqId]: next };
    });
  };

  const handleApprove = (req: CustomRewardRequest) => {
    playFanfareSound();
    const finalCost = getCostFor(req);
    onApproveRequest(req.id, finalCost);
  };

  const handleReject = (reqId: string) => {
    playPopSound();
    onRejectRequest(reqId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/60 backdrop-blur-xs select-none overflow-y-auto" dir="rtl">
      <div className="relative w-full max-w-lg rounded-3xl p-5 md:p-6 bg-[#FAF5EF] border-4 border-black comic-shadow my-auto text-[#2B1B15]">
        
        {/* Close Button */}
        <button
          onClick={() => {
            playPopSound();
            onClose();
          }}
          type="button"
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 font-black flex items-center justify-center border-2 border-black cursor-pointer text-sm"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 border border-blue-400 rounded-full px-3 py-0.5 text-xs font-black mb-1.5">
            <span>👨‍👩‍👧</span>
            <span>بوابة ولي الأمر</span>
          </div>
          <h3 className="text-2xl font-black text-[#231510]">
            مراجعة طلبات الهدايا الخاصة
          </h3>
          <p className="text-xs text-[#5C3224] mt-0.5">
            يمكنك الموافقة على الهدايا المقترحة من طفلك وتعديل عدد النجوم المطلوبة لاستبدالها.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-3 bg-stone-200/80 p-1 rounded-2xl border border-black/20">
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveTab('pending');
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-white text-[#2B1B15] shadow-xs border border-black/20'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>طلبات جديدة بانتظارك</span>
            {pendingRequests.length > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              playPopSound();
              setActiveTab('all');
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-[#2B1B15] shadow-xs border border-black/20'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            جميع الطلبات ({requests.length})
          </button>
        </div>

        {/* List of Requests */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto px-1 py-1">
          {displayedRequests.length === 0 ? (
            <div className="text-center py-8 bg-white/70 rounded-2xl border-2 border-dashed border-stone-300 p-4">
              <span className="text-4xl block mb-2">🎁✨</span>
              <p className="font-bold text-sm text-[#2B1B15]">
                {activeTab === 'pending'
                  ? 'لا توجد طلبات هدايا جديدة معلقة حالياً'
                  : 'لم يقم الطفل باقتراح أي هدية خاصة حتى الآن'}
              </p>
              <p className="text-xs text-stone-500 mt-1">
                عندما يقوم الطفل بطلب هدية خاصة من قسم المكافآت، ستظهر هنا فوراً لمراجعتها واعتمادها!
              </p>
            </div>
          ) : (
            displayedRequests.map((req) => {
              const currentCost = getCostFor(req);
              const isPending = req.status === 'pending';
              const isApproved = req.status === 'approved';
              const isRejected = req.status === 'rejected';

              return (
                <div
                  key={req.id}
                  className={`p-3.5 rounded-2xl border-2 bg-white transition-all ${
                    isPending
                      ? 'border-amber-500 shadow-xs ring-1 ring-amber-300'
                      : isApproved
                      ? 'border-emerald-400 bg-emerald-50/40'
                      : 'border-stone-300 bg-stone-50 opacity-80'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl p-1 bg-amber-50 rounded-xl border border-amber-200">
                        {req.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-base text-[#2B1B15]">
                            {req.title}
                          </h4>
                          {isPending && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 font-black px-2 py-0.5 rounded-full border border-amber-300">
                              جديد ⏳
                            </span>
                          )}
                          {isApproved && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-900 font-black px-2 py-0.5 rounded-full border border-emerald-300">
                              معتمدة في الهدايا ✅
                            </span>
                          )}
                          {isRejected && (
                            <span className="text-[10px] bg-rose-100 text-rose-900 font-black px-2 py-0.5 rounded-full border border-rose-300">
                              مرفوضة ❌
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500">
                          بطلنا: {req.childName || 'الطفل'} • اقتراح الطفل: {req.proposedCost} ⭐
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        playPopSound();
                        onDeleteRequest(req.id);
                      }}
                      title="حذف الطلب"
                      className="text-stone-400 hover:text-rose-600 p-1 text-xs cursor-pointer"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Child message if present */}
                  {req.childMessage && (
                    <div className="text-xs bg-amber-50/70 p-2 rounded-xl border border-amber-200 mb-3 text-stone-700">
                      <span className="font-bold text-amber-900">رسالة الطفل:</span> &quot;{req.childMessage}&quot;
                    </div>
                  )}

                  {/* Star Adjustment & Approval controls */}
                  {isPending && (
                    <div className="mt-2 pt-2 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                      <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
                        <span className="text-xs font-bold text-[#2B1B15]">
                          النجوم المعتمدة:
                        </span>
                        <div className="flex items-center gap-1 bg-stone-100 px-2 py-1 rounded-xl border border-stone-300">
                          <button
                            type="button"
                            onClick={() => handleCostChange(req.id, -5)}
                            className="w-6 h-6 bg-white hover:bg-stone-200 text-stone-800 font-black rounded-lg border border-stone-300 cursor-pointer text-xs"
                          >
                            -5
                          </button>
                          <span className="text-sm font-black text-amber-900 px-2 min-w-[45px] text-center">
                            {currentCost} ⭐
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCostChange(req.id, 5)}
                            className="w-6 h-6 bg-white hover:bg-stone-200 text-stone-800 font-black rounded-lg border border-stone-300 cursor-pointer text-xs"
                          >
                            +5
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => handleApprove(req)}
                          className="flex-1 sm:flex-initial py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs border border-emerald-900 cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                        >
                          <span>الموافقة والإضافة للهدايا</span>
                          <span>✅</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(req.id)}
                          className="py-2 px-2.5 rounded-xl bg-stone-200 hover:bg-rose-100 hover:text-rose-900 text-stone-700 font-bold text-xs border border-stone-400 cursor-pointer"
                        >
                          رفض
                        </button>
                      </div>
                    </div>
                  )}

                  {isApproved && (
                    <div className="mt-2 text-xs text-emerald-800 bg-emerald-100/60 p-2 rounded-xl flex items-center justify-between">
                      <span>أصبحت هذه الهدية متاحة الآن للطفل بـ {req.approvedCost || req.proposedCost} نجمة ⭐</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-stone-200 flex justify-between items-center">
          <p className="text-[11px] text-stone-500">
            * الهدايا المعتمدة تظهر فوراً في شاشة المكافآت ليستبدلها الطفل بنجومه.
          </p>
          <button
            type="button"
            onClick={() => {
              playPopSound();
              onClose();
            }}
            className="py-2 px-5 bg-[#2B1B15] hover:bg-[#3D2619] text-white rounded-xl font-bold text-xs cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
