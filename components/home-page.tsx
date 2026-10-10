"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle2, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { fetchProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/skeleton";

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchProducts().then(setProducts).catch(() => toast.error("দামের তথ্য লোড করা যায়নি")).finally(() => setLoading(false)); }, []);
  const risers = useMemo(() => [...products].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6), [products]);
  const fallers = useMemo(() => [...products].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6), [products]);
  return <div>
    <section className="hero"><div className="container hero-inner"><div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> ঢাকার বাজার, আজকের দর</span><h1>বাজারের দামে<br /><em>স্বচ্ছতা</em> থাকুক।</h1><p>চাল, ডাল, তেল, সবজি, মাছ, মাংস ও মসলার আজকের দাম জানুন এক জায়গায়।</p><div className="hero-actions"><a className="primary-button focus-ring" href="#সব-পণ্য">সব পণ্যের দাম দেখুন <ArrowRight size={17} /></a><span className="hero-note"><CheckCircle2 size={15} /> প্রতিদিন আপডেট হয়</span></div></div><div className="hero-art"><div className="hero-art-glow" /><img src="/bazar-hero.png" alt="তাজা বাজারের ঝুড়ি" /><div className="hero-stat"><span>আজকের গড়</span><strong>+২.৪%</strong><small>গতকালের তুলনায়</small></div></div></div></section>
    <section className="trust-strip"><div className="container trust-inner"><span>আজকের বাজারদর, সহজে</span><div><b>১২+</b><small>পণ্য ট্র্যাক হচ্ছে</small></div><div><b>৭</b><small>বিভাগ</small></div><div><b>৪</b><small>বাজার থেকে তথ্য</small></div></div></section>
    <div className="container page-space">
      <section className="section-space"><div className="section-heading"><div><span className="section-kicker up-kicker"><ArrowUp size={15} /> দামের পরিবর্তন</span><h2>আজ দাম বেড়েছে <span>▲</span></h2><p>যে পণ্যগুলোর দামে আজ ঊর্ধ্বগতি দেখা যাচ্ছে।</p></div><Link className="subtle-link" href="/category/sobji">সব দেখুন <ChevronRight size={16} /></Link></div>{loading ? <ProductGridSkeleton count={3} /> : <div className="product-grid">{risers.map((product) => <ProductCard key={product.id} product={product} />)}</div>}</section>
      <section className="section-space"><div className="section-heading"><div><span className="section-kicker down-kicker"><ArrowDown size={15} /> দামের পরিবর্তন</span><h2>আজ দাম কমেছে <span>▼</span></h2><p>দাম কমায় আজ আপনার বাজার আরও সাশ্রয়ী।</p></div><Link className="subtle-link" href="/category/chal">সব দেখুন <ChevronRight size={16} /></Link></div>{loading ? <ProductGridSkeleton count={3} /> : <div className="product-grid">{fallers.map((product) => <ProductCard key={product.id} product={product} />)}</div>}</section>
      <section className="section-space" id="সব-পণ্য"><div className="section-heading all-products-heading"><div><span className="section-kicker">বাজারদরের তালিকা</span><h2>সব পণ্য</h2><p>প্রয়োজনীয় পণ্যের বর্তমান গড় দাম ও পরিবর্তন এক নজরে।</p></div><Link className="outline-button focus-ring" href="/category/sobji">বিভাগ বেছে নিন <ChevronRight size={16} /></Link></div>{loading ? <ProductGridSkeleton count={6} /> : <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>}</section>
    </div>
  </div>;
}
