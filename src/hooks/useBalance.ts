import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  type: "recarga" | "consumo";
  amount: number;
  date: string;
  method: string;
  status: string;
}

export const useBalance = () => {
  const [balance, setBalance] = useState<number>(120.50);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "recarga",
      amount: 50.00,
      date: "Hoje, 14:30",
      method: "PIX",
      status: "concluída"
    },
    {
      id: "2",
      type: "consumo",
      amount: -8.50,
      date: "Hoje, 12:00",
      method: "Uso residencial",
      status: "automatico"
    },
    {
      id: "3",
      type: "recarga",
      amount: 30.00,
      date: "Ontem, 18:45",
      method: "QR Code",
      status: "concluída"
    },
    {
      id: "4",
      type: "consumo",
      amount: -12.30,
      date: "Ontem, 16:20",
      method: "Uso residencial",
      status: "automatico"
    }
  ]);

  const addTransaction = (amount: number, method: string) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "recarga",
      amount: amount,
      date: "Agora",
      method: method === "pix" ? "PIX" : method === "card" ? "Cartão" : "Boleto",
      status: "concluída"
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev + amount);
  };

  // Simular consumo gradual
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance(prev => {
        const newBalance = prev - 0.1; // Simula consumo de 0.1 kWh por minuto
        return Math.max(0, newBalance);
      });
    }, 60000); // A cada minuto

    return () => clearInterval(interval);
  }, []);

  return {
    balance,
    transactions,
    addTransaction,
    setBalance
  };
};