interface Props {
  onNavigate: () => void;
}

export default function LandingPage({ onNavigate }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="animate-fade-in max-w-2xl text-center">
        <div className="mb-6 text-6xl">💌</div>
        <h1 className="mb-4 text-5xl font-light tracking-tight text-white md:text-6xl">
          Echoes
        </h1>
        <p className="mb-2 text-xl font-light text-white/60">
          A Time Capsule for Your Future Self
        </p>
        <p className="mb-10 text-lg text-white/40">
          A message to the person you&apos;ll become.
        </p>
        <button
          onClick={onNavigate}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/10 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/20"
        >
          <span>Begin Your Journey</span>
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-8 flex gap-16 text-center text-white/30">
        <div>
          <div className="text-2xl font-light text-white/70">Write</div>
          <div className="text-xs uppercase tracking-widest">Your Letter</div>
        </div>
        <div>
          <div className="text-2xl font-light text-white/70">Seal</div>
          <div className="text-xs uppercase tracking-widest">In Time</div>
        </div>
        <div>
          <div className="text-2xl font-light text-white/70">Reopen</div>
          <div className="text-xs uppercase tracking-widest">Later</div>
        </div>
      </div>
    </div>
  );
}
