import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useActor } from "@/hooks/useActor";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type Status = "loading" | "success" | "failed" | "no-session";

interface StoredOrderItem {
  productName: string;
  quantity: number;
  price: string;
}

interface StoredOrder {
  orderId: string;
  sessionId: string;
  items: StoredOrderItem[];
  totalAmount: string;
  status: string;
  timestamp: number;
}

function saveOrderToLocalStorage(order: StoredOrder) {
  const existing: StoredOrder[] = JSON.parse(
    localStorage.getItem("lp_orders") || "[]",
  );
  existing.unshift(order);
  localStorage.setItem("lp_orders", JSON.stringify(existing));
}

export default function OrderConfirmation() {
  const { actor, isFetching } = useActor();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState("");
  const clearedRef = useRef(false);

  const verifySession = useCallback(async () => {
    const hash = window.location.hash;
    const queryStr = hash.includes("?") ? hash.split("?")[1] : "";
    const params = new URLSearchParams(queryStr);
    const sessionId = params.get("session_id");

    if (!sessionId) {
      setStatus("no-session");
      return;
    }

    if (!actor || isFetching) return;

    try {
      const result = await actor.getStripeSessionStatus(sessionId);
      if (result.__kind__ === "completed") {
        setStatus("success");
        setMessage(result.completed.response);
        if (!clearedRef.current) {
          // Save order to localStorage
          const pendingItemsRaw = sessionStorage.getItem("lp_pending_items");
          const pendingTotal = sessionStorage.getItem("lp_pending_total") || "";
          const pendingItems: StoredOrderItem[] = pendingItemsRaw
            ? JSON.parse(pendingItemsRaw)
            : [];
          const newOrderId = `LP-${Date.now().toString(36).toUpperCase()}`;
          setOrderId(newOrderId);
          saveOrderToLocalStorage({
            orderId: newOrderId,
            sessionId,
            items: pendingItems,
            totalAmount: pendingTotal,
            status: "confirmed",
            timestamp: Date.now(),
          });
          sessionStorage.removeItem("lp_pending_items");
          sessionStorage.removeItem("lp_pending_total");
          clearCart();
          clearedRef.current = true;
        }
      } else {
        setStatus("failed");
        setMessage(
          result.__kind__ === "failed" ? result.failed.error : "Unknown error",
        );
      }
    } catch {
      setStatus("failed");
      setMessage("Could not verify your order. Please contact support.");
    }
  }, [actor, isFetching, clearCart]);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-sm overflow-hidden"
          data-ocid="order.card"
        >
          {status === "loading" && (
            <div
              className="flex flex-col items-center justify-center py-24 px-8 text-center"
              data-ocid="order.loading_state"
            >
              <Loader2 size={40} className="text-rose-gold animate-spin mb-5" />
              <p className="font-serif text-xl font-light text-foreground">
                Verifying your order...
              </p>
              <p className="text-sm text-muted-foreground font-sans-body mt-2">
                Please wait while we confirm your payment.
              </p>
            </div>
          )}

          {status === "success" && (
            <div
              className="flex flex-col items-center py-16 px-8 text-center"
              data-ocid="order.success_state"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-rose-gold/10 flex items-center justify-center mb-6"
              >
                <CheckCircle2 size={40} className="text-rose-gold" />
              </motion.div>
              <h1 className="font-serif text-3xl font-light text-foreground mb-3">
                Order Confirmed
              </h1>
              <p className="text-sm text-muted-foreground font-sans-body leading-relaxed mb-2 max-w-sm">
                Thank you for your purchase. Your luxurious fragrances are being
                prepared with the utmost care.
              </p>
              {orderId && (
                <p className="text-xs text-muted-foreground font-sans-body mt-1">
                  Order ID:{" "}
                  <span className="text-rose-gold font-medium">{orderId}</span>
                </p>
              )}
              {message && (
                <p className="text-xs text-muted-foreground font-sans-body mt-1 mb-2">
                  {message}
                </p>
              )}

              <div className="flex items-center gap-3 my-6 w-full max-w-xs">
                <div className="flex-1 h-px bg-border" />
                <span className="text-rose-gold text-xs">✦</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <p className="text-xs text-muted-foreground font-sans-body mb-6">
                A confirmation email will be sent to you shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                <Button
                  onClick={() => navigate({ to: "/orders" })}
                  variant="outline"
                  className="font-sans-body text-xs tracking-widest uppercase rounded-sm border-rose-gold/40 text-rose-gold hover:bg-rose-gold/5 flex-1"
                  data-ocid="order.secondary_button"
                >
                  <ClipboardList size={14} className="mr-2" />
                  My Orders
                </Button>
                <Button
                  onClick={() => navigate({ to: "/collection" })}
                  className="bg-rose-gold hover:bg-rose-gold/90 text-white font-sans-body text-xs tracking-[0.15em] uppercase rounded-sm flex-1"
                  data-ocid="order.primary_button"
                >
                  <ShoppingBag size={14} className="mr-2" />
                  Shop More
                </Button>
              </div>
            </div>
          )}

          {(status === "failed" || status === "no-session") && (
            <div
              className="flex flex-col items-center py-16 px-8 text-center"
              data-ocid="order.error_state"
            >
              <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                <AlertCircle size={40} className="text-destructive" />
              </div>
              <h1 className="font-serif text-3xl font-light text-foreground mb-3">
                {status === "no-session" ? "No Order Found" : "Payment Failed"}
              </h1>
              <p className="text-sm text-muted-foreground font-sans-body leading-relaxed mb-6 max-w-sm">
                {status === "no-session"
                  ? "We couldn't find an order associated with this page."
                  : message ||
                    "Your payment could not be completed. Please try again or contact us."}
              </p>
              <div className="flex gap-3 flex-wrap justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate({ to: "/checkout" })}
                  className="font-sans-body text-xs tracking-widest uppercase rounded-sm"
                  data-ocid="order.secondary_button"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => navigate({ to: "/collection" })}
                  className="bg-rose-gold hover:bg-rose-gold/90 text-white font-sans-body text-xs tracking-widest uppercase rounded-sm"
                  data-ocid="order.primary_button"
                >
                  Back to Collection
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
