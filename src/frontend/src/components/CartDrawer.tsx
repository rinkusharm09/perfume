import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate({ to: "/checkout" });
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="w-full sm:w-[420px] flex flex-col p-0"
        data-ocid="cart.sheet"
      >
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-serif text-xl font-light tracking-wide flex items-center gap-2">
            <ShoppingBag size={18} className="text-rose-gold" />
            Your Cart
            {totalItems > 0 && (
              <span className="ml-auto text-sm text-muted-foreground font-sans-body font-normal">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <AnimatePresence>
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 text-center"
                data-ocid="cart.empty_state"
              >
                <ShoppingBag
                  size={48}
                  className="text-muted-foreground/30 mb-4"
                />
                <p className="font-serif text-lg text-muted-foreground font-light">
                  Your cart is empty
                </p>
                <p className="text-sm text-muted-foreground font-sans-body mt-1">
                  Discover our collection and add your favourite fragrances.
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="flex gap-3 py-3 border-b border-border last:border-0"
                    data-ocid={`cart.item.${idx + 1}`}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded-sm bg-secondary flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm font-semibold text-foreground truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground font-sans-body mt-0.5">
                        {item.product.notes}
                      </p>
                      <p className="text-sm text-rose-gold font-serif font-medium mt-1">
                        {item.product.price}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-rose-gold transition-colors"
                          data-ocid={`cart.secondary_button.${idx + 1}`}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-sans-body w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:border-rose-gold transition-colors"
                          data-ocid={`cart.primary_button.${idx + 1}`}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-muted-foreground/50 hover:text-destructive transition-colors"
                          data-ocid={`cart.delete_button.${idx + 1}`}
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-border">
            <Separator className="mb-4" />
            <div className="flex items-center justify-between mb-5">
              <span className="font-sans-body text-sm text-muted-foreground tracking-wide uppercase text-xs">
                Subtotal
              </span>
              <span className="font-serif text-xl text-foreground font-medium">
                {totalPrice}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white font-sans-body text-xs tracking-[0.15em] uppercase h-12 rounded-sm"
              data-ocid="cart.submit_button"
            >
              Proceed to Checkout
            </Button>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="w-full text-center text-xs text-muted-foreground font-sans-body tracking-wider uppercase mt-3 hover:text-foreground transition-colors"
              data-ocid="cart.cancel_button"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
