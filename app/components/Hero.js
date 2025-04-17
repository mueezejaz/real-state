"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1605146769289-440113cc3d00?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D')",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream Home
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Discover luxury properties in the most sought-after locations
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#properties">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Properties
              </motion.button>
            </Link>
            <Link href="#contact">
              <motion.button
                className="bg-transparent hover:bg-white/20 border-2 border-white text-white px-8 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
