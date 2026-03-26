"use client"

import React, { useState, useRef } from "react"
import { DEMO_STAY_LISTINGS, DEMO_PACK_LISTINGS } from "@/data/listings"
import { StayDataType, PackDataType } from "@/data/types"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Star, Tag, Plane } from "lucide-react"

type TabType = "tours" | "packs"

const TourCard = ({ data, index }: { data: StayDataType; index: number }) => {
  const {
    title,
    price,
    address,
    reviewStart,
    reviewCount,
    listingCategory,
    href,
    like,
    galleryImgs,
  } = data

  const [isLiked, setIsLiked] = useState(like)

  const imageSrc = typeof galleryImgs?.[0] === 'string' 
    ? galleryImgs[0] 
    : galleryImgs?.[0]?.src 
    || "/images/agadir.jpg"

  return (
    <div className="group relative flex-shrink-0 w-[240px] md:w-[280px] lg:w-[320px]">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={index < 4}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors z-10"
        >
          <Heart 
            className={`w-4 h-4 ${isLiked ? "fill-orange-500 text-orange-500" : "text-white"}`} 
          />
        </button>

        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-900">
              {listingCategory?.name || "Tour"}
            </span>
            <div className="flex items-center gap-1 px-2 py-1 bg-orange-500 rounded-full text-xs font-medium text-white">
              <Star className="w-3 h-3 fill-white" />
              {reviewStart || "4.8"}
            </div>
          </div>
        </div>
      </div>

      <Link href={href} className="block mt-4">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <p className="text-xs text-orange-500 font-medium mb-1">
              {listingCategory?.name || "Agadir Tour"}
            </p>
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-1 mt-2 text-neutral-500 dark:text-neutral-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{address}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-orange-500">{price}</p>
            <p className="text-xs text-neutral-400">per person</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

const PackCard = ({ data, index }: { data: PackDataType; index: number }) => {
  const {
    title,
    subtitle,
    price,
    originalPrice,
    savings,
    address,
    duration,
    reviewStart,
    reviewCount,
    listingCategory,
    href,
    like,
    galleryImgs,
  } = data

  const [isLiked, setIsLiked] = useState(like)

  const imageSrc = typeof galleryImgs?.[0] === 'string' 
    ? galleryImgs[0] 
    : galleryImgs?.[0]?.src 
    || "/images/agadir.jpg"

  return (
    <div className="group relative flex-shrink-0 w-[240px] md:w-[280px] lg:w-[320px]">
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={index < 4}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors z-10"
        >
          <Heart 
            className={`w-4 h-4 ${isLiked ? "fill-orange-500 text-orange-500" : "text-white"}`} 
          />
        </button>

        {savings && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-orange-500 rounded-full z-10">
            <span className="text-xs font-bold text-white">{savings}</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-900">
              {listingCategory?.name || "Pack"} • {duration}
            </span>
            {!!reviewStart && (
              <div className="flex items-center gap-1 px-2 py-1 bg-orange-500 rounded-full text-xs font-medium text-white">
                <Star className="w-3 h-3 fill-white" />
                {reviewStart}
              </div>
            )}
          </div>
        </div>
      </div>

      <Link href={href} className="block mt-4">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <p className="text-xs text-orange-500 font-medium mb-1">
              {listingCategory?.name || "Pack"} • {duration}
            </p>
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-1">
              {subtitle}
            </p>
            <div className="flex items-center gap-1 mt-2 text-neutral-500 dark:text-neutral-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{address}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-400 line-through">{originalPrice}</p>
            <p className="text-lg font-bold text-orange-500">{price}</p>
            <p className="text-xs text-neutral-400">per person</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

const TourCardMobile = ({ data, index }: { data: StayDataType; index: number }) => {
  const {
    title,
    price,
    address,
    reviewStart,
    listingCategory,
    href,
    like,
    galleryImgs,
  } = data

  const [isLiked, setIsLiked] = useState(like)

  const imageSrc = typeof galleryImgs?.[0] === 'string' 
    ? galleryImgs[0] 
    : galleryImgs?.[0]?.src 
    || "/images/agadir.jpg"

  return (
    <Link href={href} className="group">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors z-10"
        >
          <Heart 
            className={`w-3.5 h-3.5 ${isLiked ? "fill-orange-500 text-orange-500" : "text-white"}`} 
          />
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-orange-500 rounded-full text-[10px] font-medium text-white">
          <Star className="w-3 h-3 fill-white" />
          {reviewStart || "4.8"}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-[10px] text-orange-500 font-medium">
          {listingCategory?.name || "Tour"}
        </p>
        <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1 mt-1 text-neutral-500 dark:text-neutral-400 text-xs">
          <MapPin className="w-3.5 h-3.5" />
          <span className="line-clamp-1">{address}</span>
        </div>
        <p className="text-sm font-bold text-orange-500 mt-1">{price}</p>
      </div>
    </Link>
  )
}

const PackCardMobile = ({ data, index }: { data: PackDataType; index: number }) => {
  const {
    title,
    subtitle,
    price,
    savings,
    address,
    duration,
    reviewStart,
    listingCategory,
    href,
    like,
    galleryImgs,
  } = data

  const [isLiked, setIsLiked] = useState(like)

  const imageSrc = typeof galleryImgs?.[0] === 'string' 
    ? galleryImgs[0] 
    : galleryImgs?.[0]?.src 
    || "/images/agadir.jpg"

  return (
    <Link href={href} className="group">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsLiked(!isLiked)
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors z-10"
        >
          <Heart 
            className={`w-3.5 h-3.5 ${isLiked ? "fill-orange-500 text-orange-500" : "text-white"}`} 
          />
        </button>

        {savings && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-orange-500 rounded-full z-10">
            <span className="text-[10px] font-bold text-white">{savings}</span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          {!!reviewStart && (
            <div className="flex items-center gap-1 px-2 py-1 bg-orange-500 rounded-full text-[10px] font-medium text-white">
              <Star className="w-3 h-3 fill-white" />
              {reviewStart}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <p className="text-[10px] text-orange-500 font-medium">
          {listingCategory?.name || "Pack"} • {duration}
        </p>
        <h3 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
          {subtitle}
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{address}</span>
          </div>
          <p className="text-sm font-bold text-orange-500">{price}</p>
        </div>
      </div>
    </Link>
  )
}

const TourAndPacksGrid = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>("tours")

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const tours = DEMO_STAY_LISTINGS
  const packs = DEMO_PACK_LISTINGS
  const currentData = activeTab === "tours" ? tours : packs
  const viewAllLink = activeTab === "tours" ? "/tours" : "/packs"
  const viewAllText = activeTab === "tours" ? "View All Tours" : "View All Packs"

  return (
    <section className="w-full overflow-hidden bg-white dark:bg-neutral-900 py-12 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header section - centered with pill tabs */}
        <div className="mb-8 md:mb-14">
          {/* Pill-shaped Tab Switcher - Orange, Centered */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-neutral-200 dark:bg-neutral-800 p-1 rounded-full">
              <button
                onClick={() => setActiveTab("tours")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "tours"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Tag className="w-4 h-4" />
                Tours
              </button>
              <button
                onClick={() => setActiveTab("packs")}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "packs"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Plane className="w-4 h-4" />
                Packs
              </button>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3 sm:mb-4">
              {activeTab === "tours" ? (
                <>Unforgettable <span className="font-serif italic text-orange-500">Adventures</span></>
              ) : (
                <>Curated <span className="font-serif italic text-orange-500">Packages</span></>
              )}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
              {activeTab === "tours"
                ? "Discover the hidden gems of Agadir with our handpicked selection of premium tours and authentic local experiences."
                : "Get the best value with our curated tour packages. Save up to 26% when you book multiple tours together."}
            </p>
          </div>
        </div>

        {/* Scroll controls and cards section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="hidden md:block w-64" />

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-3 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-orange-500 hover:text-orange-500 disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-400 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-3 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-orange-500 hover:text-orange-500 disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-400 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop: horizontal scroll */}
        <div className="hidden md:flex">
          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentData.map((item, index) => (
              <div key={item.id} className="snap-start">
                {activeTab === "tours" ? (
                  <TourCard data={item as StayDataType} index={index} />
                ) : (
                  <PackCard data={item as PackDataType} index={index} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {currentData.slice(0, 6).map((item, index) => (
            <div key={item.id}>
              {activeTab === "tours" ? (
                <TourCardMobile data={item as StayDataType} index={index} />
              ) : (
                <PackCardMobile data={item as PackDataType} index={index} />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:mt-12">
          <Link 
            href={viewAllLink}
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-orange-500 hover:text-white transition-colors text-sm sm:text-base"
          >
            {viewAllText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TourAndPacksGrid
