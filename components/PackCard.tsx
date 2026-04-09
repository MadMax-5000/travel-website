"use client"

import React, { useState } from "react"
import { PackDataType } from "@/data/types"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Calendar } from "lucide-react"

export interface PackCardProps {
    data?: PackDataType
    className?: string
}

const PackCard = ({ data, className = "" }: PackCardProps) => {
    const [isLiked, setIsLiked] = useState(data?.like || false)

    if (!data) return null

    const {
        title,
        subtitle,
        duration,
        listingCategory,
        href,
        galleryImgs,
        price,
        originalPrice,
        savings,
    } = data

    const euroPrice = price?.split("/")[0]?.trim() || price

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
                    
                    {savings && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-orange-500 rounded-full z-10 shadow-sm">
                            <span className="text-[10px] font-bold text-white text-center">{savings}</span>
                        </div>
                    )}
                    
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
                        {listingCategory?.name || "Pack"}
                    </p>

                    <h3 className="text-[15px] font-medium text-neutral-900 dark:text-white leading-snug mb-2">
                        {title}
                    </h3>

                    <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400 text-xs mb-4">
                        <span className="truncate">{subtitle}</span>
                    </div>

                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
                        <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-[18px] font-semibold text-orange-500">
                                {euroPrice}
                            </span>
                            {originalPrice && (
                                <span className="text-xs text-neutral-400 line-through">
                                    {originalPrice}
                                </span>
                            )}
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
                            <Calendar className="w-4 h-4" />
                            Book Pack
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PackCard
