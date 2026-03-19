import { motion } from "motion/react";

const articles = [
  {
    id: 1,
    category: "Technique",
    title: "The Art of Layering Fragrances",
    excerpt:
      "Discover how to combine two or more scents to create a truly personal olfactory signature — one that is uniquely and unmistakably yours. Layering is a centuries-old practice refined by Parisian maisons.",
    date: "12 March 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Ritual",
    title: "Morning Rituals: How to Apply Perfume",
    excerpt:
      "The pulse points, the distance, the timing — every detail matters when applying your fragrance. Learn the rituals that transform a simple spray into a lasting, evolving experience throughout your day.",
    date: "28 February 2026",
    readTime: "4 min read",
  },
  {
    id: 3,
    category: "Ingredient Spotlight",
    title: "The Story of Rose: Queen of Florals",
    excerpt:
      "From the valleys of Bulgaria to the sun-drenched fields of Grasse, the rose has reigned supreme in perfumery for millennia. We explore its many faces — from fresh and dewy to deep and velvety.",
    date: "14 February 2026",
    readTime: "6 min read",
  },
  {
    id: 4,
    category: "Guide",
    title: "Seasonal Scents: Choosing Perfume by Season",
    excerpt:
      "Just as fashion changes with the seasons, so should your fragrance wardrobe. Light aquatics for summer, spiced orientals for winter — we guide you through building a collection for every chapter of the year.",
    date: "1 February 2026",
    readTime: "7 min read",
  },
];

export default function Journal() {
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
            Stories & Insights
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl font-light text-foreground mb-5"
          >
            The Journal
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
            Reflections on perfumery, ingredient stories, and the art of wearing
            fragrance with intention.
          </motion.p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="px-6" data-ocid="journal.section">
        <div className="max-w-7xl mx-auto">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            data-ocid="journal.list"
          >
            {articles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-card border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                data-ocid={`journal.item.${i + 1}`}
              >
                {/* Decorative top bar */}
                <div
                  className="h-1"
                  style={{ background: "var(--rose-gold)" }}
                />
                <div className="p-8">
                  <span className="inline-block text-[10px] tracking-[0.3em] uppercase font-sans-body text-rose-gold border border-rose-gold/30 px-3 py-1 rounded-full mb-4">
                    {article.category}
                  </span>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-3 group-hover:text-rose-gold transition-colors duration-300 leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-sans-body leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground font-sans-body">
                      <span>{article.date}</span>
                      <span className="mx-2 opacity-40">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <button
                      type="button"
                      className="text-xs tracking-[0.15em] uppercase font-sans-body font-medium text-foreground border-b border-foreground/40 pb-0.5 hover:text-rose-gold hover:border-rose-gold transition-colors duration-200"
                      data-ocid={`journal.button.${i + 1}`}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 mt-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-xl md:text-2xl font-light italic text-muted-foreground leading-relaxed"
          >
            &ldquo;Perfume is the art that makes memory speak.&rdquo;
          </motion.blockquote>
          <p className="mt-3 text-xs tracking-widest text-muted-foreground/60 font-sans-body uppercase">
            — Francis Kurkdjian
          </p>
        </div>
      </section>
    </main>
  );
}
