"use client";

import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { findProduct, formatTaka, fetchProducts, toBengaliDigits } from "@/lib/data";
import { getStoredUser, type LocalUser } from "@/lib/auth";
import type { Product } from "@/lib/types";
import { ProductGridSkeleton } from "@/components/skeleton";

export function ProductDetailPage({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | undefined>(() => findProduct(slug));
  const [user, setUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { const stored = getStoredUser(); setUser(stored); if (!stored) { toast("পণ্যের বিস্তারিত দেখতে সাইন ইন করুন"); return; } fetchProducts().then((items) => setProduct(items.find((item) => item.slug === slug || item.id === slug) ?? findProduct(slug))).finally(() => setLoading(false)); }, [slug]);
  if (!user) return <div className="container"><div className="empty-state surface-card"><div className="empty-icon"><LockKeyhole size={42} /></div><h2>সাইন ইন প্রয়োজন</h2><p>বাজারভিত্তিক বিস্তারিত দাম দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।</p><Link className="primary-button focus-ring" href={`/signin?next=/product/${slug}`}>সাইন ইন করুন</Link></div></div>;
  if (loading) return <div className="container page-space"><ProductGridSkeleton count={1} /></div>;
  if (!product) return <div className="container"><div className="empty-state surface-card"><div className="empty-icon">🧺</div><h2>পণ্যটি খুঁজে পাওয়া যায়নি</h2><p>এই পণ্যের বাজারদর এখনো যোগ করা হয়নি।</p><Link className="primary-button" href="/">হোম পেজে ফিরে যান</Link></div></div>;
  const average = Math.round((product.minPrice + product.maxPrice + product.price) / 3);
  return <div className="container page-space"><Link className="back-link subtle-link" href="/"><ArrowLeft size={16} /> সব পণ্যে ফিরে যান</Link><div className="detail-layout" style={{ marginTop: 18 }}><section className="detail-summary surface-card"><div className="detail-title"><span className="product-emoji" aria-hidden="true">{product.emoji}</span><div><div className="section-kicker">{product.englishName}</div><h1>{product.name}</h1><p>{product.unit}</p></div></div><div className="tags"><span className="tag">{product.categoryLabel}</span><span className="tag">আজকের বাজারদর</span></div><p className="detail-description">{product.description}</p><div className="price-summary"><div className="metric"><span>সর্বনিম্ন দাম</span><strong>{formatTaka(product.minPrice)}</strong></div><div className="metric"><span>সর্বোচ্চ দাম</span><strong>{formatTaka(product.maxPrice)}</strong></div><div className="metric average"><span>গড় দাম</span><strong>{formatTaka(average)}</strong></div></div></section><section className="market-card surface-card"><h2>বাজারভিত্তিক আজকের দাম</h2><p>বিভিন্ন বাজার থেকে সংগৃহীত সর্বশেষ তথ্য।</p><div className="market-list">{product.bazars.map((item) => <div className="market-row" key={item.bazar}><div><strong>{item.bazar}</strong><small>আপডেট: {item.updatedAt}</small></div><span className="market-price">{toBengaliDigits(item.price.toLocaleString("en-US"))} টাকা</span></div>)}</div></section></div></div>;
}
