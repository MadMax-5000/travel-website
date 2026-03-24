"use client"

import { PEOPLE_URL } from "@/constants";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CAMP_IMAGES = [
  {
    src: "/images/mountain.jpg",
    alt: "Mountain camping",
    title: "Mountain View Camp",
    subtitle: "Nestled in the Atlas Mountains",
  },
  {
    src: "/images/beach-sunset.jpg",
    alt: "Beach sunset camping",
    title: "Coastal Beach Camp",
    subtitle: "Wake up to the ocean waves",
  },
];

interface CampSiteProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  peopleJoined: string;
}

const CampSite = ({ backgroundImage, title, subtitle, peopleJoined }: CampSiteProps) => {
  return (
    <div className={`h-full w-full min-w-[1100px] overflow-hidden ${backgroundImage} bg-cover bg-no-repeat lg:rounded-r-5xl 2xl:rounded-5xl`}>
      <div className="flex h-full flex-col items-start justify-between p-6 lg:px-20 lg:py-10">
        <div className="flexCenter gap-4">
          <div className="rounded-full bg-orange-50 p-4">
            <Image
              src="/folded-map.svg"
              alt="map"
              width={28}
              height={28}
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="bold-18 text-white">{title}</h4>
            <p className="regular-14 text-white">{subtitle}</p>
          </div>
        </div>

        <div className="flexCenter gap-6">
          <span className="flex -space-x-4 overflow-hidden">
            {PEOPLE_URL.map((url) => (
              <Image
                className="inline-block h-10 w-10 rounded-full"
                src={url}
                key={url}
                alt="person"
                width={52}
                height={52}
              />
            ))}
          </span>
          <p className="bold-16 md:bold-20 text-white">{peopleJoined}</p>
        </div>
      </div>
    </div>
  )
}

const Camp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CAMP_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + CAMP_IMAGES.length) % CAMP_IMAGES.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 1500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="2xl:max-container relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20">
      <div className="w-full mb-12 lg:mb-16 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
          Experience <span className="font-serif italic text-orange-500">Nature</span> Like Never Before
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed">
          Escape the ordinary and immerse yourself in breathtaking landscapes with our carefully curated camping experiences.
        </p>
      </div>

      <div className="relative w-full h-[340px] lg:h-[400px] xl:h-[640px] overflow-hidden lg:rounded-r-5xl 2xl:rounded-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={CAMP_IMAGES[currentIndex].src}
              alt={CAMP_IMAGES[currentIndex].alt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-4 right-4 flex gap-2 z-10">
          {CAMP_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-1/2 left-4 right-4 flex justify-between items-center z-10 -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 lg:px-20 lg:py-10 flex flex-col gap-2 z-10">
          <div className="flexCenter gap-4">
            <div className="rounded-full bg-orange-50 p-4">
              <Image
                src="/folded-map.svg"
                alt="map"
                width={28}
                height={28}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="bold-18 text-white">{CAMP_IMAGES[currentIndex].title}</h4>
              <p className="regular-14 text-white">{CAMP_IMAGES[currentIndex].subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flexEnd mt-10 px-6 lg:-mt-60 lg:mr-6">
        <div className="bg-orange-50 p-8 lg:max-w-[500px] xl:max-w-[734px] xl:rounded-5xl xl:px-16 xl:py-20 relative w-full overflow-hidden rounded-3xl">
          <h2 className="regular-24 md:regular-32 2xl:regular-64 capitalize text-white">
            <strong>Feeling Lost</strong> And Not Knowing The Way?
          </h2>
          <p className="regular-14 xl:regular-16 mt-5 text-white">
            Starting from the anxiety of the climbers when visiting a new climbing location, the possibility of getting lost is very large. That's why we are here for those of you who want to start an adventure
          </p>
          <Image
            src="/quote.svg"
            alt="camp-2"
            width={186}
            height={219}
            className="camp-quote"
          />
        </div>
      </div>
    </section>
  )
}

export default Camp