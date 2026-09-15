import type { Capsule } from "../types/capsule";
import CapsuleCard from "./CapsuleCard";

interface Props {
  capsules: Capsule[];
  onCreate: () => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Dashboard({ capsules, onCreate, onView, onDelete }: Props) {
  const locked = capsules.filter((c) => !c.opened && new Date(c.unlockDate) > new Date());
  const unlocked = capsules.filter((c) => c.opened || new Date(c.unlockDate) <= new Date());

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="animate-fade-in mb-10 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-light text-white">Your Capsules</h1>
          <p className="mt-1 text-sm text-white/30">
            {capsules.length === 0
              ? "No capsules yet — start your first one"
              : `${capsules.length} capsule${capsules.length !== 1 ? "s" : ""} sealed`}
          </p>
        </div>
        <button
          onClick={onCreate}
          className="flex items-center gap-2 rounded-full bg-purple-500/80 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Capsule
        </button>
      </div>

      {capsules.length === 0 ? (
        <div className="animate-fade-in flex flex-col items-center justify-center py-32 text-center">
          <div className="mb-6 text-6xl opacity-40">📬</div>
          <h3 className="mb-2 text-xl font-light text-white/60">Your time capsule is empty</h3>
          <p className="mb-8 max-w-sm text-sm text-white/30">
            Write a letter to your future self. Seal it in time, and open it when the moment arrives.
          </p>
          <button
            onClick={onCreate}
            className="rounded-full bg-white/10 px-6 py-3 text-sm text-white transition-all duration-300 hover:bg-white/20"
          >
            Create Your First Capsule
          </button>
        </div>
      ) : (
        <>
          {locked.length > 0 && (
            <section className="mb-10">
              <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-white/30">
                Sealed · {locked.length}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {locked.map((c) => (
                  <CapsuleCard
                    key={c.id}
                    title={c.title}
                    message={c.message}
                    unlockDate={c.unlockDate}
                    opened={c.opened}
                    createdAt={c.createdAt}
                    onOpen={() => onView(c.id)}
                    onDelete={() => onDelete(c.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {unlocked.length > 0 && (
            <section>
              <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-white/30">
                Opened · {unlocked.length}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {unlocked.map((c) => (
                  <CapsuleCard
                    key={c.id}
                    title={c.title}
                    message={c.message}
                    unlockDate={c.unlockDate}
                    opened={c.opened}
                    createdAt={c.createdAt}
                    onOpen={() => onView(c.id)}
                    onDelete={() => onDelete(c.id)}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
