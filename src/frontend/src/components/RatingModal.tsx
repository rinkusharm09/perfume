import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import StarRating from "./StarRating";

interface RatingModalProps {
  productId: string;
  productName: string;
  trigger: React.ReactNode;
  onRated?: () => void;
}

export default function RatingModal({
  productId,
  productName,
  trigger,
  onRated,
}: RatingModalProps) {
  const { actor } = useActor();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a star rating.");
      return;
    }
    if (!actor) {
      toast.error("Not connected. Please try again.");
      return;
    }
    setLoading(true);
    try {
      await actor.rateProduct(productId, BigInt(rating), review);
      toast.success("Thank you for your review!", {
        description: `You rated ${productName} ${rating} star${rating !== 1 ? "s" : ""}.`,
      });
      setOpen(false);
      setRating(0);
      setReview("");
      onRated?.();
    } catch {
      toast.error("Could not submit rating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild data-ocid="rating.open_modal_button">
        {trigger}
      </DialogTrigger>
      <DialogContent
        className="max-w-md bg-card border-border"
        data-ocid="rating.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-xl font-light tracking-wide text-foreground">
            Rate {productName}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground font-sans-body">
              How would you rate this fragrance?
            </p>
            <StarRating
              rating={rating}
              interactive
              onRate={setRating}
              size="lg"
            />
            {rating > 0 && (
              <p className="text-xs text-rose-gold font-sans-body font-medium">
                {["Poor", "Fair", "Good", "Very Good", "Excellent"][rating - 1]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="review"
              className="text-xs tracking-widest uppercase font-sans-body text-muted-foreground"
            >
              Your Review <span className="normal-case">(optional)</span>
            </label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your thoughts about this fragrance..."
              className="resize-none h-28 font-sans-body text-sm border-border focus:ring-rose-gold"
              data-ocid="rating.textarea"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="font-sans-body text-xs tracking-widest uppercase rounded-sm"
            data-ocid="rating.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading || rating === 0}
            className="bg-rose-gold hover:bg-rose-gold/90 text-white font-sans-body text-xs tracking-widest uppercase rounded-sm"
            data-ocid="rating.submit_button"
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin mr-2" />
            ) : (
              <Star size={14} className="mr-2" />
            )}
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
