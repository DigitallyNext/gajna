"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Load images from the gallery directory
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/gallery-images');
        const json = await res.json();
        let list: string[] = Array.isArray(json.images) ? json.images : [];
        // Put 71.webp first only if it exists
        const preferred = '/gallery/71.webp';
        if (list.includes(preferred)) {
          list = [preferred, ...list.filter((i) => i !== preferred)];
        }
        setImages(list);
      } catch (e) {
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setModalOpen(true);
    setZoomLevel(1); // Reset zoom level when opening modal
    setPan({ x: 0, y: 0 }); // Reset pan
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };
  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
    setZoomLevel(1); // Reset zoom level when closing modal
    setPan({ x: 0, y: 0 }); // Reset pan
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const navigateImage = (direction: "next" | "prev") => {
    setZoomLevel(1); // Reset zoom level when navigating
    setPan({ x: 0, y: 0 }); // Reset pan
    if (direction === "next") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setSelectedImage(images[(currentIndex + 1) % images.length]);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]);
    }
  };

  const handleZoom = (action: "in" | "out") => {
    if (action === "in" && zoomLevel < 3) {
      setZoomLevel((prev) => prev + 0.5);
    } else if (action === "out" && zoomLevel > 1) {
      setZoomLevel((prev) => prev - 0.5);
      if (zoomLevel - 0.5 === 1) setPan({ x: 0, y: 0 }); // Reset pan if zoomed out completely
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      e.preventDefault();
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="pt-36  pb-16 px-4 md:px-8 max-w-7xl mx-auto lg:mt-24">
      <h1 className="text-5xl md:text-7xl font-serif text-coffee-brown text-center mb-8">
        Photo Gallery
      </h1>


      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-coffee-brown"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => openModal(image, index)}
            >
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={index < 8}
                loading={index < 8 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <div className="bg-coffee-brown text-white px-4 py-2 rounded-full">
                    View Image
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {modalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-[10001] flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
            {/* Close button - Top Right */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-2 transition-all"
              aria-label="Close modal"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Zoom Controls - Bottom Center */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-4 bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
              <button
                onClick={() => handleZoom("out")}
                className="text-white hover:text-coffee-gold transition-colors disabled:opacity-50"
                aria-label="Zoom out"
                disabled={zoomLevel <= 1}
              >
                <ZoomOut className="h-6 w-6" />
              </button>
              <span className="text-white text-sm font-mono min-w-[3ch] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => handleZoom("in")}
                className="text-white hover:text-coffee-gold transition-colors disabled:opacity-50"
                aria-label="Zoom in"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation - Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/20 hover:bg-black/40 text-white rounded-full p-3 transition-all backdrop-blur-sm border border-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>

            {/* Image Container */}
            <div
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`relative transition-transform duration-300 ease-out flex items-center justify-center ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                  transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={selectedImage}
                  alt="Selected gallery image"
                  fill
                  quality={100}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Navigation - Next */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-black/20 hover:bg-black/40 text-white rounded-full p-3 transition-all backdrop-blur-sm border border-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-8 right-8 text-white/80 text-sm bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
