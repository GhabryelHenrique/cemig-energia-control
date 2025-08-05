import { CreditCard, QrCode, Receipt, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuickActionsProps {
  onRecharge: () => void;
}

export const QuickActions = ({ onRecharge }: QuickActionsProps) => {
  const actions = [
    {
      icon: CreditCard,
      label: "Recarga PIX",
      description: "Instantânea",
      variant: "default" as const
    },
    {
      icon: QrCode,
      label: "QR Code",
      description: "Escaneie e pague",
      variant: "outline" as const
    },
    {
      icon: Receipt,
      label: "Boleto",
      description: "Via bancário",
      variant: "outline" as const
    },
    {
      icon: BarChart3,
      label: "Histórico",
      description: "Ver consumo",
      variant: "outline" as const
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-16 flex-col gap-1 text-xs"
              onClick={() => {
                if (index === 0) onRecharge(); // PIX
                if (index === 1) onRecharge(); // QR Code
                if (index === 2) onRecharge(); // Boleto
              }}
            >
              <action.icon className="h-5 w-5" />
              <div>
                <div className="font-semibold">{action.label}</div>
                <div className="opacity-70">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};