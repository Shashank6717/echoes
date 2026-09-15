interface Props {
  title: string;
  message: string;
  unlockDate: string;
  createdAt: string;
  onBack: () => void;
}

export default function ViewCapsule({ title, message, unlockDate, createdAt, onBack }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="animate-fade-in w-full max-w-2xl">
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-12">
          <div className="mb-6 text-center">
            <div className="mb-3 text-4xl">💌</div>
            <h2 className="text-2xl font-light text-white">{title}</h2>
            <p className="mt-2 text-xs text-white/30">
              Written {new Date(createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="whitespace-pre-wrap text-base leading-relaxed text-white/70">
            {message}
          </div>

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="text-center text-xs text-white/20">
            Sealed on {new Date(createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            {" · "}
            Opened on {new Date(unlockDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
        </div>
      </div>
    </div>
  );
}
