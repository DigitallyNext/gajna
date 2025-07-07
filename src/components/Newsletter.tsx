"use client"
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });
    
    // Get elements
    const title = titleRef.current;
    const form = formRef.current;
    
    if (title && form) {
      // Set initial state for all elements
      gsap.set(title, { y: -20, opacity: 0 });
      gsap.set(form, { y: 20, opacity: 0 });
      
      // Add animations to the timeline
      tl.to(
        title,
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0
      )
      .to(
        form,
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        0.3
      );
    }
    
    // Clean up the animation when the component unmounts
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section ref={sectionRef} className="py-16 bg-[#572F22] text-white relative z-10 border-b-[1px] border-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-serif font-semibold mb-6">
          Get the First Sip - Right in Your Inbox
        </h2>
        
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mt-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-grow px-4 py-3 rounded-md bg-transparent border border-white text-white placeholder-[#A67C52] focus:outline-none focus:border-[#E9B8A8]"
            required
          />
          <button 
            type="submit" 
            disabled={isSubmitting || isSubmitted}
            className={`px-8 py-3 rounded-md font-medium transition-colors duration-300 ${isSubmitted ? 'bg-green-600 hover:bg-green-700' : 'bg-transparent text-white hover:bg-[#D9A898] border border-white'}`}
          >
            {isSubmitting ? 'Subscribing...' : isSubmitted ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}