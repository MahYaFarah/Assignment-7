"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { setStoredUser } from "@/lib/auth";

export function AuthPage({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [busy, setBusy] = useState(false);
  const signIn = (event: FormEvent) => { event.preventDefault(); if (!email || !password) { toast.error("ইমেইল ও পাসওয়ার্ড দিন"); return; } setBusy(true); window.setTimeout(() => { setStoredUser({ name: email.split("@")[0] || "ব্যবহারকারী", email }); toast.success("সফলভাবে সাইন ইন হয়েছে"); router.push(searchParams.get("next") || "/"); }, 450); };
  const signUp = (event: FormEvent) => { event.preventDefault(); if (!name || !email || password.length < 6) { toast.error("নাম, সঠিক ইমেইল ও কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন"); return; } setBusy(true); window.setTimeout(() => { toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন"); router.push("/signin"); }, 450); };
  const social = () => { setStoredUser({ name: "BazarDor ব্যবহারকারী", email: "social@bazardor.app", provider: "Google" }); toast.success("Google দিয়ে সাইন ইন হয়েছে"); router.push("/"); };
  const isSignIn = mode === "signin";
  return <div className="auth-shell container"><section className="auth-card surface-card"><div className="auth-brand"><span className="brand-mark">🛒</span><div className="section-kicker" style={{ justifyContent: "center", marginTop: 10 }}>বাজার দর</div></div><h1>{isSignIn ? "আবার স্বাগতম" : "অ্যাকাউন্ট তৈরি করুন"}</h1><p>{isSignIn ? "আপনার সেভ করা বাজারদর ও বিস্তারিত দেখুন।" : "বাজারদর দেখতে কয়েক সেকেন্ডেই যোগ দিন।"}</p><form onSubmit={isSignIn ? signIn : signUp}>{!isSignIn && <div className="form-field"><label htmlFor="name">আপনার নাম</label><input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="যেমন: মাহমুদা" /></div>}<div className="form-field"><label htmlFor="email">ইমেইল</label><input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div><div className="form-field"><label htmlFor="password">পাসওয়ার্ড</label><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="কমপক্ষে ৬ অক্ষর" /></div><button className="primary-button form-submit focus-ring" disabled={busy}>{busy ? "অপেক্ষা করুন…" : isSignIn ? "সাইন ইন করুন" : "সাইন আপ করুন"}</button></form><div className="divider">অথবা</div><button className="social-button focus-ring" onClick={social}>G&nbsp;&nbsp; Google দিয়ে চালিয়ে যান</button><p className="auth-switch">{isSignIn ? "অ্যাকাউন্ট নেই?" : "আগেই অ্যাকাউন্ট আছে?"} <Link href={isSignIn ? "/signup" : "/signin"}>{isSignIn ? "সাইন আপ করুন" : "সাইন ইন করুন"}</Link></p></section></div>;
}
