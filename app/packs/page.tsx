"use client"

import { useState, useMemo } from "react"
import { DEMO_PACK_LISTINGS } from "@/data/listings"
import { PackDataType } from "@/data/types"
import PackCard from "@/components/PackCard"
import { SlidersHorizontal, MapPin, X } from "lucide-react"

export default function PacksPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const itemsPerPage = 12

  const categories = useMemo(() => {
    const cats = new Map()
    DEMO_PACK_LISTINGS.forEach((pack) => {
      if (pack.listingCategory) {
        cats.set(pack.listingCategory.id, pack.listingCategory)
      }
    })
    return Array.from(cats.values())
  }, [])

  const filteredPacks = useMemo(() => {
    return DEMO_PACK_LISTINGS.filter((pack) => {
      const categoryMatch = !selectedCategory || pack.listingCategory?.id === selectedCategory
      return categoryMatch
    })
  }, [selectedCategory])

  const totalPages = Math.ceil(filteredPacks.length / itemsPerPage)

  const currentPacks = filteredPacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const clearFilters = () => {
    setSelectedCategory(null)
  }

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
            All Packs
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
      <div className="relative h-[30vh] sm:h-[35vh] min-h-[200px] sm:min-h-[250px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/agadir.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
            Special <span className="font-serif italic text-orange-300">Packs</span>
          </h1>
          <p className="text-sm sm:text-lg text-white/80 max-w-2xl mx-auto">
            Get the best value with our curated tour packages - save up to 26%
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium shadow-sm text-sm"
          >
            <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Filters</h2>
                {selectedCategory && (
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
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                  {selectedCategory
                    ? categories.find((c) => c.id === selectedCategory)?.name
                    : "All Packs"}
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base mt-1">
                  {filteredPacks.length} packs available
                </p>
              </div>
            </div>

            {/* Packs Grid */}
            {currentPacks.length > 0 ? (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {currentPacks.map((pack, index) => (
                  <PackCard key={pack.id} data={pack} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 sm:py-16">
                <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-neutral-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  No packs found
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4 sm:mb-6 text-sm sm:text-base">
                  Try adjusting your filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors text-sm"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex mt-10 sm:mt-12 justify-center items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm font-medium"
                >
                  Prev
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full text-xs sm:text-sm font-medium transition-colors ${
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
                  className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm font-medium"
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
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Filters</h2>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="p-2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 sm:p-5 overflow-y-auto h-[calc(100%-70px)]">
            {renderFilterSidebar()}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-6 sm:mt-8 py-3 sm:py-3.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors text-sm"
            >
              Show {filteredPacks.length} Results
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
