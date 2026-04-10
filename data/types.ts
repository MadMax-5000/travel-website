import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

//  ######  CustomLink  ######## //
export interface CustomLink {
    label: string;
    href: Route<string> | string;
    targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
    id: string | number;
    name: string;
    href: Route<string>;
    count?: number;
    thumbnail?: string;
    desc?: string;
    color?: TwMainColor | string;
    taxonomy: "category" | "tag";
    listingType?: "stay" | "experiences";
    icon?: string;
}

export interface AuthorType {
    id: string | number;
    firstName: string;
    lastName: string;
    displayName: string;
    avatar: string | StaticImageData;
    bgImage?: string | StaticImageData;
    email?: string;
    count: number;
    desc: string;
    jobName: string;
    href: Route<string>;
    starRating?: number;
}

export interface PostDataType {
    id: string | number;
    author: AuthorType;
    date: string;
    href: Route<string>;
    categories: TaxonomyType[];
    title: string;
    featuredImage: StaticImageData | string;
    desc?: string;
    commentCount: number;
    viewdCount: number;
    readingTime: number;
    postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
    | "pink"
    | "green"
    | "yellow"
    | "red"
    | "indigo"
    | "blue"
    | "purple"
    | "gray"
    | "orange";

//
// Itinerary Item
export interface ItineraryItem {
    time: string;
    title: string;
    description: string;
    stepNumber: number;
}

//
export interface StayDataType {
    id: string | number;
    slug: string;
    author: AuthorType;
    date: string;
    href: Route<string>;
    title: string;
    featuredImage: StaticImageData | string;
    commentCount: number;
    viewCount: number;
    address: string;
    reviewStart: number;
    reviewCount: number;
    like: boolean;
    galleryImgs: (StaticImageData | string)[];
    price: string;
    priceEur: number;
    priceMad: number;
    listingCategory: TaxonomyType;
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    saleOff?: string | null;
    isAds: boolean | null;
    map: {
        lat: number;
        lng: number;
    };
    itinerary?: ItineraryItem[];
    duration: string;
    scheduleDays: string;
    includes: string[];
    tourDescription?: string;
}

//
export interface ExperiencesDataType {
    id: string | number;
    author: AuthorType;
    date: string;
    href: Route<string>;
    title: string;
    featuredImage: StaticImageData | string;
    commentCount: number;
    viewCount: number;
    address: string;
    reviewStart: number;
    reviewCount: number;
    like: boolean;
    galleryImgs: (StaticImageData | string)[];
    price: string;
    listingCategory: TaxonomyType;
    maxGuests: number;
    saleOff?: string | null;
    isAds: boolean | null;
    map: {
        lat: number;
        lng: number;
    };
}

export interface PackDataType {
    id: string | number;
    slug: string;
    author: AuthorType;
    date: string;
    href: Route<string>;
    title: string;
    subtitle: string;
    featuredImage: StaticImageData | string;
    commentCount: number;
    viewCount: number;
    address: string;
    reviewStart: number;
    reviewCount: number;
    like: boolean;
    galleryImgs: (StaticImageData | string)[];
    price: string;
    originalPrice?: string;
    savings?: string;
    duration: string;
    maxGuests: number;
    minGuests?: number;
    listingCategory: TaxonomyType;
    description: string;
    highlights: string[];
    saleOff?: string | null;
    isAds: boolean | null;
    map: {
        lat: number;
        lng: number;
    };
}

export interface AirportRouteType {
    id: string | number;
    fromCity: string;
    fromAirport: string;
    toAirport: string;
    toCity: string;
    price: string;
    duration: string;
}

export interface AirportPickupDataType {
    id: string | number;
    fromCity: string;
    fromAirport: string;
    toAirport: string;
    toCity: string;
    vehicleType: string;
    price: string;
    maxPassengers: number;
}

