export interface ProductData {
  id: string;
  name: string;
  description: string;
  notes: string;
  category: string;
  price: string;
  image: string;
}

export const STATIC_PRODUCTS: ProductData[] = [
  {
    id: "1",
    name: "Rose Lumiere",
    description:
      "A radiant bouquet of fresh roses kissed by morning light, evoking timeless femininity and grace.",
    notes: "Rose, Peony, Musk",
    category: "Floral",
    price: "₹799",
    image: "/assets/generated/rose-lumiere.dim_600x800.png",
  },
  {
    id: "2",
    name: "Velvet Blanc",
    description:
      "Pure white petals and soft powdery warmth — the scent of pristine elegance distilled into silk.",
    notes: "White Jasmine, Iris, Cashmere",
    category: "Floral White",
    price: "₹950",
    image: "/assets/generated/velvet-blanc.dim_600x800.png",
  },
  {
    id: "3",
    name: "Or Dore",
    description:
      "A golden symphony of warm spices and amber, rich as liquid sunlight pouring over ancient stone.",
    notes: "Amber, Oud, Saffron",
    category: "Oriental",
    price: "₹999",
    image: "/assets/generated/or-dore.dim_600x800.png",
  },
  {
    id: "4",
    name: "Jasmin Pur",
    description:
      "Hand-picked jasmine from the fields of Grasse, captured at its purest and most intoxicating moment.",
    notes: "Grand Jasmine, Bergamot, Vetiver",
    category: "Floral",
    price: "₹849",
    image: "/assets/generated/jasmin-pur.dim_600x800.png",
  },
  {
    id: "5",
    name: "Nuit Blanche",
    description:
      "A midnight reverie of celestial woods and cool air — mysterious, hypnotic, and deeply sensual.",
    notes: "Sandalwood, Night Iris, Dark Musk",
    category: "Woody",
    price: "₹899",
    image: "/assets/generated/nuit-blanche.dim_600x800.png",
  },
  {
    id: "6",
    name: "Satin Rose",
    description:
      "The tender blush of rose petals on skin — a delicate, intimate fragrance as soft as satin ribbons.",
    notes: "Damask Rose, Pink Pepper, Vanilla",
    category: "Floral",
    price: "₹749",
    image: "/assets/generated/satin-rose.dim_600x800.png",
  },
  {
    id: "7",
    name: "Lavande Noir",
    description:
      "A moody lavender embraced by dark woods and smoky vetiver — bold, mysterious, and utterly captivating.",
    notes: "Lavender, Vetiver, Black Musk",
    category: "Aromatic",
    price: "₹879",
    image: "/assets/generated/lavande-noir.dim_600x800.png",
  },
  {
    id: "8",
    name: "Aqua Celeste",
    description:
      "Crisp ocean breeze mingled with sea salt and driftwood — the freedom of open waters in every breath.",
    notes: "Sea Salt, Driftwood, White Tea",
    category: "Fresh",
    price: "₹829",
    image: "/assets/generated/aqua-celeste.dim_600x800.png",
  },
  {
    id: "9",
    name: "Soleil Doré",
    description:
      "Sun-warmed peach and apricot blossoms drizzled with golden honey — the sweetness of a summer afternoon.",
    notes: "Peach, Apricot, Honey, Tonka",
    category: "Fruity Floral",
    price: "₹769",
    image: "/assets/generated/soleil-dore.dim_600x800.png",
  },
  {
    id: "10",
    name: "Bois Sacré",
    description:
      "Ancient sacred woods, incense smoke, and dark resins — a meditative fragrance born from ritual and reverence.",
    notes: "Oud, Incense, Cedarwood, Benzoin",
    category: "Woody Oriental",
    price: "₹975",
    image: "/assets/generated/bois-sacre.dim_600x800.png",
  },
];
