import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = {
    title: "Thank You | Gajna Overseas",
    description: "Thank you for contacting Gajna Overseas. We will get back to you shortly.",
};

export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center py-32 px-4 mt-20">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 md:p-10 text-center border-t-8 border-coffee-brown">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-green-100 p-4">
                        <CheckCircle className="w-16 h-16 text-green-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-coffee-brown mb-4 font-serif">
                    Thank You!
                </h1>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Your enquiry has been successfully submitted. Our team will review your details and get back to you shortly.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block w-full py-3 px-6 bg-coffee-brown text-white font-semibold rounded-lg shadow-md hover:bg-amber-800 transition-all transform hover:-translate-y-1"
                    >
                        Return to Home
                    </Link>

                    <Link
                        href="/products"
                        className="block w-full py-3 px-6 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Explore More Products
                    </Link>
                </div>
            </div>
        </main>
    );
}
