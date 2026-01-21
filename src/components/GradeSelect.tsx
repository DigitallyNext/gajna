"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { ChevronDown } from "lucide-react";

export default function GradeSelect({ products }: { products: Product[] }) {
    const router = useRouter();

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const slug = e.target.value;
        if (slug) {
            router.push(`/products/${slug}`);
        }
    };

    // Sort products alphabetically
    const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="relative w-full lg:w-[400px]">
            <div className="relative">
                <select
                    onChange={handleSelect}
                    className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all cursor-pointer shadow-sm hover:border-amber-400"
                    defaultValue=""
                    aria-label="Select a coffee grade"
                >
                    <option value="" disabled>
                        Select a Grade directly...
                    </option>
                    {sortedProducts.map((p) => (
                        <option key={p.slug} value={p.slug}>
                            {p.name}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <ChevronDown className="h-4 w-4" />
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 px-1">
                Quickly navigate to a specific coffee grade page
            </p>
        </div>
    );
}
