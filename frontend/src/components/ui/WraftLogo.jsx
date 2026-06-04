import React from 'react';

export default function WraftLogo({ className = "w-10 h-10" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1A1A1A"/>
          <stop offset="1" stopColor="#0A0A0A"/>
        </linearGradient>
        <linearGradient id="logo-border" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.2"/>
          <stop offset="1" stopColor="#ffffff" stopOpacity="0"/>
        </linearGradient>
      </defs>
      
      {/* Base rounded square with subtle gradient */}
      <rect width="100" height="100" rx="26" fill="url(#logo-bg)" />
      
      {/* Inner subtle glow / highlight border */}
      <rect x="1" y="1" width="98" height="98" rx="25" stroke="url(#logo-border)" strokeWidth="1.5" />
      
      {/* Custom 'W' */}
      <path 
        d="M 24 40 L 36 66 C 37 68 39 68 40 66 L 50 44 L 60 66 C 61 68 63 68 64 66 L 76 40" 
        stroke="white" 
        strokeWidth="11" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* WhatsApp green accent dot */}
      <circle cx="78" cy="24" r="6" fill="#25D366" />
    </svg>
  );
}
