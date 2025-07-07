import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="">
        <div className="flex justify-center gap-20 items-center py-4">
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
              />
            </Link>
          </div>
          <nav className="hidden md:flex ">
            <h2 className="text-4xl">
              Exporter of Green coffee Beans of Indian Origin
            </h2>
          </nav>
        </div>
        <div className="border-t border-gray-200">
          <nav className="flex justify-center space-x-8 py-3 bg-coffee-brown text-white">
            <Link
              href="/coffee-grades"
              className="text-white hover:text-coffee-lightGreen"
            >
              Gajna Overseas
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
        <nav className="flex justify-center space-x-8 py-3 font-semibold">
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
