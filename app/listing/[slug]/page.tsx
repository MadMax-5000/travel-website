import React from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import ListingPageClient from "./ListingPageClient";
import { Metadata } from "next";

export async function generateStaticParams() {
    return DEMO_STAY_LISTINGS.map((listing) => ({
        slug: listing.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = params.slug;
    const listing = DEMO_STAY_LISTINGS.find((item) => item.slug === slug);

    if (!listing) {
        return {
            title: "Tour Not Found | HM Tours",
        };
    }

    return {
        title: `${listing.title} | HM Tours`,
        description: `Book ${listing.title} - ${listing.address}. Starting from ${listing.price}. Experience the best of Agadir with HM Tours.`,
        openGraph: {
            title: listing.title,
            description: `Book ${listing.title} - ${listing.address}. Starting from ${listing.price}.`,
            images: [listing.featuredImage as string],
        },
    };
}

const ListingPage = ({ params }: { params: { slug: string } }) => {
    const slug = params.slug;
    const listing = DEMO_STAY_LISTINGS.find((item) => item.slug === slug);

    if (!listing) {
        return (
            <div className="container relative py-20 text-center">
                <h2 className="text-2xl font-bold">Listing not found</h2>
                <p className="text-neutral-500 mt-2">The listing you are looking for does not exist.</p>
            </div>
        );
    }

    return <ListingPageClient listing={listing} />;
};

export default ListingPage;
