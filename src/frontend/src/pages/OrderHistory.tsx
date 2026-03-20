import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ClipboardList,
  Loader2,
  Package,
  RotateCcw,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

interface ReturnRequest {
  returnId: string;
  orderId: string;
  itemNames: string[];
  reason: string;
  status: string;
  timestamp: number;
}

function getOrders(): StoredOrder[] {
  try {
    return JSON.parse(localStorage.getItem("lp_orders") || "[]");
  } catch {
    return [];
  }
}

function getReturns(): ReturnRequest[] {
  try {
    return JSON.parse(localStorage.getItem("lp_returns") || "[]");
  } catch {
    return [];
  }
}

function saveReturn(req: ReturnRequest) {
  const existing = getReturns();
  existing.unshift(req);
  localStorage.setItem("lp_returns", JSON.stringify(existing));
}

function statusBadgeStyle(status: string): string {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "shipped":
      return "bg-sky-50 text-sky-700 border-sky-200";
    case "delivered":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function returnStatusStyle(status: string): string {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "rejected":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<StoredOrder | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [returnReason, setReturnReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setOrders(getOrders());
    setReturns(getReturns());
  }, []);

  const openReturnDialog = (order: StoredOrder) => {
    setSelectedOrder(order);
    setSelectedItems([]);
    setReturnReason("");
    setReturnDialogOpen(true);
  };

  const toggleItem = (name: string) => {
    setSelectedItems((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const submitReturn = async () => {
    if (!selectedOrder) return;
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item to return.");
      return;
    }
    if (!returnReason.trim()) {
      toast.error("Please provide a reason for your return.");
      return;
    }
    setSubmitting(true);
    // Simulate async processing
    await new Promise((r) => setTimeout(r, 800));
    const returnId = `RT-${Date.now().toString(36).toUpperCase()}`;
    const req: ReturnRequest = {
      returnId,
      orderId: selectedOrder.orderId,
      itemNames: selectedItems,
      reason: returnReason.trim(),
      status: "pending",
      timestamp: Date.now(),
    };
    saveReturn(req);
    setReturns(getReturns());
    setSubmitting(false);
    setReturnDialogOpen(false);
    toast.success(`Return request ${returnId} submitted successfully.`);
  };

  const orderReturns = (orderId: string) =>
    returns.filter((r) => r.orderId === orderId);

  return (
    <main className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto">
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
            data-ocid="orders.link"
          >
            <ArrowLeft size={14} />
            Back to Collection
          </button>

          <div className="flex items-center gap-3 mb-2">
            <ClipboardList size={24} className="text-rose-gold" />
            <h1 className="font-serif text-3xl md:text-4xl font-light tracking-wide text-foreground">
              My Orders
            </h1>
          </div>
          <p className="text-sm text-muted-foreground font-sans-body mb-10 tracking-wide">
            Track your purchases and manage returns with ease.
          </p>

          {/* Orders List */}
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center py-28 text-center"
              data-ocid="orders.empty_state"
            >
              <div className="w-24 h-24 rounded-full bg-rose-gold/10 flex items-center justify-center mb-6">
                <Package size={40} className="text-rose-gold/60" />
              </div>
              <h2 className="font-serif text-2xl font-light text-foreground mb-3">
                No orders yet
              </h2>
              <p className="text-sm text-muted-foreground font-sans-body max-w-xs mb-8">
                Your order history will appear here after your first purchase.
              </p>
              <Button
                onClick={() => navigate({ to: "/collection" })}
                className="bg-rose-gold hover:bg-rose-gold/90 text-white font-sans-body text-xs tracking-widest uppercase rounded-sm px-8 h-11"
                data-ocid="orders.primary_button"
              >
                Explore Collection
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-5" data-ocid="orders.list">
              {orders.map((order, idx) => {
                const existingReturns = orderReturns(order.orderId);
                const hasReturn = existingReturns.length > 0;
                return (
                  <motion.div
                    key={order.orderId}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="bg-card border border-border rounded-sm overflow-hidden"
                    data-ocid={`orders.item.${idx + 1}`}
                  >
                    {/* Order Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-secondary/20 border-b border-border">
                      <div>
                        <p className="font-serif text-lg text-foreground">
                          {order.orderId}
                        </p>
                        <p className="text-xs text-muted-foreground font-sans-body mt-0.5">
                          Placed on {formatDate(order.timestamp)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-sm text-[10px] tracking-widest uppercase font-sans-body font-medium border ${statusBadgeStyle(
                            order.status,
                          )}`}
                        >
                          {order.status}
                        </span>
                        <span className="font-serif text-base text-rose-gold font-medium">
                          {order.totalAmount}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-border/60">
                      {order.items.map((item, iIdx) => (
                        <div
                          key={`${item.productName}-${iIdx}`}
                          className="flex items-center justify-between px-5 py-3"
                        >
                          <div>
                            <p className="font-serif text-sm text-foreground">
                              {item.productName}
                            </p>
                            <p className="text-xs text-muted-foreground font-sans-body">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="text-sm text-muted-foreground font-sans-body">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Return requests for this order */}
                    {hasReturn && (
                      <div className="px-5 py-3 bg-amber-50/50 border-t border-amber-100">
                        {existingReturns.map((ret) => (
                          <div
                            key={ret.returnId}
                            className="flex items-center justify-between gap-2 text-xs"
                          >
                            <span className="font-sans-body text-muted-foreground">
                              Return {ret.returnId} — {ret.itemNames.join(", ")}
                            </span>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] tracking-widest uppercase font-sans-body font-medium border ${returnStatusStyle(
                                ret.status,
                              )}`}
                            >
                              {ret.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end px-5 py-3 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReturnDialog(order)}
                        className="font-sans-body text-[10px] tracking-widest uppercase rounded-sm border-rose-gold/30 text-rose-gold hover:bg-rose-gold/5"
                        data-ocid="orders.open_modal_button"
                      >
                        <RotateCcw size={12} className="mr-1.5" />
                        Request Return
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Return Dialog */}
      <Dialog open={returnDialogOpen} onOpenChange={setReturnDialogOpen}>
        <DialogContent
          className="max-w-md bg-card border-border rounded-sm"
          data-ocid="orders.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-serif text-xl font-light text-foreground">
              Request a Return
            </DialogTitle>
            <DialogDescription className="font-sans-body text-sm text-muted-foreground">
              Select the items you'd like to return and provide a reason.
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4 py-2">
              {/* Order reference */}
              <p className="text-xs text-muted-foreground font-sans-body">
                Order:{" "}
                <span className="text-rose-gold font-medium">
                  {selectedOrder.orderId}
                </span>
              </p>

              <Separator />

              {/* Item checkboxes */}
              <div className="space-y-3">
                <p className="text-xs tracking-widest uppercase font-sans-body text-muted-foreground">
                  Select Items
                </p>
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={`${item.productName}-${idx}`}
                    className="flex items-center gap-3"
                    data-ocid={`orders.checkbox.${idx + 1}`}
                  >
                    <Checkbox
                      id={`item-${idx}`}
                      checked={selectedItems.includes(item.productName)}
                      onCheckedChange={() => toggleItem(item.productName)}
                      className="border-rose-gold/40 data-[state=checked]:bg-rose-gold data-[state=checked]:border-rose-gold"
                    />
                    <Label
                      htmlFor={`item-${idx}`}
                      className="font-serif text-sm text-foreground cursor-pointer"
                    >
                      {item.productName}{" "}
                      <span className="text-muted-foreground text-xs font-sans-body">
                        (×{item.quantity})
                      </span>
                    </Label>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Reason */}
              <div className="space-y-2">
                <Label
                  htmlFor="return-reason"
                  className="text-xs tracking-widest uppercase font-sans-body text-muted-foreground"
                >
                  Reason for Return
                </Label>
                <Textarea
                  id="return-reason"
                  placeholder="Please describe why you're returning this item..."
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  rows={3}
                  className="font-sans-body text-sm rounded-sm border-border focus:border-rose-gold/50 resize-none"
                  data-ocid="orders.textarea"
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setReturnDialogOpen(false)}
              className="font-sans-body text-xs tracking-widest uppercase rounded-sm"
              data-ocid="orders.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={submitReturn}
              disabled={submitting}
              className="bg-rose-gold hover:bg-rose-gold/90 text-white font-sans-body text-xs tracking-widest uppercase rounded-sm"
              data-ocid="orders.confirm_button"
            >
              {submitting ? (
                <>
                  <Loader2 size={12} className="animate-spin mr-1.5" />
                  Submitting...
                </>
              ) : (
                "Submit Return"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
