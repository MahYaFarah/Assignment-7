"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { categories, fallbackProducts, formatTaka } from "@/lib/data";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const pathname = usePathname(); const router = useRouter(); const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  async function signOut() { const { error } = await authClient.signOut(); if (error) toast.error("সাইন আউট ব্যর্থ হয়েছে"); else { toast.success("সফলভাবে সাইন আউট হয়েছে"); router.push("/"); router.refresh(); } }
  return <header className="site-header">
    <div className="container nav-top"><Link href="/" className="brand focus-ring" onClick={() => setOpen(false)}><span className="brand-mark">🛒</span><span><strong>বাজার দর</strong><small>{new Intl.DateTimeFormat("bn-BD", { dateStyle: "long" }).format(new Date())}</small></span></Link>
      <div className="nav-actions">{!isPending && (user ? <><Link className="profile-pill focus-ring" href="/profile"><span className="avatar">{user.name.slice(0, 1)}</span><span className="profile-name">{user.name}</span></Link><button className="icon-button focus-ring" aria-label="সাইন আউট" onClick={signOut}><LogOut size={18} /></button></> : <><Link className="text-button focus-ring" href="/signin">সাইন ইন</Link><Link className="primary-button compact focus-ring" href="/signup">সাইন আপ</Link></>)}<button className="mobile-menu focus-ring" aria-label="মেনু" onClick={() => setOpen((value) => !value)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
    </div>
    <div className={`container nav-bottom ${open ? "is-open" : ""}`}><nav className="category-nav" aria-label="পণ্যের বিভাগ"><Link className={pathname === "/" ? "active" : ""} href="/">হোম</Link>{categories.map((category) => <Link key={category.slug} className={pathname === `/category/${category.slug}` ? "active" : ""} href={`/category/${category.slug}`}>{category.name}</Link>)}{user && <Link className={pathname.startsWith("/profile") ? "active" : ""} href="/profile"><UserRound size={15} /> প্রোফাইল</Link>}</nav></div>
    <div className="ticker-wrap" aria-label="আজকের দামের পরিবর্তন"><div className="ticker-track">{[...fallbackProducts, ...fallbackProducts].map((product, index) => <span className="ticker-item" key={`${product.id}-${index}`}><span>{product.emoji}</span><strong>{product.name}</strong><span>{formatTaka(product.price)}</span><b className={product.change >= 0 ? "up" : "down"}>{product.change >= 0 ? "▲" : "▼"} {Math.abs(product.change).toFixed(1)}%</b></span>)}</div></div>
  </header>;
}
