import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/data/products";

export const metadata = {
  title: "Arabica Coffee Grades - Premium Indian Coffee | Gajna Overseas",
  description: "Explore our premium Arabica coffee grades from India. From Plantation PB to specialty Monsooned Malabar varieties, discover the finest Indian Arabica coffee beans.",
};

export default function ArabicaPage() {
  // Filter and categorize Arabica products
  const arabicaProducts = allProducts.filter(product => product.variety === "Arabica");
  
  // Group by category
  const commercialGrade = arabicaProducts.filter(p => p.category === "Commercial Grade");
  const premiumGrade = arabicaProducts.filter(p => p.category === "Premium Grade");
  const specialtyGrade = arabicaProducts.filter(p => p.category === "Specialty Coffee");
  
  // Further group commercial grade by processing type
  const plantationGrades = commercialGrade.filter(p => p.specs.some(spec => spec.value.includes("Plantation")));
  const cherryGrades = commercialGrade.filter(p => p.specs.some(spec => spec.value.includes("Cherry")));

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-coffee-light">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-coffee-brown via-amber-800 to-coffee-brown py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/coffee-beans/arabica.webp')] bg-cover bg-center opacity-10"></div>
        
        {/* Floating coffee beans animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-8 h-8 bg-amber-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-amber-300 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-amber-100 rounded-full opacity-15 animate-bounce" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-7 h-7 bg-amber-200 rounded-full opacity-25 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <div className="mb-8">
            <Image 
              src="/coffee-beans/arabica.webp" 
              alt="Arabica Coffee Bean" 
              width={120} 
              height={120} 
              className="mx-auto mb-6 rounded-full shadow-2xl border-4 border-white/30"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
            Arabica Coffee
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-amber-100 max-w-4xl mx-auto leading-relaxed">
            Discover India's finest Arabica coffee grades - from commercial plantation varieties to premium specialty coffees
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-amber-200">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-300 rounded-full"></span>
              Slightly larger than Robusta
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-300 rounded-full"></span>
              Elliptical-shaped beans
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-300 rounded-full"></span>
              Grown at higher altitudes
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-300 rounded-full"></span>
              Elegant, fruity aroma
            </span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-coffee-brown mb-2">{arabicaProducts.length}</div>
              <div className="text-sm text-gray-600">Total Grades</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-coffee-brown mb-2">{commercialGrade.length}</div>
              <div className="text-sm text-gray-600">Commercial Grades</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-coffee-brown mb-2">{premiumGrade.length}</div>
              <div className="text-sm text-gray-600">Premium Grades</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-coffee-brown mb-2">{specialtyGrade.length}</div>
              <div className="text-sm text-gray-600">Specialty Coffees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Grade - Plantation Varieties */}
      {plantationGrades.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Washed Arabica - Plantation Grades</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Clean garbled, washed Arabica varieties processed using the wet method for superior quality and consistency.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {plantationGrades.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-amber-100">
                    <div className="relative h-48 bg-gradient-to-br from-amber-100 to-amber-200">
                      {product.heroImage ? (
                        <Image
                          src={product.heroImage}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-20 h-20 bg-coffee-brown rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">{product.name.charAt(0)}</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Commercial
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coffee-brown mb-2 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{product.subtitle}</p>
                      <div className="space-y-2">
                        {product.specs.slice(0, 2).map((spec, index) => (
                          <div key={index} className="text-xs">
                            <span className="font-medium text-gray-700">{spec.label}:</span>
                            <span className="text-gray-600 ml-1">{spec.value.length > 50 ? spec.value.substring(0, 50) + '...' : spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-600">View Details</span>
                        <svg className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Commercial Grade - Cherry Varieties */}
      {cherryGrades.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Unwashed Arabica - Cherry Grades</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Natural processed Arabica varieties with distinctive flavor profiles from the dry processing method.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cherryGrades.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-green-100">
                    <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200">
                      {product.heroImage ? (
                        <Image
                          src={product.heroImage}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-20 h-20 bg-coffee-brown rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">{product.name.charAt(0)}</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Commercial
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coffee-brown mb-2 group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{product.subtitle}</p>
                      <div className="space-y-2">
                        {product.specs.slice(0, 2).map((spec, index) => (
                          <div key={index} className="text-xs">
                            <span className="font-medium text-gray-700">{spec.label}:</span>
                            <span className="text-gray-600 ml-1">{spec.value.length > 50 ? spec.value.substring(0, 50) + '...' : spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-green-600">View Details</span>
                        <svg className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Grade */}
      {premiumGrade.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Premium Arabica Grades</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Superior quality Arabica varieties with enhanced processing and stricter quality standards.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premiumGrade.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-blue-100">
                    <div className="relative h-56 bg-gradient-to-br from-blue-100 to-blue-200">
                      {product.heroImage ? (
                        <Image
                          src={product.heroImage}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-24 h-24 bg-coffee-brown rounded-full flex items-center justify-center">
                            <span className="text-white text-3xl font-bold">{product.name.charAt(0)}</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Premium
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-coffee-brown mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{product.subtitle}</p>
                      <div className="space-y-2">
                        {product.specs.slice(0, 3).map((spec, index) => (
                          <div key={index} className="text-xs">
                            <span className="font-medium text-gray-700">{spec.label}:</span>
                            <span className="text-gray-600 ml-1">{spec.value.length > 60 ? spec.value.substring(0, 60) + '...' : spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">View Details</span>
                        <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specialty Coffee */}
      {specialtyGrade.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Specialty Arabica Coffees</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Exceptional single-origin and specialty processed Arabica varieties for the most discerning coffee connoisseurs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialtyGrade.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-purple-100 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    <div className="relative h-56 bg-gradient-to-br from-purple-100 to-purple-200">
                      {product.heroImage ? (
                        <Image
                          src={product.heroImage}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-3xl font-bold">{product.name.charAt(0)}</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Specialty
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-coffee-brown mb-2 group-hover:text-purple-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{product.subtitle}</p>
                      <div className="space-y-2">
                        {product.specs.slice(0, 3).map((spec, index) => (
                          <div key={index} className="text-xs">
                            <span className="font-medium text-gray-700">{spec.label}:</span>
                            <span className="text-gray-600 ml-1">{spec.value.length > 60 ? spec.value.substring(0, 60) + '...' : spec.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-purple-600">View Details</span>
                        <svg className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-coffee-brown to-amber-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Source Premium Arabica Coffee?</h2>
          <p className="text-xl mb-8 text-amber-100">
            Contact us for detailed specifications, pricing, and availability of our Arabica coffee grades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-coffee-brown px-8 py-4 rounded-full font-semibold hover:bg-amber-50 transition-colors">
              Get Quote
            </Link>
            <Link href="/products" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-coffee-brown transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}