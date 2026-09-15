import { useState, useEffect } from "react";

interface Props {
  title: string;
  message: string;
  unlockDate: string;
  opened: boolean;
  createdAt: string;
  onOpen: () => void;
  onDelete: () => void;
}

function getCountdown(unlockDate: string) {
  const diff = new Date(unlockDate).getTime() - Date.now();
  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export default function CapsuleCard({ title, message, unlockDate, opened, createdAt, onOpen, onDelete }: Props) {
  const [countdown, setCountdown] = useState(getCountdown(unlockDate));
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (opened) return;
    const interval = setInterval(() => {
      setCountdown(getCountdown(unlockDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [unlockDate, opened]);

  const isUnlocked = opened || (countdown === null);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/8 hover:shadow-lg hover:shadow-purple-500/10">
      {isUnlocked && (
        <div className="absolute -right-8 -top-8 rotate-45 bg-purple-500/20 px-10 py-1 text-[10px] font-semibold uppercase tracking-widest text-purple-300">
          {opened ? "Opened" : "Ready"}
        </div>
      )}

      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{isUnlocked ? "📨" : "🔒"}</span>
          <h3 className="text-lg font-medium text-white">{title}</h3>
        </div>
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setShowDelete(!showDelete); }}
            className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/10 hover:text-red-400"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {showDelete && (
            <div className="absolute right-0 top-8 z-10 rounded-xl border border-white/10 bg-[#1a1b2e] p-3 shadow-xl">
              <p className="mb-2 text-xs text-white/60">Delete this capsule?</p>
              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(); }}
                  className="rounded-lg bg-red-500/20 px-3 py-1 text-xs text-red-300 transition-colors hover:bg-red-500/30"
                >
                  Delete
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowDelete(false); }}
                  className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white/60 transition-colors hover:bg-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mb-4 line-clamp-2 text-sm text-white/40">{message}</p>

      {!opened && countdown ? (
        <div className="mb-4 flex gap-3">
          {[
            { val: countdown.days, label: "Days" },
            { val: countdown.hours, label: "Hrs" },
            { val: countdown.minutes, label: "Min" },
            { val: countdown.seconds, label: "Sec" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center rounded-lg bg-white/5 px-3 py-2">
              <span className="text-lg font-light tabular-nums text-white">{item.val}</span>
              <span className="text-[10px] uppercase tracking-wider text-white/30">{item.label}</span>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <span className="text-xs text-white/25">
          {new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        {isUnlocked ? (
          <button
            onClick={onOpen}
            className="rounded-full bg-purple-500/20 px-4 py-1.5 text-xs font-medium text-purple-300 transition-all duration-300 hover:bg-purple-500/30 hover:shadow-md hover:shadow-purple-500/20"
          >
            {opened ? "Read Again" : "Open Now"}
          </button>
        ) : (
          <span className="text-xs text-white/20">
            Unlocks {new Date(unlockDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        )}
      </div>
    </div>
  );
}
