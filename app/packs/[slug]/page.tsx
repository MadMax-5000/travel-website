import React from "react";
import { DEMO_PACK_LISTINGS } from "@/data/listings";
import PackDetailClient from "./PackDetailClient";
import { Metadata } from "next";

export async function generateStaticParams() {
    return DEMO_PACK_LISTINGS.map((pack) => ({
        slug: pack.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const slug = params.slug;
    const pack = DEMO_PACK_LISTINGS.find((item) => item.slug === slug);

    if (!pack) {
        return {
            title: "Pack Not Found | OHM Tours",
        };
    }

    return {
        title: `${pack.title} | OHM Tours`,
        description: `${pack.description} - Starting from ${pack.price}. Save ${pack.savings}.`,
        openGraph: {
            title: pack.title,
            description: `${pack.description} - Starting from ${pack.price}.`,
            images: [pack.featuredImage as string],
        },
    };
}

const PackPage = ({ params }: { params: { slug: string } }) => {
    const slug = params.slug;
    const pack = DEMO_PACK_LISTINGS.find((item) => item.slug === slug);

    if (!pack) {
        return (
            <div className="container relative py-20 text-center">
                <h2 className="text-2xl font-bold">Pack not found</h2>
                <p className="text-neutral-500 mt-2">The pack you are looking for does not exist.</p>
            </div>
        );
    }

    return <PackDetailClient pack={pack} />;
};

export default PackPage;
