"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Smartphone, Video } from "lucide-react";

export default function RegistrationCertification() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const certificatesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    // Animate content sections
    if (contentRef.current && certificatesRef.current) {
      gsap.set([contentRef.current, certificatesRef.current], {
        y: 30,
        opacity: 0,
      });

      tl.to(contentRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }).to(
        certificatesRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50 ">
            {/* Clean Contact Us Layout */}
      <section className="py-16 mt-40 bg-white">
        <main className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center ">
          {/* column 1 */}
          <div className="flex flex-col ">
            <div
              
              className="w-full md:w-[15vw] h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
            >
              <Image 
                  src="/registration/apeda.webp"
                  alt="location"
                  width={1200}
                  height={100}
                  className="w-[32px] h-[32px] md:w-[10vw] md:h-[10vw] "
                  />
            </div>

            <div
              className="w-full md:w-[15vw] h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
            >
           <Image 
                  src="/registration/7.webp"
                  alt="location"
                  width={1200}
                  height={100}
                  className="w-[32px] h-[32px] md:w-[10vw] md:h-[10vw] "
                  />
            </div>
          </div>

          {/* column 2 */}
          <div className="flex flex-col ">
            <div className="flex flex-col md:flex-row ">
              <div
                className="p-6 h-[150px] md:h-[20vh] w-full md:w-[20vw] bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
              >
               <Image 
                  src="/registration/9.webp"
                  alt="location"
                  width={1200}
                  height={100}
                  className="w-[32px] h-[32px] md:w-[10vw] md:h-[10vw] "
                  />
              </div>

              <div
                className="p-6 h-[150px] md:h-[20vh] w-full md:w-[20vw] bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
              >
              <Image 
                  src="/registration/ccri.webp"
                  alt="location"
                  width={1200}
                  height={100}
                  className="w-[32px] h-[32px] md:w-[8vw] md:h-[8vw] "
                  />
              </div>
            </div>

       
              <h1 className="text-4xl md:text-6xl leading-tight font-bold text-white text-center font-serif p-6 h-[150px] md:h-[20vh] w-full md:w-[40vw]  bg-green-700 border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition ">
                Registration & Certification
              </h1>
          

            <div
              className="h-[150px] md:h-[20vh] w-full bg-white border-2 gap-10 border-gray-300 flex flex-row justify-center items-center hover:shadow-lg transition "
            >
              <Image 
                  src="/registration/1.webp"
                  alt="location"
                  width={1200}
                  height={100}
                  className="w-[32px] h-[32px] md:w-[10vw] md:h-[10vw] "
                  />
                   <Image 
                  src="/registration/4.webp"
                  alt="location"
                  width={1200}
                  height={100}
                  className="w-[32px] h-[32px] md:w-[10vw] md:h-[10vw] "
                  />
                     <Image 
                  src="/registration/3.webp"
                  alt="location"
                  width={1200}
                  height={100}
                  className="w-[32px] h-[32px] md:w-[6vw] md:h-[8vw] "
                  />
            </div>
          </div>

          {/* column 3 */}
          <div className="flex flex-col ">
            <div
              
              className="w-full md:w-[15vw] h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
            >
             <Image 
                  src="/registration/ECGC.webp"
                  alt="location"
                  width={1200}
                  height={100}
                  className="w-[32px] h-[32px] md:w-[10vw] md:h-[10vw] "
                  />
            </div>

            <div
           
              className="w-full md:w-[15vw] h-[200px] md:h-[30vh] p-6 bg-white border-2 border-gray-300 flex flex-col justify-center items-center hover:shadow-lg transition "
            >
                 <Image 
                  src="/registration/6.webp"
                  alt="location"
                  width={1200}
                  height={100}
                  className="w-[32px] h-[32px] md:w-[10vw] md:h-[10vw] "
                  />
            </div>
          </div>
        </main>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16"></div>

        {/* Main Content */}
        <div ref={contentRef} className=" gap-12 mb-16">
        
          {/* <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl text-center  font-bold text-coffee-brown mb-6">
                <span className="inline-flex items-center gap-2">
                  Our Certifications
                  <Image
                    src="/seedreg.webp"
                    alt="coffeebrown"
                    width={50}
                    height={50}
                  />
                </span>
                <br />
                Reflect Our Commitment
              </h2>

              <div className="prose prose-lg text-gray-700 leading-relaxed">
                <p className="mb-6">
                  At Gajna Overseas, quality isn&apos;t just a process — it&apos;s a
                  principle we uphold at every stage of our sourcing and export
                  operations. From sourcing coffee beans at estates practicing
                  Good Agricultural Practices (GAP) to handling, documentation,
                  and dispatch, we follow industry-best protocols with full
                  transparency.
                </p>

                <p>
                  We&apos;re registered with India&apos;s top export promotion bodies and
                  adhere to the regulatory requirements laid out by the Coffee
                  Board of India. These certifications are not just badges —
                  they reflect our promise of doing things the right way, every
                  single time.
                </p>
              </div>
            </div>
          </div> */}

          {/* Right Column - Images */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="/certificates/Certificate1.webp"
                  alt="Certificate 1"
                  width={200}
                  height={280}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="/certificates/Certificate2.webp"
                  alt="Certificate 2"
                  width={200}
                  height={280}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src="/certificates/Certificate3.webp"
                  alt="Certificate 3"
                  width={200}
                  height={280}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {/* Certifications Section */}
      <div
        ref={certificatesRef}
        className="bg-coffee-brown  shadow-lg p-8 mt-[-2vw]"
      >
        <div className="text-center py-10">
          <h3 className="text-4xl  font-bold text-white mb-4">
            Registrations & Quality Assurance
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 1 */}
          {/* Coffee Board of India - Certificate 1 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate1.webp"
                alt="Coffee Board Certificate 1"
                width={280}
                height={350}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">
              Coffee Board of India
            </h4>
            <p className="text-white text-sm">Exporter Registration</p>
          </div>

                    {/* Coffee Board of India - Certificate 2 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate4.webp"
                alt="Coffee Board Certificate 2"
                width={280}
                height={350}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">
              Coffee Board of India
            </h4>
            <p className="text-white text-sm">Exporter Registration</p>
          </div>
                    {/* APEDA - Certificate 3 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate5.webp"
                alt="APEDA Certificate 2"
                width={280}
                height={320}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">APEDA</h4>
            <p className="text-white text-sm">
              Agricultural & Processed Food Products Export Development
              Authority
            </p>
          </div>

          
          {/* TPCI - Certificate 4 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate6.webp"
                alt="TPCI Certificate 2"
                width={280}
                height={350}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">TPCI</h4>
            <p className="text-white text-sm">
              Trade Promotion Council of India
            </p>
          </div>

          {/* APEDA - Certificate 2 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate2.webp"
                alt="APEDA Certificate"
                width={280}
                height={350}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">APEDA</h4>
            <p className="text-white text-sm">
              Agricultural & Processed Food Products Export Development
              Authority
            </p>
          </div>

          {/* TPCI - Certificate 3 */}
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
              <Image
                src="/certificates/Certificate3.webp"
                alt="TPCI Certificate"
                width={280}
                height={300}
                className="w-full h-[300px] object-contain rounded-lg"
              />
            </div>
            <h4 className="text-white font-bold text-lg mb-2">TPCI</h4>
            <p className="text-white text-sm">
              Trade Promotion Council of India
            </p>
          </div>

          {/* Row 2 */}




        </div>
      </div>
    </section>
  );
}
