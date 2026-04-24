import React from 'react';

export default function WraftLogo({ className = "w-10 h-10", stroke = "#046973" }) {
  return (
    <svg 
      viewBox="0 0 100 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Top wavy line with flat ends */}
      <path 
        d="M 15 25 H 25 C 32 25 35 45 42 45 C 50 45 50 25 58 25 C 66 25 66 45 74 45 C 82 45 85 25 92 25 H 102" 
        stroke={stroke} 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      {/* Bottom wavy line mirrored to the middle peak */}
      <path 
        d="M 36 55 C 43 55 45 42 58 42 C 71 42 73 55 80 55" 
        stroke={stroke} 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
