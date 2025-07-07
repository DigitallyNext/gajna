"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import bannerData, { BannerSlide } from '../data/bannerData';
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BiSolidCoffeeBean } from "react-icons/bi";
import { useMediaQuery } from 'react-responsive';


// SVG component for the check icon
const CheckIcon = () => (
  <div className="w-6 h-6 mt-1 mr-3">
    <BsFillCheckCircleFill className='text-coffee-gold'/>
  </div>
);

// Coffee bean icon for the slide indicators
const CoffeeBeanIcon = ({ active }: { active: boolean }) => (
  <div className={`w-4 h-4 mx-1 transition-all duration-300 ${active ? 'opacity-100 scale-110' : 'opacity-50'}`}>
    <BiSolidCoffeeBean className='text-coffee-gold'/>
  </div>
);

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  // Using banner data from the data file
  const slides = bannerData;

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative bg-black text-white overflow-hidden h-[600px] z-0">
    
      {/* Background image with transition effect and gradient overlay */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-60' : 'opacity-0'}`}
          style={{ 
            backgroundImage: isMounted ? `url(${isMobile ? slide.mobileBackground : slide.background})` : 'none'
          }}
        >
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
        </div>
      ))}
      
      <div className="container mx-auto px-4 py-20 relative z-10 h-full flex flex-col justify-between">
        {/* Top section with title */}
        <div className="flex">
          <div className="md:w-1/2 w-full">
            {/* Title with animation */}
            <h1 className="lg:text-6xl text-4xl text-center lg:text-left font-serif font-semibold mb-6 text-coffee-gold">
              {currentSlideData.title.split('\n').map((line, i) => (
                <span key={i} className="block transition-all duration-500 animate-fadeIn">{line}</span>
              ))}
            </h1>
          </div>
        </div>
        
        {/* Bottom section with points */}
        <div className="flex lg:justify-end lg:items-center items-end lg:mt-0 mt-32">
          <div className="md:w-1/2 w-full">
            {/* Coffee bean icon above points */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12">
                <Image src="/coffee-bean.webp" alt="Coffee bean" width={48} height={48} className="opacity-80" />
              </div>
            </div>
            
            {/* Points with animation */}
            <div className="space-y-4 lg:ml-[16vw]">
              {currentSlideData.points.map((point, index) => (
                <div key={index} className="flex items-start animate-slideIn" style={{ animationDelay: `${index * 200}ms` }}>
                  <CheckIcon />
                  <p className="lg:text-2xl text-base">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Slide indicators */}
        <div className="flex justify-center items-center my-8">
          {slides.map((_, index) => (
            <button 
              key={index} 
              onClick={() => goToSlide(index)}
              className="focus:outline-none mx-1"
              aria-label={`Go to slide ${index + 1}`}
            >
              <CoffeeBeanIcon active={index === currentSlide} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}