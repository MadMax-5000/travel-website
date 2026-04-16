"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
    MapPinIcon,
    CheckIcon,
    UserIcon,
    CalendarIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { MessageCircle } from "lucide-react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const MOROCCO_AIRPORTS = [
    { code: "AGA", name: "Agadir Al Massira", city: "Agadir" },
    { code: "CMN", name: "Mohammed V", city: "Casablanca" },
    { code: "RAK", name: "Menara", city: "Marrakech" },
    { code: "RBA", name: "Rabat-Sale", city: "Rabat" },
];

const SERVICE_TYPES = [
    { type: "VIP", description: "Private vehicle transport", details: "You'll be picked up in a private vehicle (sedan for 1-3 passengers, van for 4-6, minibus for 7-12). Direct transfer to your destination with no stops." },
    { type: "Shuttle", description: "Shared shuttle transport", details: "You'll be picked up in a shared shuttle with other passengers heading to similar destinations. More affordable, may involve brief stops along the way." },
];

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

function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
    const [show, setShow] = useState(false);
    return (
        <div 
            className="relative inline-flex" 
            onMouseEnter={() => setShow(true)} 
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show && (
                <div className="absolute z-50 left-full ml-2 top-1/2 -translate-y-1/2 w-64 p-3 bg-neutral-900 dark:bg-neutral-700 text-white text-sm rounded-lg shadow-xl pointer-events-none">
                    {text}
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-neutral-900 dark:bg-neutral-700 rotate-45" />
                </div>
            )}
        </div>
    );
}

