import Link from 'next/link'
import React from 'react'

const GetApp = () => {
  return (
    <section className="w-full bg-neutral-900 py-12 lg:py-24 relative overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-full bg-pattern bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2 sm:mb-3">
            Start Your Journey
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
            Ready for Your <span className="font-serif italic text-orange-500">Adventure</span>?
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
            Discover the magic of Agadir with our curated tours and authentic experiences. 
            Let us help you create memories that will last a lifetime.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link 
              href="/tours"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors w-full sm:w-auto text-sm sm:text-base"
            >
              View All Tours
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-neutral-600 text-white font-medium hover:border-orange-500 hover:text-orange-500 transition-colors w-full sm:w-auto text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetApp
