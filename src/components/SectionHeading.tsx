import React from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  label,
  title,
  subtitle,
  align = 'center',
  className = '',
  light = false
}) => {
  const alignClass =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignClass} mb-12 md:mb-16 ${className}`}>
      {label && (
        <span className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#C9A24D] font-medium mb-3">
          {label}
        </span>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide leading-tight ${
          light ? 'text-[#0A0A0A]' : 'text-[#F5F2EA]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-xs sm:text-sm md:text-base text-[#A1A1AA] max-w-xl font-light tracking-wider leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-px w-14 bg-[#C9A24D]/40 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};
