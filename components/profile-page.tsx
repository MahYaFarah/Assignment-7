"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function ProfilePage({ update = false }: { update?: boolean }) {
  const router = useRouter(); const { data: session, isPending } = authClient.useSession(); const user = session?.user; const [name, setName] = useState(""); const [busy, setBusy] = useState(false);
  useEffect(() => { if (user) setName(user.name); }, [user]);
  if (isPending) return <div className="loading-page"><div><div className="loading-spinner" /><p className="loading-label">লোড হচ্ছে…</p></div></div>;
  if (!user) return <div className="container page-space"><div className="empty-state surface-card"><div className="empty-icon">👤</div><h2>প্রোফাইলে যেতে সাইন ইন করুন</h2><p>আপনার তথ্য দেখতে ও আপডেট করতে সাইন ইন দরকার।</p><Link className="primary-button" href="/signin">সাইন ইন করুন</Link></div></div>;
  async function save() { if (!name.trim()) { toast.error("নাম লিখুন"); return; } setBusy(true); const { error } = await authClient.updateUser({ name: name.trim() }); setBusy(false); if (error) { toast.error(error.message || "তথ্য আপডেট ব্যর্থ হয়েছে"); return; } toast.success("তথ্য আপডেট হয়েছে"); router.push("/profile"); router.refresh(); }
  async function signOut() { await authClient.signOut(); toast.success("সফলভাবে সাইন আউট হয়েছে"); router.push("/"); router.refresh(); }
  if (update) return <div className="container page-space"><Link className="back-link subtle-link" href="/profile">← প্রোফাইলে ফিরে যান</Link><section className="profile-card surface-card" style={{ maxWidth: 620, margin: "18px auto 0" }}><span className="section-kicker">অ্যাকাউন্ট সেটিংস</span><h1 style={{ marginTop: 4 }}>তথ্য আপডেট করুন</h1><p className="muted">আপনার প্রোফাইলে দেখানো নামটি পরিবর্তন করুন।</p><div className="form-field"><label htmlFor="profile-name">নাম</label><input id="profile-name" value={name} onChange={(event) => setName(event.target.value)} /></div><button className="primary-button focus-ring" disabled={busy} onClick={save}>{busy ? "অপেক্ষা করুন…" : "তথ্য আপডেট করুন"}</button></section></div>;
  return <div className="container page-space"><div className="profile-grid"><section className="profile-card surface-card"><div className="profile-avatar">{user.name.slice(0, 1)}</div><h1>{user.name}</h1><p className="profile-email">{user.email}</p><div className="profile-actions"><Link className="primary-button" href="/profile/update">তথ্য আপডেট করুন</Link><button className="outline-button" onClick={signOut}>সাইন আউট</button></div></section><section className="profile-card surface-card"><h2>অ্যাকাউন্টের তথ্য</h2><div className="info-row"><span>নাম</span><strong>{user.name}</strong></div><div className="info-row"><span>ইমেইল</span><strong>{user.email}</strong></div><p className="muted" style={{ marginTop: 18, fontSize: 13 }}>আপনার পছন্দের পণ্য ও বাজারদরের বিস্তারিত দেখতে যেকোনো কার্ডে ক্লিক করুন।</p></section></div></div>;
}
