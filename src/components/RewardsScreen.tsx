import React, { useState } from 'react';
import { REWARDS } from '../data/appData';
import { Reward } from '../types';
import { playPopSound, playFanfareSound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface RewardsScreenProps {
  stars: number;
  onRedeemReward: (reward: Reward) => void;
  onBack: () => void;
}

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  stars,
  onRedeemReward,
  onBack,
}) => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState<Reward | null>(null);

  const handleClaim = (reward: Reward) => {
    playPopSound();
    if (stars >= reward.cost) {
      setSelectedReward(reward);
    } else {
      setSelectedReward(reward);
    }
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
          particleCount: 70,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center py-6 px-4 bg-[#D3BEAF] text-[#2B1B15] select-none">
      
      {/* Top Header matching rewards.png: هدايا الأبطال ✨ 🧸 */}
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

          {/* Current Star Balance Badge */}
          <div className="flex items-center gap-1.5 bg-amber-100 border-[2px] border-amber-500 rounded-full px-3 py-1 shadow-xs">
            <span className="text-sm font-black text-amber-900">رصيدك:</span>
            <span className="text-base font-black text-amber-900">{stars}</span>
            <span className="text-base">⭐</span>
          </div>
        </div>

        {/* Title matching rewards.png */}
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

      {/* Rewards List matching rewards.png */}
      <div className="w-full max-w-sm my-auto py-2 space-y-2.5 overflow-y-auto max-h-[62vh] px-1">
        {REWARDS.map((reward) => {
          const canAfford = stars >= reward.cost;

          return (
            <button
              key={reward.id}
              onClick={() => handleClaim(reward)}
              className={`w-full py-2.5 px-4 rounded-full bg-white border-[2.5px] border-black comic-shadow transition-all duration-200 cursor-pointer active:scale-97 flex items-center justify-center gap-2 ${
                canAfford
                  ? 'hover:bg-amber-50 hover:border-amber-900'
                  : 'hover:bg-slate-50'
              }`}
            >
              <span className="text-2xl">{reward.icon}</span>
              <span 
                className="text-xl md:text-2xl font-bold text-[#231510]"
                style={{ fontFamily: "'Cairo', 'Baloo Bhaijaan 2', sans-serif" }}
              >
                {reward.title}
              </span>
              <span className="text-base md:text-lg font-semibold text-[#5C3224] dir-rtl">
                ({reward.cost} نجمة)
              </span>
              {canAfford && (
                <span className="text-xs bg-emerald-500 text-white font-black px-2 py-0.5 rounded-full mr-auto">
                  جاهز!
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Return Button matching rewards.png: العودة للرئيسية ⬅️ */}
      <div className="w-full max-w-xs pb-4">
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

      {/* Reward Purchase / Information Modal */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl p-6 bg-[#FFF8F0] border-4 border-black comic-shadow text-center">
            <div className="text-5xl mb-2">{selectedReward.icon}</div>
            <h3 className="text-2xl font-black text-[#2B1B15] mb-1">
              {selectedReward.title}
            </h3>
            <p className="text-base font-bold text-amber-800 mb-4">
              التكلفة: {selectedReward.cost} نجمة ⭐
            </p>

            {stars >= selectedReward.cost ? (
              <div>
                <p className="text-sm font-semibold text-[#4A2D1F] mb-5">
                  رائع! لديك {stars} نجمة. هل تود استبدال {selectedReward.cost} نجمة للحصول على هذه المكافأة الرائعة؟
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={confirmRedeem}
                    className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-lg border-2 border-black comic-shadow-sm cursor-pointer"
                  >
                    نعم، استبدل الآن! 🎁
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
                    أنجز المزيد من مهام الأبطال وستحصل عليها قريباً يا بطل! 💪⭐
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

      {/* Redeem Success Modal */}
      {redeemSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl p-6 bg-linear-to-b from-amber-50 to-orange-100 border-4 border-black comic-shadow text-center">
            <div className="text-6xl mb-2 animate-bounce">🎁</div>
            <h3 className="text-3xl font-black text-[#2B1B15] mb-2">
              مبــــارك يا بطل! 🎉
            </h3>
            <p className="text-lg font-bold text-emerald-800 mb-2">
              حصلت على: {redeemSuccess.title} {redeemSuccess.icon}
            </p>
            <p className="text-xs font-semibold text-[#5C3224] mb-5 bg-white/70 py-2 px-3 rounded-xl border border-amber-300">
              أخبر والديك أو معلمك الآن لتستمتع بمكافأتك المستحقة! 🌟
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
