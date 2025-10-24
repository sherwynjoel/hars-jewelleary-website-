'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid, List } from 'lucide-react'
import Navigation from '@/components/Navigation'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'

const categories = [
  { name: 'All', value: '' },
  { name: 'Rings', value: 'Rings' },
  { name: 'Necklaces', value: 'Necklaces' },
  { name: 'Earrings', value: 'Earrings' },
  { name: 'Bracelets', value: 'Bracelets' },
  { name: 'Watches', value: 'Watches' }
]

const sortOptions = [
  { name: 'Newest First', value: 'newest' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
  { name: 'Name A-Z', value: 'name-asc' }
]

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Collections
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl">
              Discover our exquisite collection of handcrafted jewelry, each piece telling a unique story of elegance and timeless beauty.
            </p>
          </motion.div>

          {/* Filters and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-gold-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field w-auto"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>

                {/* View Mode */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${
                      viewMode === 'grid'
                        ? 'bg-gold-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    } rounded-l-lg transition-colors`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${
                      viewMode === 'list'
                        ? 'bg-gold-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    } rounded-r-lg transition-colors`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 bg-gray-100 rounded-lg"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 lg:hidden"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="input-field w-full"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ProductGrid category={selectedCategory} />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
