import { Bell, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-cemig-yellow p-2 rounded-full">
            <Zap className="h-6 w-6 text-cemig-green" />
          </div>
          <div>
            <h1 className="text-xl font-bold">CEMIG</h1>
            <p className="text-sm opacity-90">PRÉ-PAGO+</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-glow">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-cemig-yellow text-cemig-green text-xs">
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-glow">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};