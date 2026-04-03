"use client"

import React, { useState } from "react"
import { StayDataType } from "@/data/types"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Star } from "lucide-react"

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
        reviewStart,
        reviewCount,
        listingCategory,
        href,
        galleryImgs,
    } = data

    const imageSrc = typeof galleryImgs?.[0] === 'string' 
        ? galleryImgs[0] 
        : galleryImgs?.[0]?.src 
        || "/images/agadir.jpg"

    return (
        <div className="group relative">
            <Link href={href} className="block">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setIsLiked(!isLiked)
                        }}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors z-10"
                    >
                        <Heart 
                            className={`w-4 h-4 ${isLiked ? "fill-orange-500 text-orange-500" : "text-white"}`} 
                        />
                    </button>

                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-neutral-900">
                                {listingCategory?.name || "Tour"}
                            </span>
                            <div className="flex items-center gap-1 px-2 py-1 bg-orange-500 rounded-full text-xs font-medium text-white">
                                <Star className="w-3 h-3 fill-white" />
                                {reviewStart || "4.8"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-start gap-2 mt-4">
                    <div className="flex-1">
                        <p className="text-xs text-orange-500 font-medium mb-1">
                            {listingCategory?.name || "Tour"}
                        </p>
                        <h3 className="font-semibold text-lg text-neutral-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center gap-1 mt-2 text-neutral-500 dark:text-neutral-400 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span className="line-clamp-1">{address}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-orange-500">{priceEur} € / {priceMad} MAD</p>
                        <p className="text-xs text-neutral-400">per person</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default TourCard
