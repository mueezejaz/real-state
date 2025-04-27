import { motion } from "framer-motion";
import { Building, Mail, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
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
      </div>
      
      {/* Content overlay */}
      <div className="relative z-20 p-4 sm:p-6 md:p-8 max-w-5xl mx-auto h-full">
        <div className="flex flex-col justify-start items-start pt-15 sm:pt-12 md:pt-16 max-w-xs sm:max-w-sm md:max-w-lg">
          {/* Logo above heading */}
          <div className="mb-4 sm:mb-6">
            <div className="w-24 sm:w-32 md:w-40">
              <img 
                src="./real.png" 
                alt="Company Logo" 
                className="w-full h-full" 
              />
            </div>
          </div>
          
          {/* Main Heading with responsive text sizes */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-snug md:leading-normal">
            <span className="text-estate-darkText block">
              Building Tomorrow's
            </span>
            <span className="text-gray-800 block">
              Infrastructure with
            </span>
            <span className="text-estate-blue block">
              Innovation
            </span>
          </h1>
          
        </div>
      </div>
      
      {/* Footer with website URL */}
      <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 text-white left-4 sm:left-6 md:left-8 z-20 flex items-center">
        <span className="text-xs sm:text-sm text-white">www.futureprospectsmodern.com</span>
      </div>
    </div>
  );
};

export default HeroSection;


