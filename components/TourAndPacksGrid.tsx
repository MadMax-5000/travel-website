"use client"

import React, { useState, useRef, useEffect } from "react"
import { DEMO_STAY_LISTINGS, DEMO_PACK_LISTINGS } from "@/data/listings"
import { StayDataType, PackDataType } from "@/data/types"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, Tag, Plane, ArrowRight } from "lucide-react"

/* ─────────────────────────── TOUR CARD (desktop) ─────────────────────────── */
const TourCard = ({ data, index }: { data: StayDataType; index: number }) => {
  const { title, priceEur, priceMad, reviewStart, listingCategory, href, like, galleryImgs } = data
  const [isLiked, setIsLiked] = useState(like)

  const imageSrc =
    typeof galleryImgs?.[0] === "string"
      ? galleryImgs[0]
      : galleryImgs?.[0]?.src || "/images/agadir.jpg"

  return (
    <div className="flex-shrink-0 w-[300px] md:w-[340px] lg:w-[370px]">
      {/* Card shell */}
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden p-4 flex flex-col gap-4">

        {/* ── Rounded image ── */}
        <Link href={href} className="block relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority={index < 4}
          />
          {reviewStart > 0 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-800 dark:text-white shadow-sm">
              <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              {reviewStart}
            </div>
          )}
        </Link>

        {/* ── Text block ── */}
        <div className="px-1">
          <Link href={href}>
            <h3 className="font-bold text-lg leading-snug text-neutral-900 dark:text-white hover:text-orange-500 transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1 line-clamp-1">
            {listingCategory?.name || "Tour"}
          </p>
        </div>

        {/* ── Price row ── */}
        <div className="flex items-center gap-2 px-1">
          <Tag className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          <span className="text-sm text-neutral-500 dark:text-neutral-400">from</span>
          <span className="text-base font-bold text-neutral-900 dark:text-white">{priceEur} € / {priceMad} MAD</span>
        </div>

        {/* ── CTA row ── */}
        <div className="flex items-center gap-2 px-1 pb-1">
          <Link
            href={href}
            className="flex-1 flex items-center justify-center py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
          >
            Book Tour
          </Link>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full border-2 transition-colors ${
              isLiked
                ? "border-orange-500 bg-orange-50 dark:bg-orange-950"
                : "border-neutral-200 dark:border-neutral-600 hover:border-orange-400"
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? "fill-orange-500 text-orange-500" : "text-neutral-400"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── PACK CARD (desktop) ─────────────────────────── */
const PackCard = ({ data, index }: { data: PackDataType; index: number }) => {
  const { title, price, originalPrice, savings, duration, reviewStart, listingCategory, href, like, galleryImgs } = data
  const euroPrice = price?.split("/")[0]?.trim() || price
  const [isLiked, setIsLiked] = useState(like)

  const imageSrc =
    typeof galleryImgs?.[0] === "string"
      ? galleryImgs[0]
      : galleryImgs?.[0]?.src || "/images/agadir.jpg"

  return (
    <div className="flex-shrink-0 w-[300px] md:w-[340px] lg:w-[370px]">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden p-4 flex flex-col gap-4">

        {/* ── Rounded image ── */}
        <Link href={href} className="block relative aspect-[4/3] rounded-2xl overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority={index < 4}
          />
          {savings && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-neutral-900/80 dark:bg-white/90 backdrop-blur-sm rounded-full z-10 shadow-sm">
              <span className="text-xs font-bold text-white dark:text-neutral-900 text-center">{savings}</span>
            </div>
          )}
          {reviewStart > 0 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-800 dark:text-white shadow-sm">
              <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              {reviewStart}
            </div>
          )}
        </Link>

        {/* ── Text block ── */}
        <div className="px-1">
          <Link href={href}>
            <h3 className="font-bold text-lg leading-snug text-neutral-900 dark:text-white hover:text-orange-500 transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1 line-clamp-1">
            {listingCategory?.name || "Pack"}
            {duration ? ` · ${duration}` : ""}
          </p>
        </div>

        {/* ── Price row ── */}
        <div className="flex items-center gap-2 px-1">
          <Tag className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          <span className="text-sm text-neutral-500 dark:text-neutral-400">from</span>
          <span className="text-base font-bold text-neutral-900 dark:text-white">{euroPrice}</span>
          {originalPrice && (
            <span className="text-sm text-neutral-400 line-through ml-1">{originalPrice}</span>
          )}
        </div>

        {/* ── CTA row ── */}
        <div className="flex items-center gap-2 px-1 pb-1">
          <Link
            href={href}
            className="flex-1 flex items-center justify-center py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
          >
            Book Pack
          </Link>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full border-2 transition-colors ${
              isLiked
                ? "border-orange-500 bg-orange-50 dark:bg-orange-950"
                : "border-neutral-200 dark:border-neutral-600 hover:border-orange-400"
            }`}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? "fill-orange-500 text-orange-500" : "text-neutral-400"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────── TOUR CARD (mobile) ───────────────────────────── */
const TourCardMobile = ({ data, index }: { data: StayDataType; index: number }) => {
  const { title, price, reviewStart, listingCategory, href, like, galleryImgs } = data
  const euroPrice = price?.split("/")[0]?.trim() || price
  const [isLiked, setIsLiked] = useState(like)

  const imageSrc =
    typeof galleryImgs?.[0] === "string"
      ? galleryImgs[0]
      : galleryImgs?.[0]?.src || "/images/agadir.jpg"

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-md overflow-hidden p-3.5 flex flex-col gap-3.5">

      {/* Rounded image */}
      <Link href={href} className="block relative aspect-[4/3] rounded-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
        {reviewStart > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-800 dark:text-white shadow-sm">
            <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
            {reviewStart}
          </div>
        )}
      </Link>

      {/* Text */}
      <div className="px-0.5">
        <Link href={href}>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white hover:text-orange-500 transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        <p className="text-xs text-neutral-400 mt-0.5">{listingCategory?.name || "Tour"}</p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-1.5 px-0.5">
        <Tag className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
        <span className="text-xs text-neutral-500">from</span>
        <span className="text-sm font-bold text-neutral-900 dark:text-white">{euroPrice}</span>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 pb-0.5">
        <Link
          href={href}
          className="flex-1 flex items-center justify-center py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
        >
          Book Tour
        </Link>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border-2 transition-colors ${
            isLiked
              ? "border-orange-500 bg-orange-50 dark:bg-orange-950"
              : "border-neutral-200 dark:border-neutral-600"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isLiked ? "fill-orange-500 text-orange-500" : "text-neutral-400"}`}
          />
        </button>
      </div>
    </div>
  )
}

/* ────────────────────────── PACK CARD (mobile) ───────────────────────────── */
const PackCardMobile = ({ data, index }: { data: PackDataType; index: number }) => {
  const { title, price, originalPrice, savings, duration, reviewStart, listingCategory, href, like, galleryImgs } = data
  const euroPrice = price?.split("/")[0]?.trim() || price
  const [isLiked, setIsLiked] = useState(like)

  const imageSrc =
    typeof galleryImgs?.[0] === "string"
      ? galleryImgs[0]
      : galleryImgs?.[0]?.src || "/images/agadir.jpg"

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-md overflow-hidden p-3.5 flex flex-col gap-3.5">

      {/* Rounded image */}
      <Link href={href} className="block relative aspect-[4/3] rounded-2xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
        {savings && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-neutral-900/80 dark:bg-white/90 backdrop-blur-sm rounded-full z-10">
            <span className="text-xs font-bold text-white dark:text-neutral-900 text-center">{savings}</span>
          </div>
        )}
        {reviewStart > 0 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm rounded-full text-xs font-semibold text-neutral-800 dark:text-white shadow-sm">
            <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
            {reviewStart}
          </div>
        )}
      </Link>

      {/* Text */}
      <div className="px-0.5">
        <Link href={href}>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white hover:text-orange-500 transition-colors line-clamp-1">
            {title}
          </h3>
        </Link>
        <p className="text-xs text-neutral-400 mt-0.5">
          {listingCategory?.name || "Pack"}{duration ? ` · ${duration}` : ""}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-1.5 px-0.5">
        <Tag className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
        <span className="text-xs text-neutral-500">from</span>
        <span className="text-sm font-bold text-neutral-900 dark:text-white">{euroPrice}</span>
        {originalPrice && (
          <span className="text-xs text-neutral-400 line-through ml-1">{originalPrice}</span>
        )}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-2 pb-0.5">
        <Link
          href={href}
          className="flex-1 flex items-center justify-center py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
        >
          Book Pack
        </Link>
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border-2 transition-colors ${
            isLiked
              ? "border-orange-500 bg-orange-50 dark:bg-orange-950"
              : "border-neutral-200 dark:border-neutral-600"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isLiked ? "fill-orange-500 text-orange-500" : "text-neutral-400"}`}
          />
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────── TOURS SECTION ────────────────────────────── */
const ToursSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const tours = DEMO_STAY_LISTINGS

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

  return (
    <section className="w-full overflow-hidden bg-white dark:bg-neutral-900 py-12 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between gap-6 mb-4">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full text-xs font-semibold text-orange-600 dark:text-orange-400">
                  <Tag className="w-3 h-3" />
                  Tours
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
                Unforgettable <span className="font-serif italic text-orange-500">Adventures</span>
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
                Discover the hidden gems of Agadir with our handpicked selection of premium tours and authentic local experiences.
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
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tours.map((item, index) => (
              <div key={item.id} className="snap-start">
                <TourCard data={item} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: 2-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {tours.slice(0, 6).map((item, index) => (
            <div key={item.id}>
              <TourCardMobile data={item} index={index} />
            </div>
          ))}
        </div>

        {/* ── View all CTA ── */}
        <div className="flex justify-center mt-8 md:mt-12">
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-orange-500 hover:text-white transition-colors text-sm sm:text-base"
          >
            View All Tours
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────── PACKS SECTION ────────────────────────────── */
const PacksSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const packs = DEMO_PACK_LISTINGS

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

  return (
    <section className="w-full overflow-hidden bg-neutral-50 dark:bg-neutral-950 py-12 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between gap-6 mb-4">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full text-xs font-semibold text-orange-600 dark:text-orange-400">
                  <Plane className="w-3 h-3" />
                  Packages
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
                Curated <span className="font-serif italic text-orange-500">Packages</span>
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
                Get the best value with our curated tour packages. Save up to 26% when you book multiple tours together.
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
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {packs.map((item, index) => (
              <div key={item.id} className="snap-start">
                <PackCard data={item} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile: 2-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {packs.slice(0, 6).map((item, index) => (
            <div key={item.id}>
              <PackCardMobile data={item} index={index} />
            </div>
          ))}
        </div>

        {/* ── View all CTA ── */}
        <div className="flex justify-center mt-8 md:mt-12">
          <Link
            href="/packs"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors text-sm sm:text-base"
          >
            View All Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────── MAIN COMPONENT ────────────────────────────── */
const TourAndPacksGrid = () => {
  return (
    <>
      <ToursSection />
      <PacksSection />
    </>
  )
}

export default TourAndPacksGrid