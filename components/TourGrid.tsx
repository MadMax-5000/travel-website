"use client"

import React, { FC, ReactNode, useState } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import StayCard from "./StayCard";
import StayCard2 from "./StayCard2";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS;

//
export interface SectionGridFeaturePlacesProps {
    stayListings?: StayDataType[];
    gridClass?: string;
    heading?: ReactNode;
    subHeading?: ReactNode;
    headingIsCenter?: boolean;
    tabs?: string[];
    cardType?: "card1" | "card2";
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
    stayListings = DEMO_DATA,
    gridClass = "",
    cardType = "card2",
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(stayListings.length / itemsPerPage);

    const currentListings = stayListings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const renderCard = (stay: StayDataType) => {
        let CardName = StayCard;
        switch (cardType) {
            case "card1":
                CardName = StayCard;
                break;
            case "card2":
                CardName = StayCard2;
                break;

            default:
                CardName = StayCard;
        }

        return <CardName key={stay.id} data={stay} />;
    };

    return (
        <div className="nc-SectionGridFeaturePlaces relative padding-container max-container">
            <div className="w-full mb-12 lg:mb-16 text-center max-w-2xl mx-auto mt-12">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
                    Unforgettable <span className="font-serif italic text-orange-500">Adventures</span>
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed">
                    Discover the hidden gems of Agadir with our handpicked selection of premium tours and authentic local experiences.
                </p>
            </div>

            <div
                className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
            >
                {currentListings.map((stay) => renderCard(stay))}
            </div>

            {totalPages > 1 && (
                <div className="flex mt-16 justify-center items-center gap-4">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-6 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-6 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default SectionGridFeaturePlaces;

