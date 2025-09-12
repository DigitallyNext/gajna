import Image from "next/image";
import Link from "next/link";
import { allProducts } from "@/data/products";

export const metadata = {
  title: "Robusta Coffee Grades - Premium Indian Coffee | Gajna Overseas",
  description: "Explore our premium Robusta coffee grades from India. From commercial parchment varieties to specialty monsooned coffees, discover the finest Indian Robusta coffee beans.",
};

export default function RobustaPage() {
  // Filter and categorize Robusta products
  const robustaProducts = allProducts.filter(product => product.variety === "Robusta");
  
  // Group by category
  const commercialGrade = robustaProducts.filter(p => p.category === "Commercial Grade");
  const premiumGrade = robustaProducts.filter(p => p.category === "Premium Grade");
  const specialtyGrade = robustaProducts.filter(p => p.category === "Specialty Coffee");
  
  // Further group commercial grade by processing type
  const parchmentGrades = commercialGrade.filter(p => p.specs.some(spec => spec.value.includes("Parchment")));
  const cherryGrades = commercialGrade.filter(p => p.specs.some(spec => spec.value.includes("Cherry")) && !p.specs.some(spec => spec.value.includes("Parchment")));
  const otherCommercial = commercialGrade.filter(p => !p.specs.some(spec => spec.value.includes("Parchment")) && !p.specs.some(spec => spec.value.includes("Cherry")));

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-900 via-orange-800 to-red-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/coffee-beans/robusta.webp')] bg-cover bg-center opacity-10"></div>
        
        {/* Floating coffee beans animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-8 h-8 bg-orange-200 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-red-300 rounded-full opacity-30 animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-orange-100 rounded-full opacity-15 animate-bounce" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-7 h-7 bg-red-200 rounded-full opacity-25 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <div className="mb-8">
            <Image 
              src="/coffee-beans/robusta.webp" 
              alt="Robusta Coffee Bean" 
              width={120} 
              height={120} 
              className="mx-auto mb-6 rounded-full shadow-2xl border-4 border-white/30"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent">
            Robusta Coffee
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-orange-100 max-w-4xl mx-auto leading-relaxed">
            Discover India&apos;s robust Robusta coffee grades - from commercial parchment varieties to premium specialty coffees
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-orange-200">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
              Slightly smaller than Arabica
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
              Rounder-shaped beans
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
              Grown at lower altitudes
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
              Earthy, slightly bitter flavor
            </span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-coffee-brown mb-2">{robustaProducts.length}</div>
              <div className="text-sm text-gray-600">Total Grades</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-coffee-brown mb-2">{commercialGrade.length}</div>
              <div className="text-sm text-gray-600">Commercial Grades</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-coffee-brown mb-2">{premiumGrade.length}</div>
              <div className="text-sm text-gray-600">Premium Grades</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-coffee-brown mb-2">{specialtyGrade.length}</div>
              <div className="text-sm text-gray-600">Specialty Coffees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Grade - Parchment Varieties */}
      {parchmentGrades.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Washed Robusta - Parchment Grades</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Clean washed Robusta varieties processed using the wet method for enhanced quality and reduced bitterness.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {parchmentGrades.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-orange-100">
                    <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
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
                      <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Commercial
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coffee-brown mb-2 group-hover:text-orange-600 transition-colors">
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
                        <span className="text-sm font-medium text-orange-600">View Details</span>
                        <svg className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <section className="py-16 bg-gradient-to-r from-red-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Unwashed Robusta - Cherry Grades</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Natural processed Robusta varieties with full-bodied flavor and distinctive earthy characteristics.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cherryGrades.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-red-100">
                    <div className="relative h-48 bg-gradient-to-br from-red-100 to-red-200">
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
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Commercial
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coffee-brown mb-2 group-hover:text-red-600 transition-colors">
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
                        <span className="text-sm font-medium text-red-600">View Details</span>
                        <svg className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Other Commercial Grades */}
      {otherCommercial.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Other Commercial Robusta Grades</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Additional commercial Robusta varieties including bulk and specialty processed coffees.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherCommercial.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-yellow-100">
                    <div className="relative h-48 bg-gradient-to-br from-yellow-100 to-yellow-200">
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
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Commercial
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-coffee-brown mb-2 group-hover:text-yellow-600 transition-colors">
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
                        <span className="text-sm font-medium text-yellow-600">View Details</span>
                        <svg className="w-4 h-4 text-yellow-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Premium Robusta Grades</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Superior quality Robusta varieties with enhanced processing and stricter quality standards.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {premiumGrade.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-indigo-100">
                    <div className="relative h-56 bg-gradient-to-br from-indigo-100 to-indigo-200">
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
                      <div className="absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Premium
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-coffee-brown mb-2 group-hover:text-indigo-600 transition-colors">
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
                        <span className="text-sm font-medium text-indigo-600">View Details</span>
                        <svg className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <section className="py-16 bg-gradient-to-r from-teal-50 to-cyan-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-coffee-brown mb-4">Specialty Robusta Coffees</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Exceptional single-origin and specialty processed Robusta varieties for unique flavor profiles and premium applications.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {specialtyGrade.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-teal-100 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
                    <div className="relative h-56 bg-gradient-to-br from-teal-100 to-teal-200">
                      {product.heroImage ? (
                        <Image
                          src={product.heroImage}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-24 h-24 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-3xl font-bold">{product.name.charAt(0)}</span>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Specialty
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-coffee-brown mb-2 group-hover:text-teal-600 transition-colors">
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
                        <span className="text-sm font-medium text-teal-600">View Details</span>
                        <svg className="w-4 h-4 text-teal-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <section className="py-20 bg-gradient-to-r from-red-900 to-orange-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Source Premium Robusta Coffee?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Contact us for detailed specifications, pricing, and availability of our Robusta coffee grades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-red-900 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              Get Quote
            </Link>
            <Link href="/products" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-red-900 transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}