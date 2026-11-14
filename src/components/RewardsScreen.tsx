import React, { useState } from 'react';
import { Reward, ParentChildProfile, CustomRewardRequest } from '../types';
import { playPopSound, playFanfareSound } from '../utils/audio';
import { CustomRewardRequestModal } from './CustomRewardRequestModal';
import { ParentRewardRequestsModal } from './ParentRewardRequestsModal';
import confetti from 'canvas-confetti';

interface RewardsScreenProps {
  stars: number;
  rewards: Reward[];
  customRequests?: CustomRewardRequest[];
  profile: ParentChildProfile | null;
  onRedeemReward: (reward: Reward) => void;
  onEditProfile: () => void;
  onBack: () => void;
  onCreateCustomRequest?: (request: Omit<CustomRewardRequest, 'id' | 'createdAt' | 'status'>) => void;
  onApproveCustomRequest?: (requestId: string, approvedCost: number) => void;
  onRejectCustomRequest?: (requestId: string) => void;
  onDeleteCustomRequest?: (requestId: string) => void;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  stars,
  rewards,
  customRequests = [],
  profile,
  onRedeemReward,
  onEditProfile,
  onBack,
  onCreateCustomRequest,
  onApproveCustomRequest,
  onRejectCustomRequest,
  onDeleteCustomRequest,
}) => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState<Reward | null>(null);
  const [showCustomRequestModal, setShowCustomRequestModal] = useState<boolean>(false);
  const [showParentRequestsModal, setShowParentRequestsModal] = useState<boolean>(false);
  const [showMyRequestsExpanded, setShowMyRequestsExpanded] = useState<boolean>(false);

  const childFullName = profile
    ? `${profile.childFirstName}${profile.childSecondName ? ` ${profile.childSecondName}` : ''}`
    : 'البطل';

  const pendingRequestsCount = customRequests.filter((r) => r.status === 'pending').length;

  const handleClaim = (reward: Reward) => {
    playPopSound();
    setSelectedReward(reward);
  };

  const confirmRedeem = () => {
    if (!selectedReward) return;
    if (stars >= selectedReward.cost) {
      onRedeemReward(selectedReward);
      setRedeemSuccess(selectedReward);
      setSelectedReward(null);
      playFanfareSound();
      try {
        confetti({
          particleCount: 75,
          spread: 85,
          origin: { y: 0.5 },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex flex-col justify-between items-center py-6 px-4 bg-[#D3BEAF] text-[#2B1B15] select-none"
      dir="rtl"
    >
      {/* Top Header */}
      <div className="w-full max-w-sm pt-1 pb-3 text-center">
        <div className="flex items-center justify-between px-2 mb-2">
          {/* Back button */}
          <button
            onClick={() => {
              playPopSound();
              onBack();
            }}
            className="text-xs bg-white/80 hover:bg-white text-[#2B1B15] px-3 py-1 rounded-full border border-black/30 font-bold cursor-pointer transition-colors"
          >
            رجوع ↩
          </button>

          {/* Child & Mother Account Chip */}
          <button
            onClick={() => {
              playPopSound();
              onEditProfile();
            }}
            className="text-xs bg-white/85 hover:bg-white text-[#2B1B15] px-3 py-1 rounded-full border border-black/30 font-bold cursor-pointer flex items-center gap-1.5"
            title="تعديل بيانات تسجيل دخول الأم واسم الطفل"
          >
            <span>👩‍👦</span>
            <span>بطلنا: {childFullName}</span>
            <span className="text-[10px] opacity-70">✎</span>
          </button>

          {/* Current Star Balance Badge */}
          <div className="flex items-center gap-1.5 bg-amber-100 border-[2px] border-amber-500 rounded-full px-3 py-1 shadow-xs">
            <span className="text-sm font-black text-amber-900">رصيدك:</span>
            <span className="text-base font-black text-amber-900">{stars}</span>
            <span className="text-base">⭐</span>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1 text-yellow-400 text-3xl">
            <span>✨</span>
          </div>
          <span className="text-4xl">🧸</span>
          <h1
            className="text-4xl md:text-5xl font-extrabold text-[#231510] tracking-wide drop-shadow-xs"
            style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
          >
            هدايا الأبطال
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-sm my-auto py-1 space-y-2.5 overflow-y-auto max-h-[66vh] px-1">
        
        {/* Child Request Special Gift Button */}
        <button
          type="button"
          onClick={() => {
            playPopSound();
            setShowCustomRequestModal(true);
          }}
          className="w-full py-2.5 px-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-300 to-amber-300 hover:from-amber-300 hover:to-orange-400 active:scale-98 text-[#2B1B15] border-[2.5px] border-black comic-shadow transition-transform flex items-center justify-between cursor-pointer shadow-sm"
        >
          <div className="flex items-center gap-2.5 text-right">
            <span className="text-3xl p-1 bg-white/70 rounded-xl border border-black/20">
              🎁
            </span>
            <div>
              <div
                className="text-base md:text-lg font-black text-[#231510] flex items-center gap-1.5"
                style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
              >
                <span>اطلب هدية خاصة تحلم بها!</span>
                <span className="text-xs bg-red-600 text-white px-2 py-0.2 rounded-full font-bold">
                  جديد
                </span>
              </div>
              <div className="text-[11px] font-bold text-amber-950">
                اقترح أي لعبة أو نزهة لماما وبابا ليوافقوا عليها 🌟
              </div>
            </div>
          </div>
          <span className="text-xs bg-white text-[#2B1B15] font-black px-2.5 py-1 rounded-full border border-black/30 shadow-2xs">
            اطلب 🚀
          </span>
        </button>

        {/* Child's submitted custom requests status bar if any exist */}
        {customRequests.length > 0 && (
          <div className="bg-white/80 rounded-2xl border-2 border-black/40 p-2.5 text-right">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setShowMyRequestsExpanded((prev) => !prev);
                }}
                className="flex items-center gap-1.5 text-xs font-black text-[#2B1B15] cursor-pointer"
              >
                <span>💌</span>
                <span>طلباتي الخاصة ({customRequests.length})</span>
                {pendingRequestsCount > 0 && (
                  <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.2 rounded-full font-bold">
                    {pendingRequestsCount} بانتظار موافقة ماما ⏳
                  </span>
                )}
                <span className="text-stone-500 text-[10px]">
                  {showMyRequestsExpanded ? '▲ إخفاء' : '▼ عرض'}
                </span>
              </button>

              {/* Parent review link */}
              <button
                type="button"
                onClick={() => {
                  playPopSound();
                  setShowParentRequestsModal(true);
                }}
                className="text-[11px] font-bold text-blue-900 hover:text-blue-950 bg-blue-100/80 hover:bg-blue-100 px-2 py-0.5 rounded-full border border-blue-400 cursor-pointer flex items-center gap-1"
                title="مراجعة واعتماد الطلبات لولي الأمر"
              >
                <span>👨‍👩‍👧</span>
                <span>موافقة ولي الأمر</span>
                {pendingRequestsCount > 0 && (
                  <span className="w-4 h-4 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                    {pendingRequestsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Expanded list of requests */}
            {showMyRequestsExpanded && (
              <div className="mt-2 pt-2 border-t border-black/10 space-y-1.5">
                {customRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-white/90 border border-black/15 text-xs"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{req.icon}</span>
                      <span className="font-bold text-[#2B1B15]">{req.title}</span>
                      <span className="text-[11px] text-stone-500">
                        ({req.approvedCost || req.proposedCost} ⭐)
                      </span>
                    </div>

                    <div>
                      {req.status === 'pending' && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                          قيد المراجعة ⏳
                        </span>
                      )}
                      {req.status === 'approved' && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300">
                          معتمدة في الهدايا 🎉
                        </span>
                      )}
                      {req.status === 'rejected' && (
                        <span className="text-[10px] font-bold bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full border border-rose-300">
                          تم رفضها ❌
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Rewards List: Original Compact Pill Layout */}
        <div className="space-y-2.5">
          {rewards
            .filter(
              (r) =>
                r.id !== 'r3' &&
                r.id !== 'r4' &&
                !['شوكولاتة', 'شيكولاتة', 'شيكولاته', 'الأكلة المفضلة', 'الاكلة المفضلة', 'وجبة مفضلة'].some((kw) =>
                  (r.title || '').includes(kw)
                )
            )
            .map((reward) => {
            const canAfford = stars >= reward.cost;

            return (
              <button
                key={reward.id}
                onClick={() => handleClaim(reward)}
                className={`w-full py-2.5 px-4 rounded-full bg-white border-[2.5px] border-black comic-shadow transition-all duration-200 cursor-pointer active:scale-97 flex items-center justify-between gap-2 text-right ${
                  reward.isCustom ? 'ring-2 ring-amber-400 bg-amber-50/50' : ''
                } ${
                  canAfford
                    ? 'hover:bg-amber-50 hover:border-amber-900'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{reward.icon}</span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-lg md:text-xl font-bold text-[#231510]"
                        style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
                      >
                        {reward.title}
                      </span>
                      {reward.isCustom && (
                        <span className="text-[10px] bg-amber-200 text-amber-900 font-black px-1.5 py-0.2 rounded-full border border-amber-400">
                          ⭐ هدية خاصة!
                        </span>
                      )}
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-[#5C3224]">
                      ({reward.cost} نجمة)
                    </span>
                  </div>
                </div>

                {canAfford ? (
                  <span className="text-xs bg-emerald-500 text-white font-black px-2.5 py-0.5 rounded-full mr-auto">
                    جاهز!
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full mr-auto">
                    باقي {reward.cost - stars} ⭐
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="w-full max-w-sm pb-4 flex flex-col gap-2">
        {/* Parent quick link if not shown in summary */}
        {customRequests.length === 0 && (
          <button
            type="button"
            onClick={() => {
              playPopSound();
              setShowParentRequestsModal(true);
            }}
            className="w-full py-1.5 px-3 rounded-full bg-white/70 hover:bg-white text-[#2B1B15] text-xs font-bold border border-black/30 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>👨‍👩‍👧</span>
            <span>بوابة ولي الأمر: متابعة واعتماد الهدايا الخاصة</span>
          </button>
        )}

        <button
          onClick={() => {
            playPopSound();
            onBack();
          }}
          className="w-full py-3 px-6 rounded-lg bg-[#5C656E] hover:bg-[#4E565E] active:scale-95 transition-all text-white text-2xl font-black flex items-center justify-center gap-3 border-[2.5px] border-black shadow-[0_5px_0_#222] cursor-pointer"
          style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
        >
          <span className="text-base inline-flex items-center justify-center bg-[#5F8FA6] p-1 rounded-sm text-white">
            ⬅️
          </span>
          <span>العودة للرئيسية</span>
        </button>
      </div>

      {/* Custom Reward Request Modal for Child */}
      <CustomRewardRequestModal
        isOpen={showCustomRequestModal}
        childName={profile?.childFirstName || 'البطل'}
        onClose={() => setShowCustomRequestModal(false)}
        onSubmitRequest={(req) => {
          onCreateCustomRequest?.(req);
        }}
      />

      {/* Parent Review & Approval Modal */}
      <ParentRewardRequestsModal
        isOpen={showParentRequestsModal}
        requests={customRequests}
        onClose={() => setShowParentRequestsModal(false)}
        onApproveRequest={(id, cost) => {
          onApproveCustomRequest?.(id, cost);
        }}
        onRejectRequest={(id) => {
          onRejectCustomRequest?.(id);
        }}
        onDeleteRequest={(id) => {
          onDeleteCustomRequest?.(id);
        }}
      />

      {/* Claim Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl p-6 bg-[#FFF8F0] border-4 border-black comic-shadow text-center">
            <div className="text-5xl mb-2">{selectedReward.icon}</div>
            <h3 className="text-2xl font-black text-[#2B1B15] mb-1">
              {selectedReward.title}
            </h3>
            {selectedReward.isCustom && (
              <span className="inline-block text-xs bg-amber-200 text-amber-900 font-black px-2.5 py-0.5 rounded-full border border-amber-400 mb-2">
                🌟 هديتك الخاصة المعتمدة من ماما وبابا!
              </span>
            )}
            <p className="text-base font-bold text-amber-800 mb-4">
              التكلفة: {selectedReward.cost} نجمة ⭐
            </p>

            {stars >= selectedReward.cost ? (
              <div>
                <p className="text-sm font-semibold text-[#4A2D1F] mb-5">
                  رائع يا {childFullName}! لديك {stars} نجمة. هل تود استبدال {selectedReward.cost} نجمة للحصول على هذه الهدية؟
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={confirmRedeem}
                    className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-lg border-2 border-black comic-shadow-sm cursor-pointer"
                  >
                    نعم، استبدل الآن! 🎉
                  </button>
                  <button
                    onClick={() => {
                      playPopSound();
                      setSelectedReward(null);
                    }}
                    className="flex-1 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 active:scale-95 text-[#2B1B15] font-bold text-base border-2 border-black cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-amber-100 border border-amber-300 rounded-2xl p-3 mb-4">
                  <p className="text-sm font-bold text-amber-900">
                    تحتاج إلى {selectedReward.cost - stars} نجمة إضافية للوصول إلى هذه الهدية!
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    أنجز المزيد من مهام الأبطال وستحصل عليها قريباً يا {childFullName}! 💪⭐
                  </p>
                </div>
                <button
                  onClick={() => {
                    playPopSound();
                    setSelectedReward(null);
                  }}
                  className="w-full py-3 rounded-2xl bg-[#D68868] hover:bg-[#CC7A58] active:scale-95 text-white font-black text-lg border-2 border-black comic-shadow-sm cursor-pointer"
                >
                  حسناً، سأواصل التحدي! 🚀
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Success Modal */}
      {redeemSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl p-6 bg-gradient-to-b from-amber-50 to-orange-100 border-4 border-black comic-shadow text-center">
            <div className="text-6xl mb-2 animate-bounce">🎁</div>
            <h3 className="text-3xl font-black text-[#2B1B15] mb-2">
              مبــــارك يا {childFullName}! 🎉
            </h3>
            <p className="text-lg font-bold text-emerald-800 mb-2">
              حصلت على: {redeemSuccess.title} {redeemSuccess.icon}
            </p>
            <p className="text-xs font-semibold text-[#5C3224] mb-5 bg-white/70 py-2 px-3 rounded-xl border border-amber-300">
              أخبر ماما الآن لتستمتع بمكافأتك المستحقة! 🌟
            </p>
            <button
              onClick={() => {
                playPopSound();
                setRedeemSuccess(null);
              }}
              className="w-full py-3 rounded-2xl bg-[#5C656E] hover:bg-[#4E565E] active:scale-95 text-white font-black text-lg border-2 border-black comic-shadow-sm cursor-pointer"
            >
              شكراً، رائع! 🤩
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
