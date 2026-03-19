import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useActor } from "@/hooks/useActor";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CreditCard,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function parseINRtoPaise(priceStr: string): bigint {
  const num = Number(priceStr.replace(/[^0-9]/g, ""));
  return BigInt(num * 100);
}

export default function Checkout() {
  const { items, totalPrice } = useCart();
  const { actor } = useActor();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    if (!actor || items.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const shoppingItems = items.map((item) => ({
        productName: item.product.name,
        currency: "inr",
        quantity: BigInt(item.quantity),
        priceInCents: parseINRtoPaise(item.product.price),
        productDescription: item.product.description,
      }));
      const successUrl = `${window.location.origin}/#/order-confirmation?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/#/collection`;
      const checkoutUrl = await actor.createCheckoutSession(
        shoppingItems,
        successUrl,
        cancelUrl,
      );
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      setError(
        "Payment system is being configured. Please contact us to complete your order.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <button
            type="button"
            onClick={() => navigate({ to: "/collection" })}
            className="flex items-center gap-2 text-xs tracking-widest uppercase font-sans-body text-muted-foreground hover:text-rose-gold transition-colors mb-8"
            data-ocid="checkout.link"
          >
            <ArrowLeft size={14} />
            Back to Collection
          </button>

          <h1 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-foreground mb-2">
            Order Summary
          </h1>
          <p className="text-sm text-muted-foreground font-sans-body mb-10 tracking-wide">
            Review your selection before completing your purchase.
          </p>

          {items.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-24 text-center"
              data-ocid="checkout.empty_state"
            >
              <ShoppingBag
                size={48}
                className="text-muted-foreground/30 mb-4"
              />
              <p className="font-serif text-lg text-muted-foreground font-light mb-4">
                Your cart is empty
              </p>
              <Button
                onClick={() => navigate({ to: "/collection" })}
                className="bg-rose-gold hover:bg-rose-gold/90 text-white font-sans-body text-xs tracking-widest uppercase rounded-sm"
                data-ocid="checkout.primary_button"
              >
                Explore Collection
              </Button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-sm overflow-hidden">
              {/* Items list */}
              <div className="divide-y divide-border">
                {items.map((item, idx) => {
                  const unitPrice = Number(
                    item.product.price.replace(/[^0-9]/g, ""),
                  );
                  const lineTotal = unitPrice * item.quantity;
                  return (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4 p-5"
                      data-ocid={`checkout.item.${idx + 1}`}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-20 object-cover rounded-sm bg-secondary flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-base font-semibold text-foreground">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground font-sans-body mt-0.5">
                          {item.product.notes}
                        </p>
                        <p className="text-xs text-muted-foreground font-sans-body mt-1">
                          Qty: {item.quantity} × {item.product.price}
                        </p>
                      </div>
                      <span className="font-serif text-base text-rose-gold font-medium whitespace-nowrap">
                        ₹{lineTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="px-5 py-4 bg-secondary/30 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="font-sans-body text-xs tracking-widest uppercase text-muted-foreground">
                    Total
                  </span>
                  <span className="font-serif text-2xl text-foreground font-medium">
                    {totalPrice}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-sans-body mt-1">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-start gap-3 p-4 bg-destructive/5 border-t border-destructive/20"
                  data-ocid="checkout.error_state"
                >
                  <AlertCircle
                    size={16}
                    className="text-destructive mt-0.5 flex-shrink-0"
                  />
                  <p className="text-sm text-destructive font-sans-body">
                    {error}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="p-5 border-t border-border space-y-3">
                <Button
                  onClick={handlePay}
                  disabled={loading}
                  className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white font-sans-body text-xs tracking-[0.15em] uppercase h-12 rounded-sm"
                  data-ocid="checkout.submit_button"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={14} className="mr-2" />
                      Pay Now — {totalPrice}
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground font-sans-body">
                  🔒 Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
