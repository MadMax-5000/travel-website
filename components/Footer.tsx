'use client'

import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden">
      {/* Black Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-orange-500/30" />

      <div className="relative padding-container max-container">
        <div className="py-16 lg:py-20">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block group mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full group-hover:bg-orange-500/30 transition-all" />
                    <Link
                      href="/"
                      className="text-2xl font-bold tracking-tighter text-white"
                    >
                      HM <span className="font-serif italic text-orange-200">Tours</span>
                    </Link>
                  </div>
                </div>
              </Link>
              <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
                Discover the magic of <span className="font-serif italic text-orange-400">Agadir</span> with unforgettable adventures, premium tours, and authentic Moroccan experiences.
              </p>

              {/* Social Links with Premium Styling */}
              <div className="flex items-center gap-3">
                {SOCIALS.links.map((link, index) => (
                  <Link
                    href="/"
                    key={index}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all hover:border-orange-500 hover:bg-orange-500/10 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
                  >
                    <Image
                      src={link}
                      alt="social"
                      width={18}
                      height={18}
                      className="transition-transform group-hover:scale-110 opacity-60 group-hover:opacity-100 brightness-0 invert"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                {FOOTER_LINKS.map((column, index) => (
                  <div key={index}>
                    <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
                      {column.title}
                    </h4>
                    <ul className="space-y-3">
                      {column.links.map((link) => (
                        <li key={link}>
                          <Link
                            href="/"
                            className="group inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-orange-400"
                          >
                            <span>{link}</span>
                            <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-3">
              <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-white">
                {FOOTER_CONTACT_INFO.title}
              </h4>
              <div className="space-y-4">
                {FOOTER_CONTACT_INFO.links.map((link) => {
                  const Icon = link.label === 'Email' ? Mail : link.label === 'Phone' ? Phone : MapPin
                  return (
                    <Link
                      href="/"
                      key={link.label}
                      className="group flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-white/5 hover:shadow-lg hover:shadow-orange-500/10"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 transition-all group-hover:bg-orange-500/30 group-hover:scale-110">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {link.label}
                        </p>
                        <p className="text-sm font-medium text-white break-words">
                          {link.value}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-gray-400">
                © {currentYear} <span className="font-serif italic text-orange-400">Agadir Travel</span>. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/"
                  className="text-gray-400 transition-colors hover:text-orange-400"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/"
                  className="text-gray-400 transition-colors hover:text-orange-400"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer