"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useEffect, useState } from "react"
import Image from "next/image"

const HIGHLIGHTS_SLIDES = [
  {
    id: 1,
    image: "/images/agadir.jpg",
    title: "Morocco's Golden Coast",
    subtitle: "Discover pristine beaches and endless sunshine",
  },
  {
    id: 2,
    image: "/images/surf.jpg",
    title: "World-Class Surfing",
    subtitle: "Ride the legendary waves of the Atlantic",
  },
  {
    id: 3,
    image: "/images/mountain.jpg",
    title: "Atlas Mountains Adventure",
    subtitle: "Explore breathtaking mountain landscapes",
  },
  {
    id: 4,
    image: "/images/beach-sunset.jpg",
    title: "Unforgettable Sunsets",
    subtitle: "Experience magical golden hour moments",
  },
  {
    id: 5,
    image: "/images/souk-lhad.jpg",
    title: "Rich Culture & Heritage",
    subtitle: "Immerse yourself in authentic Moroccan souks",
  },
]

const Highlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useGSAP(() => {
    gsap.to(".link", { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 })
  }, [])

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev < HIGHLIGHTS_SLIDES.length - 1 ? prev + 1 : 0
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => 
      prev > 0 ? prev - 1 : HIGHLIGHTS_SLIDES.length - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prev) => 
      prev < HIGHLIGHTS_SLIDES.length - 1 ? prev + 1 : 0
    )
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <section className="w-full overflow-hidden bg-white dark:bg-neutral-900 py-12 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Experience the Best of Agadir
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-base sm:text-lg leading-relaxed mt-3 sm:mt-4">
              Immerse yourself in the beauty and culture of Morocco's premier coastal destination. From golden beaches to mountain adventures.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={togglePause}
              className="link flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-orange-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm font-medium"
            >
              {isPaused ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Play
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  Pause
                </>
              )}
            </button>
          </div>
        </div>

        <div className="relative w-full h-[280px] sm:h-[320px] md:h-[400px] lg:h-[550px] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden">
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {HIGHLIGHTS_SLIDES.map((slide, i) => (
              <div
                key={slide.id}
                className="relative w-full h-full flex-shrink-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-4 sm:left-6 md:left-10 max-w-xl">
                  <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-lg text-white/80">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 absolute top-4 left-1/2 -translate-x-1/2 z-10">
            {HIGHLIGHTS_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`relative h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                  currentIndex === i 
                    ? "w-6 md:w-8 lg:w-12 bg-orange-500" 
                    : "w-2 md:w-3 bg-white/50 hover:bg-white/80"
                }`}
              >
                {currentIndex === i && (
                  <span className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-50" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={goToPrev}
            className="absolute left-2 sm:left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mobile pause button */}
        <div className="flex justify-center mt-4 md:hidden">
          <button
            onClick={togglePause}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-orange-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm font-medium"
          >
            {isPaused ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
                Pause
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Highlights
