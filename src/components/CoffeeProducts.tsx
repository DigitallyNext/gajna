"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


export default function CoffeeProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const arabicaRef = useRef<HTMLDivElement>(null);
  const robustaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Make sure elements are visible first
    if (arabicaRef.current) arabicaRef.current.style.visibility = 'visible';
    if (robustaRef.current) robustaRef.current.style.visibility = 'visible';
    
    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });
    
    // Get the card and image elements to animate (not the CTA buttons)
    const arabicaCard = arabicaRef.current?.querySelector('.overflow-hidden');
    const robustaCard = robustaRef.current?.querySelector('.overflow-hidden');
    
    // Add animations to the timeline
    tl.fromTo(
      [arabicaCard, robustaCard],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.3, ease: "power3.out" }
    );
    
    // Clean up the animation when the component unmounts
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);
  return (
    <section ref={sectionRef} className="py-16 bg-white relative z-10">
      <Image
        src="/blog-bg.webp"
        alt="Knowledge Hub Background"
        fill
        className="absolute top-0 left-0 h-full w-full object-cover"
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-serif font-semibold mb-2 text-[#562F23]">
            Explore Our Coffees
          </h2>
          <p className="text-black">Our 2 core offerings</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Arabica Coffee */}
          <div ref={arabicaRef} className="flex flex-col items-center" style={{visibility: 'visible', opacity: 1}}>
            <div className="overflow-hidden group w-full">
              <div className="relative flex flex-col items-center">
                {/* Coffee bean image positioned at top, partially outside card */}
                <div className="relative z-20 mt-10 transition-transform duration-500 ease-in-out group-hover:scale-125">
                  <Image
                    src="/coffee-beans/arabica.webp"
                    alt="Arabica Coffee"
                    width={270}
                    height={270}
                    className=""
                  />
                </div>

                {/* Card with content */}
                <div className="bg-[#7D4B3C] text-white px-8 pt-32 pb-4 rounded-2xl w-full shadow-lg mt-[-130px] mb-10 transition-transform duration-500 ease-in-out group-hover:translate-y-4">
                  <div className="text-center">
                    <h3 className="text-4xl font-serif mb-4">Arabica</h3>
                    <p className="text-lg mb-8">
                      Smooth and aromatic with delicate acidity. Ideal for premium single-origin brews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <Link
                href="/coffee/arabica"
                className="inline-block py-3 px-8 border border-coffee-gold text-black font-medium rounded-full hover:bg-coffee-gold hover:text-coffee-brown transition duration-300"
              >
                Explore Indian Grade Arabica
              </Link>
            </div>
          </div>

          {/* Robusta Coffee */}
          <div ref={robustaRef} className="flex flex-col items-center" style={{visibility: 'visible', opacity: 1}}>
            <div className="overflow-hidden group w-full">
              <div className="relative flex flex-col items-center">
                {/* Coffee bean image positioned at top, partially outside card */}
                <div className="relative z-20 mt-10 transition-transform duration-500 ease-in-out group-hover:scale-125">
                  <Image
                    src="/coffee-beans/Robusta.webp"
                    alt="Robusta Coffee"
                    width={270}
                    height={270}
                    className=""
                  />
                </div>

                {/* Card with content */}
                <div className="bg-[#7D4B3C] text-white px-8 pt-32 pb-4 rounded-2xl w-full shadow-lg mt-[-130px] mb-10 transition-transform duration-500 ease-in-out group-hover:translate-y-4">
                  <div className="text-center">
                    <h3 className="text-4xl font-serif mb-4">Robusta</h3>
                    <p className="text-lg mb-8">
                      Rich and intense with higher caffeine content. Perfect for
                      espresso blends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <Link
                href="/coffee/robusta"
                className="inline-block py-3 px-8 border border-coffee-gold text-black font-medium rounded-full hover:bg-coffee-gold hover:text-coffee-brown transition duration-300"
              >
                Explore Indian Grade Robusta
              </Link>
            </div>
          </div>
        </div>
     </div>
    </section>
  );
}
