import { motion } from "framer-motion";
import { Home, Award, Clock, Shield } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 overflow-hidden bg-estate-lightPurple">
      <div className="container mx-auto px-4  sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-estate-darkText mb-4">
            About Future Prospects
          </h2>
          <div className="w-24 h-1 bg-estate-darkText mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-estate-darkText/80 text-lg">
Future Prospects Mordent Business LLC is a Growing provider OSP Works (OMANTEL, OREDOO) Tower Construction (Civil) Road Maintenance Works OBB Fiber Optical Works (Projects & Last Mile) new Installation and Maintenance (Civil) Water line Civil Works Building Contracting & Construction Works (Commercial & Residential) With a strong commitment to quality, efficiency, and innovation, we deliver endto-end solutions for infrastructure projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="./tower.webp" 
                alt="Construction Team" 
                className="w-full h-auto object-cover"
              />
            </div>
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-blue-purple-gradient text-white py-4 px-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-2xl font-bold">15+</p>
              <p className="text-sm font-medium">Years Experience</p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-estate-darkText mb-6">
              Building Futures, One Project at a Time
            </h3>

            <p className="text-estate-darkText/80 mb-8">
              At Future Prospects, our commitment goes beyond bricks and mortar. We integrate sustainable practices, modern technologies, and smart design into our work to ensure efficient, environmentally responsible construction. Every project we undertake reflects our core values: reliability, transparency, and a relentless drive to exceed client expectations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FeatureItem 
                icon={<Home className="text-estate-green" />} 
                title="Sustainable Construction" 
                description="We use modern technologies and eco-conscious practices for every build." 
                bgColor="bg-estate-lightGreen"
              />

              <FeatureItem 
                icon={<Award className="text-estate-purple" />} 
                title="Driven by Excellence" 
                description="Our skilled team delivers top-quality results that stand the test of time." 
                bgColor="bg-estate-lightPurple"
              />

              <FeatureItem 
                icon={<Clock className="text-estate-blue" />} 
                title="Timely Delivery" 
                description="Precision planning and efficient execution ensure on-time project completion." 
                bgColor="bg-estate-lightGray"
              />

              <FeatureItem 
                icon={<Shield className="text-estate-green" />} 
                title="Trusted Partner" 
                description="Built on a foundation of integrity, collaboration, and client satisfaction." 
                bgColor="bg-estate-lightGreen"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ icon, title, description, bgColor }) => (
  <motion.div 
    className="flex items-start gap-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className={`mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${bgColor}`}>
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-estate-darkText mb-1">{title}</h4>
      <p className="text-sm text-estate-darkText/70">{description}</p>
    </div>
  </motion.div>
);

export default AboutSection;
