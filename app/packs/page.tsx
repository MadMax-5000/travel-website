"use client"

import { useState, useMemo } from "react"
import { DEMO_PACK_LISTINGS } from "@/data/listings"
import { DEMO_STAY_CATEGORIES } from "@/data/taxonomies"
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

  const activeFiltersCount = [selectedCategory].filter(Boolean).length

  const renderFilterSidebar = () => (
    <div className="space-y-1">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          !selectedCategory
            ? "bg-orange-500 text-white"
            : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
        }`}
      >
        All Packs
        <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
          !selectedCategory ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-700'
        }`}>
          {DEMO_PACK_LISTINGS.length}
        </span>
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelectedCategory(cat.id)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedCategory === cat.id
              ? "bg-orange-500 text-white"
              : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          }`}
        >
          {cat.name}
          <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
            selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-neutral-700'
          }`}>
            1
          </span>
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8 sm:pb-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-28 bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-100 dark:border-neutral-800">
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="w-full text-xs text-orange-600 hover:text-orange-700 font-medium text-right mb-3"
                >
                  Clear all
                </button>
              )}
              {renderFilterSidebar()}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                  {selectedCategory
                    ? categories.find((c) => c.id === selectedCategory)?.name
                    : "Tour Packages"}
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                  {filteredPacks.length} packages available - Save up to 26%
                </p>
              </div>
            </div>

            <div className="lg:hidden mb-6">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-orange-500 text-white text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {currentPacks.length > 0 ? (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {currentPacks.map((pack, index) => (
                  <PackCard key={pack.id} data={pack} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 sm:py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  No packages found
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-6">
                  Try adjusting your filters
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex mt-10 sm:mt-12 justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Prev
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
                  className="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

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
          <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-neutral-800">
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
              className="w-full mt-6 py-3.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
            >
              Show {filteredPacks.length} Results
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
