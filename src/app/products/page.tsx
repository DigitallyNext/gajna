"use client";
import Image from "next/image";
import Link from "next/link";
import { allProducts, Product } from "@/data/products";


export const dynamic = "force-static";

// Extract unique categories, varieties, and processing methods for filters
const categories = [...new Set(allProducts.map(p => p.category))] as string[];
const varieties = [...new Set(allProducts.map(p => p.variety))] as string[];

// Extract processing methods from specs
const getProcessingMethod = (product: Product): string => {
  const processingSpec = product.specs.find(spec => spec.label === "Processing");
  return processingSpec ? processingSpec.value.split('–')[0].trim() : "Unknown";
};

const processingMethods = [...new Set(allProducts.map(getProcessingMethod))] as string[];

export default function ProductsIndexPage({ searchParams }: { searchParams: { category?: string; variety?: string; processing?: string; search?: string } }) {
  // Filter products based on query parameters and search term
  const filteredProducts = allProducts.filter(product => {
    // Filter by category
    if (searchParams.category && product.category !== searchParams.category) {
      return false;
    }
    
    // Filter by variety
    if (searchParams.variety && product.variety !== searchParams.variety) {
      return false;
    }
    
    // Filter by processing method
    if (searchParams.processing) {
      const processingMethod = getProcessingMethod(product);
      if (!processingMethod.toLowerCase().includes(searchParams.processing.toLowerCase())) {
        return false;
      }
    }
    
    // Filter by search term
    if (searchParams.search) {
      const searchTerm = searchParams.search.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        (product.subtitle && product.subtitle.toLowerCase().includes(searchTerm)) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.variety.toLowerCase().includes(searchTerm)
      );
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
  } else if (searchParams.processing) {
    pageTitle = `${searchParams.processing} Coffee`;
  } else if (searchParams.search) {
    pageTitle = `Search: ${searchParams.search}`;
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-[#F7F2EE] py-12 md:py-16 mt-40">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm text-black mb-2">
            <Link href="/" className="hover:underline">Home</Link> › 
            <Link href="/products" className="hover:underline"> Products</Link>
            {searchParams.category && ` › ${searchParams.category}`}
            {searchParams.variety && ` › ${searchParams.variety}`}
            {searchParams.processing && ` › ${searchParams.processing}`}
            {searchParams.search && ` › Search: ${searchParams.search}`}
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold text-[#562F23] mb-2">{pageTitle}</h1>
          
          {/* Search Bar */}
          <div className="mt-6 mb-4">
            <form className="flex flex-col md:flex-row gap-4" action="/products" method="get">
              <input 
                type="text" 
                name="search" 
                placeholder="Search coffee grades..." 
                defaultValue={searchParams.search || ''}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button 
                type="submit" 
                className="px-6 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
          
          {/* Filter Options */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link 
              href="/products" 
              className={`px-3 py-1 rounded-full text-sm ${!searchParams.category && !searchParams.variety && !searchParams.processing ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              All
            </Link>
            
            {/* Category Filters */}
            {categories.map(category => (
              <Link 
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className={`px-3 py-1 rounded-full text-sm ${searchParams.category === category ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                {category}
              </Link>
            ))}
            
            {/* Variety Filters */}
            {varieties.map(variety => (
              <Link 
                key={variety}
                href={`/products?variety=${encodeURIComponent(variety)}`}
                className={`px-3 py-1 rounded-full text-sm ${searchParams.variety === variety ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                {variety}
              </Link>
            ))}
            
            {/* Processing Method Filters */}
            {processingMethods.map(method => (
              <Link 
                key={method}
                href={`/products?processing=${encodeURIComponent(method)}`}
                className={`px-3 py-1 rounded-full text-sm ${searchParams.processing === method ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                {method}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl text-gray-700 mb-4">No coffee grades found</h2>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              <Link href="/products" className="mt-4 inline-block px-6 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors">
                View All Products
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-4 text-gray-700">{filteredProducts.length} coffee grades found</p>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <Link key={p.slug} href={`/products/${p.slug}`} className="group hover:shadow-md transition-shadow rounded-2xl border-2">
                    <div className="p-4">
                      <h3 className="text-xl mb-2 text-[#562F23]">{p.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">{p.subtitle}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">{p.category}</span>
                        <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">{p.variety}</span>
                        {p.specs.find(spec => spec.label === "Processing") && (
                          <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">
                            {getProcessingMethod(p)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}