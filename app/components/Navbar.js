"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-6'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-blue-600">
          LuxuryEstates
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="/" label="Home" />
          <NavLink href="#properties" label="Properties" />
          <NavLink href="#about" label="About" />
          <NavLink href="#contact" label="Contact" />
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-blue-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-white py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            <MobileNavLink href="/" label="Home" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink href="#properties" label="Properties" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink href="#about" label="About" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink href="#contact" label="Contact" onClick={() => setMobileMenuOpen(false)} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function NavLink({ href, label }) {
  return (
    <Link href={href} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }) {
  return (
    <Link 
      href={href} 
      className="text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

