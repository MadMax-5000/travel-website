import Image from 'next/image'
import React from 'react'

const Guide = () => {
  return (
    <section className="flex flex-col items-center w-full bg-white dark:bg-neutral-900 py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full pb-16 md:pb-24">
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <div className="max-w-xl">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-orange-500 mb-3">
              Your Journey Starts Here
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Your Adventure Starts Here
            </h2>
          </div>
          <div className="max-w-xl">
            <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed">
              Let us guide you through the hidden gems of Agadir. From pristine beaches to Atlas Mountain adventures, we curate unforgettable experiences tailored just for you.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl lg:rounded-3xl overflow-hidden bg-white">
          <Image
            src="/images/birdview-agadir-beach&city.jpg"
            alt="Agadir beach and city"
            fill
            className="w-full object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          <div className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[5%] lg:top-20">
            <Image 
              src="/meter.svg"
              alt="meter"
              width={16}
              height={158}
              className="h-full w-auto"
            />
            <div className="flex flex-col justify-between">
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center w-full gap-4">
                  <p className="text-base text-gray-20 dark:text-gray-20">Destination</p>
                  <p className="text-base font-bold text-orange-500">45 min</p>
                </div>
                <p className="text-xl font-bold mt-2 text-neutral-900 dark:text-white">Agadir Beach</p>
              </div>

              <div className="flex flex-col w-full">
                <p className="text-base text-gray-20 dark:text-gray-20">Start point</p>
                <h4 className="text-xl font-bold mt-2 whitespace-nowrap text-neutral-900 dark:text-white">Your Hotel</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide
