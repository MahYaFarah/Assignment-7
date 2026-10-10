import type { Category, Product } from "@/lib/types";

export const API_BASE = "https://openapi.programming-hero.com/api/bazardor";
export const API_FALLBACKS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

export const categories: Category[] = [
  { slug: "chal", name: "চাল", icon: "🍚" },
  { slug: "dal", name: "ডাল", icon: "🫘" },
  { slug: "tel", name: "তেল", icon: "🫙" },
  { slug: "sobji", name: "সবজি", icon: "🥔" },
  { slug: "mach", name: "মাছ", icon: "🐟" },
  { slug: "mangsho", name: "মাংস", icon: "🍗" },
  { slug: "moshla", name: "মসলা", icon: "🌶️" },
];

const bazars = (base: number): Product["bazars"] => [
  { bazar: "কারওয়ান বাজার", price: Math.round(base * 0.98), updatedAt: "আজ, ৯:৩০" },
  { bazar: "মোহাম্মদপুর কৃষি মার্কেট", price: base, updatedAt: "আজ, ১০:১৫" },
  { bazar: "নিউ মার্কেট", price: Math.round(base * 1.04), updatedAt: "আজ, ১১:০০" },
  { bazar: "মিরপুর বাজার", price: Math.round(base * 1.02), updatedAt: "আজ, ১১:৪৫" },
];

export const fallbackProducts: Product[] = [
  { id: "1", slug: "miniket-chal", name: "মিনিকেট চাল", englishName: "Miniket Rice", emoji: "🍚", category: "chal", categoryLabel: "চাল", unit: "প্রতি কেজি", price: 86, minPrice: 82, maxPrice: 92, change: 2.1, description: "নিত্যদিনের রান্নার জন্য জনপ্রিয় মাঝারি দানার চাল।", bazars: bazars(86) },
  { id: "2", slug: "nazirshail-chal", name: "নাজিরশাইল চাল", englishName: "Nazirshail Rice", emoji: "🍚", category: "chal", categoryLabel: "চাল", unit: "প্রতি কেজি", price: 98, minPrice: 92, maxPrice: 105, change: 1.4, description: "সুগন্ধি ও ঝরঝরে ভাতের জন্য পরিচিত চাল।", bazars: bazars(98) },
  { id: "3", slug: "mosur-dal", name: "মসুর ডাল", englishName: "Red Lentil", emoji: "🫘", category: "dal", categoryLabel: "ডাল", unit: "প্রতি কেজি", price: 138, minPrice: 132, maxPrice: 145, change: -2.9, description: "প্রতিদিনের পুষ্টিকর রান্নার অপরিহার্য ডাল।", bazars: bazars(138) },
  { id: "4", slug: "soybean-oil", name: "সয়াবিন তেল", englishName: "Soybean Oil", emoji: "🫙", category: "tel", categoryLabel: "তেল", unit: "প্রতি লিটার", price: 178, minPrice: 172, maxPrice: 185, change: -0.8, description: "পরিবারের রান্নায় ব্যবহৃত পরিশোধিত সয়াবিন তেল।", bazars: bazars(178) },
  { id: "5", slug: "alu", name: "আলু", englishName: "Potato", emoji: "🥔", category: "sobji", categoryLabel: "সবজি", unit: "প্রতি কেজি", price: 38, minPrice: 35, maxPrice: 42, change: -3.6, description: "দেশি আলু, ভাজি ও তরকারির জন্য প্রতিদিনের পছন্দ।", bazars: bazars(38) },
  { id: "6", slug: "peyaj", name: "পেঁয়াজ", englishName: "Onion", emoji: "🧅", category: "sobji", categoryLabel: "সবজি", unit: "প্রতি কেজি", price: 82, minPrice: 78, maxPrice: 90, change: 4.8, description: "রান্নার স্বাদ বাড়াতে দেশি পেঁয়াজের দর।", bazars: bazars(82) },
  { id: "7", slug: "morich", name: "কাঁচা মরিচ", englishName: "Green Chilli", emoji: "🌶️", category: "sobji", categoryLabel: "সবজি", unit: "প্রতি কেজি", price: 140, minPrice: 125, maxPrice: 155, change: 5.3, description: "ঝাল আর ঘ্রাণের জন্য তাজা কাঁচা মরিচ।", bazars: bazars(140) },
  { id: "8", slug: "ilish", name: "ইলিশ মাছ", englishName: "Hilsa Fish", emoji: "🐟", category: "mach", categoryLabel: "মাছ", unit: "প্রতি কেজি", price: 1580, minPrice: 1450, maxPrice: 1750, change: 3.9, description: "নদীর রুপালি ইলিশ, ওজনভেদে বাজারদর পরিবর্তনশীল।", bazars: bazars(1580) },
  { id: "9", slug: "broiler", name: "ব্রয়লার মুরগি", englishName: "Broiler Chicken", emoji: "🍗", category: "mangsho", categoryLabel: "মাংস", unit: "প্রতি কেজি", price: 198, minPrice: 190, maxPrice: 210, change: -1.6, description: "তাজা ব্রয়লার মুরগির গড় বাজারদর।", bazars: bazars(198) },
  { id: "10", slug: "dim", name: "ডিম", englishName: "Egg", emoji: "🥚", category: "mangsho", categoryLabel: "মাংস", unit: "প্রতি ডজন", price: 148, minPrice: 140, maxPrice: 155, change: 1.1, description: "খামারের ডিম, প্রতি ডজনের আজকের দর।", bazars: bazars(148) },
  { id: "11", slug: "ada", name: "আদা", englishName: "Ginger", emoji: "🫚", category: "moshla", categoryLabel: "মসলা", unit: "প্রতি কেজি", price: 280, minPrice: 260, maxPrice: 300, change: 2.6, description: "তাজা আদা, রান্না ও চায়ের জন্য দরকারি মসলা।", bazars: bazars(280) },
  { id: "12", slug: "roshun", name: "রসুন", englishName: "Garlic", emoji: "🧄", category: "moshla", categoryLabel: "মসলা", unit: "প্রতি কেজি", price: 240, minPrice: 225, maxPrice: 265, change: -1.3, description: "দেশি রসুনের গড় খুচরা বাজারদর।", bazars: bazars(240) },
];

