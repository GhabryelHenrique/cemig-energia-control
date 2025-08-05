import { useState } from "react";
import { CreditCard, QrCode, Receipt, X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number, method: string) => void;
}

export const PaymentModal = ({ isOpen, onClose, onSuccess }: PaymentModalProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("pix");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const predefinedAmounts = [20, 50, 100, 200];

  const paymentMethods = [
    {
      id: "pix",
      name: "PIX",
      icon: QrCode,
      description: "Pagamento instantâneo",
      time: "Imediato"
    },
    {
      id: "card",
      name: "Cartão de Crédito",
      icon: CreditCard,
      description: "Visa, Mastercard, Elo",
      time: "Até 2h"
    },
    {
      id: "boleto",
      name: "Boleto Bancário",
      icon: Receipt,
      description: "Vencimento em 3 dias",
      time: "1-2 dias úteis"
    }
  ];

  const getAmount = () => {
    return customAmount ? parseFloat(customAmount) : selectedAmount;
  };

  const handlePayment = async () => {
    const amount = getAmount();
    if (!amount || amount < 10) {
      toast({
        title: "Valor inválido",
        description: "O valor mínimo para recarga é R$ 10,00",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setShowSuccess(true);

    // Simular confirmação após 3 segundos
    setTimeout(() => {
      onSuccess(amount, selectedMethod);
      setShowSuccess(false);
      onClose();
      toast({
        title: "Recarga realizada com sucesso!",
        description: `${amount.toFixed(2)} kWh adicionados ao seu saldo`,
      });
    }, 2000);
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Pagamento Processado!</h3>
            <p className="text-muted-foreground">
              Sua recarga de {getAmount().toFixed(2)} kWh está sendo processada...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-full">
              <CreditCard className="h-5 w-5 text-primary-foreground" />
            </div>
            Recarregar Energia
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Valores predefinidos */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Valores sugeridos (kWh)
            </Label>
            <div className="grid grid-cols-4 gap-3">
              {predefinedAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  className="h-12 flex-col gap-1"
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                >
                  <span className="font-bold">{amount}</span>
                  <span className="text-xs">kWh</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Valor personalizado */}
          <div>
            <Label htmlFor="custom-amount" className="text-base font-semibold">
              Ou digite um valor personalizado
            </Label>
            <div className="flex items-center gap-2 mt-2">
              <Input
                id="custom-amount"
                type="number"
                placeholder="0,00"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(0);
                }}
                className="flex-1"
              />
              <span className="text-muted-foreground">kWh</span>
            </div>
          </div>

          {/* Métodos de pagamento */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Método de pagamento
            </Label>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        selectedMethod === method.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}>
                        <method.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{method.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{method.time}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Resumo */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total da recarga:</span>
                <span className="text-xl font-bold text-primary">
                  {getAmount().toFixed(2)} kWh
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={isProcessing || !getAmount()}
              className="flex-1"
            >
              {isProcessing ? "Processando..." : "Confirmar Pagamento"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};