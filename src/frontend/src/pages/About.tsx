import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

export default function About() {
  return (
    <main className="pt-28 pb-24">
      {/* Hero Header */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xs tracking-[0.3em] uppercase text-rose-gold font-sans-body mb-4"
              >
                Heritage & Craft
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-5xl md:text-6xl font-light text-foreground leading-tight mb-6"
              >
                Our Story
              </motion.h1>
              <div
                className="w-14 h-px mb-8"
                style={{ background: "var(--rose-gold)" }}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="space-y-5 text-muted-foreground font-sans-body leading-relaxed text-base"
              >
                <p>
                  Luxuries Perfume was born in 2015 from a singular vision: to
                  bring the ancient art of perfumery into the modern world
                  without compromise. Founded in the historic fragrance capital
                  of Grasse, France, our atelier combines centuries-old
                  distillation techniques with contemporary sensibility.
                </p>
                <p>
                  Our Master Perfumer, Isabelle Moreau, trained for over two
                  decades under the great houses of French perfumery before
                  founding Luxuries. Every formula she creates is the result of
                  hundreds of iterations — a relentless pursuit of the perfect
                  olfactory harmony.
                </p>
                <p>
                  We source only the finest raw materials: Bulgarian rose attar
                  harvested at dawn, Indonesian sandalwood aged for twelve
                  years, Madagascan vanilla absolute, and rare iris from the
                  hillsides of Tuscany. No synthetics compromise the integrity
                  of our creations.
                </p>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative"
            >
              <div
                className="absolute -inset-6 rounded-full blur-3xl opacity-20"
                style={{ background: "var(--blush)" }}
              />
              <img
                src="/assets/generated/perfume-or-dore.dim_400x500.png"
                alt="Or Dore — Craftsmanship"
                className="relative w-full max-w-sm mx-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Separator className="max-w-7xl mx-auto mb-20" />

      {/* Values */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <h2 className="font-serif text-4xl font-light text-foreground">
              Our Philosophy
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Purity of Ingredients",
                body: "We refuse to use synthetic shortcuts. Every ingredient is traceable, ethically sourced, and selected for its singular beauty. Our supply chain is built on relationships cultivated over decades with the world's finest growers.",
                img: "/assets/generated/perfume-jasmin-pur.dim_400x500.png",
              },
              {
                title: "Artisanal Craftsmanship",
                body: "Each fragrance is composed in small batches of no more than 500 bottles. Our perfumers work with copper alembic stills unchanged since the 18th century, coaxing delicate aromatic compounds that industrial methods would destroy.",
                img: "/assets/generated/perfume-velvet-blanc.dim_400x500.png",
              },
              {
                title: "Enduring Heritage",
                body: "We are custodians of a tradition stretching back three centuries. Our archives hold over two hundred original formulations, each a fragment of history — fragrant letters written to the future by the perfumers of the past.",
                img: "/assets/generated/perfume-nuit-blanche.dim_400x500.png",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group"
              >
                <div
                  className="overflow-hidden rounded-sm mb-6"
                  style={{ aspectRatio: "4/5" }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-sans-body leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial quote */}
      <section
        className="py-20 px-6"
        style={{ background: "oklch(0.94 0.02 60)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-serif text-2xl md:text-3xl font-light italic text-foreground leading-relaxed mb-6">
              &ldquo;We do not create perfumes. We create memories — invisible,
              intimate, and eternal.&rdquo;
            </p>
            <footer className="text-xs tracking-[0.25em] uppercase text-rose-gold font-sans-body">
              — Isabelle Moreau, Master Perfumer
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* Team / Atelier */}
      <section className="px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/assets/generated/perfume-satin-rose.dim_400x500.png"
                alt="Satin Rose — Atelier"
                className="w-full max-w-sm drop-shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="text-xs tracking-[0.3em] uppercase text-rose-gold font-sans-body mb-4">
                The Atelier
              </p>
              <h2 className="font-serif text-4xl font-light text-foreground mb-5">
                Where Scent Becomes Art
              </h2>
              <div
                className="w-12 h-px mb-7"
                style={{ background: "var(--rose-gold)" }}
              />
              <div className="space-y-4 text-muted-foreground font-sans-body text-base leading-relaxed">
                <p>
                  Nestled within a 17th-century farmhouse in the hills above
                  Grasse, our atelier is more than a workspace — it is a
                  sanctuary for the senses. Ancient olive trees shade the garden
                  where we grow some of our own botanicals.
                </p>
                <p>
                  Visitors by private appointment can experience the creation
                  process firsthand: walking the flower fields, observing the
                  distillation, and ultimately sitting with our perfumers to
                  discover their own signature scent.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
