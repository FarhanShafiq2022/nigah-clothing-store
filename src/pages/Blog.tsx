import React, { useState, useMemo } from 'react';
import { Clock, User, Calendar, ArrowRight, X, BookOpen, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { BlogPost } from '../types';
import { useNavigation } from '../context/NavigationContext';

const BLOG_CATEGORIES = ['ALL', 'CRAFT & HERITAGE', 'HAUTE COUTURE', 'TAILORING', 'SUSTAINABILITY'];

export const Blog: React.FC = () => {
  const { navigate } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'ALL') return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category.toUpperCase() === selectedCategory);
  }, [selectedCategory]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="py-28 sm:py-36 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto text-[#F5F2EA]">
      {/* Breadcrumb */}
      <div className="flex items-center justify-center sm:justify-start space-x-2 text-[10px] tracking-[0.25em] text-[#888] uppercase mb-8 font-light">
        <button onClick={() => navigate('/')} className="hover:text-[#C9A24D] transition-colors cursor-pointer">
          Home
        </button>
        <span>/</span>
        <span className="text-[#C9A24D]">Editorial Journal</span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[10px] tracking-[0.35em] text-[#C9A24D] uppercase block mb-3 font-medium">
          THE ATELIER JOURNAL
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#F5F2EA] tracking-wide font-normal mb-4">
          Chronicles of Craft & Haute Couture
        </h1>
        <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
          Essays on botanical dyes, handloom silk preservation, bespoke tailoring philosophies, and contemporary Eastern design.
        </p>
      </div>

      {/* Featured Article Banner */}
      {featuredPost && (
        <div
          onClick={() => setActiveArticle(featuredPost)}
          className="mb-20 bg-[#0E0E0E] border border-[#222] hover:border-[#C9A24D]/50 transition-all duration-500 cursor-pointer overflow-hidden group grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 relative aspect-16/10 overflow-hidden bg-[#161616]">
            <img
              src={featuredPost.coverImage}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-[#0A0A0A]/90 border border-[#C9A24D]/40 text-[#C9A24D] text-[9px] tracking-[0.25em] uppercase font-medium px-3 py-1 backdrop-blur-sm">
                FEATURED ESSAY
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 text-[10px] tracking-[0.2em] text-[#888] uppercase mb-4">
                <span className="text-[#C9A24D]">{featuredPost.category}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{featuredPost.readTime}</span>
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F2EA] group-hover:text-[#E0C27A] transition-colors leading-snug mb-4">
                {featuredPost.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed line-clamp-3 mb-6">
                {featuredPost.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-[#1F1F1F] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#F5F2EA] block font-serif tracking-wider">
                  {featuredPost.author}
                </span>
                <span className="text-[10px] text-[#777] font-light tracking-wide block">
                  {featuredPost.authorRole}
                </span>
              </div>
              <span className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] text-[#C9A24D] group-hover:underline">
                <span>READ STORY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
        {BLOG_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#C9A24D] text-[#0A0A0A]'
                  : 'bg-[#111] border border-[#262626] text-[#A1A1AA] hover:text-[#F5F2EA] hover:border-[#444]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-24">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setActiveArticle(post)}
            className="group flex flex-col bg-[#0E0E0E] border border-[#1E1E1E] hover:border-[#C9A24D]/50 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-[#161616]">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-[#0A0A0A]/90 text-[9px] tracking-[0.2em] text-[#C9A24D] uppercase px-2.5 py-1 border border-[#C9A24D]/30 backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 text-[10px] text-[#777] mb-3">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="font-serif text-lg text-[#F5F2EA] group-hover:text-[#E0C27A] transition-colors leading-snug mb-3">
                  {post.title}
                </h3>

                <p className="text-xs text-[#8E8E8E] font-light leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#AAA] font-light">{post.author}</span>
                <span className="text-[#C9A24D] text-[10px] tracking-[0.2em] uppercase font-medium flex items-center space-x-1 group-hover:underline">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 overflow-y-auto"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-[#0E0E0E] border border-[#C9A24D]/40 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 text-[#888] hover:text-[#C9A24D] transition-colors p-1 cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-[10px] tracking-[0.2em] text-[#888] uppercase">
                <span className="text-[#C9A24D]">{activeArticle.category}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl text-[#F5F2EA] leading-tight">
                {activeArticle.title}
              </h2>

              <div className="flex items-center space-x-3 py-3 border-y border-[#1F1F1F]">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[#C9A24D] font-serif text-sm">
                  {activeArticle.author.charAt(0)}
                </div>
                <div>
                  <span className="text-sm text-[#F5F2EA] font-serif block">{activeArticle.author}</span>
                  <span className="text-[10px] text-[#777] font-light">{activeArticle.authorRole}</span>
                </div>
              </div>

              <div className="aspect-video w-full overflow-hidden bg-[#161616] border border-[#222]">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Essay Body */}
              <div className="text-sm sm:text-base text-[#D4D4D4] font-light leading-relaxed space-y-4 whitespace-pre-line pt-2">
                {activeArticle.content}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-[#1F1F1F] flex items-center flex-wrap gap-2">
                <span className="text-[10px] tracking-widest text-[#666] uppercase mr-2">Tags:</span>
                {activeArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-[#161616] border border-[#262626] text-[10px] text-[#E0C27A] tracking-wider"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
