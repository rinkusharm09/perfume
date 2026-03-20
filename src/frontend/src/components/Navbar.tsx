import { useCart } from "@/context/CartContext";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { totalItems, setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/" as const, label: "HOME" },
    { to: "/collection" as const, label: "COLLECTION" },
    { to: "/about" as const, label: "ABOUT" },
    { to: "/journal" as const, label: "JOURNAL" },
    { to: "/contact" as const, label: "CONTACT" },
    { to: "/orders" as const, label: "MY ORDERS" },
  ];

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-xs border-b border-border"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          data-ocid="nav.link"
          className="flex-shrink-0 group flex items-center gap-3"
        >
          <motion.img
            src="/assets/generated/ganesha-logo-transparent.dim_200x200.png"
            alt="Ganesha Logo"
            className="h-16 w-16 rounded-full object-cover"
            whileHover={{
              scale: 1.08,
              filter: "drop-shadow(0 0 16px rgba(201,149,110,0.8))",
            }}
            transition={{ duration: 0.3 }}
          />
          <span className="font-serif text-2xl" style={{ color: "#c9956e" }}>
            Luxuries Perfume
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid="nav.link"
              className={`nav-link-underline font-sans-body text-xs tracking-[0.2em] font-medium transition-colors duration-200 ${
                isActive(link.to)
                  ? "text-rose-gold active"
                  : "text-foreground hover:text-rose-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-foreground hover:text-rose-gold transition-colors"
            aria-label="Open cart"
            data-ocid="cart.open_modal_button"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-gold text-white text-[10px] flex items-center justify-center font-sans-body font-bold"
              >
                {totalItems > 9 ? "9+" : totalItems}
              </motion.span>
            )}
          </button>

          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-t border-border py-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                onClick={() => setMobileOpen(false)}
                className={`block px-8 py-3 text-xs tracking-[0.2em] font-medium font-sans-body ${
                  isActive(link.to) ? "text-rose-gold" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
