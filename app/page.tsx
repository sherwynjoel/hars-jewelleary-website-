'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-gray-900 leading-tight"
                >
                  Timeless
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
                    Elegance
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg sm:text-xl text-gray-600 max-w-lg"
                >
                  Discover our exquisite collection of handcrafted jewelry that celebrates life's most precious moments.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/collections"
                  className="btn-primary inline-flex items-center justify-center space-x-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-gold-100 to-gold-200 rounded-3xl flex items-center justify-center">
                  <Sparkles className="w-32 h-32 text-gold-500 animate-glow" />
                </div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-24 h-24 bg-gold-400 rounded-full opacity-20"
                />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gold-300 rounded-full opacity-30"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Why Choose Hars Jewellery?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine traditional craftsmanship with modern design to create pieces that last a lifetime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Handcrafted Excellence',
                description: 'Each piece is meticulously crafted by skilled artisans using traditional techniques.'
              },
              {
                icon: Shield,
                title: 'Authentic Quality',
                description: 'We guarantee the authenticity and quality of every piece in our collection.'
              },
              {
                icon: Truck,
                title: 'Secure Delivery',
                description: 'Your precious jewelry is delivered safely with insurance and tracking.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-gold-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular pieces, loved by customers worldwide.
            </p>
          </motion.div>

          <ProductGrid limit={6} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
