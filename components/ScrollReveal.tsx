"use client";

import { useEffect, useRef, ReactNode, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale-in";
  delay?: number;
  className?: string;
}

export function ScrollReveal({ 
  children, 
  animation = "fade-up", 
  delay = 0,
  className = ""
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Utiliser uniquement IntersectionObserver pour détecter la visibilité
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        // L'élément doit être à 200px du bas de l'écran avant de s'animer
        rootMargin: "0px 0px -200px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const animationClass = `animate-${animation}`;

  return (
    <div
      ref={ref}
      className={`scroll-animate ${animationClass} ${className}`.trim()}
      style={{ animationDelay: delay > 0 ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
