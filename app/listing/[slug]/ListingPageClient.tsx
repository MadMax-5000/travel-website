"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
    MapPinIcon,
    StarIcon,
    ShareIcon,
    CheckIcon,
    SparklesIcon,
    ShieldCheckIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
    CalendarDaysIcon,
    UserIcon,
    PhoneIcon,
} from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

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
                    className="p-2 rounded-full hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors"
                >
                    <ChevronLeftIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                <span className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">
                    {MONTHS[viewMonth]} {viewYear}
                </span>
                <button
                    onClick={next}
                    type="button"
                    className="p-2 rounded-full hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors"
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
                                        ? "border-2 border-orange-500 text-orange-500 font-semibold"
                                        : !isPast
                                            ? "hover:bg-orange-50 dark:hover:bg-orange-950/30 text-neutral-700 dark:text-neutral-300"
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
                        hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-400 dark:hover:text-orange-400
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
                        hover:border-orange-500 hover:text-orange-500 dark:hover:border-orange-400 dark:hover:text-orange-400
                        disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:text-neutral-700"
                >
                    <PlusIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

function BookingModal({
    data,
    onClose,
    onWhatsApp,
    onEmail,
}: {
    data: ReservationData;
    onClose: () => void;
    onWhatsApp: (name: string, phone: string) => void;
    onEmail: (name: string, phone: string) => void;
}) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [step, setStep] = useState<"summary" | "form">("summary");

    const handleWhatsApp = () => {
        if (!name.trim() || !phone.trim()) {
            alert("Please fill in your name and phone number");
            return;
        }
        onWhatsApp(name, phone);
    };

    const handleEmail = () => {
        if (!name.trim() || !phone.trim()) {
            alert("Please fill in your name and phone number");
            return;
        }
        onEmail(name, phone);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl w-full max-w-md p-8 z-10 animate-in fade-in zoom-in-95 duration-300">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                    <XMarkIcon className="w-5 h-5 text-neutral-400" />
                </button>

                {step === "summary" ? (
                    <>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                                <CalendarDaysIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                                    Review Your Booking
                                </h3>
                                <p className="text-[13px] text-neutral-500">Please confirm your selection</p>
                            </div>
                        </div>

                        <div className="space-y-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl p-5 text-[14px]">
                            <div className="pb-4 border-b border-neutral-200 dark:border-neutral-700">
                                <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-base">{data.listingTitle}</h4>
                                <p className="text-neutral-500 text-sm mt-1">{data.address}</p>
                            </div>
                            <Row label="Date" value={data.selectedDate} />
                            <Row label="Guests" value={`${data.adults} adult${data.adults !== 1 ? "s" : ""}${data.kids > 0 ? `, ${data.kids} kid${data.kids !== 1 ? "s" : ""}` : ""}`} />
                            <Row label="Price per adult" value={data.pricePerAdult} />
                            {data.kids > 0 && <Row label="Price per kid" value={data.pricePerKid} />}
                            <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 flex justify-between font-bold text-[17px]">
                                <span className="text-neutral-900 dark:text-neutral-100">Total</span>
                                <span className="text-orange-600 dark:text-orange-400">{data.grandTotal}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setStep("form")}
                            className="w-full mt-6 py-3 rounded-full bg-orange-500 text-white font-medium text-sm transition-all hover:bg-orange-600"
                        >
                            Continue to Book
                        </button>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                                <UserIcon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                                    Your Information
                                </h3>
                                <p className="text-[13px] text-neutral-500">We'll contact you to confirm</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="+212 6XX XXX XXX"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <button
                                type="button"
                                onClick={handleWhatsApp}
                                className="w-full py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium text-sm transition-all flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                Book via WhatsApp
                            </button>
                            <button
                                type="button"
                                onClick={handleEmail}
                                className="w-full py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm transition-all"
                            >
                                Book Now (Email)
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setStep("summary")}
                            className="w-full mt-3 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                        >
                            ← Back to summary
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-3">
            <span className="text-neutral-500">{label}</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100 text-right">{value}</span>
        </div>
    );
}

interface ReservationData {
    listingTitle: string;
    address: string;
    selectedDate: string;
    adults: number;
    kids: number;
    pricePerAdult: string;
    pricePerKid: string;
    adultsTotal: string;
    kidsTotal: string;
    grandTotal: string;
}

