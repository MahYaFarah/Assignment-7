"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { categories, fetchProducts, formatTaka } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/skeleton";

export function CategoryPage({ slug }: { slug: string }) {
  const category = categories.find((item) => item.slug === slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");
  useEffect(() => { if (!category) { setLoading(false); return; } fetchProducts(slug).then(setProducts).catch(() => toast.error("দামের তথ্য লোড করা যায়নি")).finally(() => setLoading(false)); }, [category, slug]);
  const sortedProducts = useMemo(() => [...products].sort((a, b) => sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : 0), [products, sort]);
  if (!category) return <div className="container"><EmptyState title="বিভাগটি খুঁজে পাওয়া যায়নি" description="এই বিভাগে কোনো পণ্য নেই বা লিংকটি সঠিক নয়।" /></div>;
  return <div><section className="route-header"><div className="container"><div className="crumbs"><Link href="/">হোম</Link> <span> / </span> {category.name}</div><h1>{category.icon} {category.name}</h1><p>{category.name} বিভাগের আজকের সব বাজারদর এক জায়গায়।</p></div></section><div className="container page-space"><div className="category-toolbar"><span className="muted">{loading ? "দাম লোড হচ্ছে…" : `${products.length}টি পণ্য`}</span><label className="sort-control"><span>সাজান:</span><span className="sort-select-wrap"><select aria-label="পণ্য সাজান" value={sort} onChange={(event) => setSort(event.target.value)}><option value="default">ডিফল্ট</option><option value="asc">দাম: কম থেকে বেশি</option><option value="desc">দাম: বেশি থেকে কম</option></select><ChevronDown size={15} /></span></label></div>{loading ? <ProductGridSkeleton count={6} /> : sortedProducts.length ? <div className="product-grid">{sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState title="এই বিভাগে পণ্য নেই" description="অন্য একটি বিভাগ থেকে আজকের বাজারদর দেখুন।" />}</div></div>;
}

function EmptyState({ title, description }: { title: string; description: string }) { return <div className="empty-state surface-card"><div className="empty-icon">🧺</div><h2>{title}</h2><p>{description}</p><Link className="primary-button focus-ring" href="/"><ArrowLeft size={16} /> হোম পেজে ফিরে যান</Link></div>; }
