"use client";

import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return <>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <Toaster position="top-center" toastOptions={{ duration: 2800, style: { fontFamily: "Hind Siliguri", borderRadius: 12 } }} />
  </>;
}
