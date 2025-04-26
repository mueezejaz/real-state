import { motion } from "framer-motion";
import { Building, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <div id="home" className="pt-16">
      <div className="relative min-h-[400px] md:min-h-[60vh] flex items-center justify-center overflow-hidden bg-purple-green-blue-gradient">
        <img
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80"
          alt="Construction Background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 mix-blend-overlay"
          style={{ opacity: 0.3 }}
        />
        <div className="absolute  inset-0   overflow-hidden  opacity-70 z-10" />
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Building the <span className="text-estate-green">Future</span> with <span className="text-estate-purple">Purpose</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white mb-8 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              At Future Prospects, we combine sustainability, innovation, and craftsmanship to create spaces that inspire and endure.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.button
                className="bg-estate-purple text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-estate-purple/90 transition-colors w-full sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="w-5 h-5" />
                Our Projects
              </motion.button>
              <motion.button
                className="bg-transparent border-2 border-estate-blue text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-estate-green/20 transition-colors w-full sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Building className="w-5 h-5" />
                Get in Touch
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-1 flex justify-center items-center"
          >
            <div className="bg-white/90 rounded-xl shadow-xl p-6 flex justify-center items-center w-full max-w-xs">
              <img 
                src="./real.png"
                alt="Future Prospects Logo"
                className="w-40 md:w-56 h-auto"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-10 md:h-16 bg-estate-lightPurple"
          style={{ clipPath: "ellipse(50% 100% at 50% 100%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
