"use client"

import { useState, useMemo } from "react"
import { DEMO_STAY_LISTINGS } from "@/data/listings"
import { DEMO_STAY_CATEGORIES } from "@/data/taxonomies"
import { StayDataType, TaxonomyType } from "@/data/types"
import StayCard from "@/components/StayCard"
import StayCard2 from "@/components/StayCard2"
import { SlidersHorizontal, MapPin, X } from "lucide-react"

export default function ToursPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const itemsPerPage = 12

  const categories = useMemo(() => DEMO_STAY_CATEGORIES, [])

  const filteredTours = useMemo(() => {
    return DEMO_STAY_LISTINGS.filter((tour) => {
      const categoryMatch = !selectedCategory || tour.listingCategory?.id === selectedCategory
      const priceMatch = true
      return categoryMatch && priceMatch
    })
  }, [selectedCategory])

  const totalPages = Math.ceil(filteredTours.length / itemsPerPage)

  const currentTours = filteredTours.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const clearFilters = () => {
    setSelectedCategory(null)
    setPriceRange([0, 1000])
  }

  const activeFiltersCount = [selectedCategory].filter(Boolean).length

  const renderFilterSidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              !selectedCategory
                ? "bg-orange-500 text-white"
                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            All Tours
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-orange-500 text-white"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/agadir.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Explore <span className="font-serif italic text-orange-300">Agadir</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Discover amazing tours and experiences in Morocco's coastal paradise
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium shadow-sm"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-orange-500 text-white text-xs">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-12">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Filters</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
              {renderFilterSidebar()}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {selectedCategory
                    ? categories.find((c) => c.id === selectedCategory)?.name
                    : "All Tours"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 mt-1">
                  {filteredTours.length} tours available
                </p>
              </div>
            </div>

            {/* Tours Grid */}
            {currentTours.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {currentTours.map((tour, index) => (
                  <StayCard2 key={tour.id} data={tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  No tours found
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                  Try adjusting your filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex mt-12 justify-center items-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-orange-500 text-white"
                          : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          mobileFiltersOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${
            mobileFiltersOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileFiltersOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-neutral-900 shadow-2xl transition-transform duration-300 ${
            mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Filters</h2>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="p-2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-5 overflow-y-auto h-[calc(100%-70px)]">
            {renderFilterSidebar()}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-8 py-3.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
            >
              Show {filteredTours.length} Results
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
