import { ProductDetailPage } from "@/components/product-detail-page";
import { findProduct } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!findProduct(slug)) notFound();
  return <ProductDetailPage slug={slug} />;
}
