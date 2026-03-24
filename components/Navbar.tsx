"use client"

import { useState, useEffect } from "react"
import { NAV_LINKS } from "@/constants"
import Link from "next/link"
import Image from "next/image"
import { Send, Menu, X } from "lucide-react"

const Navbar = () => {
  const [scrollDir, setScrollDir] = useState("up")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const threshold = 0
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScrollDir = () => {
      const scrollY = window.scrollY

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false
        return
      }

      setScrollDir(scrollY > lastScrollY && scrollY > 0 ? "down" : "up")
      lastScrollY = scrollY > 0 ? scrollY : 0
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir)
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <nav
        className={`max-container padding-container flex items-center justify-between fixed top-0 left-0 right-0 z-50 py-3 w-full bg-black border-b border-white/10 transition-transform duration-300 ${scrollDir === "down" ? "-translate-y-full" : "translate-y-0"
          }`}
      >
        <Link
          href="/"
          className="flex items-center"
        >
          <Image
            src="/ansof.png"
            alt="HM Tours Logo"
            width={140}
            height={60}
            className="h-10 w-auto object-contain"   // h-10 = 40px tall, width scales proportionally
          />
        </Link>

        <ul className="hidden gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.key}
              className="text-sm font-medium text-white/90 transition-colors hover:text-orange-300"
            >
              {link.label}
            </Link>
          ))}
        </ul>

        <div className="hidden lg:flexCenter">
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-5 py-2 text-orange-900 transition-all duration-300 hover:bg-orange-50 active:scale-95 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            <span className="font-medium text-sm tracking-tight">Contact Us</span>
            <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-white"
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={closeMenu}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-neutral-900 shadow-2xl transition-transform duration-300 ease-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <span className="text-lg font-semibold text-white">Menu</span>
            <button
              onClick={closeMenu}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-5 space-y-6">
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block text-lg font-medium text-white/80 hover:text-orange-300 transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-white/10">
              <Link
                href="/contact"
                onClick={closeMenu}
                className="flex items-center justify-center gap-3 w-full py-3.5 rounded-full bg-white text-orange-900 font-medium transition-all duration-300 hover:bg-orange-50"
              >
                <span>Contact Us</span>
                <Send className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
