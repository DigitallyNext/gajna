import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/data/products";

export const dynamic = "force-static";

export default function ProductsIndexPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#F7F2EE] py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-semibold text-[#562F23] mb-2">Our Coffee Grades</h1>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="group  hover:shadow-md transition-shadow rounded-2xl border-2 ">
              <div className="relative aspect-[16/9] ">
                <Image src={p.heroImage} alt={p.name} width={1200} height={100} className="object-contain p-8 rounded-2xl" />
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