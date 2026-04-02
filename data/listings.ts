import __stayListing from "./jsons/__stayListing.json";
import __experiencesListing from "./jsons/__experiencesListing.json";
import __packsListing from "./jsons/__packs.json";
import __airportRoutes from "./jsons/__airportRoutes.json";
import {
    DEMO_STAY_CATEGORIES,
    DEMO_EXPERIENCES_CATEGORIES,
} from "./taxonomies";
import { ExperiencesDataType, StayDataType, ItineraryItem, PackDataType, AirportRouteType } from "./types";
import { DEMO_AUTHORS } from "./authors";
import { Route } from "@/routers/types";

function generateItinerary(title: string, duration: string, includes: string[]): ItineraryItem[] {
    const items: ItineraryItem[] = [];
    let step = 1;
    
    items.push({
        time: "Hotel Pickup",
        title: "Pickup from Your Hotel",
        description: "Our driver will pick you up from your hotel reception or designated meeting point.",
        stepNumber: step++
    });
    
    if (includes.some(i => i.toLowerCase().includes('guide'))) {
        items.push({
            time: "Tour Start",
            title: "Meet Your Guide",
            description: "Your professional guide will accompany you throughout the experience.",
            stepNumber: step++
        });
    }
    
    if (title.toLowerCase().includes('city tour')) {
        items.push({
            time: "10:00 AM",
            title: "Marina & Tourist Area",
            description: "Visit the beautiful Marina and explore the main tourist attractions.",
            stepNumber: step++
        });
        items.push({
            time: "11:00 AM",
            title: "Kasbah & Old City",
            description: "Discover the historic Kasbah and wander through the old medina.",
            stepNumber: step++
        });
        items.push({
            time: "12:00 PM",
            title: "Souk ALHAD",
            description: "Explore the vibrant Souk ALHAD market and enjoy traditional mint tea.",
            stepNumber: step++
        });
    } else if (title.toLowerCase().includes('quad') || title.toLowerCase().includes('buggy')) {
        items.push({
            time: "Arrival",
            title: "Equipment & Safety Briefing",
            description: "Receive your equipment and comprehensive safety instructions.",
            stepNumber: step++
        });
        items.push({
            time: "Adventure",
            title: "Desert Exploration",
            description: "Navigate through stunning dunes and desert landscapes.",
            stepNumber: step++
        });
        items.push({
            time: "Return",
            title: "Relaxation",
            description: "Enjoy traditional Moroccan mint tea after your adventure.",
            stepNumber: step++
        });
    } else if (title.toLowerCase().includes('boat')) {
        items.push({
            time: "09:00 AM",
            title: "Marina Departure",
            description: "Board your boat at Agadir Marina.",
            stepNumber: step++
        });
        items.push({
            time: "Sea Time",
            title: "Swimming & Fishing",
            description: "Enjoy swimming in crystal-clear waters and try fishing.",
            stepNumber: step++
        });
        items.push({
            time: "12:00 PM",
            title: "Onboard Lunch",
            description: "Feast on a delicious lunch prepared on board.",
            stepNumber: step++
        });
    } else if (title.toLowerCase().includes('camel') || title.toLowerCase().includes('horse')) {
        items.push({
            time: "Arrival",
            title: "Mount Selection",
            description: "Choose your camel or horse for the adventure.",
            stepNumber: step++
        });
        items.push({
            time: "2 Hours",
            title: "Forest & River Trail",
            description: "Ride through scenic forest paths and along the river.",
            stepNumber: step++
        });
        if (title.toLowerCase().includes('sunset') || title.toLowerCase().includes('bbq')) {
            items.push({
                time: "Sunset",
                title: "Barbecue Dinner",
                description: "Enjoy a traditional Moroccan BBQ dinner under the stars.",
                stepNumber: step++
            });
        }
    } else if (title.toLowerCase().includes('marrakech')) {
        items.push({
            time: "07:15 AM",
            title: "Departure from Agadir",
            description: "Comfortable journey to the Red City.",
            stepNumber: step++
        });
        items.push({
            time: "Arrival",
            title: "Koutoubia Mosque",
            description: "Visit the iconic landmark of Marrakech.",
            stepNumber: step++
        });
        items.push({
            time: "Market",
            title: "Traditional Souks",
            description: "Get lost in the colorful maze of traditional markets.",
            stepNumber: step++
        });
        items.push({
            time: "Evening",
            title: "Jamaa el-Fna Square",
            description: "Experience the magic of the famous square.",
            stepNumber: step++
        });
    } else if (title.toLowerCase().includes('essaouira')) {
        items.push({
            time: "07:30 AM",
            title: "Journey to Essaouira",
            description: "Scenic drive to the windswept Atlantic coast.",
            stepNumber: step++
        });
        items.push({
            time: "Port",
            title: "Historic Harbor",
            description: "Explore the traditional fishing port.",
            stepNumber: step++
        });
        items.push({
            time: "Medina",
            title: "UNESCO Old City",
            description: "Wander through the charming blue and white medina.",
            stepNumber: step++
        });
    } else if (includes.some(i => i.toLowerCase().includes('lunch'))) {
        items.push({
            time: "Midday",
            title: "Local Lunch",
            description: "Enjoy an authentic Moroccan meal at a local establishment.",
            stepNumber: step++
        });
    } else if (title.toLowerCase().includes('berber fantasia')) {
        items.push({
            time: "08:00 PM",
            title: "Berber Fantasia Show",
            description: "Experience the spectacular Berber Fantasia show featuring traditional music, horseback performances, and cultural displays.",
            stepNumber: step++
        });
        items.push({
            time: "09:30 PM",
            title: "Traditional Moroccan Dinner",
            description: "Enjoy a delicious authentic Moroccan dinner with live entertainment including belly dancing.",
            stepNumber: step++
        });
    }
    
    items.push({
        time: "Return",
        title: "Hotel Drop-off",
        description: "Relaxed journey back with drop-off at your hotel.",
        stepNumber: step
    });
    
    return items;
}

