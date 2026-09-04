import React from 'react';

// Muted Rose Gold default: #D49A7A
export const ScalesIcon = ({ className = "w-5 h-5", color = "#D49A7A" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3v18" />
    <path d="M6 6h12" />
    <path d="M4 14l2-8 2 8c0 1.1-.9 2-2 2s-2-.9-2-2z" />
    <path d="M16 14l2-8 2 8c0 1.1-.9 2-2 2s-2-.9-2-2z" />
    <path d="M9 21h6" />
  </svg>
);

export const InfinityIcon = ({ className = "w-5 h-5", color = "#D49A7A" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18.178 8c5.096 0 5.096 8 0 8-3.398 0-4.78-3.08-6.178-5.5C10.602 8.08 9.22 5 5.822 5c-5.096 0-5.096 8 0 8 3.398 0 4.78-3.08 6.178-5.5C13.398 9.92 14.78 13 18.178 13z" />
  </svg>
);

export const MagnifierIcon = ({ className = "w-5 h-5", color = "#D49A7A" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21.5" y2="21.5" />
  </svg>
);

export const MicrophoneIcon = ({ className = "w-4 h-4", color = "#D49A7A" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
    <line x1="8" y1="22" x2="16" y2="22" />
  </svg>
);

export const DiamondIcon = ({ className = "w-5 h-5", color = "#D49A7A" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 3h12l4 7-10 11L2 10l4-7z" />
    <path d="M2 10h20" />
    <path d="M12 21L7.5 10 11 3" />
    <path d="M12 21l4.5-11L13 3" />
  </svg>
);

export const TagIcon = ({ className = "w-5 h-5", color = "#D49A7A" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

export const HangerIcon = ({ className = "w-5 h-5", color = "#D49A7A" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7l8.28 6.2a2 2 0 0 1-.28 3.3l-1.5.5H4.5l-1.5-.5a2 2 0 0 1-.28-3.3L11 7V5.72A2 2 0 0 1 12 2z" />
    <path d="M3 17h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2z" />
  </svg>
);

export const ShieldIcon = ({ className = "w-5 h-5", color = "#D49A7A" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
