import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Link from "next/link";
import GallerySlider from "./GallerySlider";

export interface StayCardProps {
    className?: string;
    data?: StayDataType;
    size?: "default" | "small";
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCard: FC<StayCardProps> = ({
    size = "default",
    className = "",
    data = DEMO_DATA,
}) => {
    const {
        galleryImgs,
        listingCategory,
        address,
        title,
        href,
        like,
        saleOff,
        isAds,
        price,
        reviewStart,
        reviewCount,
        id,
    } = data;

    const renderSliderGallery = () => {
        return (
            <div className="relative w-full">
                <GallerySlider
                    uniqueID={`StayCard_${id}`}
                    ratioClass="aspect-w-4 aspect-h-3 "
                    galleryImgs={galleryImgs}
                    href={href}
                    galleryClass={size === "default" ? undefined : ""}
                />
                <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />

            </div>
        );
    };

    const renderContent = () => {
        return (
            <div className={size === "default" ? "p-4 space-y-3" : "p-3 space-y-2"}>
                <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                    {listingCategory.name}
                </span>

                <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2">
                        {isAds && <Badge name="ADS" color="green" />}
                        <h2
                            className={`font-semibold text-neutral-900 dark:text-white ${size === "default" ? "text-base" : "text-base"}`}
                        >
                            <span className="line-clamp-1">{title}</span>
                        </h2>
                    </div>
                    <span className="shrink-0 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
                        {price}
                    </span>
                </div>

                <div className="flex justify-between items-end mt-2">
                    <div className="flex items-start text-neutral-500 dark:text-neutral-400 text-sm gap-2">
                        <svg className="w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                        <span className="line-clamp-2 text-xs">{address}</span>
                    </div>
                </div>
                {!!reviewStart && (
                    <div className="mt-2 text-right">
                        <StartRating reviewCount={reviewCount} point={reviewStart} />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            className={`nc-StayCard group relative bg-white dark:bg-neutral-900 ${size === "default"
                ? "border border-neutral-100 dark:border-neutral-800 "
                : ""
                } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
            data-nc-id="StayCard"
        >
            {renderSliderGallery()}
            <Link href={href}>{renderContent()}</Link>
        </div>
    );
};

export default StayCard;