function MiniCalendar({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
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
        <div className="p-3 select-none">
            <div className="flex items-center justify-between mb-3">
                <button onClick={prev} type="button" className="p-1.5 rounded-full hover:bg-orange-50 dark:hover:bg-orange-800/30 transition-colors">
                    <ChevronLeftIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {MONTHS[viewMonth]} {viewYear}
                </span>
                <button onClick={next} type="button" className="p-1.5 rounded-full hover:bg-orange-50 dark:hover:bg-orange-800/30 transition-colors">
                    <ChevronRightIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </button>
            </div>
            <div className="grid grid-cols-7 mb-1">
                {DAYS.map(d => (
                    <div key={d} className="text-center text-[10px] font-semibold text-neutral-400 py-1">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-y-0.5">
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
                                mx-auto w-7 h-7 rounded-full text-xs font-medium transition-all
                                flex items-center justify-center
                                ${isPast ? "text-neutral-300 dark:text-neutral-600 cursor-not-allowed" : "cursor-pointer"}
                                ${isSel ? "bg-orange-500 text-white shadow-lg" : isToday && !isPast ? "border-2 border-orange-500 text-orange-500" : !isPast ? "hover:bg-orange-50 dark:hover:bg-orange-800/30 text-neutral-700 dark:text-neutral-300" : ""}
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

export default function TransfersPage() {
    const [transferType, setTransferType] = useState<"airport" | "hotel">("airport");
    
    // Airport transfer state
    const [fromCity, setFromCity] = useState("");
    const [toAirport, setToAirport] = useState("AGA");
    const [otherAirport, setOtherAirport] = useState("");
    const [showOtherAirport, setShowOtherAirport] = useState(false);
    const [flightNumber, setFlightNumber] = useState("");
    
    // Hotel transfer state
    const [pickupHotel, setPickupHotel] = useState("");
    const [dropoffHotel, setDropoffHotel] = useState("");
    
    // Common state
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [transferTime, setTransferTime] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [serviceType, setServiceType] = useState("VIP");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [bookingStep, setBookingStep] = useState<"form" | "success">("form");

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleWhatsApp = () => {
        if (!customerName.trim() || !customerPhone.trim()) {
            alert("Please fill in your name and phone number");
            return;
        }
        if (transferType === "airport" && (!fromCity || !selectedDate || !transferTime)) {
            alert("Please fill in all required fields for airport transfer");
            return;
        }
        if (transferType === "hotel" && (!pickupHotel || !dropoffHotel || !selectedDate || !transferTime)) {
            alert("Please fill in all required fields for hotel transfer");
            return;
        }

        const formattedDate = selectedDate!.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        
        let message = "";
        
        if (transferType === "airport") {
            const toAirportInfo = MOROCCO_AIRPORTS.find((a) => a.code === toAirport);
            message = `Hello! I'd like to book an airport pickup:

📍 Pickup: ${fromCity}
📍 Destination: ${otherAirport || toAirportInfo?.name + " (" + toAirportInfo?.city + ")"}
✈️ Flight: ${flightNumber || "N/A"}
📅 Date: ${formattedDate}
🕐 Time: ${transferTime}

🚗 Service: ${serviceType}
👥 Passengers: ${passengers}

📧 Name: ${customerName}
📱 Phone: ${customerPhone}
${additionalNotes ? `\n📝 Notes: ${additionalNotes}` : ""}`;
        } else {
            message = `Hello! I'd like to book a hotel transfer:

📍 Pickup: ${pickupHotel}
📍 Destination: ${dropoffHotel}
📅 Date: ${formattedDate}
🕐 Time: ${transferTime}

🚗 Service: ${serviceType}
👥 Passengers: ${passengers}

📧 Name: ${customerName}
📱 Phone: ${customerPhone}
${additionalNotes ? `\n📝 Notes: ${additionalNotes}` : ""}`;
        }

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/212656965754?text=${encodedMessage}`, '_blank');
        setBookingStep("success");
    };

    const resetForm = () => {
        setFromCity("");
        setToAirport("AGA");
        setOtherAirport("");
        setShowOtherAirport(false);
        setFlightNumber("");
        setPickupHotel("");
        setDropoffHotel("");
        setSelectedDate(null);
        setTransferTime("");
        setPassengers(1);
        setServiceType("VIP");
        setCustomerName("");
        setCustomerPhone("");
        setAdditionalNotes("");
        setBookingStep("form");
    };

    const hasAnyTransferDetails = () => {
        if (transferType === "airport") {
            return !!fromCity || !!toAirport;
        } else {
            return !!pickupHotel || !!dropoffHotel;
        }
    };

    const hasAllRequiredFields = () => {
        if (!customerName.trim() || !customerPhone.trim()) return false;
        if (!selectedDate || !transferTime) return false;
        
        if (transferType === "airport") {
            return !!fromCity;
        } else {
            return !!pickupHotel && !!dropoffHotel;
        }
    };

    const getSidebarContent = () => {
        if (transferType === "airport") {
            return (
                <div className="space-y-2 mb-5">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">From</span>
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">{fromCity || "-"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-500">To</span>
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">
                            {showOtherAirport ? otherAirport : MOROCCO_AIRPORTS.find((a) => a.code === toAirport)?.city}
                        </span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="space-y-2 mb-5">
                    <div className="flex items-start justify-between">
                        <span className="text-sm text-neutral-500">From</span>
                        <span className="text-sm font-medium text-neutral-900 dark:text-white text-right max-w-[60%]">{pickupHotel || "-"}</span>
                    </div>
                    <div className="flex items-start justify-between">
                        <span className="text-sm text-neutral-500">To</span>
                        <span className="text-sm font-medium text-neutral-900 dark:text-white text-right max-w-[60%]">{dropoffHotel || "-"}</span>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            {/* Hero Banner */}
            <div className="relative h-[30vh] sm:h-[35vh] min-h-[200px] sm:min-h-[250px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/agadir.jpg')" }}
                />
                <div className="absolute inset-0 bg-black" />
                <div className="relative z-10 text-center px-4 mt-20">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
                        <span className="font-serif italic text-orange-300">Transfers</span>
                    </h1>
                    <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto">
                        Comfortable rides across Morocco — from the airport or between hotels
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Transfer Type Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-white dark:bg-neutral-800 p-1.5 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                        <button
                            onClick={() => { setTransferType("airport"); resetForm(); }}
                            className={`px-8 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                transferType === "airport"
                                    ? "bg-orange-500 text-white shadow-md"
                                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                            }`}
                        >
                            Airport Pickup
                        </button>
                        <button
                            onClick={() => { setTransferType("hotel"); resetForm(); }}
                            className={`px-8 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                transferType === "hotel"
                                    ? "bg-orange-500 text-white shadow-md"
                                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                            }`}
                        >
                            Hotel Transfer
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    {/* Main Content */}
                    <div className="flex-1">
                        {bookingStep === "form" ? (
                            <div className="space-y-5">
                                {/* Airport Transfer Form */}
                                {transferType === "airport" && (
                                    <>
                                        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5">
                                            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                </svg>
                                                Your Flight
                                            </h2>
                                            <div className="space-y-3">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                        Where are you flying from? *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g., Paris, London, Madrid..."
                                                        value={fromCity}
                                                        onChange={(e) => setFromCity(e.target.value)}
                                                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                        Landing at which airport?
                                                    </label>
                                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-2">
                                                        {MOROCCO_AIRPORTS.map((airport) => (
                                                            <button
                                                                key={airport.code}
                                                                onClick={() => { setToAirport(airport.code); setShowOtherAirport(false); }}
                                                                className={`p-2 rounded-lg border-2 transition-all text-left ${toAirport === airport.code && !showOtherAirport
                                                                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                                                                    : "border-neutral-200 dark:border-neutral-700 hover:border-orange-300"
                                                                    }`}
                                                            >
                                                                <span className="block text-xs text-neutral-500">{airport.city}</span>
                                                                <span className="block font-medium text-neutral-900 dark:text-white text-sm">{airport.code}</span>
                                                            </button>
                                                        ))}
                                                        <button
                                                            onClick={() => setShowOtherAirport(true)}
                                                            className={`p-2 rounded-lg border-2 transition-all text-left ${showOtherAirport
                                                                ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                                                                : "border-neutral-200 dark:border-neutral-700 hover:border-orange-300"
                                                                }`}
                                                        >
                                                            <span className="block text-xs text-neutral-500">Other</span>
                                                            <span className="block font-medium text-neutral-900 dark:text-white text-sm">Other</span>
                                                        </button>
                                                    </div>
                                                    {showOtherAirport && (
                                                        <input
                                                            type="text"
                                                            placeholder="Enter airport name or code (e.g., Fes, FEZ)"
                                                            value={otherAirport}
                                                            onChange={(e) => setOtherAirport(e.target.value)}
                                                            className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5">
                                            <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                                <CalendarIcon className="w-5 h-5 text-orange-500" />
                                                Flight Details
                                            </h2>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                        Flight Number
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g., AT400, FR2048"
                                                        value={flightNumber}
                                                        onChange={(e) => setFlightNumber(e.target.value)}
                                                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                        Landing Time *
                                                    </label>
                                                    <input
                                                        type="time"
                                                        value={transferTime}
                                                        onChange={(e) => setTransferTime(e.target.value)}
                                                        className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Hotel Transfer Form */}
                                {transferType === "hotel" && (
                                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5">
                                        <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Where to & Where from
                                        </h2>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                    Pick me up from *
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Hotel name and address"
                                                    value={pickupHotel}
                                                    onChange={(e) => setPickupHotel(e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                    Take me to *
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Hotel name and address"
                                                    value={dropoffHotel}
                                                    onChange={(e) => setDropoffHotel(e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Date & Time (Common for both) */}
                                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5">
                                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                        <CalendarIcon className="w-5 h-5 text-orange-500" />
                                        When do you need the transfer?
                                    </h2>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Date *
                                            </label>
                                            <div className="relative" ref={calendarRef}>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowCalendar(!showCalendar)}
                                                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-left flex items-center justify-between"
                                                >
                                                    <span className={selectedDate ? "text-neutral-900 dark:text-white" : "text-neutral-400"}>
                                                        {selectedDate ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select date"}
                                                    </span>
                                                    <CalendarIcon className="w-4 h-4 text-neutral-400" />
                                                </button>
                                                {showCalendar && (
                                                    <div className="absolute z-50 mt-1 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-lg">
                                                        <MiniCalendar
                                                            selected={selectedDate}
                                                            onSelect={(date) => { setSelectedDate(date); setShowCalendar(false); }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Time *
                                            </label>
                                            <input
                                                type="time"
                                                value={transferTime}
                                                onChange={(e) => setTransferTime(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Service & Passengers (Common for both) */}
                                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5">
                                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                        <UserIcon className="w-5 h-5 text-orange-500" />
                                        Vehicle & Guests
                                    </h2>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                How many passengers?
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                                    className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:border-orange-500 transition-colors"
                                                >
                                                    <MinusIcon className="w-4 h-4" />
                                                </button>
                                                <span className="text-lg font-semibold w-6 text-center">{passengers}</span>
                                                <button
                                                    onClick={() => setPassengers(Math.min(12, passengers + 1))}
                                                    className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-600 flex items-center justify-center hover:border-orange-500 transition-colors"
                                                >
                                                    <PlusIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5 flex items-center gap-1">
                                                Prefer VIP or Shuttle?
                                                <Tooltip text={serviceType === "VIP" ? SERVICE_TYPES[0].details : SERVICE_TYPES[1].details}>
                                                    <InformationCircleIcon className="w-4 h-4 text-neutral-400 cursor-help" />
                                                </Tooltip>
                                            </label>
                                            <div className="grid gap-2 sm:grid-cols-2">
                                                {SERVICE_TYPES.map((service) => (
                                                    <button
                                                        key={service.type}
                                                        onClick={() => setServiceType(service.type)}
                                                        className={`p-3 rounded-lg border-2 transition-all text-left ${serviceType === service.type
                                                            ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                                                            : "border-neutral-200 dark:border-neutral-700 hover:border-orange-300"
                                                            }`}
                                                    >
                                                        <span className="block font-semibold text-neutral-900 dark:text-white">{service.type}</span>
                                                        <span className="block text-xs text-neutral-500">{service.description}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5">
                                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
                                        Contact Information
                                    </h2>
                                    <div className="grid gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Your name"
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Phone / WhatsApp *
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="+212 6XX XXX XXX"
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Anything else we should know?
                                            </label>
                                            <textarea
                                                placeholder="Special requests, luggage info, etc."
                                                value={additionalNotes}
                                                onChange={(e) => setAdditionalNotes(e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <CheckIcon className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                                    Request Sent!
                                </h2>
                                <p className="text-neutral-500 dark:text-neutral-400 mb-5">
                                    We've received your transfer request via WhatsApp. We'll get back to you shortly with confirmation!
                                </p>
                                <button
                                    onClick={resetForm}
                                    className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-sm"
                                >
                                    Book Another Transfer
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:w-80">
                        <div className="sticky top-20 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 shadow-lg">
                            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-3">
                                Your Request
                            </h3>

                            {hasAnyTransferDetails() ? (
                                <>
                                    {getSidebarContent()}
                                    <div className="space-y-2 mb-5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-neutral-500">Vehicle</span>
                                            <span className="text-sm font-medium text-neutral-900 dark:text-white">{serviceType}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-neutral-500">Guests</span>
                                            <span className="text-sm font-medium text-neutral-900 dark:text-white">{passengers}</span>
                                        </div>
                                        {selectedDate && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-neutral-500">Date</span>
                                                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                                                    {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                </span>
                                            </div>
                                        )}
                                        {transferTime && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-neutral-500">Time</span>
                                                <span className="text-sm font-medium text-neutral-900 dark:text-white">{transferTime}</span>
                                            </div>
                                        )}
                                    </div>

                                    {bookingStep === "form" ? (
                                        <button
                                            onClick={handleWhatsApp}
                                            disabled={!hasAllRequiredFields()}
                                            className={`w-full py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm ${
                                                hasAllRequiredFields()
                                                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                                                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed"
                                            }`}
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            {hasAllRequiredFields() ? "Request Transfer" : "Complete the form"}
                                        </button>
                                    ) : null}
                                </>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                        <MapPinIcon className="w-6 h-6 text-neutral-400" />
                                    </div>
                                    <p className="text-sm text-neutral-500">
                                        Fill in the form to book your transfer
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
