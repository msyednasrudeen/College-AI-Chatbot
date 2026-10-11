import React from 'react';

interface CollegeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const CollegeLogo: React.FC<CollegeLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 md:w-14 md:h-14',
    lg: 'w-16 h-16 md:w-20 md:h-20',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* College Shield & Crest Emblem */}
      <div className={`relative shrink-0 ${sizeMap[size]}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md transition-transform duration-300 hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Gold Shield Border with Gradient */}
          <defs>
            <linearGradient id="shieldGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="crestNavy" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="60%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>
            <linearGradient id="crownGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Crest Shield Background */}
          <path
            d="M50 4C74 4 88 12 88 32C88 64 50 96 50 96C50 96 12 64 12 32C12 12 26 4 50 4Z"
            fill="url(#crestNavy)"
            stroke="url(#shieldGold)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Inner Accent Inset Line */}
          <path
            d="M50 10C70 10 82 17 82 33C82 60 50 88 50 88C50 88 18 60 18 33C18 17 30 10 50 10Z"
            stroke="#FDE68A"
            strokeWidth="1"
            strokeOpacity="0.6"
            strokeDasharray="2 2"
            fill="none"
          />

          {/* Regal Crown at Top */}
          <path
            d="M34 22L40 31L50 19L60 31L66 22L64 34H36L34 22Z"
            fill="url(#crownGold)"
            stroke="#B45309"
            strokeWidth="1"
          />
          {/* Crown Jewels */}
          <circle cx="34" cy="21" r="1.5" fill="#EF4444" />
          <circle cx="50" cy="18" r="2" fill="#3B82F6" />
          <circle cx="66" cy="21" r="1.5" fill="#EF4444" />

          {/* Open Book for Education & Knowledge */}
          <path
            d="M32 46C38 43 45 44 49 48V63C45 59 38 58 32 61V46Z"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="0.8"
          />
          <path
            d="M68 46C62 43 55 44 51 48V63C55 59 62 58 68 61V46Z"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="0.8"
          />
          {/* Book Spine */}
          <line x1="50" y1="48" x2="50" y2="64" stroke="#D97706" strokeWidth="1.5" />

          {/* Engineering Cog / Gear in Center */}
          <g transform="translate(50, 48) scale(0.65)">
            <circle cx="0" cy="0" r="10" stroke="#FBBF24" strokeWidth="2.5" fill="none" />
            <path
              d="M-2 -12H2V-9H-2ZM-2 9H2V12H-2ZM-12 -2V2H-9V-2ZM9 -2V2H12V-2Z"
              fill="#FBBF24"
            />
            <circle cx="0" cy="0" r="4" fill="#FBBF24" />
          </g>

          {/* Motto Banner at Bottom */}
          <rect x="24" y="68" width="52" height="11" rx="3" fill="#D97706" stroke="#FEF3C7" strokeWidth="0.8" />
          <text
            x="50"
            y="76"
            textAnchor="middle"
            fontSize="5"
            fontWeight="bold"
            fill="#FFFFFF"
            fontFamily="sans-serif"
            letterSpacing="0.5"
          >
            SEEK STRIVE SUCCEED
          </text>
        </svg>

        {/* AI Active Indicator Spark */}
        <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-slate-900 shadow-sm animate-pulse">
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
        </div>
      </div>

      {/* College Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-serif font-black tracking-wider text-amber-400 text-sm md:text-base lg:text-lg uppercase">
            KINGS
          </span>
          <span className="font-sans font-bold tracking-tight text-white text-xs md:text-sm lg:text-base">
            College of Engineering
          </span>
          <span className="inline-flex items-center rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-300 ring-1 ring-inset ring-amber-500/30">
            Autonomous
          </span>
        </div>

        {showSubtitle && (
          <div className="text-[11px] md:text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 flex-wrap">
            <span className="text-slate-300 font-medium">Punalkulam, Pudukkottai, TN</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-amber-300/80 hidden sm:inline font-mono">TNEA Code: 3806</span>
          </div>
        )}
      </div>
    </div>
  );
};
