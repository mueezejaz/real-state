'use client'
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronUp, MessageCircle } from "lucide-react"; // <-- Import icons

// Import all components
import Navbar from "./components/Navbar.js";
import HeroSection from "./components/HeroSection.js";
import AboutSection from "./components/AboutSection.js";
import WhyChooseSection from "./components/WhyChooseSection.js";
import ContactSection from "./components/ContactSection.js";
import ReviewsSection from "./components/ReviewSection.js";
import Footer from "./components/Footer.js";
// import Loading from "./Loading.js";

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
    <div className="min-h-screen bg-white relative">
      {/* <Loading/> */}
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
      
      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-40">
        <BackToTopButton />
        <WhatsAppButton />
      </div>
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
      className="p-3 rounded-full bg-estate-blue text-white shadow-lg"
      onClick={handleScrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: scrollYProgress.get() > 0.2 ? 1 : 0,
        scale: scrollYProgress.get() > 0.2 ? 1 : 0.8,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ChevronUp className="h-6 w-6" />
    </motion.button>
  );
};

const WhatsAppButton = () => {
  const phoneNumber = "923001234567"; // your WhatsApp number
  
  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-green-500 text-white shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  );
};

export default Home;