export default function ListingPageClient({ listing }: ListingPageClientProps) {
    const {
        galleryImgs, title, address, reviewStart, reviewCount,
        price, maxGuests, bedrooms, bathrooms, author,
    } = listing;

    const numericPrice = parseFloat(String(price).replace(/[^0-9.]/g, "")) || 100;
    const PRICE_ADULT = numericPrice;
    const PRICE_KID = Math.round(numericPrice * 0.5);

    const [calOpen, setCalOpen] = useState(false);
    const [guestsOpen, setGuestsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [adults, setAdults] = useState(1);
    const [kids, setKids] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [reservationData, setReservationData] = useState<ReservationData | null>(null);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
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
    }, [galleryOpen]);

    const totalGuests = adults + kids;
    const adultsTotal = adults * PRICE_ADULT;
    const kidsTotal = kids * PRICE_KID;
    const grandTotal = adultsTotal + kidsTotal;

    const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

    const handleReserve = () => {
        if (!selectedDate) { 
            setCalOpen(true); 
            return; 
        }

        setReservationData({
            listingTitle: title,
            address: address,
            selectedDate: formatDate(selectedDate)!,
            adults,
            kids,
            pricePerAdult: fmt(PRICE_ADULT),
            pricePerKid: fmt(PRICE_KID),
            adultsTotal: fmt(adultsTotal),
            kidsTotal: fmt(kidsTotal),
            grandTotal: fmt(grandTotal),
        });
        setShowModal(true);
    };

    const handleWhatsApp = (name: string, phone: string) => {
        if (!reservationData) return;
        
        const message = `*New Booking Request*\n\n` +
            `*Tour:* ${reservationData.listingTitle}\n` +
            `*Address:* ${reservationData.address}\n` +
            `*Date:* ${reservationData.selectedDate}\n` +
            `*Adults:* ${reservationData.adults}\n` +
            `*Kids:* ${reservationData.kids}\n` +
            `*Total:* ${reservationData.grandTotal}\n\n` +
            `*Customer Info:*\n` +
            `*Name:* ${name}\n` +
            `*Phone:* ${phone}`;

        const whatsappNumber = "212661223344";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
        setShowModal(false);
    };

    const handleEmail = (name: string, phone: string) => {
        alert(`Booking submitted!\n\nName: ${name}\nPhone: ${phone}\n\nThe tour operator will contact you soon!\n\n(Email integration coming soon)`);
        setShowModal(false);
    };

    const renderSidebar = () => (
        <div className="sticky top-28 z-20 w-full overflow-visible">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 rounded-3xl p-7 shadow-xl shadow-neutral-200/50 dark:shadow-black/20 overflow-visible">

                <div className="flex justify-between items-end mb-7">
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{fmt(PRICE_ADULT)}</span>
                        <span className="text-neutral-500 text-[15px]">/ adult</span>
                    </div>
                    <div className="flex items-center text-[14px] font-medium text-neutral-700 dark:text-neutral-300">
                        <StarIcon className="w-4 h-4 fill-orange-500 text-orange-500 mr-1.5" />
                        <span className="text-neutral-900 dark:text-neutral-100">{reviewStart || 4.8}</span>
                        <span className="text-neutral-400 mx-2">·</span>
                        <button type="button" className="text-neutral-500 hover:text-orange-600 transition-colors">
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
                                ${!selectedDate && calOpen ? "bg-orange-50 dark:bg-orange-950/20" : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"}
                                ${!selectedDate && calOpen ? "ring-2 ring-inset ring-orange-500" : ""}`}
                        >
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1.5 pointer-events-none">
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
                                            className="text-[13px] text-neutral-500 hover:text-orange-600 font-medium transition-colors"
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
                                ${guestsOpen ? "bg-orange-50 dark:bg-orange-950/20" : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"}
                                ${guestsOpen ? "ring-2 ring-inset ring-orange-500" : ""}`}
                        >
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1.5 pointer-events-none">
                                    Guests
                                </label>
                                <span className="block text-[15px] text-neutral-900 dark:text-neutral-100 font-semibold">
                                    {totalGuests} {totalGuests === 1 ? "guest" : "guests"}
                                    {kids > 0 && ` · ${adults} adult${adults !== 1 ? "s" : ""}, ${kids} kid${kids !== 1 ? "s" : ""}`}
                                </span>
                            </div>
                            <ChevronDownIcon className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${guestsOpen ? "rotate-180" : ""}`} />
                        </button>

                        {guestsOpen && (
                            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-neutral-900
                                border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-2xl z-50 p-2 mx-1">

                                <CounterRow
                                    label="Adults"
                                    sublabel={`${fmt(PRICE_ADULT)} each`}
                                    value={adults}
                                    min={1}
                                    max={maxGuests || 10}
                                    onChange={setAdults}
                                />

                                <div className="border-t border-neutral-100 dark:border-neutral-800 mx-2">
                                    <CounterRow
                                        label="Kids"
                                        sublabel={`${fmt(PRICE_KID)} each · under 12`}
                                        value={kids}
                                        min={0}
                                        max={maxGuests || 10}
                                        onChange={setKids}
                                    />
                                </div>

                                <div className="mt-2 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center px-2">
                                    <p className="text-[13px] text-neutral-500">Max {maxGuests || 10} guests</p>
                                    <button
                                        type="button"
                                        onClick={() => setGuestsOpen(false)}
                                        className="text-[14px] font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {!selectedDate && (
                    <p className="text-[13px] text-orange-600 dark:text-orange-400 mb-4 flex items-center gap-2">
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

                <p className="text-center text-neutral-400 text-[13px] mt-4 mb-6">You won't be charged yet</p>

                <div className="space-y-4 text-[15px] text-neutral-600 dark:text-neutral-400">
                    <div className="flex justify-between">
                        <span className="hover:underline cursor-pointer">{fmt(PRICE_ADULT)} × {adults} adult{adults !== 1 ? "s" : ""}</span>
                        <span className="text-neutral-900 dark:text-neutral-200">{fmt(adultsTotal)}</span>
                    </div>
                    {kids > 0 && (
                        <div className="flex justify-between">
                            <span className="hover:underline cursor-pointer">{fmt(PRICE_KID)} × {kids} kid{kids !== 1 ? "s" : ""}</span>
                            <span className="text-neutral-900 dark:text-neutral-200">{fmt(kidsTotal)}</span>
                        </div>
                    )}
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
        <div className="mb-8 mt-16 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-5 tracking-tight">
                    {title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px]">
                    <div className="flex items-center gap-1.5 font-medium">
                        <StarIcon className="w-5 h-5 fill-orange-500 text-orange-500" />
                        <span className="text-neutral-900 dark:text-neutral-100">{reviewStart || 4.8}</span>
                    </div>
                    <span className="text-neutral-300">·</span>
                    <button type="button" className="font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                        {reviewCount || 28} reviews
                    </button>
                    <span className="text-neutral-300">·</span>
                    <button type="button" className="flex items-center gap-1.5 font-medium text-neutral-600 dark:text-neutral-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                        <MapPinIcon className="w-4 h-4" />
                        {address}
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
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                >
                    <ShareIcon className="w-5 h-5" />
                    Share
                </button>
            </div>
        </div>
    );

    const renderGallery = () => (
        <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-1.5 h-[45vh] md:h-[65vh] min-h-[350px] md:min-h-[500px] rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <div 
                    className="relative col-span-1 md:col-span-2 md:row-span-2 cursor-pointer group"
                    onClick={() => { setCurrentImageIndex(0); setGalleryOpen(true); }}
                >
                    <Image src={galleryImgs[0]} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" priority />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                    {/* Expand Icon */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    </div>
                </div>
                {galleryImgs.slice(1, 5).map((img: string, idx: number) => (
                    <div 
                        key={idx} 
                        className="relative hidden md:block col-span-1 row-span-1 cursor-pointer group"
                        onClick={() => { setCurrentImageIndex(idx + 1); setGalleryOpen(true); }}
                    >
                        <Image src={img || galleryImgs[0]} alt={`gallery-${idx + 2}`} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                        {/* Expand Icon */}
                        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                type="button" 
                className="absolute bottom-6 right-6 bg-white dark:bg-neutral-900 px-6 py-2.5 rounded-xl text-[14px] font-semibold flex items-center gap-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all shadow-lg border border-neutral-200 dark:border-neutral-700"
                onClick={() => { setCurrentImageIndex(0); setGalleryOpen(true); }}
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Show all photos
            </button>
        </div>
    );

    return (
        <div className="container relative pb-28 lg:pb-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
            {renderHeader()}
            {renderGallery()}

            <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-16 items-start">
                <div className="lg:col-span-2 space-y-12">
                    <div className="flex justify-between items-center pb-10 border-b border-neutral-200 dark:border-neutral-800">
                        <div className="flex-1">
                            <h2 className="text-[24px] font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                                Hosted by {author.displayName}
                            </h2>
                            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-[15px] gap-2">
                                <span>{maxGuests} guests</span>
                                <span className="text-neutral-300">·</span>
                                <span>{bedrooms} bedrooms</span>
                                <span className="text-neutral-300">·</span>
                                <span>{bedrooms} beds</span>
                                <span className="text-neutral-300">·</span>
                                <span>{bathrooms} bath</span>
                            </div>
                        </div>
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden ml-6 ring-2 ring-white dark:ring-neutral-800 shadow-lg">
                            <Image src={author.avatar} alt={author.displayName} fill className="object-cover" />
                        </div>
                    </div>

                    <div className="space-y-8 pb-10 border-b border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                                <SparklesIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[17px] text-neutral-900 dark:text-neutral-100 mb-1">{author.displayName} is a Superhost</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-[15px] leading-relaxed">Superhosts are experienced, highly rated hosts committed to providing great stays for guests.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                                <MapPinIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[17px] text-neutral-900 dark:text-neutral-100 mb-1">Great location</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-[15px] leading-relaxed">100% of recent guests gave the location a 5-star rating.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                                <ShieldCheckIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[17px] text-neutral-900 dark:text-neutral-100 mb-1">Free cancellation for 48 hours</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-[15px] leading-relaxed">Get a full refund if you change your mind.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pb-10 border-b border-neutral-200 dark:border-neutral-800">
                        <h3 className="text-[24px] font-semibold text-neutral-900 dark:text-neutral-100 mb-6">About this space</h3>
                        <div className="text-neutral-600 dark:text-neutral-300 text-[16px] leading-relaxed space-y-5">
                            <p>Experience the ultimate relaxation in our beautifully designed space. Perfect for families, couples, and solo travelers looking for a unique getaway.</p>
                            <p>Located just minutes away from local attractions in {address}, you'll have everything you need for a memorable stay.</p>
                        </div>
                        <button type="button" className="mt-8 font-semibold text-[15px] text-orange-600 dark:text-orange-400 flex items-center gap-1.5 hover:gap-2 transition-all">
                            Show more 
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>

                    <div className="pb-6">
                        <h3 className="text-[24px] font-semibold text-neutral-900 dark:text-neutral-100 mb-7">What this place offers</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            {["Wifi", "Kitchen", "Free parking on premises", "Pool", "Air conditioning", "Patio or balcony", "Security cameras on property", "Carbon monoxide alarm"].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 py-2">
                                    <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                        <CheckIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <span className="text-[16px] text-neutral-700 dark:text-neutral-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden lg:block lg:col-span-1 lg:self-start overflow-visible">
                    {renderSidebar()}
                </div>
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 p-4 z-40 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{fmt(PRICE_ADULT)}</span>
                        <span className="text-neutral-500 text-[14px]">/ adult</span>
                    </div>
                    <button
                        type="button"
                        onClick={handleReserve}
                        className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
                            selectedDate
                                ? "bg-orange-500 hover:bg-orange-600 text-white"
                                : "bg-neutral-200 text-neutral-400"
                        }`}
                    >
                        Reserve
                    </button>
                </div>
            </div>

            {showModal && reservationData && (
                <BookingModal 
                    data={reservationData} 
                    onClose={() => setShowModal(false)}
                    onWhatsApp={handleWhatsApp}
                    onEmail={handleEmail}
                />
            )}

            {/* Full Screen Gallery Modal */}
            {galleryOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Blurred Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        onClick={() => setGalleryOpen(false)}
                    />

                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={() => setGalleryOpen(false)}
                        className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-medium">
                        {currentImageIndex + 1} / {galleryImgs.length}
                    </div>

                    {/* Main Image */}
                    <div className="relative h-full w-full flex items-center justify-center px-16">
                        <div className="relative w-full h-full max-w-6xl">
                            <Image
                                src={galleryImgs[currentImageIndex]}
                                alt={`Gallery ${currentImageIndex + 1}`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Previous Button */}
                    {galleryImgs.length > 1 && (
                        <button
                            type="button"
                            onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImgs.length - 1))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Next Button */}
                    {galleryImgs.length > 1 && (
                        <button
                            type="button"
                            onClick={() => setCurrentImageIndex((prev) => (prev < galleryImgs.length - 1 ? prev + 1 : 0))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Thumbnails */}
                    {galleryImgs.length > 1 && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-full bg-black/50">
                            {galleryImgs.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        currentImageIndex === idx ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
