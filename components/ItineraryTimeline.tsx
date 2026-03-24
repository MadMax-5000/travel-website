import React from "react";
import { ItineraryItem } from "@/data/types";

interface ItineraryTimelineProps {
    itinerary: ItineraryItem[];
}

export default function ItineraryTimeline({ itinerary }: ItineraryTimelineProps) {
    if (!itinerary || itinerary.length === 0) return null;

    return (
        <div className="pb-10 border-b border-neutral-200 dark:border-neutral-800">
            <h3 className="text-[24px] font-semibold text-neutral-900 dark:text-neutral-100 mb-7">
                Itinerary
            </h3>
            <div className="relative">
                {/* Timeline spine */}
                <div className="absolute left-[15px] top-5 bottom-5 w-px bg-neutral-200 dark:bg-neutral-700" />

                <div className="space-y-2">
                    {itinerary.map((item, index) => {
                        const isLast = index === itinerary.length - 1;

                        return (
                            <div
                                key={index}
                                className="relative flex items-start gap-5"
                            >
                                {/* Step indicator */}
                                <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-terracotta-50 flex items-center justify-center shadow-md shadow-terracotta-500/20 dark:shadow-terracotta-900/20">
                                    <span className="text-[13px] font-semibold text-neutral-900">
                                        {item.stepNumber}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-6">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-70 mb-1.5 block">
                                        {item.time}
                                    </span>
                                    <h4 className="font-semibold text-[17px] text-neutral-900 dark:text-neutral-100 mb-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
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
