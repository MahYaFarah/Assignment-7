import { ProductDetailPage } from "@/components/product-detail-page";
import { findProduct } from "@/lib/data";
import { fetchProduct } from "@/lib/data";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?next=/product/${encodeURIComponent(slug)}`);
  const product = await fetchProduct(slug);
  if (!product && !findProduct(slug)) notFound();
  return <ProductDetailPage slug={slug} initialProduct={product} />;
}
