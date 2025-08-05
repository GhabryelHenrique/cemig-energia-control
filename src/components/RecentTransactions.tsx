import { ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  type: "recarga" | "consumo";
  amount: number;
  date: string;
  method: string;
  status: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Movimentações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                transaction.type === 'recarga' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-red-100 text-red-600'
              }`}>
                {transaction.type === 'recarga' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
              </div>
              <div>
                <div className="font-medium text-sm">
                  {transaction.type === 'recarga' ? 'Recarga' : 'Consumo'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {transaction.method}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-semibold ${
                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.amount > 0 ? '+' : ''}{Math.abs(transaction.amount).toFixed(2)} kWh
              </div>
              <div className="text-xs text-muted-foreground">
                {transaction.date}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};