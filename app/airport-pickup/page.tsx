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
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.498 14.382C17.393 14.316 14.898 12.739 14.75 12.688C14.602 12.639 14.463 12.626 14.332 12.65C14.2 12.674 14.074 12.735 13.961 12.828C13.772 12.96 13.535 13.242 13.339 13.423C13.144 13.604 12.976 13.691 12.818 13.691C12.66 13.691 12.464 13.629 12.322 13.512C10.291 11.912 8.932 9.442 8.788 9.237C8.645 9.031 8.466 8.856 8.375 8.856C8.284 8.856 8.221 8.89 8.167 8.943C8.113 8.996 8.054 9.083 8.002 9.152L7.971 9.188C7.779 9.422 7.412 9.869 7.594 10.124C8.162 10.766 8.752 11.391 9.359 11.99C9.984 12.571 10.634 13.1 11.24 13.566C11.871 14.052 12.537 14.404 13.198 14.582C13.865 14.762 14.561 14.759 15.234 14.572C15.889 14.392 16.497 14.077 17.003 13.65C17.041 13.616 17.072 13.606 17.098 13.618C17.124 13.63 17.132 13.652 17.125 13.68C17.118 13.709 17.09 13.773 17.052 13.852C16.952 14.041 16.764 14.324 16.576 14.605C16.388 14.886 16.208 15.132 16.123 15.216C16.038 15.3 15.953 15.382 15.88 15.382C15.807 15.382 15.789 15.362 15.777 15.34C15.765 15.318 15.766 15.278 15.788 15.205C15.932 14.762 16.232 14.193 16.485 13.794C16.738 13.395 16.913 13.007 17.019 12.783C17.125 12.559 17.146 12.459 17.156 12.373C17.166 12.287 17.146 12.227 17.136 12.195C17.126 12.163 17.107 12.124 17.092 12.072C17.077 12.02 17.062 11.972 17.062 11.972C17.052 11.924 16.91 11.518 16.783 11.255C16.656 10.992 16.529 10.997 16.381 10.997C16.233 10.997 16.093 11.003 15.953 11.012C15.813 11.021 15.631 11.045 15.447 11.114C15.263 11.183 15.127 11.271 15.027 11.371C14.889 11.508 14.702 11.735 14.589 11.914C14.476 12.093 14.412 12.202 14.299 12.349C14.186 12.496 14.139 12.574 14.043 12.723C13.947 12.872 13.851 13.027 13.789 13.114C13.727 13.201 13.669 13.284 13.634 13.323C13.599 13.362 13.585 13.38 13.566 13.38C13.547 13.38 13.518 13.36 13.498 13.33C13.478 13.3 13.45 13.265 13.426 13.228C13.402 13.191 13.361 13.13 13.319 13.064C13.277 12.998 13.223 12.923 13.177 12.832C13.131 12.741 13.088 12.644 13.059 12.549C12.949 12.197 12.936 11.809 12.977 11.432C13.018 11.055 13.132 10.69 13.315 10.372C13.498 10.054 13.743 9.786 14.033 9.589C14.323 9.392 14.65 9.27 14.99 9.232C15.33 9.194 15.673 9.241 15.996 9.37C16.319 9.499 16.611 9.706 16.85 9.977C17.089 10.248 17.269 10.577 17.375 10.939C17.481 11.301 17.511 11.686 17.463 12.063C17.415 12.44 17.29 12.801 17.098 13.116C16.906 13.431 16.652 13.697 16.354 13.892C16.056 14.087 15.719 14.207 15.369 14.241C15.019 14.275 14.664 14.223 14.33 14.09C13.996 13.957 13.692 13.746 13.436 13.473C13.18 13.2 12.977 12.873 12.839 12.512C12.701 12.151 12.631 11.764 12.633 11.373C12.635 10.982 12.699 10.593 12.821 10.232C12.943 9.871 13.121 9.546 13.344 9.279C13.567 9.012 13.831 8.809 14.12 8.677C14.409 8.545 14.717 8.486 15.027 8.502C15.337 8.518 15.642 8.61 15.923 8.772C16.204 8.934 16.456 9.163 16.663 9.445C16.87 9.727 17.029 10.057 17.128 10.414C17.227 10.771 17.265 11.147 17.239 11.522C17.213 11.897 17.124 12.265 16.977 12.604L17.498 14.382Z" fill="currentColor"/>
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