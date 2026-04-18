import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useClientStore } from "@/lib/store";
import ClientSearch from "./ClientSearch";

export default function Header() {
  const selectedClientId = useClientStore((s) => s.selectedClientId);
  const setSelectedClient = useClientStore((s) => s.setSelectedClient);

  return (
    <header className="h-14 border-b border-border bg-surface flex items-center px-6 sticky top-0 z-30">
      {/* Left: wordmark */}
      <button
        onClick={() => setSelectedClient(null)}
        className="text-[16px] font-bold text-primary tracking-tight hover:opacity-80 transition-opacity"
      >
        BNP&nbsp;PARIBAS
      </button>

      {/* Center: search slot (640px reserved) */}
      <div className="flex-1 flex justify-center">
        <div className="w-[640px] max-w-full">
          {selectedClientId && <ClientSearch variant="header" />}
        </div>
      </div>

      {/* Right: avatar */}
      <Avatar className="h-8 w-8 border border-border">
        <AvatarFallback className="bg-muted text-foreground text-xs font-medium">CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
