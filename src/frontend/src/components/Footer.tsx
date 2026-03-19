import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src="/assets/generated/luxuries-perfume-logo-transparent.dim_600x200.png"
              alt="Luxuries Perfume"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed font-sans-body">
              Crafting olfactory masterpieces for those who seek the
              extraordinary in every moment.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-sans-body text-xs tracking-[0.2em] font-semibold uppercase mb-5 text-foreground">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/" as const, label: "Home" },
                { to: "/collection" as const, label: "Collection" },
                { to: "/about" as const, label: "Our Story" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground hover:text-rose-gold transition-colors font-sans-body"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Story */}
          <div>
            <h4 className="font-sans-body text-xs tracking-[0.2em] font-semibold uppercase mb-5 text-foreground">
              Our Story
            </h4>
            <ul className="space-y-3">
              {[
                "Heritage",
                "Craftsmanship",
                "Ingredients",
                "Sustainability",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground font-sans-body">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-sans-body text-xs tracking-[0.2em] font-semibold uppercase mb-5 text-foreground">
              Connect
            </h4>
            <ul className="space-y-3">
              {["Instagram", "Pinterest", "Facebook", "Newsletter"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-muted-foreground hover:text-rose-gold transition-colors cursor-pointer font-sans-body">
                      {item}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground font-sans-body">
          <p>&copy; {year} Luxuries Perfume. All rights reserved.</p>
          <p>
            Built with &hearts; using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
