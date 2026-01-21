"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";

// Lazy load the form
const GeneralContactFormLazy = dynamic(() => import("@/components/GeneralContactForm"), {
    ssr: false,
});

export default function FloatingContactButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 z-[9990] hidden md:flex items-center gap-2 bg-[#15803D] hover:bg-[#116631] text-white px-5 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 group"
                aria-label="Quick Enquiry"
            >
                <MessageCircle className="w-5 h-5 animate-pulse" />
                <span className="font-semibold whitespace-nowrap">Quick Enquiry</span>

                {/* Tooltip-like hint */}
                <span className="absolute right-0 bottom-full mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Get in touch with us!
                </span>
            </button>

            {/* Mobile Floating Button (Icon Only) - positioned above back-to-top */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-20 right-4 z-[9990] md:hidden p-3 bg-[#15803D] hover:bg-[#116631] text-white rounded-full shadow-lg transition-all"
                aria-label="Quick Enquiry"
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div
                        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col animate-in zoom-in-95 duration-200"
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Modal Header */}
                        <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md">
                            <div className="flex items-center gap-4">
                                <Image src="/logo.webp" alt="Gajna Overseas" width={80} height={40} className="w-20" />
                                <div className="text-left">
                                    <h2 className="text-xl font-bold text-coffee-brown">Quick Enquiry</h2>
                                    <p className="text-xs text-gray-500">We respond within 24 hours</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors absolute top-2 right-2 sm:relative sm:top-0 sm:right-0"
                                aria-label="Close modal"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 sm:p-8 overflow-y-auto bg-white/50">
                            <GeneralContactFormLazy
                                initial={{ subject: "Quick Enquiry (Floating)" }}
                                submitLabel="Send Enquiry"
                                onSuccess={() => setIsOpen(false)}
                                isModal={true}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
