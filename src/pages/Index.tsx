import { useState } from "react";
import { products, categories, Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<"All" | Category>("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="grain-overlay relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent" />
        <div className="relative z-10 container mx-auto px-4 text-center space-y-6 animate-fade-in">
          <h1 className="font-serif text-5xl md:text-7xl leading-tight text-foreground">
            Own the Authentic.
            <br />
            <span className="text-primary">Prove It Forever.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Every luxury product on Provance comes with an NFT Certificate of
            Authenticity — verifiable, immutable, and truly yours.
          </p>
          <div className="flex justify-center pt-4">
            <Button
              variant="hero"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Products <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* subtle decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      {/* Product Grid */}
      <section id="products" className="container mx-auto px-4 py-20">
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
