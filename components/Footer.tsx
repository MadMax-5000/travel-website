'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Facebook, Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react'

const FOOTER_PACKS = ['Nomad Spirits', 'Epic Dunes Journey', 'The Night Loop', 'Taghazoute']

const FOOTER_TOURS = [
  'Quad Bike in Desert',
  'Buggy in Desert',
  'Camel Riding',
  'Sandboarding',
  'Boat Trip',
  'Paradis Valley',
  'Marrakech Day Trip',
  ' Essaouira Day Trip'
]

const FOOTER_COMPANY = ['About Us', 'Contact', 'FAQs', 'Careers', 'Privacy Policy']

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer className="bg-black text-white overflow-hidden">

      {/* ── STATEMENT HERO ── */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

            {/* Big type */}
            <div className="flex-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-orange-500 mb-5">
                Agadir, Morocco
              </p>
              <h2
                className="text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] font-light leading-[0.92] tracking-tight"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
              >
                Your next<br />
                <em className="text-orange-500">adventure</em><br />
                starts here.
              </h2>
            </div>

            {/* Newsletter */}
            <div className="lg:w-72 shrink-0 pb-2">
              <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
                From the Sahara to the Atlantic — we craft journeys worth remembering.
              </p>
              {subscribed ? (
                <p className="text-sm text-orange-400">You're on the list — thank you.</p>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-600 mb-2.5">
                    Stay in the loop
                  </label>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 min-w-0 bg-white/[0.04] border border-white/[0.08] border-r-0 px-4 py-3 text-sm text-white placeholder-neutral-700 outline-none focus:border-orange-500/40 transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 transition-colors px-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white whitespace-nowrap"
                    >
                      Join
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── LINKS GRID ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.06] border-b border-white/[0.06]">

          <div className="py-10 pr-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600 mb-6">Packs</p>
            <ul className="space-y-3">
              {FOOTER_PACKS.slice(0, 4).map((item) => (
                <li key={item}>
                  <Link href={`/packs/${item.toLowerCase().replace(/ /g, '-')}`} className="group relative inline-block text-[13px] text-neutral-500 hover:text-white transition-colors">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="py-10 px-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600 mb-6">Tours</p>
            <ul className="space-y-3">
              {FOOTER_TOURS.slice(0, 6).map((item) => (
                <li key={item}>
                  <Link href={`/tours/${item.toLowerCase().replace(/ /g, '-')}`} className="group relative inline-block text-[13px] text-neutral-500 hover:text-white transition-colors">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="py-10 px-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600 mb-6">Company</p>
            <ul className="space-y-3">
              {FOOTER_COMPANY.map((item) => (
                <li key={item}>
                  <Link href="/" className="group relative inline-block text-[13px] text-neutral-500 hover:text-white transition-colors">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="py-10 pl-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600 mb-6">Contact</p>
            <ul className="space-y-5">
              {[
                { label: 'Phone', value: '+212 656 96 57 54', href: 'tel:+212656965754' },
                { label: 'Email', value: 'Ohmtours6@gmail.com', href: 'mailto:Ohmtours6@gmail.com' },
                { label: 'Location', value: 'Agadir, Morocco', href: null },
              ].map(({ label, value, href }) => (
                <li key={label}>
                  {href ? (
                    <Link href={href} className="group flex items-center w-fit gap-0.5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-700">{label}</span>
                        <span className="text-[13px] text-neutral-500 group-hover:text-white transition-colors">{value}</span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-orange-500 self-end mb-0.5" />
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-700">{label}</span>
                      <span className="text-[13px] text-neutral-500">{value}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 py-6">

          <div className="flex items-center gap-5">
            <Link href="/">
              <Image src="/ansof.png" alt="OHM Tours" width={90} height={36} className="h-6 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity" />
            </Link>
            <span className="text-[12px] text-neutral-700">© {currentYear} OHM Tours</span>
          </div>

          <div className="flex items-center gap-6">
            {[
              { Icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
              { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
              { Icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
              { Icon: Youtube, label: 'Youtube', href: 'https://youtube.com' },
            ].map(({ Icon, label, href }) => (
              <Link key={href} href={href} target="_blank" className="group flex items-center w-fit text-neutral-700 hover:text-orange-500 transition-colors">
                <Icon className="h-[15px] w-[15px]" />
                <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Cookies'].map((label) => (
              <Link key={label} href="/" className="group relative inline-block text-[12px] text-neutral-700 hover:text-neutral-400 transition-colors">
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer