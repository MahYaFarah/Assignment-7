export type PricePoint = {
  bazar: string;
  price: number;
  updatedAt: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  emoji: string;
  category: string;
  categoryLabel: string;
  unit: string;
  price: number;
  minPrice: number;
  maxPrice: number;
  change: number;
  description: string;
  bazars: PricePoint[];
};

export type Category = { slug: string; name: string; icon: string; count?: number };
