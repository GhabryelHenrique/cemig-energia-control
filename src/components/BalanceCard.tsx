import { Zap, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard = ({ balance }: BalanceCardProps) => {
  const estimatedDays = Math.ceil(balance / 15); // Estimativa baseada em consumo médio
  const usagePercent = Math.min(((150 - balance) / 150) * 100, 100); // Baseado em limite máximo de 150 kWh

  return (
    <Card className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground border-0 shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="h-5 w-5" />
          Saldo Atual
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold">{balance.toFixed(2)}</div>
          <div className="text-sm opacity-90">kWh disponíveis</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Duração estimada
            </span>
            <span className="font-semibold">{estimatedDays} dias</span>
          </div>
          
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Consumo do mês
              </span>
              <span>{usagePercent}%</span>
            </div>
            <Progress value={usagePercent} className="h-2 bg-white/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};