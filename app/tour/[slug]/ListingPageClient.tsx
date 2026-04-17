"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
    MapPinIcon,
    StarIcon,
    ShareIcon,
    CheckIcon,
    ClockIcon,
    CalendarDaysIcon,
    UserIcon,
    PhoneIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
    SunIcon,
    ChatBubbleOvalLeftIcon,
    TruckIcon,
    UserGroupIcon,
    SparklesIcon,
    ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import ItineraryTimeline from "@/components/ItineraryTimeline";

interface ListingPageClientProps {
    listing: any;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
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

function MiniCalendar({
    selected,
    onSelect,
}: {
    selected: Date | null;
    onSelect: (d: Date) => void;
}) {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());

    const firstDow = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    const prev = () => {
        if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
        else setViewMonth(m => m - 1);
    };
    const next = () => {
        if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
        else setViewMonth(m => m + 1);
    };

    const cells: (Date | null)[] = [
        ...Array(firstDow).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
    ];

    return (
        <div className="p-5 select-none">
            <div className="flex items-center justify-between mb-5">
                <button
                    onClick={prev}
                    type="button"
                    className="p-2 rounded-full hover:bg-orange-50 dark:hover:bg-orange-800/30 transition-colors"
                >
                    <ChevronLeftIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                <span className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
                    {MONTHS[viewMonth]} {viewYear}
                </span>
                <button
                    onClick={next}
                    type="button"
                    className="p-2 rounded-full hover:bg-orange-50 dark:hover:bg-orange-800/30 transition-colors"
                >
                    <ChevronRightIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
                {DAYS.map(d => (
                    <div key={d} className="text-center text-[11px] font-semibold text-neutral-400 py-2">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
                {cells.map((date, i) => {
                    if (!date) return <div key={i} />;
                    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const isSel = selected ? isSameDay(date, selected) : false;
                    const isToday = isSameDay(date, today);

                    return (
                        <button
                            key={i}
                            type="button"
                            disabled={isPast}
                            onClick={() => onSelect(date)}
                            className={`
                                mx-auto w-9 h-9 rounded-full text-[14px] font-medium transition-all duration-200
                                flex items-center justify-center
                                ${isPast ? "text-neutral-300 dark:text-neutral-600 cursor-not-allowed" : "cursor-pointer"}
                                ${isSel
                                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                                    : isToday && !isPast
                                        ? "border-2 border-orange-500 text-orange-500 dark:text-orange-400 font-semibold"
                                        : !isPast
                                            ? "hover:bg-orange-50 dark:hover:bg-orange-800/30 text-neutral-700 dark:text-neutral-300"
                                            : ""
                                }
                            `}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function CounterRow({
    label,
    sublabel,
    value,
    min,
    max,
    onChange,
}: {
    label: string;
    sublabel: string;
    value: number;
    min: number;
    max: number;
    onChange: (v: number) => void;
}) {
    return (
        <div className="flex items-center justify-between py-4">
            <div>
                <p className="text-[15px] font-medium text-neutral-900 dark:text-neutral-100">{label}</p>
                <p className="text-[13px] text-neutral-500">{sublabel}</p>
            </div>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => onChange(Math.max(min, value - 1))}
                    disabled={value <= min}
                    className="w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-600
                        flex items-center justify-center transition-all
                        hover:border-orange-500 hover:text-orange-700 dark:hover:border-orange-400 dark:hover:text-orange-400
                        disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:text-neutral-700"
                >
                    <MinusIcon className="w-4 h-4" />
                </button>
                <span className="w-6 text-center text-[16px] font-semibold text-neutral-900 dark:text-neutral-100">
                    {value}
                </span>
                <button
                    type="button"
                    onClick={() => onChange(Math.min(max, value + 1))}
                    disabled={value >= max}
                    className="w-9 h-9 rounded-full border border-neutral-300 dark:border-neutral-600
                        flex items-center justify-center transition-all
                        hover:border-orange-500 hover:text-orange-700 dark:hover:border-orange-400 dark:hover:text-orange-400
                        disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:text-neutral-700"
                >
                    <PlusIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

function MobileBookingModal({
    isOpen,
    onClose,
    selectedDate,
    onDateSelect,
    guests,
    onGuestsChange,
    maxGuests,
    priceMad,
    priceEur,
    listingTitle,
    onWhatsApp,
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedDate: Date | null;
    onDateSelect: (date: Date | null) => void;
    guests: number;
    onGuestsChange: (n: number) => void;
    maxGuests: number;
    priceMad: number;
    priceEur: number;
    listingTitle: string;
    onWhatsApp: (name: string, phone: string) => void;
}) {
    const [step, setStep] = useState<"form" | "success">("form");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (isOpen) {
            setStep("form");
            setName("");
            setPhone("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const fmt = (mad: number, includeEur = true) => includeEur ? `${priceEur} € / ${mad.toLocaleString("en-US")} MAD` : `${mad.toLocaleString("en-US")} MAD`;
    const guestsTotal = guests * priceMad;
    const grandTotal = guestsTotal;

    const handleSubmit = () => {
        if (!selectedDate) {
            alert("Please select a date");
            return;
        }
        if (!name.trim() || !phone.trim()) {
            alert("Please fill in your name and phone number");
            return;
        }
        onWhatsApp(name, phone);
        setStep("success");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            <div className="relative bg-white w-full sm:max-w-sm sm:rounded-2xl rounded-t-2xl max-h-[85vh] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 -ml-1.5 rounded-full hover:bg-neutral-100 transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5 text-neutral-500" />
                    </button>
                    <h3 className="text-base font-medium text-neutral-900">
                        {step === "form" ? "Book Now" : "Done"}
                    </h3>
                    <div className="w-8" />
                </div>

                <div className="overflow-y-auto max-h-[calc(85vh-52px)]">
                    {step === "form" && (
                        <div className="p-4 space-y-4">
                            <div className="bg-neutral-50 rounded-xl p-2">
                                <MiniCalendar
                                    selected={selectedDate}
                                    onSelect={onDateSelect}
                                />
                            </div>

                            <div className="flex items-center justify-between py-3 border-t border-b border-neutral-100">
                                <div>
                                    <p className="text-sm font-medium text-neutral-900">Guests</p>
                                    <p className="text-xs text-neutral-500">{fmt(priceMad)} each</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => onGuestsChange(Math.max(1, guests - 1))}
                                        className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-orange-500 transition-colors"
                                    >
                                        <MinusIcon className="w-4 h-4" />
                                    </button>
                                    <span className="w-5 text-center font-semibold">{guests}</span>
                                    <button
                                        type="button"
                                        onClick={() => onGuestsChange(Math.min(maxGuests, guests + 1))}
                                        className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:border-orange-500 transition-colors"
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full name"
                                    className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-400"
                                />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone number"
                                    className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-orange-400"
                                />
                            </div>

                            <div className="flex items-center justify-between py-2 text-sm">
                                <span className="text-neutral-500">Total</span>
                                <span className="font-semibold text-neutral-900">{fmt(grandTotal)}</span>
                            </div>

                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full py-3 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
                            >
                                <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                                Send via WhatsApp
                            </button>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="p-6 flex flex-col items-center text-center">
                            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                <CheckIcon className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                                Booking Sent!
                            </h3>
                            <p className="text-sm text-neutral-500 mb-5">
                                We&apos;ll contact you within 24 hours
                            </p>
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-medium transition-all"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function BookingModal({
    data,
    onClose,
    onWhatsApp,
}: {
    data: ReservationData;
    onClose: () => void;
    onWhatsApp: (name: string, phone: string) => void;
}) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [step, setStep] = useState<"form" | "success">("form");

    const handleSubmit = () => {
        if (!name.trim() || !phone.trim()) {
            alert("Please fill in your name and phone number");
            return;
        }
        onWhatsApp(name, phone);
        setStep("success");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-sm z-10">
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 -ml-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5 text-neutral-500" />
                    </button>
                    <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                        {step === "form" ? "Confirm Booking" : "Done"}
                    </h3>
                    <div className="w-8" />
                </div>

                {step === "form" && (
                    <div className="p-4 space-y-4">
                        <div className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 space-y-2 text-sm">
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">{data.listingTitle}</p>
                            <div className="flex justify-between text-neutral-500">
                                <span>Date</span>
                                <span className="text-neutral-700 dark:text-neutral-300">{data.selectedDate}</span>
                            </div>
                            <div className="flex justify-between text-neutral-500">
                                <span>Guests</span>
                                <span className="text-neutral-700 dark:text-neutral-300">{data.guests}</span>
                            </div>
                            <div className="flex justify-between font-semibold pt-2 border-t border-neutral-200 dark:border-neutral-700">
                                <span className="text-neutral-900 dark:text-neutral-100">Total</span>
                                <span className="text-orange-600">{data.grandTotal}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full name"
                                className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-orange-400"
                            />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone number"
                                className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-orange-400"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full py-3 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-all flex items-center justify-center gap-2"
                        >
                            <ChatBubbleOvalLeftIcon className="w-4 h-4" />
                            Send via WhatsApp
                        </button>
                    </div>
                )}

                {step === "success" && (
                    <div className="p-6 flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                            <CheckIcon className="w-7 h-7 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            Booking Sent!
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5">
                            We&apos;ll contact you within 24 hours
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium transition-all"
                        >
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

interface ReservationData {
    listingTitle: string;
    address: string;
    selectedDate: string;
    guests: number;
    pricePerGuest: string;
    guestsTotal: string;
    grandTotal: string;
}

export default function ListingPageClient({ listing }: ListingPageClientProps) {
    const {
        galleryImgs, title, address, reviewStart, reviewCount,
        price, priceMad, priceEur, maxGuests, author,
        duration, scheduleDays, includes, tourDescription,
    } = listing;

    const [calOpen, setCalOpen] = useState(false);
    const [guestsOpen, setGuestsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [guests, setGuests] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [reservationData, setReservationData] = useState<ReservationData | null>(null);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [mobileBookingOpen, setMobileBookingOpen] = useState(false);

    const calRef = useRef<HTMLDivElement>(null);
    const guestsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (calRef.current && !calRef.current.contains(e.target as Node)) {
                setCalOpen(false);
            }
            if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) {
                setGuestsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    useEffect(() => {
        if (!galleryOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setGalleryOpen(false);
            if (e.key === "ArrowLeft") setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImgs.length - 1));
            if (e.key === "ArrowRight") setCurrentImageIndex((prev) => (prev < galleryImgs.length - 1 ? prev + 1 : 0));
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [galleryOpen, galleryImgs.length]);

    const guestsTotal = guests * priceMad;
    const grandTotal = guestsTotal;

    const fmt = (mad: number, includeEur = true) => includeEur ? `${priceEur} € / ${mad.toLocaleString("en-US")} MAD` : `${mad.toLocaleString("en-US")} MAD`;

    const handleReserve = () => {
        if (!selectedDate) {
            setCalOpen(true);
            return;
        }

        setReservationData({
            listingTitle: title,
            address: address,
            selectedDate: formatDate(selectedDate)!,
            guests,
            pricePerGuest: fmt(priceMad),
            guestsTotal: fmt(guestsTotal),
            grandTotal: fmt(grandTotal),
        });
        setShowModal(true);
    };

    const openMobileBooking = () => {
        setMobileBookingOpen(true);
    };

    const handleWhatsApp = (name: string, phone: string) => {
        if (!reservationData) return;

        const message = `Hello! I'd like to book the following tour:

Tour: ${reservationData.listingTitle}
Date: ${reservationData.selectedDate}
Guests: ${reservationData.guests} guest${reservationData.guests !== 1 ? "s" : ""}
Total: ${reservationData.grandTotal}

Name: ${name}
Phone: ${phone}`;

        const whatsappNumber = "212656965754";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
        setShowModal(false);
    };

    const renderSidebar = () => (
        <div className="sticky top-28 z-20 w-full overflow-visible">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl p-7 shadow-xl shadow-neutral-200/50 dark:shadow-black/20 overflow-visible">
                <div className="flex items-center gap-3 mb-6">
                    <CalendarDaysIcon className="w-6 h-6 text-orange-500" />
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                        {scheduleDays}
                    </span>
                </div>

                <div className="flex justify-between items-end mb-7">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{priceMad}</span>
                        <span className="text-neutral-500 text-[15px]">MAD</span>
                    </div>
                    <div className="flex items-center text-[14px] font-medium text-neutral-700 dark:text-neutral-300">
                        <StarIcon className="w-4 h-4 fill-orange-500 text-orange-500 dark:text-orange-400 mr-1.5" />
                        <span className="text-neutral-900 dark:text-neutral-100">{reviewStart || 4.8}</span>
                        <span className="text-neutral-400 mx-2">·</span>
                        <button type="button" className="text-neutral-500 hover:text-orange-700 transition-colors">
                            {reviewCount || 28} reviews
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl mb-5 hover:border-orange-400 dark:hover:border-orange-500 transition-colors relative">
                    <div ref={calRef} className="relative border-b border-neutral-200 dark:border-neutral-700">
                        <button
                            type="button"
                            onClick={() => { setCalOpen(!calOpen); setGuestsOpen(false); }}
                            className={`w-full p-4 text-left transition-all rounded-t-xl
                                ${!selectedDate && calOpen ? "bg-orange-50 dark:bg-orange-900/20" : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"}
                                ${!selectedDate && calOpen ? "ring-2 ring-inset ring-orange-500" : ""}`}
                        >
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400 mb-1.5 pointer-events-none">
                                Event Date
                            </label>
                            <span className={`block text-[15px] ${selectedDate ? "text-neutral-900 dark:text-neutral-100 font-semibold" : "text-neutral-400"}`}>
                                {selectedDate ? formatDate(selectedDate) : "Select a date"}
                            </span>
                        </button>

                        {calOpen && (
                            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-neutral-900
                                border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl z-50 overflow-hidden mx-1" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                <MiniCalendar
                                    selected={selectedDate}
                                    onSelect={(d) => { setSelectedDate(d); setCalOpen(false); }}
                                />
                                {selectedDate && (
                                    <div className="px-4 pb-4 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedDate(null)}
                                            className="text-[13px] text-neutral-500 hover:text-orange-700 font-medium transition-colors"
                                        >
                                            Clear date
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div ref={guestsRef} className="relative">
                        <button
                            type="button"
                            onClick={() => { setGuestsOpen(!guestsOpen); setCalOpen(false); }}
                            className={`w-full p-4 text-left flex justify-between items-center transition-all rounded-b-xl
                                ${guestsOpen ? "bg-orange-50 dark:bg-orange-900/20" : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"}
                                ${guestsOpen ? "ring-2 ring-inset ring-orange-500" : ""}`}
                        >
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400 mb-1.5 pointer-events-none">
                                    Guests
                                </label>
                                <span className="block text-[15px] text-neutral-900 dark:text-neutral-100 font-semibold">
                                    {guests} {guests === 1 ? "guest" : "guests"}
                                </span>
                            </div>
                            <ChevronDownIcon className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${guestsOpen ? "rotate-180" : ""}`} />
                        </button>

                        {guestsOpen && (
                            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-neutral-900
                                border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl z-50 p-2 mx-1">
                                <CounterRow
                                    label="Guests"
                                    sublabel={`${fmt(priceMad)} each`}
                                    value={guests}
                                    min={1}
                                    max={maxGuests || 10}
                                    onChange={setGuests}
                                />
                                <div className="mt-2 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center px-2">
                                    <p className="text-[13px] text-neutral-500">Max {maxGuests || 10} guests</p>
                                    <button
                                        type="button"
                                        onClick={() => setGuestsOpen(false)}
                                        className="text-[14px] font-semibold text-orange-700 hover:text-orange-700 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {!selectedDate && (
                    <p className="text-[13px] text-orange-700 dark:text-orange-400 mb-4 flex items-center gap-2">
                        <CalendarDaysIcon className="w-4 h-4" />
                        Please select a date to continue
                    </p>
                )}

                <button
                    type="button"
                    onClick={handleReserve}
                    className={`w-full py-3 rounded-full text-[15px] font-medium transition-all duration-300
                        ${selectedDate
                            ? "bg-orange-500 hover:bg-orange-600 text-white"
                            : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed"
                        }`}
                >
                    Reserve
                </button>

                <p className="text-center text-neutral-400 text-[13px] mt-4 mb-2">You won't be charged yet</p>

                <div className="space-y-4 text-[15px] text-neutral-600 dark:text-neutral-400">
                    <div className="pt-5 mt-3 border-t border-neutral-200 dark:border-neutral-700">
                        <div className="flex justify-between font-bold text-[17px] text-neutral-900 dark:text-neutral-100">
                            <span>Total</span>
                            <span>{fmt(grandTotal)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderHeader = () => (
        <div className="mb-6 sm:mb-8 mt-12 sm:mt-16 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 sm:mb-5 tracking-tight">
                    {title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-[15px]">
                    <div className="flex items-center gap-1 font-medium">
                        <StarIcon className="w-4 sm:w-5 h-4 sm:h-5 fill-orange-500 text-orange-500 dark:text-orange-400" />
                        <span className="text-neutral-900 dark:text-neutral-100">{reviewStart || 4.8}</span>
                    </div>
                    <span className="text-neutral-300">·</span>
                    <button type="button" className="font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors text-xs sm:text-sm">
                        {reviewCount || 28} reviews
                    </button>
                    <span className="text-neutral-300">·</span>
                    <button type="button" className="flex items-center gap-1 font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors text-xs sm:text-sm">
                        <MapPinIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                        <span className="truncate max-w-[150px] sm:max-w-none">{address}</span>
                    </button>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => {
                        if (navigator.share) navigator.share({ title, url: window.location.href });
                        else navigator.clipboard.writeText(window.location.href);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all text-sm"
                >
                    <ShareIcon className="w-5 h-5" />
                    Share
                </button>
            </div>
        </div>
    );

    const renderGallery = () => (
        <div className="relative z-10">
            {/* Interactive Hero Gallery */}
            <div className="relative">
                {/* Main Image Slider */}
                <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden bg-white">
                    <div
                        className="absolute inset-0 flex items-center justify-center p-4 cursor-pointer"
                        onClick={() => setGalleryOpen(true)}
                    >
                        <img
                            src={galleryImgs[currentImageIndex]}
                            alt={`${title} - Image ${currentImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImgs.length - 1)); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full text-black hover:bg-orange-500 hover:text-white transition-all"
                    >
                        <ChevronLeftIcon className="w-8 h-8" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev < galleryImgs.length - 1 ? prev + 1 : 0)); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full text-black hover:bg-orange-500 hover:text-white transition-all"
                    >
                        <ChevronRightIcon className="w-8 h-8" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-white rounded-full text-black text-sm font-medium">
                        {currentImageIndex + 1} / {galleryImgs.length}
                    </div>

                    {/* View All Button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setGalleryOpen(true); }}
                        className="absolute top-4 right-4 px-4 py-2 bg-white rounded-full text-black text-sm font-medium hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2"
                    >
                        <ArrowsPointingOutIcon className="w-5 h-5" />
                        View All Photos
                    </button>
                </div>

                {/* Thumbnail Navigation */}
                <div className="max-w-7xl mx-auto px-4 py-4 bg-white">
                    <div className="flex justify-center gap-2 flex-wrap">
                        {galleryImgs.map((img: string, idx: number) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${currentImageIndex === idx
                                    ? 'ring-2 ring-orange-500 scale-105'
                                    : 'opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container relative pb-20 sm:pb-28 lg:pb-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-0 overflow-visible">
            {renderHeader()}
            {renderGallery()}

            <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-14 lg:gap-16 items-start">
                <div className="lg:col-span-2 space-y-8 sm:space-y-12">
                    <div className="flex items-start gap-4 py-6 border-b border-neutral-200 dark:border-neutral-800">
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                            <ClockIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 mb-1">Duration</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">{duration || "Half day experience"}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                            <CalendarDaysIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 mb-1">Available</h3>
                            <p className="text-neutral-600 dark:text-neutral-400">{scheduleDays || "Every day"}</p>
                        </div>
                    </div>

                    <div className="pb-6 sm:pb-10 border-b border-neutral-200 dark:border-neutral-800">
                        <h3 className="text-lg sm:text-[24px] font-semibold text-neutral-900 dark:text-neutral-100 mb-4 sm:mb-6">About This Tour</h3>
                        <div className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-[16px] leading-relaxed space-y-4">
                            <p>{tourDescription || `Experience this incredible adventure in ${address}. Our professional guides will ensure you have an unforgettable experience.`}</p>
                        </div>
                    </div>

                    <div className="pb-6 sm:pb-10 border-b border-neutral-200 dark:border-neutral-800">
                        <h3 className="text-lg sm:text-[24px] font-semibold text-neutral-900 dark:text-neutral-100 mb-5 sm:mb-7">What's Included</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {includes && includes.length > 0 ? (
                                includes.map((item: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                            <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-sm sm:text-[15px] text-neutral-700 dark:text-neutral-300">{item}</span>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                            <TruckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-sm sm:text-[15px] text-neutral-700 dark:text-neutral-300">Round Trip Transport</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                            <UserGroupIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-sm sm:text-[15px] text-neutral-700 dark:text-neutral-300">Professional Guide</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                                            <SparklesIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <span className="text-sm sm:text-[15px] text-neutral-700 dark:text-neutral-300">Moroccan Mint Tea</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {listing.itinerary && listing.itinerary.length > 0 && (
                        <ItineraryTimeline itinerary={listing.itinerary} />
                    )}
                </div>

                <div className="hidden lg:block lg:col-span-1 lg:self-start overflow-visible">
                    {renderSidebar()}
                </div>
            </div>

            <div className="lg:hidden fixed bottom-4 left-0 right-0 z-40 px-4">
                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-lg border border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{fmt(priceMad)}</span>
                            <span className="text-neutral-500 text-sm">/ person</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            <StarIcon className="w-4 h-4 fill-orange-500 text-orange-500" />
                            <span className="font-medium">{reviewStart || 4.8}</span>
                            <span className="text-neutral-400">({reviewCount || 28})</span>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={openMobileBooking}
                        className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                    >
                        Book Now
                    </button>
                </div>
            </div>

            {showModal && reservationData && (
                <BookingModal
                    data={reservationData}
                    onClose={() => setShowModal(false)}
                    onWhatsApp={handleWhatsApp}
                />
            )}

            <MobileBookingModal
                isOpen={mobileBookingOpen}
                onClose={() => setMobileBookingOpen(false)}
                selectedDate={selectedDate}
                onDateSelect={(date) => {
                    setSelectedDate(date);
                }}
                guests={guests}
                onGuestsChange={setGuests}
                maxGuests={maxGuests || 10}
                priceMad={priceMad}
                priceEur={priceEur}
                listingTitle={title}
                onWhatsApp={handleWhatsApp}
            />

            {galleryOpen && (
                <div className="fixed inset-0 z-50 bg-black/95">
                    <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => setGalleryOpen(false)}
                    />

                    <button
                        type="button"
                        onClick={() => setGalleryOpen(false)}
                        className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="absolute top-4 left-4 z-20 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {currentImageIndex + 1} of {galleryImgs.length}
                    </div>

                    <div className="relative h-full w-full flex items-center justify-center px-8 sm:px-16">
                        <div className="relative w-full h-full max-w-7xl">
                            <Image
                                src={galleryImgs[currentImageIndex]}
                                alt={`Gallery ${currentImageIndex + 1}`}
                                fill
                                sizes="100vw"
                                className="object-contain"
                                priority
                                quality={95}
                            />
                        </div>
                    </div>

                    {galleryImgs.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImgs.length - 1))}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
                            >
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                type="button"
                                onClick={() => setCurrentImageIndex((prev) => (prev < galleryImgs.length - 1 ? prev + 1 : 0))}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
                            >
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}

                    {galleryImgs.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 p-3 rounded-full bg-black/50 backdrop-blur-sm">
                            {galleryImgs.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all ${currentImageIndex === idx ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                                        }`}
                                />
                            ))}
                        </div>
                    )}

                    <div className="absolute bottom-6 right-4 z-20 flex gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({ title: `${title} - Photo ${currentImageIndex + 1}`, url: window.location.href });
                                }
                            }}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
