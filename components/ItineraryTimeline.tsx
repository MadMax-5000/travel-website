import React from "react";
import { ItineraryItem } from "@/data/types";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";

interface ItineraryTimelineProps {
    itinerary: ItineraryItem[];
}

export default function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
    if (!itinerary || itinerary.length === 0) return null;

    const getIcon = (title: string) => {
        const lower = title.toLowerCase();
        if (lower.includes('pickup') || lower.includes('departure') || lower.includes('arrival')) {
            return (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            );
        }
        if (lower.includes('swim') || lower.includes('beach') || lower.includes('ocean')) {
            return (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
            );
        }
        if (lower.includes('lunch') || lower.includes('dinner') || lower.includes('meal') || lower.includes('bbq') || lower.includes('food')) {
            return (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
        }
        if (lower.includes('guide') || lower.includes('meet') || lower.includes('tour')) {
            return (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            );
        }
        if (lower.includes('sunset') || lower.includes('sunrise') || lower.includes('evening')) {
            return (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            );
        }
        if (lower.includes('return') || lower.includes('drop')) {
            return (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            );
        }
        return (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
    };

    return (
        <div className="pb-6 sm:pb-8">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-5 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-orange-500" />
                Tour Itinerary
            </h3>
            <div className="relative">
                <div className="absolute left-[22px] sm:left-[26px] top-4 bottom-4 w-0.5 bg-orange-200 dark:bg-orange-900/50" />

                <div className="space-y-3">
                    {itinerary.map((item, index) => {
                        const isLast = index === itinerary.length - 1;
                        const isFirst = index === 0;

                        return (
                            <div
                                key={index}
                                className={`relative flex items-start gap-4 ${isLast ? '' : 'pb-3'}`}
                            >
                                <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${isFirst ? 'bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg' : 'bg-white dark:bg-neutral-800 border-2 border-orange-200 dark:border-orange-800'}`}>
                                    {isFirst ? (
                                        <span className="text-white font-bold text-sm">{item.stepNumber}</span>
                                    ) : (
                                        <div className="text-orange-600 dark:text-orange-400">
                                            {getIcon(item.title)}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 pt-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-semibold uppercase tracking-wide ${isFirst ? 'text-orange-600 dark:text-orange-400' : 'text-neutral-400 dark:text-neutral-500'}`}>
                                            {item.time}
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 mb-0.5">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}