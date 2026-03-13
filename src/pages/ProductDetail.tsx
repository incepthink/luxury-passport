import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Shield, Copy, Check, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { BuyModal } from "@/components/BuyModal";

const conditionColors: Record<string, string> = {
  Mint: "bg-emerald-500",
  Excellent: "bg-blue-500",
  Good: "bg-yellow-500",
  Fair: "bg-orange-500",
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { user, wallet, setShowAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "certificate" | "history" | "about"
  >("certificate");
  const [copied, setCopied] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="font-serif text-2xl text-foreground">
            Product Not Found
          </h2>
          <Link to="/">
            <Button variant="gold-outline">Back to Explore</Button>
          </Link>
        </div>
      </div>
    );
  }

  const truncate = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const isOwner =
    wallet && wallet.toLowerCase() === product.currentOwner.toLowerCase();

  const copyAddress = () => {
    navigator.clipboard.writeText(product.currentOwner);
    setCopied(true);
    toast.success("Address copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBuyNow = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setShowBuyModal(true);
  };

  const tabs = [
    { key: "certificate" as const, label: "Certificate of Authenticity" },
    { key: "history" as const, label: "Ownership History" },
    { key: "about" as const, label: "About" },
  ];

  const cert = product.certificate;

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>

      {/* Two-column layout */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left: Image */}
        <div className="relative">
          <div className="overflow-hidden rounded-lg border-2 border-primary/20 p-1">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-md object-cover aspect-square"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              {product.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
              <Shield className="h-3.5 w-3.5" /> Certified by Provance
            </span>
          </div>

          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
              {product.brand}
            </p>
            <h1 className="font-serif text-4xl text-foreground">
              {product.name}
            </h1>
          </div>

          <p className="text-3xl font-serif text-primary">
            ${product.price.toLocaleString()}
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Owner:</span>
            <code className="rounded bg-secondary px-2 py-1 text-xs font-mono text-foreground">
              {truncate(product.currentOwner)}
            </code>
            <button
              onClick={copyAddress}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              variant="gold"
              className="w-full"
              size="lg"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
            {isOwner && (
              <Button variant="gold-outline" className="w-full" size="lg">
                List for Sale
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex border-b border-border/50 mb-8">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                activeTab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Certificate */}
        {activeTab === "certificate" && (
          <div className="glass-card border-primary/20 p-8 max-w-3xl gold-shimmer animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-primary" />
              <h3 className="font-serif text-xl text-foreground">
                Certificate of Authenticity
              </h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Serial Number", cert.serialNumber],
                ["Brand & Model", `${cert.brand} ${cert.model}`],
                ["Year of Manufacture", cert.yearOfManufacture.toString()],
                ["Material", cert.material],
                ["Appraised Value", `$${cert.appraisedValue.toLocaleString()}`],
                ["Last Inspection", cert.lastInspectionDate],
                ["NFT Token ID", cert.nftTokenId],
                ["Contract Address", cert.contractAddress],
              ].map(([label, value]) => (
                <div key={label} className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-sm text-foreground font-mono">{value}</p>
                </div>
              ))}
            </div>

            {/* Condition */}
            <div className="mt-6 flex items-center gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Condition:
              </span>
              <span
                className={`h-2.5 w-2.5 rounded-full ${conditionColors[cert.conditionGrade]}`}
              />
              <span className="text-sm text-foreground">
                {cert.conditionGrade}
              </span>
            </div>

            {/* Documents */}
            <div className="mt-6 flex flex-wrap gap-2">
              {cert.documents.map((doc) => (
                <span
                  key={doc}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {doc}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Ownership History */}
        {activeTab === "history" && (
          <div className="max-w-2xl animate-fade-in">
            <div className="relative pl-8">
              {/* Gold line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-primary/30" />
              {product.ownershipHistory.map((entry, i) => (
                <div key={i} className="relative mb-8 last:mb-0">
                  {/* Node */}
                  <div
                    className={`absolute left-[-21px] top-1 h-4 w-4 rounded-full border-2 ${
                      entry.isCurrent
                        ? "border-primary bg-primary"
                        : "border-primary/50 bg-background"
                    }`}
                  />
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <code className="text-sm font-mono text-foreground">
                          {truncate(entry.wallet)}
                        </code>
                        {entry.isCurrent && (
                          <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                            Current Owner
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          ${entry.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About */}
        {activeTab === "about" && (
          <div className="max-w-2xl animate-fade-in">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        )}
      </div>

      <BuyModal
        open={showBuyModal}
        onOpenChange={setShowBuyModal}
        product={product}
      />
    </div>
  );
};

export default ProductDetail;
