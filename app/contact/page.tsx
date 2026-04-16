'use client'

import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50 selection:bg-orange-500/30">
            <div className="w-full max-w-5xl px-6 py-12 md:px-8 lg:px-12 lg:py-16">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_400px] lg:gap-24 lg:items-center">

                    {/* Left Column: Brand & Info */}
                    <div className="flex flex-col">
                        {/* Eyebrow */}
                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-[1px] w-6 bg-orange-500/50" />
                            <span className="text-[10px] font-semibold tracking-[0.25em] text-orange-300 uppercase">
                                Client Services
                            </span>
                        </div>

                        {/* Typography */}
                        <h1 className="mb-5 text-4xl font-medium tracking-tight text-white lg:text-5xl lg:leading-[1.1]">
                            Curate your <br />
                            <span className="font-serif italic text-orange-100">experience.</span>
                        </h1>
                        <p className="mb-12 max-w-md text-[13.5px] font-light leading-relaxed text-zinc-400 sm:text-sm">
                            Every great adventure begins with a conversation. Share your vision, and our specialists will craft a Moroccan itinerary tailored entirely to you.
                        </p>

                        {/* Minimalist Editorial Contact List */}
                        <div className="flex flex-col">
                            {/* Email Row */}
                            <a
                                href="mailto:Ohmtours6@gmail.com"
                                className="group flex flex-col items-start justify-between gap-2 border-b border-zinc-800/80 py-4 transition-colors hover:border-zinc-600 sm:flex-row sm:items-center"
                            >
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-orange-300" />
                                    <span className="text-[13px] font-medium text-zinc-300 transition-colors group-hover:text-white">
                                        Ohmtours6@gmail.com
                                    </span>
                                </div>
                                <span className="text-[9px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">Email</span>
                            </a>

                            {/* Phone Row */}
                            <a
                                href="tel:+212656965754"
                                className="group flex flex-col items-start justify-between gap-2 border-b border-zinc-800/80 py-4 transition-colors hover:border-zinc-600 sm:flex-row sm:items-center"
                            >
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-orange-300" />
                                    <span className="text-[13px] font-medium text-zinc-300 transition-colors group-hover:text-white">
                                        +212 656 96 57 54
                                    </span>
                                </div>
                                <span className="text-[9px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">Phone</span>
                            </a>

                            {/* Office Row */}
                            <div className="group flex flex-col items-start justify-between gap-2 border-b border-zinc-800/80 py-4 transition-colors hover:border-zinc-600 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-orange-300" />
                                    <span className="text-[13px] font-medium text-zinc-300 transition-colors group-hover:text-white">
                                        Agadir Bay, Morocco
                                    </span>
                                </div>
                                <span className="text-[9px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">Office</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Form */}
                    <div className="flex flex-col">
                        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 shadow-2xl sm:p-6">
                            <h3 className="mb-6 text-sm font-medium text-white">Send an inquiry</h3>

                            <form className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="name" className="text-[10px] font-semibold tracking-wide text-zinc-400 uppercase">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Jane Doe"
                                        className="w-full rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-[13px] font-medium text-white outline-none transition-all placeholder:text-zinc-600 focus:border-orange-500/50 focus:bg-zinc-900"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="email" className="text-[10px] font-semibold tracking-wide text-zinc-400 uppercase">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="jane@example.com"
                                        className="w-full rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-[13px] font-medium text-white outline-none transition-all placeholder:text-zinc-600 focus:border-orange-500/50 focus:bg-zinc-900"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="message" className="text-[10px] font-semibold tracking-wide text-zinc-400 uppercase">
                                        Your Vision
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={3}
                                        placeholder="Tell us about the trip you'd like to experience..."
                                        className="w-full resize-none rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-2 text-[13px] font-medium text-white outline-none transition-all placeholder:text-zinc-600 focus:border-orange-500/50 focus:bg-zinc-900"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="group mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-zinc-950 transition-all duration-200 hover:bg-zinc-200 active:scale-[0.98]"
                                >
                                    <span className="text-[13px] font-semibold tracking-wide">Submit Inquiry</span>
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>

                                <p className="mt-2 text-center text-[10px] text-zinc-500">
                                    We typically respond within 24 hours.
                                </p>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}