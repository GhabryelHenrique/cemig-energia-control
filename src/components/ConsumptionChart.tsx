import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { day: "Seg", consumption: 8.5 },
  { day: "Ter", consumption: 12.3 },
  { day: "Qua", consumption: 9.8 },
  { day: "Qui", consumption: 15.2 },
  { day: "Sex", consumption: 11.7 },
  { day: "Sáb", consumption: 18.4 },
  { day: "Dom", consumption: 14.9 },
];

export const ConsumptionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Consumo dos Últimos 7 Dias</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value) => [`${value} kWh`, "Consumo"]}
              />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};