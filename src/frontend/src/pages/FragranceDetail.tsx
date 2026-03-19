import RatingModal from "@/components/RatingModal";
import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { STATIC_PRODUCTS } from "@/data/products";
import { useActor } from "@/hooks/useActor";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function FragranceDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const product = STATIC_PRODUCTS.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { actor, isFetching } = useActor();
  const [avgRating, setAvgRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  const fetchRatings = useCallback(async () => {
    if (!actor || isFetching || !product) return;
    try {
      const [avg, ratings] = await Promise.all([
        actor.getAverageRating(product.id),
        actor.getRatings(product.id),
      ]);
      setAvgRating(Number(avg));
      setRatingCount(ratings.length);
    } catch {
      // silent
    }
  }, [actor, isFetching, product]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  if (!product) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6">
        <p className="font-serif text-2xl text-foreground">
          Fragrance not found
        </p>
        <Link
          to="/collection"
          className="text-xs tracking-[0.2em] uppercase font-sans-body text-rose-gold hover:underline"
          data-ocid="fragrance_detail.link"
        >
          ← Back to The Collection
        </Link>
      </main>
    );
  }

  const notesList = product.notes.split(",").map((n) => n.trim());

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      description: product.price,
      duration: 2000,
    });
  };

  return (
    <main
      className="min-h-screen bg-background"
      data-ocid="fragrance_detail.page"
    >
      {/* Sticky Back Nav */}
      <div className="sticky top-[72px] z-30 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-sans-body text-muted-foreground hover:text-rose-gold transition-colors duration-200"
            data-ocid="fragrance_detail.link"
          >
            <ArrowLeft size={12} />
            The Collection
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:sticky lg:top-32"
          >
            <div
              className="relative overflow-hidden bg-[oklch(0.975_0.008_70)] flex items-center justify-center rounded-sm"
              style={{ aspectRatio: "3/4" }}
              data-ocid="fragrance_detail.card"
            >
              {/* Subtle petal watermark */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 70%, var(--rose-gold) 0%, transparent 60%), radial-gradient(circle at 70% 30%, var(--blush) 0%, transparent 60%)",
                }}
              />
              <img
                src={product.image}
                alt={product.name}
                className="relative w-4/5 h-4/5 object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Right — Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col gap-6 pt-4"
          >
            {/* Category badge */}
            <Badge
              variant="secondary"
              className="w-fit text-[9px] tracking-[0.25em] uppercase font-sans-body bg-secondary text-muted-foreground border-0"
            >
              {product.category}
            </Badge>

            {/* Name & Price */}
            <div>
              <h1 className="font-serif text-5xl lg:text-6xl font-medium text-foreground leading-tight mb-3">
                {product.name}
              </h1>
              <p className="font-serif text-3xl text-rose-gold font-medium">
                {product.price}
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={avgRating} size="md" />
              <span className="text-sm font-sans-body text-muted-foreground">
                {ratingCount > 0
                  ? `${avgRating.toFixed(1)} · ${ratingCount} review${ratingCount !== 1 ? "s" : ""}`
                  : "No reviews yet"}
              </span>
            </div>

            <Separator className="bg-border" />

            {/* Description */}
            <div>
              <h2 className="font-serif text-sm tracking-[0.2em] uppercase text-muted-foreground mb-3">
                About this Fragrance
              </h2>
              <p className="font-sans-body text-base leading-relaxed text-foreground">
                {product.description}
              </p>
            </div>

            {/* Fragrance Notes */}
            <div>
              <h2 className="font-serif text-sm tracking-[0.2em] uppercase text-muted-foreground mb-4 flex items-center gap-2">
                <Sparkles size={12} className="text-rose-gold" />
                Fragrance Notes
              </h2>
              <div className="flex flex-wrap gap-2">
                {notesList.map((note) => (
                  <span
                    key={note}
                    className="inline-block px-4 py-1.5 text-xs tracking-[0.15em] uppercase font-sans-body border border-border text-foreground hover:border-rose-gold hover:text-rose-gold transition-colors duration-200 cursor-default"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <Separator className="bg-border" />

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 py-4 text-sm tracking-[0.2em] uppercase font-sans-body font-medium text-white transition-all duration-300 hover:opacity-90 hover:shadow-luxury active:scale-[0.99]"
                style={{ background: "var(--rose-gold)" }}
                data-ocid="fragrance_detail.primary_button"
              >
                <ShoppingCart size={15} />
                Add to Cart
              </button>

              <RatingModal
                productId={product.id}
                productName={product.name}
                onRated={fetchRatings}
                trigger={
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-4 text-sm tracking-[0.2em] uppercase font-sans-body font-medium text-foreground border border-border hover:border-rose-gold hover:text-rose-gold transition-colors duration-200"
                    data-ocid="fragrance_detail.secondary_button"
                  >
                    ✦ Write a Review
                  </button>
                }
              />
            </div>

            {/* Decorative brand note */}
            <p className="text-[10px] tracking-[0.25em] uppercase font-sans-body text-muted-foreground text-center pt-2">
              Luxuries Perfume · Crafted with Love
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
