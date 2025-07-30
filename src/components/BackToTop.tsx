'use client';

import React, { useState, useEffect } from 'react';

interface BackToTopProps {
  position?: 'right' | 'left';
}

const BackToTop: React.FC<BackToTopProps> = ({ position = 'right' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  const positionClass = position === 'left' 
    ? 'bottom-6 left-6 md:bottom-6 md:right-6 md:left-auto' 
    : 'bottom-6 right-6';

  return (
    <button
      onClick={scrollToTop}
      className={`fixed ${positionClass} bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group animate-fade-in`}
      aria-label="Kembali ke atas"
    >
      <svg 
        className="w-6 h-6 group-hover:scale-110 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export default BackToTop;