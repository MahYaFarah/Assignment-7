"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { clearStoredUser, getStoredUser, setStoredUser, type LocalUser } from "@/lib/auth";

export function ProfilePage({ update = false }: { update?: boolean }) {
  const router = useRouter(); const [user, setUser] = useState<LocalUser | null>(null); const [name, setName] = useState("");
  useEffect(() => { const stored = getStoredUser(); setUser(stored); setName(stored?.name ?? ""); }, []);
  if (!user) return <div className="container page-space"><div className="empty-state surface-card"><div className="empty-icon">👤</div><h2>প্রোফাইলে যেতে সাইন ইন করুন</h2><p>আপনার তথ্য দেখতে ও আপডেট করতে সাইন ইন দরকার।</p><Link className="primary-button" href="/signin">সাইন ইন করুন</Link></div></div>;
  const save = () => { if (!name.trim()) { toast.error("নাম লিখুন"); return; } const updated = { ...user, name: name.trim() }; setStoredUser(updated); setUser(updated); toast.success("তথ্য আপডেট হয়েছে"); router.push("/profile"); };
  if (update) return <div className="container page-space"><Link className="back-link subtle-link" href="/profile">← প্রোফাইলে ফিরে যান</Link><section className="profile-card surface-card" style={{ maxWidth: 620, margin: "18px auto 0" }}><span className="section-kicker">অ্যাকাউন্ট সেটিংস</span><h1 style={{ marginTop: 4 }}>তথ্য আপডেট করুন</h1><p className="muted">আপনার প্রোফাইলে দেখানো নামটি পরিবর্তন করুন।</p><div className="form-field"><label htmlFor="profile-name">নাম</label><input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} /></div><button className="primary-button focus-ring" onClick={save}>তথ্য আপডেট করুন</button></section></div>;
  const signOut = () => { clearStoredUser(); toast.success("সফলভাবে সাইন আউট হয়েছে"); router.push("/"); };
  return <div className="container page-space"><div className="profile-grid"><section className="profile-card surface-card"><div className="profile-avatar">{user.name.slice(0, 1)}</div><h1>{user.name}</h1><p className="profile-email">{user.email}</p><div className="profile-actions"><Link className="primary-button" href="/profile/update">তথ্য আপডেট করুন</Link><button className="outline-button" onClick={signOut}>সাইন আউট</button></div></section><section className="profile-card surface-card"><h2>অ্যাকাউন্টের তথ্য</h2><div className="info-row"><span>নাম</span><strong>{user.name}</strong></div><div className="info-row"><span>ইমেইল</span><strong>{user.email}</strong></div><div className="info-row"><span>সাইন ইন পদ্ধতি</span><strong>{user.provider ?? "ইমেইল ও পাসওয়ার্ড"}</strong></div><p className="muted" style={{ marginTop: 18, fontSize: 13 }}>আপনার পছন্দের পণ্য ও বাজারদরের বিস্তারিত দেখতে যেকোনো কার্ডে ক্লিক করুন।</p></section></div></div>;
}
