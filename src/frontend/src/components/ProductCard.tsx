import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import type { ProductData } from "@/data/products";
import { useActor } from "@/hooks/useActor";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import RatingModal from "./RatingModal";
import StarRating from "./StarRating";

interface ProductCardProps {
  product: ProductData;
  index?: number;
  showWishlist?: boolean;
  ocidPrefix?: string;
  isNew?: boolean;
}

export default function ProductCard({
  product,
  index = 0,
  showWishlist = false,
  ocidPrefix = "product",
  isNew = false,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { actor, isFetching } = useActor();
  const [avgRating, setAvgRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  const fetchRatings = useCallback(async () => {
    if (!actor || isFetching) return;
    try {
      const [avg, ratings] = await Promise.all([
        actor.getAverageRating(product.id),
        actor.getRatings(product.id),
      ]);
      setAvgRating(Number(avg));
      setRatingCount(ratings.length);
    } catch {
      // silent — ratings are optional
    }
  }, [actor, isFetching, product.id]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      description: product.price,
      duration: 2000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white border-0 rounded-none overflow-hidden flex flex-col shadow-[0_2px_20px_rgba(61,43,31,0.06)] hover:shadow-[0_8px_40px_rgba(61,43,31,0.14)] transition-all duration-500"
      data-ocid={`${ocidPrefix}.item.${index + 1}`}
    >
      {/* Image — tall 3:4 ratio, linked to detail page */}
      <Link
        to="/fragrance/$id"
        params={{ id: product.id }}
        className="block relative overflow-hidden bg-[oklch(0.975_0.008_70)] cursor-pointer"
        style={{ aspectRatio: "3/4" }}
        data-ocid={`${ocidPrefix}.link`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges row */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <Badge
            variant="secondary"
            className="text-[9px] tracking-widest uppercase font-sans-body bg-white/90 text-foreground border-0 shadow-sm"
          >
            {product.category}
          </Badge>
          {isNew && (
            <Badge
              className="text-[9px] tracking-widest uppercase font-sans-body border-0"
              style={{ background: "var(--rose-gold)", color: "white" }}
            >
              New
            </Badge>
          )}
        </div>

        {showWishlist && (
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-rose-gold hover:text-white shadow-sm"
            data-ocid={`${ocidPrefix}.toggle.${index + 1}`}
            aria-label={`Add ${product.name} to wish list`}
          >
            <Heart size={14} />
          </button>
        )}

        {/* Hover overlay with Add to Cart */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            className="w-full flex items-center justify-center gap-2 text-xs tracking-[0.15em] uppercase font-sans-body font-medium bg-foreground text-background py-3.5 hover:bg-rose-gold transition-colors duration-200"
            data-ocid={`${ocidPrefix}.button.${index + 1}`}
          >
            <ShoppingCart size={12} />
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
        <Link
          to="/fragrance/$id"
          params={{ id: product.id }}
          className="block no-underline hover:text-rose-gold transition-colors duration-200"
        >
          <h3 className="font-serif text-xl font-semibold mb-0.5 text-foreground leading-tight">
            {product.name}
          </h3>
        </Link>

        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans-body mb-2">
          {product.notes}
        </p>

        {/* Star Rating display */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={avgRating} size="sm" />
          {ratingCount > 0 && (
            <span className="text-xs text-muted-foreground font-sans-body">
              ({ratingCount})
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground font-sans-body leading-relaxed mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="font-serif text-xl text-rose-gold font-medium">
            {product.price}
          </span>
          <RatingModal
            productId={product.id}
            productName={product.name}
            onRated={fetchRatings}
            trigger={
              <button
                type="button"
                className="text-[10px] tracking-widest uppercase font-sans-body text-muted-foreground hover:text-rose-gold transition-colors duration-200"
              >
                ✦ Review
              </button>
            }
          />
        </div>

        {/* Shop Now button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 text-xs tracking-[0.15em] uppercase font-sans-body font-medium py-3 text-white transition-colors duration-200 hover:opacity-90"
          style={{ background: "var(--rose-gold)" }}
          data-ocid={`${ocidPrefix}.primary_button.${index + 1}`}
        >
          <ShoppingCart size={12} />
          Shop Now
        </button>
      </div>
    </motion.div>
  );
}