const DEMO_STAY_LISTINGS = __stayListing.map((post, index): StayDataType => {
    const category = DEMO_STAY_CATEGORIES.filter(
        (taxonomy) => taxonomy.id === post.listingCategory.id
    )[0];

    return {
        ...post,
        id: post.id || `stayListing_${index}_`,
        slug: post.slug || `stay-listing-${index}`,
        saleOff: post.saleOff,
        isAds: post.isAds,
        author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
        listingCategory: category,
        href: `/listing/${post.slug || `stay-listing-${index}`}` as Route,
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: post.maxGuests || 4,
        itinerary: generateItinerary(post.title, post.duration, post.includes || []),
        duration: post.duration || "",
        scheduleDays: post.saleOff || "EVERYDAY",
        includes: post.includes || [],
        tourDescription: post.tourDescription || post.address,
        priceEur: post.priceEur || 0,
        priceMad: post.priceMad || 0,
    };
});

const DEMO_EXPERIENCES_LISTINGS = __experiencesListing.map(
    (post, index): ExperiencesDataType => {
        //  ##########  GET CATEGORY BY CAT ID ######## //
        const category = DEMO_EXPERIENCES_CATEGORIES.filter(
            (taxonomy) => taxonomy.id === post.listingCategoryId
        )[0];

        return {
            ...post,
            id: `experiencesListing_${index}_`,
            saleOff: !index ? "-20% today" : post.saleOff,
            isAds: post.isAds,
            author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
            listingCategory: category,
            href: post.href as Route,
        };
    }
);

const DEMO_PACK_LISTINGS = __packsListing.map((post, index): PackDataType => {
    const category = DEMO_STAY_CATEGORIES.filter(
        (taxonomy) => taxonomy.id === post.listingCategory.id
    )[0];

    const tours = post.tours && post.tours.length > 0 
        ? DEMO_STAY_LISTINGS.filter((tour) => (post.tours as string[]).includes(tour.id as string))
        : [];

    return {
        ...post,
        id: post.id || `pack_${index}_`,
        slug: post.slug || `pack-${index}`,
        saleOff: post.saleOff,
        isAds: post.isAds,
        author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
        listingCategory: category,
        href: `/packs/${post.slug || `pack-${index}`}` as Route,
        tours: tours,
    };
});

const DEMO_AIRPORT_ROUTES = __airportRoutes.map((route, index): AirportRouteType => ({
    ...route,
    id: route.id || `route_${index}_`,
}));

export { DEMO_STAY_LISTINGS, DEMO_EXPERIENCES_LISTINGS, DEMO_PACK_LISTINGS, DEMO_AIRPORT_ROUTES };

