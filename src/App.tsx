import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Capsule, Page } from "./types/capsule";
import StarField from "./components/StarField";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import CreateCapsule from "./components/CreateCapsule";
import ViewCapsule from "./components/ViewCapsule";

function App() {
  const [page, setPage] = useState<Page>("landing");
  const [capsules, setCapsules] = useLocalStorage<Capsule[]>("echoes-capsules", []);
  const [viewId, setViewId] = useState<string | null>(null);

  const handleCreate = (title: string, message: string, unlockDate: string) => {
    const newCapsule: Capsule = {
      id: crypto.randomUUID(),
      title,
      message,
      unlockDate,
      createdAt: new Date().toISOString(),
      opened: false,
    };
    setCapsules((prev) => [newCapsule, ...prev]);
    setPage("dashboard");
  };

  const handleDelete = (id: string) => {
    setCapsules((prev) => prev.filter((c) => c.id !== id));
  };

  const handleOpen = (id: string) => {
    setCapsules((prev) =>
      prev.map((c) => (c.id === id ? { ...c, opened: true } : c))
    );
    setViewId(id);
    setPage("view");
  };

  const viewing = viewId ? capsules.find((c) => c.id === viewId) : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0b1a]">
      <StarField />
      <div className="relative z-10">
        {page === "landing" && <LandingPage onNavigate={() => setPage("dashboard")} />}
        {page === "dashboard" && (
          <Dashboard
            capsules={capsules}
            onCreate={() => setPage("create")}
            onView={handleOpen}
            onDelete={handleDelete}
          />
        )}
        {page === "create" && (
          <CreateCapsule
            onSubmit={handleCreate}
            onCancel={() => setPage("dashboard")}
          />
        )}
        {page === "view" && viewing && (
          <ViewCapsule
            title={viewing.title}
            message={viewing.message}
            unlockDate={viewing.unlockDate}
            createdAt={viewing.createdAt}
            onBack={() => setPage("dashboard")}
          />
        )}
      </div>
    </div>
  );
}

export default App;
