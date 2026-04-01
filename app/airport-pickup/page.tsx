"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { DEMO_AIRPORT_ROUTES } from "@/data/listings";
import { AirportRouteType } from "@/data/types";
import {
    MapPinIcon,
    StarIcon,
    CheckIcon,
    UserIcon,
    CalendarIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
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

export default function AirportPickupPage() {
    const [fromCity, setFromCity] = useState("");
    const [toAirport, setToAirport] = useState("AGA");
    const [otherAirport, setOtherAirport] = useState("");
    const [showOtherAirport, setShowOtherAirport] = useState(false);
    const [flightNumber, setFlightNumber] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [flightTime, setFlightTime] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [serviceType, setServiceType] = useState("VIP");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [hotelAddress, setHotelAddress] = useState("");
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

    const availableCities = useMemo(() => {
        const cities = new Set<string>();
        DEMO_AIRPORT_ROUTES.forEach(route => cities.add(route.fromCity));
        return Array.from(cities);
    }, []);

    const availableAirportsForCity = useMemo(() => {
        if (!fromCity) return MOROCCO_AIRPORTS;
        const airports = new Set<string>();
        DEMO_AIRPORT_ROUTES.forEach(route => {
            if (route.fromCity.toLowerCase() === fromCity.toLowerCase()) {
                airports.add(route.toAirport);
            }
        });
        return MOROCCO_AIRPORTS.filter(a => airports.has(a.code));
    }, [fromCity]);

    useEffect(() => {
        if (fromCity && !availableAirportsForCity.find(a => a.code === toAirport)) {
            setToAirport(availableAirportsForCity[0]?.code || "AGA");
        }
    }, [fromCity, availableAirportsForCity, toAirport]);

    const selectedRoute = useMemo(() => {
        if (!fromCity || !toAirport) return null;
        return DEMO_AIRPORT_ROUTES.find(
            (route) =>
                route.toAirport === toAirport &&
                route.fromCity.toLowerCase() === fromCity.toLowerCase()
        );
    }, [fromCity, toAirport]);

    const handleWhatsApp = () => {
        if (!fromCity || !selectedDate || !flightTime || !customerName.trim() || !customerPhone.trim()) {
            alert("Please fill in all required fields");
            return;
        }

        const toAirportInfo = MOROCCO_AIRPORTS.find((a) => a.code === toAirport);
        const formattedDate = selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const message = `Hello! I'd like to book an airport pickup:

Pickup Details:
From: ${fromCity}
To: ${otherAirport || toAirportInfo?.name + " (" + toAirportInfo?.city + ")"}
Flight Number: ${flightNumber || "N/A"}
Date: ${formattedDate}
Time: ${flightTime}

Service: ${serviceType}
Passengers: ${passengers}
Total Price: ${selectedRoute?.price} MAD

Drop-off Address: ${hotelAddress || "Hotel in Agadir"}

Name: ${customerName}
Phone: ${customerPhone}`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/212609080257?text=${encodedMessage}`, '_blank');
        setBookingStep("success");
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
                <div className="relative z-10 text-center px-4 mt-20 ">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
                        Airport <span className="font-serif italic text-orange-300">Pickup</span>
                    </h1>
                    <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto">
                        Book reliable airport transfers across Morocco - comfortable vehicles, professional drivers
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    {/* Main Content */}
                    <div className="flex-1">
                        {bookingStep === "form" ? (
                            <div className="space-y-5">
                                {/* Route Selection */}
                                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5">
                                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Route Details
                                    </h2>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Where are you flying from?
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Paris, London, Madrid..."
                                                value={fromCity}
                                                onChange={(e) => setFromCity(e.target.value)}
                                                list="cities"
                                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                            />
                                            <datalist id="cities">
                                                {availableCities.map((city) => (
                                                    <option key={city} value={city} />
                                                ))}
                                            </datalist>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Which airport in Morocco are you landing at?
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

                                {/* Flight Details */}
                                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5">
                                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                        <CalendarIcon className="w-5 h-5 text-orange-500" />
                                        Flight Information
                                    </h2>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Flight Number (optional)
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
                                                Arrival Time *
                                            </label>
                                            <input
                                                type="time"
                                                value={flightTime}
                                                onChange={(e) => setFlightTime(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                            Arrival Date *
                                        </label>
                                        <div className="relative" ref={calendarRef}>
                                            <button
                                                type="button"
                                                onClick={() => setShowCalendar(!showCalendar)}
                                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm text-left flex items-center justify-between"
                                            >
                                                <span>{selectedDate ? selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Select date"}</span>
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
                                </div>

                                {/* Vehicle Selection */}
                                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5">
                                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                                        <UserIcon className="w-5 h-5 text-orange-500" />
                                        Service & Passengers
                                    </h2>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Number of Passengers
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
                                                Transfer Type
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
                                        Your Details
                                    </h2>
                                    <div className="grid gap-3">
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Full name"
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="WhatsApp number"
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                                                Drop-off Address (Hotel or location in Morocco)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Hotel name and address"
                                                value={hotelAddress}
                                                onChange={(e) => setHotelAddress(e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
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
                                    Booking Request Sent!
                                </h2>
                                <p className="text-neutral-500 dark:text-neutral-400 mb-5">
                                    Your airport pickup request has been sent via WhatsApp. We'll confirm your booking shortly!
                                </p>
                                <button
                                    onClick={() => setBookingStep("form")}
                                    className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-sm"
                                >
                                    Book Another Pickup
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:w-80">
                        <div className="sticky top-20 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 shadow-lg">
                            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-3">
                                Booking Summary
                            </h3>

                            {selectedRoute ? (
                                <>
                                    <div className="space-y-2 mb-5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-neutral-500">From</span>
                                            <span className="text-sm font-medium text-neutral-900 dark:text-white">{fromCity}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-neutral-500">To</span>
                                            <span className="text-sm font-medium text-neutral-900 dark:text-white">
                                                {showOtherAirport ? otherAirport : MOROCCO_AIRPORTS.find((a) => a.code === toAirport)?.city}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-neutral-500">Service</span>
                                            <span className="text-sm font-medium text-neutral-900 dark:text-white">{serviceType}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-neutral-500">Duration</span>
                                            <span className="text-sm font-medium text-neutral-900 dark:text-white">{selectedRoute.duration}</span>
                                        </div>
                                        {selectedDate && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-neutral-500">Date</span>
                                                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                                                    {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                </span>
                                            </div>
                                        )}
                                        {flightTime && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-neutral-500">Time</span>
                                                <span className="text-sm font-medium text-neutral-900 dark:text-white">{flightTime}</span>
                                            </div>
                                        )}
                                        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-2 mt-2">
                                            <div className="flex items-center justify-between text-base font-bold">
                                                <span className="text-neutral-900 dark:text-white">Total</span>
                                                <span className="text-orange-600">{selectedRoute.price}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {bookingStep === "form" ? (
                                        <button
                                            onClick={handleWhatsApp}
                                            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M17.6 14c-.9-1.2-2.1-2-3.5-2.4-1.4-.4-3-.3-4.3.3l-1.6 1.6c-1.3 1.3-1.5 3.5-.4 5 .9 1.2 2.4 2 4 2.2 1.5.2 2.9-.2 4-1l1.8-1.5c.5-.4.7-1 .8-1.6.1-.7-.2-1.4-.8-1.8l-.6-.6z"/>
                                                <path d="M17.6 14c1.1-1.1 1.8-2.6 1.9-4.2.1-1.7-.4-3.4-1.4-4.7C16.8 3.2 15 2 13 2l-.7.1C10.7 2.2 9 2.7 7.6 3.6L6.2 5c-1.4 1-2.2 2.5-2.4 4l-.1 1.4c0 1.7.6 3.3 1.8 4.5l1.2 1.2c1.3 1.3 3 2.1 4.9 2.1h.7c1.4-.1 2.8-.6 3.9-1.4z"/>
                                            </svg>
                                            Request Pickup
                                        </button>
                                    ) : null}
                                </>
                            ) : (
                                <div className="text-center py-6">
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                        <MapPinIcon className="w-6 h-6 text-neutral-400" />
                                    </div>
                                    <p className="text-sm text-neutral-500">
                                        Select your route to see pricing
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