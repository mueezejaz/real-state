import { motion } from "framer-motion";
import { Building, Phone } from "lucide-react";

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
        <div className="absolute inset-0 overflow-hidden opacity-70 z-10" />
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left"
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
              style={{ textShadow: "1px 1px 4px rgba(0, 0, 0, 0.6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Building Tomorrow’s <span className="text-estate-green">Infrastructure</span> with <span className="text-estate-purple">Innovation</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white mb-8 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              From OSP works to civil construction, we at Future Prospects Modern Business LLC lead with integrity, safety, and sustainable solutions tailored to your needs.
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
                <Building className="w-5 h-5" />
                View Services
              </motion.button>
              <motion.button
                className="bg-transparent border-2 border-estate-blue text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-estate-green/20 transition-colors w-full sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-1 flex justify-center items-center"
          >
            {/* Logo animation */}
            <motion.div
              className="relative w-full max-w-xs"
              whileHover={{
                scale: 1.05,
                rotate: [0, 2, 0, -2, 0],
                transition: { rotate: { repeat: Infinity, duration: 2 } }
              }}
            >

              <motion.div
                className="absolute -top-24 -left-24 w-64 h-64 bg-estate-blue/40 rounded-full filter blur-3xl"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
              />

                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className={`absolute w-2 h-2 rounded-full ${["bg-estate-purple", "bg-estate-blue", "bg-estate-green"][i % 3]}`}
                      initial={{
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100,
                        scale: 0.2,
                        opacity: 0.3
                      }}
                      animate={{
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100,
                        scale: [0.2, 0.8, 0.2],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 5 + Math.random() * 5,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                <img
                  src="./real.png"
                  alt="Future Prospects Logo"
                  className="w-40 md:w-56 h-auto relative z-10 drop-shadow-xl"
                  style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))" }}
                  loading="eager"
                />
            </motion.div>
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

