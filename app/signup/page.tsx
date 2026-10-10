import { Suspense } from "react";
import { AuthPage } from "@/components/auth-page";

export default function Page() { return <Suspense fallback={<div className="loading-page"><div><div className="loading-spinner" /><p className="loading-label">লোড হচ্ছে…</p></div></div>}><AuthPage mode="signup" /></Suspense>; }
