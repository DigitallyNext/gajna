import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9F5F0] pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-serif font-semibold mb-6 text-coffee-brown">
          Article Not Found
        </h2>
        <p className="text-xl mb-8 text-gray-700">
          &apos;re looking for. It might have been moved or deleted.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-[#61714D] text-white px-8 py-3 rounded-full hover:bg-[#4D5A3E] transition-colors duration-300"
        >
          Browse All Articles
        </Link>
      </div>
    </div>
  );
}
