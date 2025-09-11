import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/data/products";
import { Suspense } from "react";

export const dynamic = "force-static";

export default function ProductsIndexPage({ searchParams }: { searchParams: { category?: string; variety?: string } }) {
  // Filter products based on query parameters
  const filteredProducts = allProducts.filter(product => {
    if (searchParams.category && product.category !== searchParams.category) {
      return false;
    }
    if (searchParams.variety && product.variety !== searchParams.variety) {
      return false;
    }
    return true;
  });

  // Determine the title based on filters
  let pageTitle = "Our Coffee Grades";
  if (searchParams.category && searchParams.variety) {
    pageTitle = `${searchParams.variety} - ${searchParams.category}`;
  } else if (searchParams.category) {
    pageTitle = searchParams.category;
  } else if (searchParams.variety) {
    pageTitle = searchParams.variety;
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#F7F2EE] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm text-black mb-2">
            <Link href="/" className="hover:underline">Home</Link> › 
            <Link href="/products" className="hover:underline">Products</Link>
            {searchParams.category && ` › ${searchParams.category}`}
            {searchParams.variety && ` › ${searchParams.variety}`}
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold text-[#562F23] mb-2">{pageTitle}</h1>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="group  hover:shadow-md transition-shadow rounded-2xl border-2 ">
              <div className="relative aspect-[16/9] ">
                {p.heroImage ? (
                  <Image src={p.heroImage} alt={p.name} width={1200} height={100} className="object-contain p-8 rounded-2xl" />
                ) : (
                  <div className="w-full h-full bg-[#FFF7F2] rounded-2xl" />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl mb-4 text-[#562F23]">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.subtitle}</p>
                <p className="text-sm text-gray-600">{p.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}