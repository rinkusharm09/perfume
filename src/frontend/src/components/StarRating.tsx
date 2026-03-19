import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: 14, md: 18, lg: 24 };

export default function StarRating({
  rating,
  interactive = false,
  onRate,
  size = "md",
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const px = sizeMap[size];
  const display = interactive && hovered > 0 ? hovered : rating;

  return (
    <div
      className="flex items-center gap-0.5"
      onMouseLeave={() => interactive && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = display >= star;
        const half = !filled && display >= star - 0.5;
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate?.(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            className={`transition-transform duration-150 ${
              interactive
                ? "cursor-pointer hover:scale-110 focus:outline-none"
                : "cursor-default"
            }`}
            aria-label={`${star} star`}
          >
            <Star
              size={px}
              className={`transition-colors duration-150 ${
                filled || half
                  ? "fill-rose-gold text-rose-gold"
                  : "fill-transparent text-muted-foreground/40"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