const normalizeDigits = (value: unknown) => {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return 0;
  const digitMap: Record<string, string> = { "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9" };
  return Number(value.replace(/[০-৯]/g, (d) => digitMap[d] ?? d).replace(/[^\d.-]/g, "")) || 0;
};

export const toBengaliDigits = (value: number | string) => String(value).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
export const formatTaka = (value: number) => `${toBengaliDigits(Math.round(value).toLocaleString("en-US"))} টাকা`;
export const numericPrice = (product: Product) => normalizeDigits(product.price);

export const findProduct = (slug: string) => fallbackProducts.find((item) => item.slug === slug || item.id === slug);

function normalizeProduct(raw: any, index: number): Product {
  const fallback = fallbackProducts[index % fallbackProducts.length];
  const markets = Array.isArray(raw.markets) ? raw.markets : [];
  const rawChange = typeof raw.change === "object" ? raw.change?.pct : raw.change;
  const price = normalizeDigits(raw.today ?? raw.price ?? raw.current_price ?? raw.today_price ?? raw.average_price) || fallback.price;
  const marketPrices = markets.flatMap((market: any) => [normalizeDigits(market.min), normalizeDigits(market.max)]).filter(Boolean);
  const minPrice = normalizeDigits(raw.min_price ?? raw.minimum_price) || (marketPrices.length ? Math.min(...marketPrices) : Math.round(price * 0.95));
  const maxPrice = normalizeDigits(raw.max_price ?? raw.maximum_price) || (marketPrices.length ? Math.max(...marketPrices) : Math.round(price * 1.05));
  const unitLabels: Record<string, string> = { kg: "প্রতি কেজি", kilogram: "প্রতি কেজি", liter: "প্রতি লিটার", litre: "প্রতি লিটার", dozen: "প্রতি ডজন", piece: "প্রতি পিস", pcs: "প্রতি পিস" };
  return {
    ...fallback,
    id: String(raw.id ?? fallback.id),
    slug: String(raw.slug ?? raw.id ?? fallback.slug),
    name: raw.nameBn ?? raw.name ?? raw.title ?? fallback.name,
    englishName: raw.englishName ?? raw.name_en ?? fallback.englishName,
    emoji: raw.image ?? raw.emoji ?? raw.icon ?? raw.categoryIcon ?? fallback.emoji,
    category: raw.category?.slug ?? raw.category ?? fallback.category,
    categoryLabel: raw.categoryNameBn ?? raw.category?.name ?? raw.category_name ?? fallback.categoryLabel,
    unit: unitLabels[String(raw.unit ?? "").toLowerCase()] ?? raw.unit_name ?? fallback.unit,
    price,
    minPrice,
    maxPrice,
    change: Number(rawChange ?? fallback.change) || 0,
    description: raw.description ?? raw.summary ?? fallback.description,
    bazars: Array.isArray(raw.bazars) ? raw.bazars : markets.length ? markets.map((market: any) => ({ bazar: market.market ?? "", price: Math.round((normalizeDigits(market.min) + normalizeDigits(market.max)) / 2), updatedAt: market.division ?? "আজ" })) : bazars(price),
  };
}

export async function fetchProducts(category?: string): Promise<Product[]> {
  const bases = [API_BASE, ...API_FALLBACKS];
  const urls = bases.map((base) => category ? `${base}/products?category=${encodeURIComponent(category)}` : `${base}/products`);
  for (const url of urls) {
    try {
      const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(3500) });
      if (!response.ok) continue;
      const json = await response.json();
      const records = Array.isArray(json) ? json : json.products ?? json.data ?? [];
      if (records.length) return records.map(normalizeProduct);
    } catch { /* use fallback data */ }
  }
  return category ? fallbackProducts.filter((item) => item.category === category) : fallbackProducts;
}

export async function fetchCategories(): Promise<Category[]> {
  for (const base of [API_BASE, ...API_FALLBACKS]) {
    try {
      const response = await fetch(`${base}/categories`, { cache: "no-store", signal: AbortSignal.timeout(3500) });
      if (!response.ok) continue;
      const json = await response.json();
      const records = Array.isArray(json) ? json : json.categories ?? json.data ?? [];
      if (records.length) return records.map((raw: any) => ({ slug: String(raw.slug ?? raw.id), name: raw.nameBn ?? raw.name ?? String(raw.slug ?? raw.id), icon: raw.icon ?? raw.categoryIcon ?? "🛒", count: raw.count }));
    } catch { /* use the local category list */ }
  }
  return categories;
}

export async function fetchProduct(identifier: string): Promise<Product | undefined> {
  const encoded = encodeURIComponent(identifier);
  for (const base of [API_BASE, ...API_FALLBACKS]) {
    try {
      const response = await fetch(`${base}/products/${encoded}`, { cache: "no-store", signal: AbortSignal.timeout(3500) });
      if (!response.ok) continue;
      const json = await response.json();
      const raw = Array.isArray(json) ? json[0] : json.product ?? json.data ?? json;
      if (raw && !Array.isArray(raw)) return normalizeProduct(raw, 0);
    } catch { /* try the next documented API */ }
  }
  const products = await fetchProducts();
  return products.find((item) => item.slug === identifier || item.id === identifier);
}
