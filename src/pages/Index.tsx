import { TopBar } from "@/components/TopBar";
import { ChatPanel } from "@/components/ChatPanel";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <TopBar />
      <div className="flex flex-1 min-h-0">
        <aside className="w-[380px] border-r shrink-0 min-h-0">
          <ChatPanel />
        </aside>
        <main className="flex-1 min-h-0 overflow-auto">
          <div className="max-w-5xl mx-auto p-6">
            <Dashboard />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
