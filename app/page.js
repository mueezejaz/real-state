'use client'
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Import all components
import Navbar from "./components/Navbar.js";
import HeroSection from "./components/HeroSection.js";
import AboutSection from "./components/AboutSection.js";
import WhyChooseSection from "./components/WhyChooseSection.js";
import ContactSection from "./components/ContactSection.js";
import ReviewsSection from "./components/ReviewSection.js";
import Footer from "./components/Footer.js";
import LoadingScreen from "./Loading.js";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <LoadingScreen />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-estate-blue z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
       <Navbar />
      <HeroSection />
      <AboutSection />
      <WhyChooseSection />
      <ContactSection />
      <ReviewsSection />
      <Footer />
      <BackToTopButton />
    </div>
  );
};

const BackToTopButton = () => {
  const { scrollYProgress } = useScroll();
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <motion.button
      className="fixed bottom-6 right-6 p-3 rounded-full bg-estate-blue text-white shadow-lg z-40"
      onClick={handleScrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: scrollYProgress.get() > 0.2 ? 1 : 0,
        scale: scrollYProgress.get() > 0.2 ? 1 : 0.8,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </motion.button>
  );
};

export default Home;
