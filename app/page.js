"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import FeaturedProperties from './components/FeaturedProperties';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <>
          <Navbar />
          <Hero />
          <FeaturedProperties />
          <AboutUs />
          <ContactForm />
          <Footer />
        </>
      )}
    </main>
  );
}
