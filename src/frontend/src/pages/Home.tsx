import ProductCard from "@/components/ProductCard";
import { STATIC_PRODUCTS } from "@/data/products";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

const featuredProducts = STATIC_PRODUCTS.slice(0, 3);

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        data-ocid="hero.section"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-background.dim_1400x800.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/55" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left — Text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-xs tracking-[0.3em] uppercase text-rose-gold font-sans-body mb-6"
              >
                Maison de Parfum · Est. 2015
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground mb-6"
              >
                The Art of
                <br />
                <em className="italic text-rose-gold">Pure Luxury</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-base text-muted-foreground font-sans-body leading-relaxed mb-10 max-w-md"
              >
                Each fragrance is a story whispered in scent — rare botanicals,
                precious resins, and master craftsmanship distilled into a
                single, unforgettable moment.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/collection"
                  data-ocid="hero.shop_now_button"
                  className="inline-flex items-center gap-2 bg-rose-gold text-white px-8 py-3.5 rounded-full text-xs tracking-[0.15em] uppercase font-sans-body font-medium hover:opacity-90 transition-opacity duration-200 shadow-lg"
                >
                  <ShoppingBag size={14} /> Shop Now
                </Link>
                <Link
                  to="/collection"
                  data-ocid="hero.primary_button"
                  className="inline-flex items-center gap-2 border border-foreground/40 text-foreground px-8 py-3.5 rounded-full text-xs tracking-[0.15em] uppercase font-sans-body font-medium hover:border-rose-gold hover:text-rose-gold transition-colors duration-200"
                >
                  Explore Collection <ArrowRight size={14} />
                </Link>
                <Link
                  to="/about"
                  data-ocid="hero.secondary_button"
                  className="inline-flex items-center gap-2 border border-foreground/40 text-foreground px-8 py-3.5 rounded-full text-xs tracking-[0.15em] uppercase font-sans-body font-medium hover:border-rose-gold hover:text-rose-gold transition-colors duration-200"
                >
                  Our Story
                </Link>
              </motion.div>
            </div>

            {/* Right — Featured bottle */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:flex justify-center items-end"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-30"
                  style={{ background: "var(--blush)" }}
                />
                <img
                  src="/assets/generated/rose-lumiere.dim_600x800.png"
                  alt="Rose Lumiere — Featured Fragrance"
                  className="relative w-72 xl:w-80 drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-foreground/40"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* Quote Banner */}
      <section className="bg-secondary py-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-2xl md:text-3xl font-light italic text-foreground leading-relaxed"
          >
            &ldquo;A fragrance is an invisible accessory, the finishing touch of
            a lifetime.&rdquo;
          </motion.p>
          <p className="mt-4 text-xs tracking-widest uppercase text-rose-gold font-sans-body">
            — The Luxuries Perfume Atelier
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section data-ocid="featured.section" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-rose-gold font-sans-body mb-3">
              Curated Selection
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
              Featured Fragrances
            </h2>
            <div
              className="mt-5 w-16 h-px mx-auto"
              style={{ background: "var(--rose-gold)" }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                ocidPrefix="featured"
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center mt-14"
          >
            <Link
              to="/collection"
              data-ocid="featured.shop_now_button"
              className="inline-flex items-center gap-2 bg-rose-gold text-white px-10 py-3.5 rounded-full text-xs tracking-[0.2em] uppercase font-sans-body font-medium hover:opacity-90 transition-opacity shadow-md mr-4"
            >
              <ShoppingBag size={14} /> Shop Now
            </Link>
            <Link
              to="/collection"
              data-ocid="featured.primary_button"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans-body font-medium text-rose-gold hover:opacity-70 transition-opacity"
            >
              View Full Collection <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Spotlight */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-rose-gold font-sans-body mb-3">
              Just Arrived
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground">
              New Arrivals
            </h2>
            <div
              className="mt-4 w-12 h-px mx-auto"
              style={{ background: "var(--rose-gold)" }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {STATIC_PRODUCTS.slice(8, 10).map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                ocidPrefix="new_arrivals"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Banner */}
      <section
        className="py-20 px-6"
        style={{ background: "oklch(0.94 0.02 60)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              {
                num: "100%",
                label: "Natural Ingredients",
                desc: "Sourced from the world's finest botanical gardens",
              },
              {
                num: "30+",
                label: "Years of Mastery",
                desc: "Three decades of perfumery excellence",
              },
              {
                num: "200+",
                label: "Unique Formulas",
                desc: "Each scent a bespoke olfactory composition",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="space-y-3"
              >
                <p className="font-serif text-4xl font-light text-rose-gold">
                  {item.num}
                </p>
                <p className="text-sm font-semibold tracking-wider uppercase font-sans-body text-foreground">
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground font-sans-body">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
