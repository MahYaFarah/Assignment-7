import { CategoryPage } from "@/components/category-page";
import { categories } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!categories.some((category) => category.slug === slug)) notFound();
  return <CategoryPage slug={slug} />;
}
