import __stayListing from "./jsons/__stayListing.json";
import __experiencesListing from "./jsons/__experiencesListing.json";
import {
    DEMO_STAY_CATEGORIES,
    DEMO_EXPERIENCES_CATEGORIES,
} from "./taxonomies";
import { ExperiencesDataType, StayDataType, ItineraryItem } from "./types";
import { DEMO_AUTHORS } from "./authors";
import { Route } from "@/routers/types";

const SAMPLE_ITINERARY: ItineraryItem[] = [
    {
        time: "08:00 AM",
        title: "Hotel Pick-up",
        description: "Pick-up from your hotel or designated meeting point in Agadir.",
        stepNumber: 1
    },
    {
        time: "09:30 AM",
        title: "Arrival & Welcome",
        description: "Arrive at the destination and receive a warm welcome from your guide.",
        stepNumber: 2
    },
    {
        time: "11:00 AM",
        title: "Guided Exploration",
        description: "Begin your guided tour through the main attractions and hidden gems.",
        stepNumber: 3
    },
    {
        time: "01:00 PM",
        title: "Lunch Break",
        description: "Enjoy a delicious local lunch at a traditional restaurant.",
        stepNumber: 4
    },
    {
        time: "04:00 PM",
        title: "Free Time",
        description: "Free time for shopping or exploring at your own pace.",
        stepNumber: 5
    },
    {
        time: "06:00 PM",
        title: "Return Journey",
        description: "Head back to Agadir withdrop-off at your original pickup location.",
        stepNumber: 6
    }
];

const DEMO_STAY_LISTINGS = __stayListing.map((post, index): StayDataType => {
    //  ##########  GET CATEGORY BY CAT ID ######## //
    const category = DEMO_STAY_CATEGORIES.filter(
        (taxonomy) => taxonomy.id === post.listingCategory.id
    )[0];

    return {
        ...post,
        id: post.id || `stayListing_${index}_`,
        slug: post.slug || `stay-listing-${index}`,
        saleOff: !index ? "-20% today" : post.saleOff,
        isAds: post.isAds,
        author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
        listingCategory: category,
        href: `/listing/${post.slug || `stay-listing-${index}`}` as Route,
        bedrooms: 2,
        bathrooms: 1,
        maxGuests: post.maxGuests || 4,
        itinerary: SAMPLE_ITINERARY,
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

export { DEMO_STAY_LISTINGS, DEMO_EXPERIENCES_LISTINGS };

