"use client"

import React, { useState, useRef, useEffect } from "react"
import { DEMO_STAY_LISTINGS, DEMO_PACK_LISTINGS } from "@/data/listings"
import { StayDataType, PackDataType } from "@/data/types"
import Image from "next/image"
import Link from "next/link"
import { Heart, Tag, Plane, MapPin, Calendar } from "lucide-react"

type TabType = "tours" | "packs"

/* ─────────────────────────── TOUR CARD (desktop) ─────────────────────────── */
const TourCard = ({ data, index }: { data: StayDataType; index: number }) => {
  const { title, priceEur, priceMad, address, listingCategory, href, like, galleryImgs } = data
  const [isLiked, setIsLiked] = useState(like)

  const imageSrc =
    typeof galleryImgs?.[0] === "string"
      ? galleryImgs[0]
      : galleryImgs?.[0]?.src || "/images/agadir.jpg"

  return (
    <div className="flex-shrink-0 w-[280px] md:w-[300px]">
      <Link href={href} className="group block">
        <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-600 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-lg transition-all duration-300">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={index < 4}
            />
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(!isLiked)
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white transition-colors z-10 shadow-sm"
            >
              <Heart
                className={`w-4 h-4 ${isLiked ? "fill-orange-500 text-orange-500" : "text-neutral-600"}`}
              />
            </button>
          </div>

          <div className="p-3">
            <p className="text-[11px] font-medium text-orange-500 uppercase tracking-wide mb-2">
              {listingCategory?.name || "Tour"}
            </p>

            <h3 className="text-[15px] font-medium text-neutral-900 dark:text-white leading-snug mb-2">
              {title}
            </h3>

            <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs mb-4">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{address}</span>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[18px] font-semibold text-orange-500">
                  {priceEur} €
                </span>
                <span className="text-xs text-neutral-400">
                  / {priceMad} MAD
                </span>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
                <Calendar className="w-4 h-4" />
                Book Tour
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

/* ─────────────────────────── PACK CARD (desktop) ─────────────────────────── */
const PackCard = ({ data, index }: { data: PackDataType; index: number }) => {
  const { title, subtitle, price, originalPrice, savings, duration, listingCategory, href, like, galleryImgs } = data
  const euroPrice = price?.split("/")[0]?.trim() || price
  const [isLiked, setIsLiked] = useState(like)

  const imageSrc =
    typeof galleryImgs?.[0] === "string"
      ? galleryImgs[0]
      : galleryImgs?.[0]?.src || "/images/agadir.jpg"

  return (
    <div className="flex-shrink-0 w-[280px] md:w-[300px]">
      <Link href={href} className="group block">
        <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-600 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-lg transition-all duration-300">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={index < 4}
            />
            {savings && (
              <div className="absolute top-3 left-3 px-3 py-1 bg-orange-500 rounded-full z-10 shadow-sm">
                <span className="text-[10px] font-bold text-white text-center">{savings}</span>
              </div>
            )}
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(!isLiked)
              }}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white transition-colors z-10 shadow-sm"
            >
              <Heart
                className={`w-4 h-4 ${isLiked ? "fill-orange-500 text-orange-500" : "text-neutral-600"}`}
              />
            </button>
          </div>

          <div className="p-3">
            <p className="text-[11px] font-medium text-orange-500 uppercase tracking-wide mb-2">
              {listingCategory?.name || "Pack"}
            </p>

            <h3 className="text-[15px] font-medium text-neutral-900 dark:text-white leading-snug mb-2">
              {title}
            </h3>

            <div className="text-neutral-500 dark:text-neutral-400 text-xs mb-4 truncate">
              {subtitle}
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-[18px] font-semibold text-orange-500">
                  {euroPrice}
                </span>
                {originalPrice && (
                  <span className="text-xs text-neutral-400 line-through">
                    {originalPrice}
                  </span>
                )}
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
                <Calendar className="w-4 h-4" />
                Book Pack
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

/* ────────────────────────── TOUR CARD (mobile) ───────────────────────────── */
const TourCardMobile = ({ data, index }: { data: StayDataType; index: number }) => {
  const { title, priceEur, priceMad, address, listingCategory, href, like, galleryImgs } = data
  const [isLiked, setIsLiked] = useState(like)

  const imageSrc =
    typeof galleryImgs?.[0] === "string"
      ? galleryImgs?.[0]
      : galleryImgs?.[0]?.src || "/images/agadir.jpg"

  return (
    <Link href={href} className="block">
      <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-600">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white transition-colors z-10 shadow-sm"
          >
            <Heart
              className={`w-3.5 h-3.5 ${isLiked ? "fill-orange-500 text-orange-500" : "text-neutral-600"}`}
            />
          </button>
        </div>

        <div className="p-3">
          <p className="text-[10px] font-medium text-orange-500 uppercase tracking-wide mb-1.5">
            {listingCategory?.name || "Tour"}
          </p>

          <h3 className="text-sm font-medium text-neutral-900 dark:text-white leading-snug mb-1.5">
            {title}
          </h3>

          <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-[11px] mb-3">
            <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
            <span className="truncate">{address}</span>
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2.5">
            <div className="flex items-baseline gap-1.5 mb-2.5">
              <span className="text-base font-semibold text-orange-500">
                {priceEur} €
              </span>
              <span className="text-[10px] text-neutral-400">
                / {priceMad} MAD
              </span>
            </div>

            <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium transition-colors">
              <Calendar className="w-3 h-3" />
              Book Tour
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ────────────────────────── PACK CARD (mobile) ───────────────────────────── */
const PackCardMobile = ({ data, index }: { data: PackDataType; index: number }) => {
  const { title, subtitle, price, originalPrice, savings, duration, listingCategory, href, like, galleryImgs } = data
  const euroPrice = price?.split("/")[0]?.trim() || price
  const [isLiked, setIsLiked] = useState(like)

  const imageSrc =
    typeof galleryImgs?.[0] === "string"
      ? galleryImgs[0]
      : galleryImgs?.[0]?.src || "/images/agadir.jpg"

  return (
    <Link href={href} className="block">
      <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-600">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
          {savings && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-orange-500 rounded-full z-10 shadow-sm">
              <span className="text-[9px] font-bold text-white text-center">{savings}</span>
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white transition-colors z-10 shadow-sm"
          >
            <Heart
              className={`w-3.5 h-3.5 ${isLiked ? "fill-orange-500 text-orange-500" : "text-neutral-600"}`}
            />
          </button>
        </div>

        <div className="p-3">
          <p className="text-[10px] font-medium text-orange-500 uppercase tracking-wide mb-1.5">
            {listingCategory?.name || "Pack"}
          </p>

          <h3 className="text-sm font-medium text-neutral-900 dark:text-white leading-snug mb-1.5">
            {title}
          </h3>

          <div className="text-neutral-500 dark:text-neutral-400 text-[11px] mb-3 truncate">
            {subtitle}
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2.5">
            <div className="flex items-baseline gap-1.5 mb-2.5">
              <span className="text-base font-semibold text-orange-500">
                {euroPrice}
              </span>
              {originalPrice && (
                <span className="text-[10px] text-neutral-400 line-through">
                  {originalPrice}
                </span>
              )}
            </div>

            <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium transition-colors">
              <Calendar className="w-3 h-3" />
              Book Pack
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ─────────────────────────────── MAIN SECTION ────────────────────────────── */
const TourAndPacksGrid = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [activeTab, setActiveTab] = useState<TabType>("tours")
  const tabsRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const updateIndicator = () => {
      if (tabsRef.current) {
        const buttons = tabsRef.current.querySelectorAll(".tab-button")
        const activeIndex = activeTab === "tours" ? 0 : 1
        const activeBtn = buttons[activeIndex] as HTMLElement
        if (activeBtn) {
          setIndicatorStyle({ left: activeBtn.offsetLeft, width: activeBtn.offsetWidth })
        }
      }
    }
    updateIndicator()
    window.addEventListener("resize", updateIndicator)
    return () => window.removeEventListener("resize", updateIndicator)
  }, [activeTab])

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -400 : 400, behavior: "smooth" })
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

        {/* ── Header ── */}
        <div className="mb-4 md:mb-6">
          {/* Tab switcher */}
          <div className="flex justify-center mb-6">
            <div
              className="relative inline-flex bg-neutral-200 dark:bg-neutral-800 p-1 rounded-full"
              ref={tabsRef}
            >
              <div
                className="absolute top-1 bottom-1 bg-orange-500 rounded-full transition-all duration-300 ease-out"
                style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
              />
              <button
                onClick={() => setActiveTab("tours")}
                className={`tab-button relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 ${
                  activeTab === "tours"
                    ? "text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Tag className="w-4 h-4" />
                Tours
              </button>
              <button
                onClick={() => setActiveTab("packs")}
                className={`tab-button relative flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10 ${
                  activeTab === "packs"
                    ? "text-white"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Plane className="w-4 h-4" />
                Packs
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-6 mb-6">
            <div className="flex-1 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1 sm:mb-2">
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
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="p-3 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-orange-500 hover:text-orange-500 disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-400 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-3 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-orange-500 hover:text-orange-500 disabled:opacity-40 disabled:hover:border-neutral-200 disabled:hover:text-neutral-400 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Desktop: horizontal scroll ── */}
        <div className="hidden md:flex">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory animate-fadeIn"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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

        {/* ── Mobile: 2-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden animate-fadeIn">
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

        {/* ── View all CTA ── */}
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
