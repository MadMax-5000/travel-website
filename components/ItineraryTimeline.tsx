import React from "react";
import { ItineraryItem } from "@/data/types";

interface ItineraryTimelineProps {
    itinerary: ItineraryItem[];
}

export default function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
    if (!itinerary || itinerary.length === 0) return null;

    return (
        <div className="pb-6 sm:pb-10 border-b border-neutral-200 dark:border-neutral-800">
            <h3 className="text-lg sm:text-[24px] font-semibold text-neutral-900 dark:text-neutral-100 mb-5 sm:mb-7">
                Itinerary
            </h3>
            <div className="relative">
                {/* Timeline spine */}
                <div className="absolute left-[11px] sm:left-[15px] top-4 sm:top-5 bottom-4 sm:bottom-5 w-px bg-neutral-200 dark:bg-neutral-700" />

                <div className="space-y-1 sm:space-y-2">
                    {itinerary.map((item, index) => {
                        const isLast = index === itinerary.length - 1;

                        return (
                            <div
                                key={index}
                                className="relative flex items-start gap-3 sm:gap-5"
                            >
                                {/* Step indicator */}
                                <div className="relative z-10 flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-orange-50 flex items-center justify-center shadow-md shadow-orange-500/20 dark:shadow-orange-900/20">
                                    <span className="text-[10px] sm:text-[13px] font-semibold text-neutral-900">
                                        {item.stepNumber}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-4 sm:pb-6">
                                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400 mb-1 block">
                                        {item.time}
                                    </span>
                                    <h4 className="font-semibold text-sm sm:text-[17px] text-neutral-900 dark:text-neutral-100 mb-0.5 sm:mb-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs sm:text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
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
