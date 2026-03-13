import { Shield } from "lucide-react";
import { Product } from "@/data/products";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="glass-card-hover overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground">
              {product.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-primary">
              <Shield className="h-3 w-3" /> Certified
            </span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          <p className="text-xs text-muted-foreground tracking-wide uppercase">
            {product.brand}
          </p>
          <h3 className="font-serif text-lg text-foreground leading-tight">
            {product.name}
          </h3>
          <p className="text-base font-medium text-primary">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
};
