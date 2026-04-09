"use client"

import React, { useState } from "react"
import { StayDataType } from "@/data/types"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Calendar } from "lucide-react"

export interface TourCardProps {
    data?: StayDataType
    className?: string
}

const TourCard = ({ data, className = "" }: TourCardProps) => {
    const [isLiked, setIsLiked] = useState(data?.like || false)

    if (!data) return null

    const {
        title,
        priceMad,
        priceEur,
        address,
        listingCategory,
        href,
        galleryImgs,
    } = data

    const imageSrc = typeof galleryImgs?.[0] === 'string' 
        ? galleryImgs[0] 
        : galleryImgs?.[0]?.src 
        || "/images/agadir.jpg"

    return (
        <Link href={href} className={`group block ${className}`}>
            <div className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden border-2 border-neutral-300 dark:border-neutral-600 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setIsLiked(!isLiked)
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white transition-colors z-10 shadow-sm"
                    >
                        <Heart 
                            className={`w-4 h-4 ${isLiked ? "fill-orange-500 text-orange-500" : "text-neutral-600"}`} 
                        />
                    </button>
                </div>

                <div className="p-3">
                    <p className="text-[11px] font-medium text-orange-500 uppercase tracking-wide mb-2">
                        {listingCategory?.name || "Tour"}
                    </p>

                    <h3 className="text-[15px] font-medium text-neutral-900 dark:text-white leading-snug mb-2">
                        {title}
                    </h3>

                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs mb-4">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{address}</span>
                    </div>

                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
                        <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-[18px] font-semibold text-orange-500">
                                {priceEur} €
                            </span>
                            <span className="text-xs text-neutral-400">
                                / {priceMad} MAD
                            </span>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
                            <Calendar className="w-4 h-4" />
                            Book Tour
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TourCard
