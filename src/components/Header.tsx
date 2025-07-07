"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="">
        {/* Desktop Header */}
        <div className="flex justify-center lg:gap-20 gap-4 items-center py-4 px-6">
          <div className="flex items-center justify-center flex-col">
            <Link
              href="/"
              className="text-xl font-bold text-coffee-brown flex items-center"
            >
              <Image
                src="/logo.webp"
                alt="Gaina Overseas Logo"
                width={100}
                height={100}
                className="lg:w-full lg:h-full w-52 h-full"
              />
            </Link>
          </div>
          <nav className="">
            <h2 className="md:text-4xl text-sm  lg:mr-0 mr-10">
              Exporter of Green coffee Beans of Indian Origin
            </h2>
          </nav>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden absolute right-4 top-4 text-white bg-coffee-brown rounded-full p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 pt-20 md:hidden">
            <button 
              className="absolute right-4 top-4 text-white bg-coffee-brown rounded-full p-2"
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center text-center space-y-6 p-4">
              <h2 className="text-2xl font-bold text-coffee-brown mb-8">Our Coffee Grades</h2>
              <Link href="/about" className="text-coffee-brown text-xl font-medium">About Us</Link>
              <Link href="/contact" className="text-coffee-brown text-xl font-medium">Contact Us</Link>
              <Link href="/trade" className="text-coffee-brown text-xl font-medium">Trade Enquiry</Link>
              <Link href="/certificates" className="text-coffee-brown text-xl font-medium">Registrations & Certificates</Link>
              
              <div className="mt-8 pt-8 border-t border-gray-200 w-full">
                <h2 className="text-2xl font-bold text-coffee-brown mb-4">Gaina Overseas</h2>
                <Link href="/address" className="block text-coffee-brown text-lg my-4">Address</Link>
                <Link href="/mobile" className="block text-coffee-brown text-lg my-4">Mobile</Link>
                <Link href="/email" className="block text-coffee-brown text-lg my-4">Send us Email</Link>
                <Link href="/message" className="block text-coffee-brown text-lg my-4">Send us Message</Link>
                <Link href="/live-chat" className="block text-coffee-brown text-lg my-4">Live Chat</Link>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:block border-t border-gray-200">
          <nav className="flex justify-center space-x-8 py-3 bg-coffee-brown text-white">
            <Link
              href="/coffee-grades"
              className="text-white hover:text-coffee-lightGreen"
            >
              Gaina Overseas
            </Link>
            <Link href="/about" className="text-white hover:text-white">
              Address
            </Link>
            <Link href="/contact" className="text-white hover:text-white">
              Mobile
            </Link>
            <Link href="/trade" className="text-white hover:text-white">
              Send us Email
            </Link>
            <Link href="/certificates" className="text-white hover:text-white">
              Send us Message
            </Link>
            <Link href="/contact">Quick Enquiry</Link>
            <Link href="/trade">Live chat</Link>
          </nav>
        </div>
        <nav className="hidden md:flex justify-center space-x-8 py-3 font-semibold">
          <Link
            href="/coffee-grades"
            className="text-coffee-brown hover:text-coffee-lightGreen"
          >
            Our Coffee Grades
          </Link>
          <Link
            href="/about"
            className="text-coffee-brown hover:text-coffee-lightGreen"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-coffee-brown hover:text-coffee-lightGreen"
          >
            Contact Us
          </Link>
          <Link
            href="/trade"
            className="text-coffee-brown hover:text-coffee-lightGreen"
          >
            Trade Enquiry
          </Link>
          <Link
            href="/certificates"
            className="text-coffee-brown hover:text-coffee-lightGreen"
          >
            Registrations & Certificates
          </Link>
        </nav>
      </div>
    </header>
  );
}
