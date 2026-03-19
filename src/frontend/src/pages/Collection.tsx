import ProductCard from "@/components/ProductCard";
import { STATIC_PRODUCTS } from "@/data/products";
import { motion } from "motion/react";

export default function Collection() {
  return (
    <main className="pt-28 pb-24">
      {/* Page header */}
      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-rose-gold font-sans-body mb-3"
          >
            Our Creations
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl font-light text-foreground mb-5"
          >
            The Collection
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-16 h-px mx-auto mb-6"
            style={{
              background: "var(--rose-gold)",
              transformOrigin: "center",
            }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base text-muted-foreground font-sans-body max-w-xl mx-auto leading-relaxed"
          >
            Ten singular fragrances, each a world unto itself. Discover the
            language of rare botanicals, precious woods, and luminous florals.
          </motion.p>
        </div>
      </section>

      {/* Products grid */}
      <section data-ocid="collection.section" className="px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            data-ocid="collection.list"
          >
            {STATIC_PRODUCTS.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                showWishlist
                ocidPrefix="collection"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Signature note */}
      <section className="px-6 mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-xl md:text-2xl font-light italic text-muted-foreground leading-relaxed"
          >
            &ldquo;Every bottle is a testament to the beauty of restraint — a
            single drop that speaks volumes.&rdquo;
          </motion.blockquote>
        </div>
      </section>
    </main>
  );
}
