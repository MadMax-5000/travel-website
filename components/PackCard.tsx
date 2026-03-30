import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import { PackDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import Badge from "@/shared/Badge";
import Link from "next/link";

export interface PackCardProps {
    className?: string;
    data?: PackDataType;
}

const PackCard: FC<PackCardProps> = ({
    className = "",
    data,
}) => {
    if (!data) return null;

    const {
        galleryImgs,
        listingCategory,
        address,
        title,
        subtitle,
        href,
        like,
        saleOff,
        price,
        originalPrice,
        savings,
        duration,
        tours,
        reviewStart,
        reviewCount,
        id,
    } = data;

    const renderSliderGallery = () => {
        return (
            <div className="relative w-full">
                <GallerySlider
                    uniqueID={`PackCard_${id}`}
                    ratioClass="aspect-w-12 aspect-h-11"
                    galleryImgs={galleryImgs}
                    imageClass="rounded-lg"
                    href={href}
                />
                <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />
                {savings && (
                    <div className="absolute left-3 top-3 z-[1]">
                        <span className="bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                            {savings}
                        </span>
                    </div>
                )}
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                    <span className="block text-xs text-neutral-500 dark:text-neutral-400">
                        {listingCategory?.name || "Pack"}
                    </span>
                    {saleOff && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-medium">
                            {saleOff}
                        </span>
                    )}
                </div>

                <h2 className="font-semibold text-neutral-900 dark:text-white text-base">
                    <span className="line-clamp-1">{title}</span>
                </h2>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1">
                    {subtitle}
                </p>

                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{duration}</span>
                    <span className="mx-1">•</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="line-clamp-1">{address}</span>
                </div>

                {tours && tours.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {tours.slice(0, 3).map((tour, idx) => (
                            <span 
                                key={idx}
                                className="text-xs px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                            >
                                {tour.title}
                            </span>
                        ))}
                        {tours.length > 3 && (
                            <span className="text-xs px-2 py-1 text-neutral-500">
                                +{tours.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                <div className="flex items-end justify-between mt-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral-400 dark:text-neutral-500 line-through">
                            {originalPrice}
                        </span>
                        <span className="text-lg font-bold text-orange-600">
                            {price}
                        </span>
                    </div>
                    {!!reviewStart && (
                        <StartRating reviewCount={reviewCount} point={reviewStart} />
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={`nc-PackCard group relative ${className}`}>
            {renderSliderGallery()}
            <Link href={href}>{renderContent()}</Link>
        </div>
    );
};

export default PackCard;
