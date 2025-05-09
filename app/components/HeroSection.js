import { motion } from "framer-motion";
import { Building, Mail, Phone } from "lucide-react";

const HeroSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const staggerText = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.5 } 
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with fade-in effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <picture>
          <source media="(min-width: 1024px)" srcSet="./desktop.png" />
          <source media="(min-width: 700px)" srcSet="./mid.png" />
          <source media="(min-width: 400px)" srcSet="./mid2.png" />
          <source media="(min-width: 100px)" srcSet="./mobile.png" />
          <img 
            className="w-full h-full object-cover" 
            src="/api/placeholder/1920/1080" 
            alt="Hero Background" 
          />
        </picture>
      </motion.div>
      
      {/* Content overlay */}
      <div className="relative z-20 p-4 sm:p-6 md:px-12 md:py-8 max-w-5xl mx-auto h-full">
        <div className="flex flex-col justify-start items-start pt-15 sm:pt-12 md:pt-16 max-w-xs sm:max-w-sm md:max-w-lg md:ml-0 sm:ml-18">
          {/* Logo above heading with scale animation */}
          <motion.div 
            className="mb-4 sm:mb-6"
            initial="hidden"
            animate="visible"
            variants={scaleIn}
          >
            <div className="w-20 sm:w-27 md:w-32">
              <img 
                src="./real.png" 
                alt="Company Logo" 
                className="w-full h-full" 
              />
            </div>
          </motion.div>
          
          {/* Main Heading with staggered text animation */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-snug md:leading-tight"
            initial="hidden"
            animate="visible"
            variants={staggerText}
          >
            <motion.span 
              className="text-estate-darkText block"
              variants={slideUp}
            >
              Building Tomorrow's
            </motion.span>
            <motion.span 
              className="text-gray-800 block"
              variants={slideUp}
            >
              Infrastructure with
            </motion.span>
            <motion.span 
              className="text-estate-blue block"
              variants={slideUp}
            >
              Innovation
            </motion.span>
          </motion.h1>
          
          {/* Adding a subtle CTA button with animation */}
          <motion.div
            className="mt-6 md:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.button 
              className="bg-estate-blue text-white px-6 py-3 rounded-md font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover More
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Footer with website URL and slide-up animation */}
      <motion.div 
        className="absolute bottom-2 sm:bottom-4 md:bottom-6 text-white left-4 sm:left-6 md:left-8 z-20 flex items-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
      </motion.div>
    </div>
  );
};

export default HeroSection;




