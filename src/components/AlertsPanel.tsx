import { AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: "1",
    type: "warning",
    title: "Saldo baixo",
    message: "Seu saldo atual é suficiente para apenas 8 dias. Considere fazer uma recarga.",
    time: "Há 2 horas",
    priority: "alta"
  },
  {
    id: "2",
    type: "info",
    title: "Consumo elevado",
    message: "Seu consumo hoje está 20% acima da média. Verifique equipamentos ligados.",
    time: "Há 4 horas",
    priority: "media"
  },
  {
    id: "3",
    type: "success",
    title: "Recarga processada",
    message: "Sua recarga de R$ 50,00 foi processada com sucesso via PIX.",
    time: "Há 6 horas",
    priority: "baixa"
  }
];

export const AlertsPanel = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800";
      case "media":
        return "bg-yellow-100 text-yellow-800";
      case "baixa":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Alertas e Notificações</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="mt-0.5">
              {getIcon(alert.type)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{alert.title}</h4>
                <Badge variant="secondary" className={`text-xs ${getPriorityColor(alert.priority)}`}>
                  {alert.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{alert.message}</p>
              <p className="text-xs text-muted-foreground">{alert.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};