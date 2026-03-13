import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from "@/data/products";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BuyModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  product: Product;
}

export const BuyModal = ({ open, onOpenChange, product }: BuyModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSuccess(false);
      setLoading(false);
    }, 300);
  };

  if (success) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="glass-card border-border/50 sm:max-w-md text-center">
          {/* Checkmark */}
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <svg
              viewBox="0 0 24 24"
              className="h-10 w-10 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" className="animate-checkmark" />
            </svg>
          </div>
          <h3 className="font-serif text-2xl text-foreground">
            Congratulations!
          </h3>
          <p className="text-muted-foreground">
            You now own{" "}
            <span className="text-foreground font-medium">{product.name}</span>.
          </p>
          <p className="text-sm text-muted-foreground">
            The Certificate of Authenticity NFT has been transferred to your
            wallet.
          </p>
          <Button
            variant="gold"
            className="mt-4 w-full"
            onClick={() => {
              handleClose();
              navigate("/dashboard");
            }}
          >
            View My Products
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-card border-border/50 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-foreground">
            Complete Purchase
          </DialogTitle>
        </DialogHeader>

        <div className="rounded-lg bg-secondary p-4 mb-4">
          <p className="text-sm text-muted-foreground">Product</p>
          <p className="text-foreground font-medium">{product.name}</p>
          <p className="text-2xl font-serif text-primary mt-1">
            ${product.price.toLocaleString()}
          </p>
        </div>

        {/* Payment toggle */}
        <div className="flex rounded-lg bg-secondary p-1 mb-4">
          <button
            onClick={() => setPaymentMethod("card")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-all duration-200 ${
              paymentMethod === "card"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            Credit/Debit Card
          </button>
          <button
            onClick={() => setPaymentMethod("upi")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-all duration-200 ${
              paymentMethod === "upi"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            UPI
          </button>
        </div>

        <form onSubmit={handlePurchase} className="space-y-4">
          {paymentMethod === "card" ? (
            <>
              <div className="space-y-2">
                <Label>Card Number</Label>
                <Input placeholder="•••• •••• •••• ••••" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Expiry</Label>
                  <Input placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label>CVV</Label>
                  <Input placeholder="•••" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cardholder Name</Label>
                <Input placeholder="John Doe" required />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label>UPI ID</Label>
              <Input placeholder="yourname@upi" required />
            </div>
          )}

          <Button
            type="submit"
            variant="gold"
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              "Complete Purchase"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
