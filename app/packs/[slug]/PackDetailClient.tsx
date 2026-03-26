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
} from "@heroicons/react/24/outline";
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
    const [adults, setAdults] = useState(2);
    const [kids, setKids] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState<"form" | "success">("form");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    const priceMatch = pack.price.match(/[\d,]+/);
    const originalPriceMatch = pack.originalPrice.match(/[\d,]+/);
    const priceAdult = priceMatch ? parseInt(priceMatch[0].replace(/,/g, '')) : 0;
    const originalPrice = originalPriceMatch ? parseInt(originalPriceMatch[0].replace(/,/g, '')) : 0;
    const priceKid = Math.round(priceAdult * 0.5);

    const totalGuests = adults + kids;
    const adultsTotal = adults * priceAdult;
    const kidsTotal = kids * priceKid;
    const grandTotal = adultsTotal + kidsTotal;

    const handleWhatsApp = () => {
        if (!selectedDate) {
            alert("Please select a date");
            return;
        }
        if (!customerName.trim() || !customerPhone.trim()) {
            alert("Please fill in your name and phone number");
            return;
        }

        const tourList = pack.tours.map(t => t.title).join(", ");
        const message = `*New Pack Booking Request*\n\n*Pack:* ${pack.title}\n*Included Tours:* ${tourList}\n*Date:* ${formatDate(selectedDate)}\n*Adults:* ${adults}\n*Kids:* ${kids}\n*Total:* ${grandTotal.toLocaleString()} MAD\n\n*Customer Info:*\n*Name:* ${customerName}\n*Phone:* ${customerPhone}`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/212661223344?text=${encodedMessage}`, '_blank');
        setBookingStep("success");
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % pack.galleryImgs.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + pack.galleryImgs.length) % pack.galleryImgs.length);
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Image Gallery */}
            <div className="relative h-[50vh] sm:h-[60vh]">
                <div 
                    className="absolute inset-0 bg-cover bg-center cursor-pointer"
                    style={{ backgroundImage: `url(${pack.galleryImgs[currentImageIndex]})` }}
                    onClick={() => setLightboxOpen(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Navigation Arrows */}
                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-white" />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
                >
                    <ChevronRightIcon className="w-6 h-6 text-white" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-white text-sm">
                    {currentImageIndex + 1} / {pack.galleryImgs.length}
                </div>

                {/* Back Button */}
                <Link
                    href="/packs"
                    className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition-colors"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-white" />
                </Link>
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
                                    <span className="text-sm px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">
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
                                            <CheckIcon className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                            <span className="text-neutral-600 dark:text-neutral-400">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Included Tours */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
                                Included Tours ({pack.tours.length})
                            </h2>
                            <div className="space-y-4">
                                {pack.tours.map((tour, idx) => (
                                    <Link
                                        key={idx}
                                        href={tour.href}
                                        className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-orange-500 transition-colors group"
                                    >
                                        <div className="w-16 h-16 rounded-xl bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0">
                                            <img
                                                src={tour.featuredImage as string}
                                                alt={tour.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-orange-500 transition-colors">
                                                {tour.title}
                                            </h3>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                                                {tour.address}
                                            </p>
                                        </div>
                                        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400 shrink-0">
                                            {tour.price}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
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
                                    <span className="inline-block mt-2 text-sm font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
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
                                    <div className="mb-5 space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                                            <div>
                                                <p className="font-medium text-neutral-900 dark:text-white">Adults</p>
                                                <p className="text-sm text-neutral-500">{priceAdult} MAD each</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setAdults(Math.max(1, adults - 1))}
                                                    className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:border-orange-500 transition-colors"
                                                >
                                                    <MinusIcon className="w-4 h-4" />
                                                </button>
                                                <span className="w-6 text-center font-semibold">{adults}</span>
                                                <button
                                                    onClick={() => setAdults(Math.min(pack.maxGuests, adults + 1))}
                                                    className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:border-orange-500 transition-colors"
                                                >
                                                    <PlusIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                                            <div>
                                                <p className="font-medium text-neutral-900 dark:text-white">Kids</p>
                                                <p className="text-sm text-neutral-500">{priceKid} MAD each (50% off)</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setKids(Math.max(0, kids - 1))}
                                                    className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:border-orange-500 transition-colors"
                                                >
                                                    <MinusIcon className="w-4 h-4" />
                                                </button>
                                                <span className="w-6 text-center font-semibold">{kids}</span>
                                                <button
                                                    onClick={() => setKids(Math.min(pack.maxGuests - adults, kids + 1))}
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
                                            <span className="text-neutral-500">Adults x {adults}</span>
                                            <span className="text-neutral-900 dark:text-white">{adultsTotal} MAD</span>
                                        </div>
                                        {kids > 0 && (
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-neutral-500">Kids x {kids}</span>
                                                <span className="text-neutral-900 dark:text-white">{kidsTotal} MAD</span>
                                            </div>
                                        )}
                                        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                                            <div className="flex justify-between font-semibold">
                                                <span className="text-neutral-900 dark:text-white">Total</span>
                                                <span className="text-orange-600">{grandTotal.toLocaleString()} MAD</span>
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
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.173-.15.297-.347.396-.561.099-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.027 6.974 2.898 1.85 1.87 3.81 3.85 4.602 5.932 1.211 1.21 1.864 2.751 2.105 4.155.241 1.404.241 2.866-.104 4.16-.348 1.293-1.162 2.738-1.994 3.583l-.362.214-4.453-.968.652 3.403a9.88 9.88 0 01-2.996 5.093l-.374.213c-.296.149-1.758.868-2.031.968-.273.099-.471.148-.67.15-.197.297-.767.966-.941 1.164-.173.199-.346.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.173-.15.296-.347.396-.561.099-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                                        </svg>
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
