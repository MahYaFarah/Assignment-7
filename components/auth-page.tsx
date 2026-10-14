"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type AuthError = { code?: string; message?: string; status?: number };

function readableAuthError(
  error: AuthError | null | undefined,
  mode: "signin" | "signup",
) {
  switch (error?.code) {
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট আছে। সাইন ইন করুন।";
    case "INVALID_EMAIL":
      return "সঠিক ইমেইল ঠিকানা দিন।";
    case "INVALID_PASSWORD":
      return "পাসওয়ার্ড সঠিক নয় বা কমপক্ষে ৬ অক্ষরের হতে হবে।";
    case "INVALID_EMAIL_OR_PASSWORD":
    case "UNAUTHORIZED":
      return "ইমেইল বা পাসওয়ার্ড সঠিক নয়।";
    case "DATABASE_ERROR":
    case "FAILED_TO_CREATE_USER":
    case "FAILED_TO_CREATE_SESSION":
    case "UNABLE_TO_CREATE_USER":
      return "সার্ভারের ডেটাবেসে সংযোগ হচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।";
    case "INVALID_ORIGIN":
      return "এই ডোমেইন থেকে নিরাপদভাবে সাইন ইন করা যাচ্ছে না। Vercel-এর auth URL যাচাই করুন।";
    default:
<<<<<<< HEAD
      return (
        error?.message ||
        (mode === "signin"
          ? "সাইন ইন ব্যর্থ হয়েছে।"
          : "অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে।")
      );
=======
      if (error?.status && error.status >= 500) return "সার্ভারের সঙ্গে সংযোগ হচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।";
      return error?.message || (mode === "signin" ? "সাইন ইন ব্যর্থ হয়েছে।" : "অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে।");
>>>>>>> 080b4bc4ff7f0578b2bb380269a5c4882ce477f4
  }
}

export function AuthPage({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const isSignIn = mode === "signin";
  const requestedNext = searchParams.get("next");
  const next =
    requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/";

  useEffect(() => {
    if (searchParams.has("next"))
      toast("পণ্যের বিস্তারিত দেখতে সাইন ইন করুন", {
        id: "protected-redirect",
      });
    if (searchParams.has("error"))
      toast.error("সোশ্যাল সাইন ইন ব্যর্থ হয়েছে", { id: "oauth-error" });
  }, [searchParams]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password || (!isSignIn && !name.trim())) {
      toast.error("সব প্রয়োজনীয় তথ্য দিন");
      return;
    }
    if (!isSignIn && password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }
    setBusy(true);
    try {
      if (isSignIn) {
        const { error } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (error) throw new Error(readableAuthError(error, "signin"));
        toast.success("সফলভাবে সাইন ইন হয়েছে");
        router.push(next);
        router.refresh();
      } else {
        console.log("name:", name, "email:", email, "password:", password);
        const { error,data } = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
        });
        
        console.log("signup error:", error);
        console.log("signup data:", data);
        if (error) throw new Error(readableAuthError(error, "signup"));
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
        router.push("/signin");
        router.refresh();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : readableAuthError(null, mode),
      );
    } finally {
      setBusy(false);
    }
  }

  async function social(provider: "google" | "github") {
    setBusy(true);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: next,
        errorCallbackURL: "/signin?error=oauth",
      });
      if (error)
        throw new Error(error.message || "সোশ্যাল সাইন ইন ব্যর্থ হয়েছে");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "সোশ্যাল সাইন ইন ব্যর্থ হয়েছে",
      );
      setBusy(false);
    }
  }

  return (
    <div className="auth-shell container">
      <section className="auth-card surface-card">
        <div className="auth-brand">
          <span className="brand-mark">🛒</span>
          <div
            className="section-kicker"
            style={{ justifyContent: "center", marginTop: 10 }}
          >
            বাজার দর
          </div>
        </div>
        <h1>{isSignIn ? "আবার স্বাগতম" : "অ্যাকাউন্ট তৈরি করুন"}</h1>
        <p>
          {isSignIn
            ? "আপনার অ্যাকাউন্টে প্রবেশ করুন।"
            : "বাজারদর দেখতে কয়েক সেকেন্ডেই যোগ দিন।"}
        </p>
        <form onSubmit={submit}>
          {!isSignIn && (
            <div className="form-field">
              <label htmlFor="name">আপনার নাম</label>
              <input
                id="name"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="যেমন: মাহমুদা"
              />
            </div>
          )}
          <div className="form-field">
            <label htmlFor="email">ইমেইল</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">পাসওয়ার্ড</label>
            <input
              id="password"
              type="password"
              autoComplete={isSignIn ? "current-password" : "new-password"}
              required
              minLength={isSignIn ? undefined : 6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="কমপক্ষে ৬ অক্ষর"
            />
          </div>
          <button
            className="primary-button form-submit focus-ring"
            disabled={busy}
          >
            {busy
              ? "অপেক্ষা করুন…"
              : isSignIn
                ? "সাইন ইন করুন"
                : "সাইন আপ করুন"}
          </button>
        </form>
        <div className="divider">অথবা</div>
        <button
          type="button"
          className="social-button focus-ring"
          disabled={busy}
          onClick={() => social("google")}
        >
          Google দিয়ে চালিয়ে যান
        </button>
        <button
          type="button"
          className="social-button focus-ring"
          disabled={busy}
          onClick={() => social("github")}
        >
          GitHub দিয়ে চালিয়ে যান
        </button>
        <p className="auth-switch">
          {isSignIn ? "অ্যাকাউন্ট নেই?" : "আগেই অ্যাকাউন্ট আছে?"}{" "}
          <Link href={isSignIn ? "/signup" : "/signin"}>
            {isSignIn ? "সাইন আপ করুন" : "সাইন ইন করুন"}
          </Link>
        </p>
      </section>
    </div>
  );
}
