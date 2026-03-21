'use client'

import { ArrowDown } from 'lucide-react'
import Image from 'next/image'

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">

      {/* 1. BACKGROUND with Cinematic Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="images/agadir.jpg"
          alt="Agadir Bay"
          fill
          className="object-cover"
          priority
        />
        {/* A radial gradient that focuses light in the center and darkens the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/20 via-black/50 to-black/80" />
      </div>

      {/* 2. MAIN CONTENT - Centered & Elegant */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center px-4">

        {/* Small Pill Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-md transition-transform hover:scale-105 cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
          </span>
          <span className="text-xs font-medium tracking-wide text-white uppercase">Season Starts Now</span>
        </div>

        {/* Headline */}
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
          Agadir <span className="font-serif italic text-orange-200">Awaits</span>
        </h1>

        {/* Subtext - clean and readable */}
        <p className="max-w-2xl text-lg text-gray-200 md:text-xl font-light leading-relaxed mb-10">
          Escape to Morocco's golden coast. We curate premium tours, surf retreats, and desert adventures tailored just for you.
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToContent}
          className="group relative inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-orange-600 active:scale-95 hover:shadow-lg hover:shadow-orange-500/30"
        >
          <span className="tracking-tight">Explore Packages</span>
          <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 cursor-pointer transition-opacity hover:opacity-80"
        onClick={scrollToContent}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">Scroll</span>
          <div className="flex h-[40px] w-[24px] justify-center rounded-full border border-white/30 bg-white/5 p-1 backdrop-blur-sm">
            <div className="h-2 w-1 rounded-full bg-white animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero