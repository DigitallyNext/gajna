import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, allProducts, type Product } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

// Generate static params for static site generation
export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product: Product | undefined = products[params.slug];
  if (!product) return notFound();

  const related = (product.related || []).map((slug) => products[slug]).filter(Boolean);

  return (
    <main className="bg-white  ">
      {/* Hero + breadcrumb-like heading */}

      <section className="py-8  lg:py-16 mt-10  lg:mt-40 bg-white">
        <section className=" lg:py-1 py-4">
          <div className="max-w-6xl mx-auto px-3 lg:px-0">
            <p className="text-sm text-black mb-6 font-semibold">
              <Link href="/" className="hover:underline">Home </Link> ›
              <Link href="/products" className="hover:underline"> Products</Link> ›
              <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:underline"> {product.category}</Link> ›
              <Link href={`/products?variety=${encodeURIComponent(product.variety)}`} className="hover:underline"> {product.variety}</Link> ›
              <span> {product.subtitle || product.name}</span>
            </p>

          </div>
        </section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout (sm and below) */}


          {/* Tablet Layout (sm to lg) */}
          <div className="hidden sm:block lg:hidden ">
            <div className="grid grid-cols-3 gap-4">
              {/* Top Row */}
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Coffee Grades.
              </div>
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Specially Grades.
              </div>
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Robusta
              </div>

              {/* Middle Row - Title */}
              <div className="col-span-3 bg-green-700 border-2 border-gray-300 rounded-lg p-8 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <h1 className="text-3xl md:text-5xl font-semibold text-white">{product.name}</h1>
              </div>

              {/* Bottom Row */}
              <div className=" bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Premium Grades
              </div>
              <div className=" bg-white text-sm  border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                Washed or Wet Processed Coffee
              </div>
              <div className=" bg-white border-2 text-sm border-gray-300 rounded-lg p-6 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">

                Natural or Dry Processed Coffee
              </div>

              {/* Bottom certificates row */}
              <div className="col-span-3 bg-white border-2 text-center border-gray-300 rounded-lg p-6 flex justify-center items-center gap-8 hover:shadow-lg transition-shadow duration-300">

                Miscellaneous Grades
              </div>
            </div>
          </div>

          {/* Desktop Layout (lg and above) - Original Design Enhanced */}
          <div className="hidden lg:flex justify-center items-center">
            {/* Column 1 */}
            <div className="flex flex-col">
              <div className="w-[15vw] h-[30vh] text-xl text-black font-semibold p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                Coffee Grades
              </div>
              <div className="w-[15vw] h-[30vh] text-xl text-black font-semibold p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                Speciality Grades
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="p-6 h-[20vh] w-[20vw] text-xl text-black font-semibold bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Robusta
                </div>
                <div className="p-6 h-[20vh] w-[20vw] text-xl text-black font-semibold bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Arabica
                </div>
              </div>

              <div className="p-6 h-[20vh] w-[40vw] bg-green-700 border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h1 className="text-3xl md:text-5xl font-semibold text-white">{product.name}</h1>
              </div>
              <div className="flex flex-row">
                <div className="h-[20vh] w-[20vw] bg-white border-2 text-xl text-black font-semibold border-gray-300 rounded-lg flex flex-row justify-center text-center items-center gap-10 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Washed or Wet Processed Coffee
                </div>
                <div className="h-[20vh] w-[20vw] bg-white border-2 text-xl text-black font-semibold border-gray-300 rounded-lg flex flex-row justify-center items-center text-center gap-10 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Natural or Dry Processed Coffee
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col">
              <div className="w-[15vw] h-[30vh] text-xl text-black font-semibold p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                Preimum Grades
              </div>
              <div className="w-[15vw] h-[30vh] text-xl text-center text-black font-semibold p-6 bg-white border-2 border-gray-300 rounded-lg flex flex-col justify-center items-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                Miscellaneous Grades
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 pt-10 lg:py-24 py-12">

        <ProductDetailClient product={product} />
      </section>

      {/* Related products */}
      {/* {related.length ? (
        <section className="max-w-6xl mx-auto px-4 pb-12">
          <h3 className="text-4xl font-semibold  text-[#562F23] mb-6">{product.groupTitle || 'Related Products'}</h3>
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
            {related.map((rp) => (
              <Link key={rp!.slug} href={`/products/${rp!.slug}`} className="group rounded-2xl border border-gray-200 overflow-hidden bg-white hover:shadow-md transition-shadow">
                <div className="relative aspect-square ">
                  <Image src={rp!.heroImage} alt={rp!.name} fill className="object-contain p-6" />
                </div>
                <div className="p-4">
                  <h4 className="text-2xl  text-[#562F23]">{rp!.name}</h4>
                  <p className="text-lg text-gray-600">{rp!.subtitle }</p>
                  <p className="text-lg  text-gray-600">{rp!.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null} */}
    </main>
  );
}