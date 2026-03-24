'use client'

import { ArrowRight, Compass, Waves, Mountain, Users, Star, Heart, Globe } from 'lucide-react'
import Image from 'next/image'

export default function About() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50 selection:bg-orange-500/30">
            <div className="w-full max-w-5xl px-6 py-12 md:px-8 lg:px-12 lg:py-16">
                
                {/* Header */}
                <div className="mb-16">
                    {/* Eyebrow */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-[1px] w-6 bg-orange-500/50" />
                        <span className="text-[10px] font-semibold tracking-[0.25em] text-orange-500 uppercase">
                            Our Story
                        </span>
                    </div>

                    <h1 className="mb-5 text-4xl font-medium tracking-tight text-white lg:text-5xl lg:leading-[1.1]">
                        Crafted for those <br />
                        <span className="font-serif italic text-orange-200">who seek more.</span>
                    </h1>
                    <p className="max-w-2xl text-[13.5px] font-light leading-relaxed text-zinc-400 sm:text-sm">
                        Born in Agadir, we're a team of passionate locals dedicated to sharing the soul of Morocco. From the golden shores of the Atlantic to the endless dunes of the Sahara, we curate experiences that transcend the ordinary.
                    </p>
                </div>

                {/* Visual Story Gallery */}
                <div className="mb-20 space-y-10">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="h-[1px] w-6 bg-orange-500/50" />
                        <span className="text-[10px] font-semibold tracking-[0.25em] text-orange-500 uppercase">
                            The Journey
                        </span>
                    </div>

                    {/* Hero - Full Width */}
                    <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden group">
                        <Image
                            src="/images/agadir.jpg"
                            alt="Agadir golden coast"
                            fill
                            sizes="100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8">
                            <div className="rounded-xl bg-zinc-950/60 backdrop-blur-md border border-white/10 px-6 py-4">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500 mb-1">Welcome to</p>
                                <p className="text-xl font-medium text-white">Morocco's Golden Coast</p>
                            </div>
                        </div>
                    </div>

                    {/* Row 1: Two Large Images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Surf */}
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group">
                            <Image
                                src="/images/surf.jpg"
                                alt="Surf in Agadir"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500 mb-1">Ride the Waves</p>
                                <p className="text-lg font-medium text-white">World-Class Surf</p>
                            </div>
                        </div>

                        {/* Beach Sunset */}
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group">
                            <Image
                                src="/images/beach-sunset.jpg"
                                alt="Beach sunset"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                            <div className="absolute bottom-6 left-6">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500 mb-1">Golden Hour</p>
                                <p className="text-lg font-medium text-white">Beach Sunsets</p>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Full Width Featured */}
                    <div className="relative w-full aspect-[2.5/1] rounded-2xl overflow-hidden group">
                        <Image
                            src="/images/birdview-agadir-beach&city.jpg"
                            alt="Aerial view of Agadir"
                            fill
                            sizes="100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-transparent to-zinc-950/60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-orange-500 mb-3">Discover</p>
                                <p className="text-2xl md:text-3xl font-serif italic text-white">Where land meets sea</p>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Three Equal Images */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Souk */}
                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden group">
                            <Image
                                src="/images/souk-lhad.jpg"
                                alt="Traditional souk"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                            <div className="absolute bottom-5 left-5">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">Culture</p>
                                <p className="text-base font-medium text-white">Vibrant Souks</p>
                            </div>
                        </div>

                        {/* Spices */}
                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden group">
                            <Image
                                src="/images/guy-selling-spices.jpg"
                                alt="Moroccan spices"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                            <div className="absolute bottom-5 left-5">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">Flavors</p>
                                <p className="text-base font-medium text-white">Spice Markets</p>
                            </div>
                        </div>

                        {/* Mountain */}
                        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden group">
                            <Image
                                src="/images/mountain.jpg"
                                alt="Atlas Mountains"
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                            <div className="absolute bottom-5 left-5">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">Nature</p>
                                <p className="text-base font-medium text-white">Atlas Mountains</p>
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Fishing Boats */}
                    <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden group">
                        <Image
                            src="/images/boats.jpg"
                            alt="Traditional fishing boats"
                            fill
                            sizes="100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500 mb-1">Heritage</p>
                            <p className="text-lg font-medium text-white">Fishing Boats</p>
                        </div>
                    </div>

                    {/* Row 5: Camel Ride Full Width */}
                    <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden group">
                        <Image
                            src="/images/guy-riding-camel-inbeach.jpg"
                            alt="Camel ride on beach"
                            fill
                            sizes="100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500 mb-1">Adventure</p>
                            <p className="text-lg font-medium text-white">Beach Rides</p>
                        </div>
                    </div>

                    {/* Row 6: Four Equal Images */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Leather */}
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden group">
                            <Image
                                src="/images/moroccan-leather-artisans.jpg"
                                alt="Leather artisans"
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">Crafts</p>
                                <p className="text-sm font-medium text-white">Artisans</p>
                            </div>
                        </div>

                        {/* Fishing */}
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden group">
                            <Image
                                src="/images/man-fishing.jpg"
                                alt="Local fisherman"
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">Local Life</p>
                                <p className="text-sm font-medium text-white">Fishermen</p>
                            </div>
                        </div>

                        {/* Harbor */}
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden group">
                            <Image
                                src="/images/large-boat-agadir-harbor.jpg"
                                alt="Agadir harbor"
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">Marina</p>
                                <p className="text-sm font-medium text-white">Harbor</p>
                            </div>
                        </div>

                        {/* Surf 2 */}
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden group">
                            <Image
                                src="/images/surf-2.jpg"
                                alt="Surf experience"
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-orange-500">Experience</p>
                                <p className="text-sm font-medium text-white">Learn to Surf</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What We Do - Three Columns */}
                <div className="mb-20">
                    <div className="mb-10 flex items-center gap-3">
                        <div className="h-[1px] w-6 bg-orange-500/50" />
                        <span className="text-[10px] font-semibold tracking-[0.25em] text-orange-500 uppercase">
                            What We Do
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Premium Tours */}
                        <div className="group rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 transition-transform duration-300 group-hover:scale-110">
                                <Compass className="h-5 w-5" />
                            </div>
                            <h3 className="mb-2 text-sm font-medium text-white">Premium Tours</h3>
                            <p className="text-[12px] leading-relaxed text-zinc-400">
                                Curated journeys through Morocco's most captivating destinations. From historic kasbahs to hidden gems off the beaten path.
                            </p>
                        </div>

                        {/* Surf Retreats */}
                        <div className="group rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 transition-transform duration-300 group-hover:scale-110">
                                <Waves className="h-5 w-5" />
                            </div>
                            <h3 className="mb-2 text-sm font-medium text-white">Surf Retreats</h3>
                            <p className="text-[12px] leading-relaxed text-zinc-400">
                                World-class waves for every level. Join local experts and experience the legendary swells of Morocco's Atlantic coast.
                            </p>
                        </div>

                        {/* Desert Adventures */}
                        <div className="group rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/60">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 transition-transform duration-300 group-hover:scale-110">
                                <Mountain className="h-5 w-5" />
                            </div>
                            <h3 className="mb-2 text-sm font-medium text-white">Desert Adventures</h3>
                            <p className="text-[12px] leading-relaxed text-zinc-400">
                                Journey into the Sahara for authentic Berber experiences. Camel treks, starlit camps, and timeless hospitality.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us - Editorial List Style */}
                <div className="mb-20">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="h-[1px] w-6 bg-orange-500/50" />
                        <span className="text-[10px] font-semibold tracking-[0.25em] text-orange-500 uppercase">
                            Why HM Tours
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800/80 overflow-hidden rounded-xl">
                        {/* Local Expertise */}
                        <div className="bg-zinc-900/80 p-5 hover:bg-zinc-900 transition-colors">
                            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
                                <Globe className="h-4 w-4" />
                            </div>
                            <h3 className="mb-1 text-xs font-semibold text-white uppercase tracking-wide">Local Roots</h3>
                            <p className="text-[11px] leading-relaxed text-zinc-400">
                                Born in Agadir. We know every street, every sunset spot, every hidden gem.
                            </p>
                        </div>

                        {/* Personalized */}
                        <div className="bg-zinc-900/80 p-5 hover:bg-zinc-900 transition-colors">
                            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
                                <Heart className="h-4 w-4" />
                            </div>
                            <h3 className="mb-1 text-xs font-semibold text-white uppercase tracking-wide">Tailored to You</h3>
                            <p className="text-[11px] leading-relaxed text-zinc-400">
                                Every itinerary is built around your vision, preferences, and travel style.
                            </p>
                        </div>

                        {/* Small Groups */}
                        <div className="bg-zinc-900/80 p-5 hover:bg-zinc-900 transition-colors">
                            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
                                <Users className="h-4 w-4" />
                            </div>
                            <h3 className="mb-1 text-xs font-semibold text-white uppercase tracking-wide">Intimate Groups</h3>
                            <p className="text-[11px] leading-relaxed text-zinc-400">
                                Small groups mean authentic connections and unforgettable shared moments.
                            </p>
                        </div>

                        {/* Safety */}
                        <div className="bg-zinc-900/80 p-5 hover:bg-zinc-900 transition-colors">
                            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
                                <Star className="h-4 w-4" />
                            </div>
                            <h3 className="mb-1 text-xs font-semibold text-white uppercase tracking-wide">Safety Assured</h3>
                            <p className="text-[11px] leading-relaxed text-zinc-400">
                                Licensed guides, vetted partners, and support available 24/7.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <a
                        href="/tours"
                        className="group flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-orange-600 active:scale-95 hover:shadow-lg hover:shadow-orange-500/30"
                    >
                        <span className="tracking-tight">Explore Experiences</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <a
                        href="/contact"
                        className="text-[13px] font-medium text-zinc-400 transition-colors hover:text-white"
                    >
                        Have questions? Get in touch →
                    </a>
                </div>

            </div>
        </section>
    )
}
