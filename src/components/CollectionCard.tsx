import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Collection } from '../types';

interface CollectionCardProps {
  collection: Collection;
  index: number;
  onExplore: (collectionId: string) => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  index,
  onExplore
}) => {
  return (
    <div
      onClick={() => onExplore(collection.id)}
      className="group relative cursor-pointer overflow-hidden border border-[#222] bg-[#111111] transition-all duration-500 hover:border-[#C9A24D]/60"
    >
      {/* High-res Fashion Image */}
      <div className="relative aspect-3/4 w-full overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Ambient Overlay that intensifies on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500" />
      </div>

      {/* Card Content Overlay */}
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
        {/* Top: Collection Index and Item Count */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.3em] font-light text-[#A1A1AA] uppercase">
            0{index + 1}
          </span>
          <span className="text-[9px] tracking-[0.25em] text-[#C9A24D] uppercase border border-[#C9A24D]/30 px-2.5 py-1 bg-[#0A0A0A]/70 backdrop-blur-sm">
            {collection.itemCount} DESIGNS
          </span>
        </div>

        {/* Bottom: Title, Description, and Animated Link */}
        <div className="transform transition-transform duration-500">
          <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C9A24D] block mb-2 font-medium">
            {collection.subtitle}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F2EA] font-normal tracking-wide group-hover:text-[#E0C27A] transition-colors duration-300">
            {collection.title}
          </h3>
          <p className="mt-3 text-xs sm:text-sm text-[#A1A1AA] font-light line-clamp-2 max-w-sm tracking-wider opacity-90 group-hover:text-[#D4D4D8] transition-colors duration-300">
            {collection.description}
          </p>

          {/* Gold Divider Line on hover */}
          <div className="w-0 h-px bg-[#C9A24D] my-4 group-hover:w-16 transition-all duration-500 ease-out" />

          {/* Explore Collection Link with Arrow */}
          <div className="inline-flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#F5F2EA] group-hover:text-[#C9A24D] transition-colors duration-300 pt-1 font-medium">
            <span>EXPLORE COLLECTION</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-[#C9A24D]" />
          </div>
        </div>
      </div>
    </div>
  );
};
