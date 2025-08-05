import { Header } from "@/components/Header";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { ConsumptionChart } from "@/components/ConsumptionChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { AlertsPanel } from "@/components/AlertsPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main dashboard area */}
          <div className="lg:col-span-2 space-y-6">
            <BalanceCard />
            <ConsumptionChart />
            <RecentTransactions />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions />
            <AlertsPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
