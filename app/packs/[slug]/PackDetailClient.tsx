"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPinIcon,
    StarIcon,
    ShareIcon,
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
    ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { MessageCircle } from "lucide-react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { PackDataType, StayDataType } from "@/data/types";
import StartRating from "@/components/StartRating";

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

function formatDate(d: Date | null) {
    if (!d) return null;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

interface PackDetailClientProps {
    pack: PackDataType;
}

export default function PackDetailClient({ pack }: PackDetailClientProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const minGuests = (pack as any).minGuests || 2;
    const [guests, setGuests] = useState(minGuests);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState<"form" | "success">("form");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    const priceMatch = pack.price.match(/(\d+)\s*€\s*\/\s*(\d+)\s*MAD/i);
    const priceEur = priceMatch ? parseInt(priceMatch[1]) : 0;
    const priceMad = priceMatch ? parseInt(priceMatch[2]) : 0;
    const originalPriceMatch = pack.originalPrice?.match(/[\d,]+/);
    const originalPrice = originalPriceMatch ? parseInt(originalPriceMatch[0].replace(/,/g, '')) : 0;

    const guestsTotal = guests * priceMad;
    const grandTotal = guestsTotal;

    const handleWhatsApp = () => {
        if (!selectedDate) {
            alert("Please select a date");
            return;
        }
        if (!customerName.trim() || !customerPhone.trim()) {
            alert("Please fill in your name and phone number");
            return;
        }

        const message = `Hello! I'd like to book the following pack:

Pack: ${pack.title}
Date: ${formatDate(selectedDate)}
Guests: ${guests} guest${guests !== 1 ? "s" : ""}
Total: ${grandTotal.toLocaleString()} MAD (${priceEur * guests} €)

Name: ${customerName}
Phone: ${customerPhone}`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/212609080257?text=${encodedMessage}`, '_blank');
        setBookingStep("success");
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % pack.galleryImgs.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + pack.galleryImgs.length) % pack.galleryImgs.length);
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-16">
            {/* Interactive Hero Gallery */}
            <div className="relative">
                {/* Main Image Slider */}
                <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden bg-white">
                    <div 
                        className="absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center p-4"
                        onMouseDown={(e) => {
                            const startX = e.clientX;
                            const handleMouseMove = (moveEvent: MouseEvent) => {
                                const diff = startX - moveEvent.clientX;
                                if (Math.abs(diff) > 50) {
                                    if (diff > 0) nextImage();
                                    else prevImage();
                                    document.removeEventListener('mousemove', handleMouseMove);
                                }
                            };
                            document.addEventListener('mousemove', handleMouseMove);
                        }}
                    >
                        <img 
                            src={pack.galleryImgs[currentImageIndex] as string} 
                            alt={pack.title}
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                    </div>
                    
                    {/* Navigation Arrows */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full text-black hover:bg-orange-500 hover:text-white transition-all"
                    >
                        <ChevronLeftIcon className="w-8 h-8" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full text-black hover:bg-orange-500 hover:text-white transition-all"
                    >
                        <ChevronRightIcon className="w-8 h-8" />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-white rounded-full text-black text-sm font-medium">
                        {currentImageIndex + 1} / {pack.galleryImgs.length}
                    </div>
                    
                    {/* View All Button */}
                    <button
                        onClick={() => setLightboxOpen(true)}
                        className="absolute top-4 right-4 px-4 py-2 bg-white rounded-full text-black text-sm font-medium hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2"
                    >
                        <ArrowsPointingOutIcon className="w-5 h-5" />
                        View All Photos
                    </button>
                </div>
                
                {/* Thumbnail Navigation */}
                <div className="max-w-7xl mx-auto px-4 py-4 bg-white">
                    <div className="flex justify-center gap-2 flex-wrap">
                        {pack.galleryImgs.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                                    currentImageIndex === idx 
                                    ? 'ring-2 ring-orange-500 scale-105' 
                                    : 'opacity-60 hover:opacity-100'
                                }`}
                            >
                                <img 
                                    src={img as string} 
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-medium">
                                    {pack.listingCategory?.name}
                                </span>
                                {pack.saleOff && (
                                    <span className="text-sm px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-medium">
                                        {pack.saleOff}
                                    </span>
                                )}
                            </div>
                            
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                                {pack.title}
                            </h1>
                            
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                                {pack.subtitle}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                                <div className="flex items-center gap-1.5">
                                    <MapPinIcon className="w-5 h-5" />
                                    <span>{pack.address}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{pack.duration}</span>
                                </div>
                                {!!pack.reviewStart && (
                                    <StartRating reviewCount={pack.reviewCount} point={pack.reviewStart} />
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                                About This Pack
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {pack.description}
                            </p>
                        </div>

                        {/* Highlights */}
                        {pack.highlights && pack.highlights.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                                    Highlights
                                </h2>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {pack.highlights.map((highlight, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <CheckIcon className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                                            <span className="text-neutral-600 dark:text-neutral-400">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:w-96">
                        <div className="sticky top-28 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-lg">
                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-orange-600">
                                        {pack.price}
                                    </span>
                                    <span className="text-lg text-neutral-400 line-through">
                                        {pack.originalPrice}
                                    </span>
                                </div>
                                {pack.savings && (
                                    <span className="inline-block mt-2 text-sm font-semibold text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                                        {pack.savings}
                                    </span>
                                )}
                            </div>

                            {bookingStep === "form" ? (
                                <>
                                    {/* Date Selection */}
                                    <div className="mb-5">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                            Select Date
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                            onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                                        />
                                    </div>

                                    {/* Guests */}
                                    <div className="mb-5">
                                        <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                                            <div>
                                                <p className="font-medium text-neutral-900 dark:text-white">Guests</p>
                                                <p className="text-sm text-neutral-500">{priceEur} € / {priceMad} MAD each</p>
                                                <p className="text-xs text-orange-600 mt-1" title={`This activity requires a minimum of ${minGuests} guests`}>Min. {minGuests} guests required</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setGuests(Math.max(minGuests, guests - 1))}
                                                    className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:border-orange-500 transition-colors"
                                                >
                                                    <MinusIcon className="w-4 h-4" />
                                                </button>
                                                <span className="w-6 text-center font-semibold">{guests}</span>
                                                <button
                                                    onClick={() => setGuests(Math.min(pack.maxGuests, guests + 1))}
                                                    className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:border-orange-500 transition-colors"
                                                >
                                                    <PlusIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="mb-5 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-neutral-500">Guests x {guests}</span>
                                            <span className="text-neutral-900 dark:text-white">{priceEur * guests} € / {guestsTotal} MAD</span>
                                        </div>
                                        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                                            <div className="flex justify-between font-semibold">
                                                <span className="text-neutral-900 dark:text-white">Total</span>
                                                <span className="text-orange-600">{priceEur * guests} € / {grandTotal.toLocaleString()} MAD</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="space-y-3 mb-5">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Book Button */}
                                    <button
                                        onClick={handleWhatsApp}
                                        className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        Book via WhatsApp
                                    </button>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <CheckIcon className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                                        Booking Sent!
                                    </h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                                        Your booking request has been sent via WhatsApp. We'll contact you soon!
                                    </p>
                                    <button
                                        onClick={() => setBookingStep("form")}
                                        className="text-orange-500 hover:text-orange-600 font-medium"
                                    >
                                        Book another pack
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
                    >
                        <XMarkIcon className="w-8 h-8" />
                    </button>
                    <button
                        onClick={prevImage}
                        className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors"
                    >
                        <ChevronLeftIcon className="w-10 h-10" />
                    </button>
                    <img
                        src={pack.galleryImgs[currentImageIndex] as string}
                        alt=""
                        className="max-w-[90vw] max-h-[90vh] object-contain"
                    />
                    <button
                        onClick={nextImage}
                        className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors"
                    >
                        <ChevronRightIcon className="w-10 h-10" />
                    </button>
                </div>
            )}
        </div>
    );
}
