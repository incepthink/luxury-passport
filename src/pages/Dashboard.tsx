import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/data/products";
import {
  Shield,
  Plus,
  Eye,
  Loader2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

const myProducts = products.slice(0, 4);

const Dashboard = () => {
  const { user, setShowAuthModal } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [minting, setMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const [listedStates, setListedStates] = useState<Record<string, boolean>>({
    "1": true,
    "2": false,
    "3": true,
    "4": false,
  });

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "Watches",
    description: "",
    price: "",
    serialNumber: "",
    year: "",
    material: "",
    condition: "Mint",
    appraisedValue: "",
    inspectionDate: "",
  });

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl text-foreground">
            Please log in to view your products
          </h2>
          <Button variant="gold" onClick={() => setShowAuthModal(true)}>
            Login / Sign Up
          </Button>
        </div>
      </div>
    );
  }

  const handleMint = () => {
    setMinting(true);
    setTimeout(() => {
      setMinting(false);
      setMintSuccess(true);
      toast.success("Certificate minted successfully!");
    }, 2000);
  };

  const toggleListed = (id: string) => {
    setListedStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (mintSuccess) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-md text-center space-y-6 animate-fade-in">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <svg
              viewBox="0 0 24 24"
              className="h-12 w-12 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 13l4 4L19 7" className="animate-checkmark" />
            </svg>
          </div>
          <h2 className="font-serif text-3xl text-foreground">
            Certificate Minted!
          </h2>
          <p className="text-muted-foreground">
            Your NFT Certificate of Authenticity has been minted on Base
            Sepolia.
          </p>
          <div className="rounded-lg bg-secondary p-4">
            <p className="text-xs text-muted-foreground">NFT Token ID</p>
            <p className="font-mono text-sm text-foreground">
              0x
              {Array.from({ length: 8 }, () =>
                Math.floor(Math.random() * 16).toString(16),
              ).join("")}
            </p>
          </div>
          <Button
            variant="gold"
            onClick={() => {
              setShowForm(false);
              setMintSuccess(false);
              setStep(1);
            }}
          >
            View My Products
          </Button>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Button
          variant="ghost"
          className="mb-6 text-muted-foreground"
          onClick={() => {
            setShowForm(false);
            setStep(1);
          }}
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
        </Button>

        {/* Progress */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-px w-12 ${step > s ? "bg-primary" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-serif text-2xl text-foreground">
                Product Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Product Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Submariner Date"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Input
                    value={form.brand}
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                    placeholder="e.g. Rolex"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>Watches</option>
                    <option>Jewelry</option>
                    <option>Bags & Accessories</option>
                    <option>Art & Collectibles</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Price (USD)</Label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe your product..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border/50 text-sm text-muted-foreground">
                  Click to upload or drag & drop
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="gold" onClick={() => setStep(2)}>
                  Next <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-serif text-2xl text-foreground">
                Certificate Details
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Serial Number</Label>
                  <Input
                    value={form.serialNumber}
                    onChange={(e) =>
                      setForm({ ...form, serialNumber: e.target.value })
                    }
                    placeholder="XX-XXX-XXXX-XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year of Manufacture</Label>
                  <Input
                    type="number"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    placeholder="2024"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Material / Composition</Label>
                  <Input
                    value={form.material}
                    onChange={(e) =>
                      setForm({ ...form, material: e.target.value })
                    }
                    placeholder="e.g. 18K Gold / Sapphire Crystal"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Condition Grade</Label>
                  <div className="flex gap-3">
                    {["Mint", "Excellent", "Good", "Fair"].map((g) => (
                      <label
                        key={g}
                        className="flex items-center gap-1.5 text-sm cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="condition"
                          checked={form.condition === g}
                          onChange={() => setForm({ ...form, condition: g })}
                          className="accent-primary"
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Appraised Value (USD)</Label>
                  <Input
                    type="number"
                    value={form.appraisedValue}
                    onChange={(e) =>
                      setForm({ ...form, appraisedValue: e.target.value })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Inspection Date</Label>
                  <Input
                    type="date"
                    value={form.inspectionDate}
                    onChange={(e) =>
                      setForm({ ...form, inspectionDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Provenance Documents</Label>
                <div className="flex h-20 items-center justify-center rounded-lg border-2 border-dashed border-border/50 text-sm text-muted-foreground">
                  Upload documents
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="text-muted-foreground"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                <Button variant="gold" onClick={() => setStep(3)}>
                  Review <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-serif text-2xl text-foreground">
                Review & Mint Certificate
              </h2>

              <div className="glass-card border-primary/20 p-6 gold-shimmer">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-serif text-lg text-foreground">
                    Certificate Preview
                  </h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 text-sm">
                  {[
                    ["Product", form.name || "—"],
                    ["Brand", form.brand || "—"],
                    ["Category", form.category],
                    [
                      "Price",
                      form.price
                        ? `$${Number(form.price).toLocaleString()}`
                        : "—",
                    ],
                    ["Serial Number", form.serialNumber || "—"],
                    ["Year", form.year || "—"],
                    ["Material", form.material || "—"],
                    ["Condition", form.condition],
                    [
                      "Appraised Value",
                      form.appraisedValue
                        ? `$${Number(form.appraisedValue).toLocaleString()}`
                        : "—",
                    ],
                    ["Inspection Date", form.inspectionDate || "—"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Your Certificate of Authenticity NFT will be minted on the Base
                Sepolia testnet.
              </p>

              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setStep(2)}
                  className="text-muted-foreground"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                <Button
                  variant="gold"
                  size="lg"
                  onClick={handleMint}
                  disabled={minting}
                >
                  {minting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Minting...
                    </>
                  ) : (
                    "Mint Certificate"
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-foreground">My Collection</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your authenticated luxury products
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {myProducts.map((product) => (
          <div key={product.id} className="glass-card-hover overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {product.brand}
                </p>
                <h3 className="font-serif text-lg text-foreground">
                  {product.name}
                </h3>
                <p className="text-sm font-medium text-primary">
                  ${product.price.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    listedStates[product.id]
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {listedStates[product.id] ? "Listed" : "Unlisted"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleListed(product.id)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {listedStates[product.id] ? "Unlist" : "List"}
                </Button>
              </div>
              <Button
                variant="gold-outline"
                size="sm"
                className="w-full"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <Eye className="mr-1 h-3.5 w-3.5" /> View Certificate
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Button variant="gold" size="lg" onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> List a New Product
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
