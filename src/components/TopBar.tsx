import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TopBar() {
  return (
    <header className="h-14 border-b bg-surface flex items-center px-5 shrink-0">
      <div className="flex items-center gap-2 w-[348px]">
        <span className="text-sm font-bold tracking-tight text-primary">BNP PARIBAS</span>
        <span className="text-xs text-muted-foreground">Copilot</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-sm font-medium">Session client</div>
        <div className="text-xs text-muted-foreground">Rendez-vous · {new Date().toLocaleDateString("fr-FR")}</div>
      </div>
      <div className="w-[348px] flex justify-end">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary text-xs font-medium">SD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
