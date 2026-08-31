"use client";
import React, { useRef, useEffect, useState } from "react";
import { useScroll, motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const CardObserver = ({ index, setActiveCard, children }) => {
  const ref = useRef(null);
  // We want to trigger when the card is mostly scrolled past the top area
  // margin: "-112px 0px 0px 0px" means we trigger when the card hits the sticky top line
  const isInView = useInView(ref, { 
    margin: "-112px 0px -80% 0px", // Trigger when it enters the top 112px zone
  });

  useEffect(() => {
    if (isInView) {
      setActiveCard(index);
    }
  }, [isInView, index, setActiveCard]);

  return (
    <div ref={ref} className="relative">
      {children}
    </div>
  );
};

export const StickyScroll = ({
  content,
  contentClassName,
  className
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Clear cardRefs array on each render so it doesn't grow indefinitely
  cardRefs.current = [];

  useEffect(() => {
    const updateLine = () => {
      const firstCard = cardRefs.current[0];
      const lastCard = cardRefs.current[content.length - 1];
      const container = cardsContainerRef.current;

      if (firstCard && lastCard && container) {
        const firstDot = firstCard.querySelector(".step-dot");
        const lastDot = lastCard.querySelector(".step-dot");
        if (firstDot && lastDot) {
          const firstRect = firstDot.getBoundingClientRect();
          const lastRect = lastDot.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          const top = firstRect.top + firstRect.height / 2 - containerRect.top;
          const bottom = lastRect.top + lastRect.height / 2 - containerRect.top;
          setLineStyle({
            top,
            height: bottom - top
          });
        }
      }
    };

    updateLine();

    const observer = new ResizeObserver(updateLine);
    if (cardsContainerRef.current) {
      observer.observe(cardsContainerRef.current);
    }

    window.addEventListener("resize", updateLine);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLine);
    };
  }, [content.length]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Top progress bar */}
      <div className="sticky top-0 left-0 right-0 z-50 w-full h-1 bg-[#E4E4E7]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#25D366] to-[#1EAC52]"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        />
      </div>

      <div className="relative flex justify-center space-x-12 px-4 mt-12 lg:mt-16">
        <div className="relative flex items-start w-full lg:w-[35%]">
          <div ref={cardsContainerRef} className="w-full pb-0 lg:pl-12 relative">
            {/* Vertical rail for desktop */}
            <div
              className="absolute w-[2px] bg-[#E4E4E7] hidden lg:block"
              style={{
                left: "8.4px",
                top: `${lineStyle.top}px`,
                height: `${lineStyle.height}px`
              }}
            >
              <motion.div
                className="w-full bg-gradient-to-b from-[#25D366] to-[#1EAC52] origin-top"
                style={{ scaleY: scrollYProgress, height: "100%" }}
              />
            </div>

            {content.map((item, index) => (
              <CardObserver key={index} index={index} setActiveCard={setActiveCard}>
                <div
                  ref={el => { if (el) cardRefs.current[index] = el; }}
                  className="pt-24 lg:pt-32 pb-20 relative"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="relative"
                  >
                    {/* Dot on the rail */}
                    <div
                      className={cn(
                        "step-dot absolute -left-[2.85rem] top-6 w-3.5 h-3.5 rounded-full border-[3px] hidden lg:block transition-all duration-700",
                        activeCard === index
                          ? "border-[#25D366] bg-white scale-110 shadow-[0_0_10px_rgba(37,211,102,0.4)]"
                          : "border-[#E4E4E7] bg-[#FAFAFA] scale-100"
                      )}
                    />
                    {item.icon && (
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-700 mb-6",
                        activeCard === index
                          ? "bg-gradient-to-br from-[#25D366] to-[#1EAC52] shadow-[0_8px_30px_rgba(37,211,102,0.3)] text-white scale-105"
                          : "bg-[#25D366]/10 text-[#25D366] scale-100"
                      )}>
                        <item.icon className="w-6 h-6" />
                      </div>
                    )}
                    <h2
                      className={cn(
                        "text-3xl lg:text-4xl font-bold transition-colors duration-700",
                        activeCard === index ? "text-[#0A0A0A]" : "text-[#A1A1AA]"
                      )}
                      style={{ fontFamily: 'Satoshi' }}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={cn(
                        "text-lg mt-4 max-w-md transition-colors duration-700",
                        activeCard === index ? "text-[#52525B]" : "text-[#D4D4D8]"
                      )}
                    >
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </CardObserver>
            ))}
          </div>
        </div>
        <div
          className={cn(
            "sticky top-28 hidden lg:flex h-[620px] max-h-[80vh] w-full lg:w-[65%] items-center",
            contentClassName
          )}
        >
          <div className="w-full relative">
            {/* subtle moving glow behind active feature */}
            <div className="absolute -inset-10 bg-[#25D366]/5 blur-3xl rounded-full opacity-60 pointer-events-none" />
            
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-[880px] mx-auto px-8 relative z-10"
            >
              {content[activeCard].content ?? null}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
