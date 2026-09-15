import { useState, type FormEvent } from "react";

interface Props {
  onSubmit: (title: string, message: string, unlockDate: string) => void;
  onCancel: () => void;
}

export default function CreateCapsule({ onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [errors, setErrors] = useState<{ title?: string; message?: string; unlockDate?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Give your capsule a name";
    if (!message.trim()) newErrors.message = "Write something to your future self";
    if (!unlockDate) {
      newErrors.unlockDate = "Pick an unlock date";
    } else if (new Date(unlockDate) <= new Date()) {
      newErrors.unlockDate = "The date must be in the future";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(title.trim(), message.trim(), unlockDate);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="animate-fade-in w-full max-w-lg">
        <button
          onClick={onCancel}
          className="mb-8 flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <h2 className="mb-2 text-3xl font-light text-white">Create a Capsule</h2>
        <p className="mb-8 text-sm text-white/40">Write a letter to your future self</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-white/40">
              Capsule Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Letter to myself on my birthday"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 outline-none backdrop-blur-sm transition-all duration-300 focus:border-purple-500/50 focus:bg-white/8 focus:ring-2 focus:ring-purple-500/20"
            />
            {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-white/40">
              Your Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Dear future me..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 outline-none backdrop-blur-sm transition-all duration-300 focus:border-purple-500/50 focus:bg-white/8 focus:ring-2 focus:ring-purple-500/20"
            />
            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-white/40">
              Unlock Date
            </label>
            <input
              type="date"
              value={unlockDate}
              min={today}
              onChange={(e) => setUnlockDate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none backdrop-blur-sm transition-all duration-300 focus:border-purple-500/50 focus:bg-white/8 focus:ring-2 focus:ring-purple-500/20 [color-scheme:dark]"
            />
            {errors.unlockDate && <p className="mt-1 text-xs text-red-400">{errors.unlockDate}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-purple-500/80 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
          >
            Seal This Capsule
          </button>
        </form>
      </div>
    </div>
  );
}
