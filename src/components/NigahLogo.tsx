import React from 'react';

interface NigahLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textSize?: 'sm' | 'md' | 'lg';
  variant?: 'vector' | 'image';
}

export const NigahLogo: React.FC<NigahLogoProps> = ({
  className = 'w-10 h-10',
  showText = false,
  variant = 'vector',
}) => {
  return (
    <div className="inline-flex items-center justify-center group select-none">
      {/* Golden Botanical N Monogram Mark */}
      <div className={`relative shrink-0 flex items-center justify-center ${className}`}>
        {variant === 'image' ? (
          <img
            src="/assets/nigah-logo.jpg"
            alt="Nigah Monogram"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(201,162,77,0.35)] rounded-full"
          />
        ) : (
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(197,155,39,0.35)] transition-transform duration-300 group-hover:scale-105"
            aria-label="Nigah Clothes Store Botanical N Emblem"
          >
            <defs>
              <linearGradient id="nigahGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFBA50" />
                <stop offset="45%" stopColor="#C59B27" />
                <stop offset="100%" stopColor="#A87F18" />
              </linearGradient>
              <linearGradient id="nigahFloraGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#C59B27" />
                <stop offset="60%" stopColor="#EADB9E" />
                <stop offset="100%" stopColor="#D9BA60" />
              </linearGradient>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#C59B27" floodOpacity="0.35" />
              </filter>
            </defs>

            {/* --- ROMAN SERIF LETTER 'N' --- */}
            {/* Top-left serif & left vertical column */}
            <path
              d="M14 20 H28 V23 C25.5 23 23.5 24.5 23.5 27 V73 C23.5 75.5 25.5 77 28 77 V80 H14 V77 C16.5 77 18.5 75.5 18.5 73 V27 C18.5 24.5 16.5 23 14 23 V20 Z"
              fill="url(#nigahGoldGrad)"
            />

            {/* Powerful Solid Diagonal Stroke */}
            <path
              d="M23 20 L76.5 78 H85 L31.5 20 H23 Z"
              fill="url(#nigahGoldGrad)"
            />

            {/* Right vertical column with top and bottom serifs */}
            <path
              d="M72 20 H86 V23 C83.5 23 81.5 24.5 81.5 27 V73 C81.5 75.5 83.5 77 86 77 V80 H72 V77 C74.5 77 76.5 75.5 76.5 73 V27 C76.5 24.5 74.5 23 72 23 V20 Z"
              fill="url(#nigahGoldGrad)"
            />

            {/* --- DELICATE BOTANICAL FLOWER & STEM ON LEFT COLUMN --- */}
            {/* Flared Bell Pedestal Base at left foot */}
            <path
              d="M13 80.5 C13 79.5 16 78 18.5 75.5 C21 78 24 79.5 24 80.5 H13 Z"
              fill="url(#nigahGoldGrad)"
            />

            {/* Slender Botanical Climbing Stem */}
            <path
              d="M18.5 75.5 Q16.5 61 19 50 Q21 40 17 31 Q15.5 26 17.5 21"
              stroke="url(#nigahFloraGrad)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Lower Botanical Leaves */}
            <path
              d="M18 70 C14 68 12 65 13 62 C16 63 18 66 18 70 Z"
              fill="url(#nigahFloraGrad)"
              stroke="#A87F18"
              strokeWidth="0.3"
            />
            <path
              d="M19 67 C23 65 25 62 24 59 C21 60 19 63 19 67 Z"
              fill="url(#nigahFloraGrad)"
              stroke="#A87F18"
              strokeWidth="0.3"
            />

            {/* Mid Botanical Leaves */}
            <path
              d="M17.5 59 C13 57 11 53 13 50 C16 51 18 55 17.5 59 Z"
              fill="url(#nigahFloraGrad)"
              stroke="#A87F18"
              strokeWidth="0.3"
            />
            <path
              d="M19.5 56 C24 54 26 50 25 47 C22 48 20 52 19.5 56 Z"
              fill="url(#nigahFloraGrad)"
              stroke="#A87F18"
              strokeWidth="0.3"
            />

            {/* Upper Leaf Pair */}
            <path
              d="M18 47 C14 45 12 41 14 38 C17 39 18 43 18 47 Z"
              fill="url(#nigahFloraGrad)"
              stroke="#A87F18"
              strokeWidth="0.3"
            />
            <path
              d="M20 44 C25 42 27 38 26 35 C23 36 20 40 20 44 Z"
              fill="url(#nigahFloraGrad)"
              stroke="#A87F18"
              strokeWidth="0.3"
            />

            {/* Botanical Floral Bud (tilted right) */}
            <path
              d="M22 34 C22 30 27 25 26.5 21 C24.5 23 22.5 27 22 31"
              stroke="url(#nigahFloraGrad)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M26.5 21 C28.5 18 30.5 19 29.5 23 C28.5 27 25.5 29 24.5 29 C23.5 26 24.5 23 26.5 21 Z"
              fill="#F4E3B5"
              stroke="#A87F18"
              strokeWidth="0.5"
            />

            {/* Main Open Botanical Blossom (Top Left) */}
            <g transform="translate(13.5, 19)">
              {/* Petal layers */}
              <path
                d="M-1 6 C-4 3 -5 -1 -2 -3 C1 -5 5 -3 5 0 C5 3 2 6 -1 6 Z"
                fill="#FAF0D6"
                stroke="#A87F18"
                strokeWidth="0.6"
              />
              <path
                d="M3 -1 C5 -4 9 -3 10 0 C11 3 8 6 5 5 C3 4 2 1 3 -1 Z"
                fill="#F3DFC0"
                stroke="#A87F18"
                strokeWidth="0.6"
              />
              <path
                d="M-3 1 C-6 1 -7 5 -4 7 C-1 9 2 7 1 4 C0 2 -2 1 -3 1 Z"
                fill="#EDD191"
                stroke="#A87F18"
                strokeWidth="0.6"
              />
              {/* Blossom Stamen core */}
              <circle cx="1" cy="2" r="1.3" fill="#C59B27" />
              <path d="M-1 1 L-2 0 M1 0 L1 -1 M3 1 L4 0" stroke="#C59B27" strokeWidth="0.5" strokeLinecap="round" />
            </g>
          </svg>
        )}
      </div>

      {/* Brand Typography rendered only if explicitly requested */}
      {showText && (
        <div className="flex flex-col text-left ml-3">
          <span className="font-serif tracking-[0.22em] text-[#F5F2EA] group-hover:text-[#E0C27A] transition-colors duration-300 font-normal leading-tight uppercase text-lg sm:text-xl">
            NIGAH
          </span>
          <span className="tracking-[0.35em] text-[#C9A24D] uppercase font-light opacity-90 text-[7.5px] sm:text-[9px]">
            CLOTHES STORE
          </span>
        </div>
      )}
    </div>
  );
};
