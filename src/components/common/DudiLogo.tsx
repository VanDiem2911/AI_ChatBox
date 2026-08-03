import React from 'react';

interface DudiLogoProps {
  className?: string;
}

export const DudiLogo: React.FC<DudiLogoProps> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
    >
      <rect width="200" height="200" rx="32" fill="#E11D48" />
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fill="white"
        fontSize="62"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="1"
      >
        DUDI
      </text>
      <text
        x="100"
        y="156"
        textAnchor="middle"
        fill="white"
        fontSize="34"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        software
      </text>
    </svg>
  );
};
