import { useState } from "react";
import { Header } from "@/components/Header";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { ConsumptionChart } from "@/components/ConsumptionChart";
import { RecentTransactions } from "@/components/RecentTransactions";
import { AlertsPanel } from "@/components/AlertsPanel";
import { PaymentModal } from "@/components/PaymentModal";
import { useBalance } from "@/hooks/useBalance";

const Index = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { balance, transactions, addTransaction } = useBalance();

  const handlePaymentSuccess = (amount: number, method: string) => {
    addTransaction(amount, method);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main dashboard area */}
          <div className="lg:col-span-2 space-y-6">
            <BalanceCard balance={balance} />
            <ConsumptionChart />
            <RecentTransactions transactions={transactions} />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions onRecharge={() => setShowPaymentModal(true)} />
            <AlertsPanel />
          </div>
        </div>
      </main>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Index;
