"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const FAQS = [
  {
    question: "What is the best time to visit Agadir?",
    answer: "The best time to visit Agadir is from March to May or September to November when the weather is pleasant and temperatures are moderate. Summer months (June-August) can be very hot with temperatures reaching 35°C+."
  },
  {
    question: "Do you offer airport transfers?",
    answer: "Yes, we offer airport transfers for all our tours. Our driver will pick you up from Agadir airport and take you to your hotel or the tour starting point. You can add this option when booking your tour."
  },
  {
    question: "What should I pack for my tour?",
    answer: "We recommend packing comfortable walking shoes, sun protection (sunscreen, hat, sunglasses), modest clothing for visiting religious sites, and a camera. Don't forget your swimwear if your tour includes beach time!"
  },
  {
    question: "Are the tours suitable for families?",
    answer: "Yes! Many of our tours are family-friendly. We offer activities suitable for all ages. Please check the tour details for age recommendations or contact us for personalized recommendations."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Free cancellation up to 24 hours before the tour start time. For cancellations made less than 24 hours before, a 50% fee applies. No refund for no-shows."
  },
  {
    question: "Do you offer private tours?",
    answer: "Yes, we offer both group and private tours. Private tours can be customized to your preferences and schedule. Contact us for pricing and availability."
  }
]

const FAQItem = ({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-700">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 sm:py-5 text-left group"
      >
        <span className="text-sm sm:text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-orange-500 transition-colors pr-2">
          {question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-neutral-400 group-hover:text-orange-500 transition-colors flex-shrink-0" />
        )}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 pb-4 sm:pb-5" : "max-h-0"
        }`}
      >
        <p className="text-xs sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full bg-white dark:bg-neutral-900 py-12 lg:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-orange-500 mb-2 sm:mb-3">
            Got Questions?
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-0">
          {FAQS.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-neutral-500 dark:text-neutral-400 mb-4 text-sm sm:text-base">
            Still have questions?
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors text-sm sm:text-base"
          >
            Contact Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ
