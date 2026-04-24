"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  className
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardLength = content.length;
    let index = Math.floor(latest * cardLength);
    if (index >= cardLength) {
      index = cardLength - 1; // Clamp at the end of the scroll array
    }
    setActiveCard(index);
  });

  return (
    <div
      className={cn("relative flex justify-center space-x-10 px-4", className)}
      ref={ref}
    >
      <div className="relative flex items-start w-full lg:w-2/5">
        <div className="w-full pb-0 lg:pb-16">
          {content.map((item, index) => (
            <div key={item.title + index} className="mt-32 lg:mt-48 mb-32 lg:mb-48 last:mb-20 lg:last:mb-20">
              <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5, delay: 0.1 }}
                 viewport={{ once: true, margin: "-10%" }}
              >
                {item.icon && (
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 mb-6 ${
                    activeCard === index ? "bg-gradient-to-br from-[#25D366] to-[#1EAC52] shadow-[0_8px_30px_rgba(37,211,102,0.3)] text-white scale-110" : "bg-[#25D366]/10 text-[#25D366]"
                  }`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                )}
                <h2
                  className={cn(
                    "text-3xl lg:text-4xl font-bold transition-colors duration-500",
                    activeCard === index ? "text-[#0A0A0A]" : "text-[#A1A1AA]"
                  )}
                  style={{ fontFamily: 'Bricolage Grotesque' }}
                >
                  {item.title}
                </h2>
                <p
                  className={cn(
                    "text-lg mt-4 max-w-md transition-colors duration-500",
                    activeCard === index ? "text-[#52525B]" : "text-[#D4D4D8]"
                  )}
                >
                  {item.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={cn(
          "sticky top-28 hidden lg:flex h-[680px] max-h-[80vh] w-full lg:w-3/5 items-center",
          contentClassName
        )}
      >
        <div className="w-full relative">
          <div className="absolute -inset-10 bg-[#25D366]/5 blur-3xl rounded-full opacity-50 pointer-events-none" />
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -30 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.5
            }}
            className="w-full max-w-[720px] mx-auto px-6 relative z-10"
          >
            {content[activeCard].content ?? null}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
