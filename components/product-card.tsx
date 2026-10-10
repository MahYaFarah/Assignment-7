"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatTaka, toBengaliDigits } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  const positive = product.change > 0;
  const flat = product.change === 0;
  return <Link href={`/product/${product.slug}`} className="product-card surface-card focus-ring">
    <div className="product-card-top"><span className="product-emoji" aria-hidden="true">{product.emoji}</span><span className="category-chip">{product.categoryLabel}</span><ArrowUpRight className="card-arrow" size={18} /></div>
    <div className="product-card-copy"><h3>{product.name}</h3><span className="product-unit">{product.unit}</span></div>
    <div className="price-row"><div><span className="price-label">আজকের দাম</span><strong>{formatTaka(product.price)}</strong></div><span className={`change-badge ${flat ? "flat" : positive ? "positive" : "negative"}`}>{flat ? "—" : positive ? "▲" : "▼"} {toBengaliDigits(Math.abs(product.change).toFixed(1))}%</span></div>
  </Link>;
}
