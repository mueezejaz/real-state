import { motion } from "framer-motion";
import { Home, Award, Clock, Shield, Building, Zap } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 overflow-hidden bg-estate-lightPurple">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            Future Prospects Modern Business LLC is a growing and dynamic Civil Contracting and Telecom Infrastructure Company committed to delivering high-quality construction and infrastructure solutions. With a solid foundation built on expertise, we have been serving with professionalism and a strong emphasis on quality, safety, and timely delivery.
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
              Core Areas of Expertise
            </h3>

            <ul className="list-disc pl-5 mb-8 text-estate-darkText/80">
              <li>Building Construction (residential, commercial, and industrial)</li>
              <li>Infrastructure development</li>
              <li>Earthworks and excavation</li>
              <li>Utilities and drainage systems</li>
              <li>Structural rehabilitation and retrofitting</li>
              <li>Civil works for telecom projects (OSP OMANTEL, OOREDOO)</li>
            </ul>

            <p className="text-estate-darkText/80 mb-8">
              We are committed to delivering end-to-end infrastructure solutions with a focus on quality, safety, and timely execution.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FeatureItem 
                icon={<Building className="text-estate-green" />} 
                title="Comprehensive Services" 
                description="From building construction to telecom infrastructure, we cover all aspects." 
                bgColor="bg-estate-lightGreen"
              />

              <FeatureItem 
                icon={<Award className="text-estate-purple" />} 
                title="Driven by Excellence" 
                description="Professionalism and quality are at the heart of every project we undertake." 
                bgColor="bg-estate-lightPurple"
              />

              <FeatureItem 
                icon={<Clock className="text-estate-blue" />} 
                title="Timely Delivery" 
                description="We emphasize on-time completion through precise planning and execution." 
                bgColor="bg-estate-lightGray"
              />

              <FeatureItem 
                icon={<Zap className="text-estate-green" />} 
                title="Telecom Expertise" 
                description="Expert civil works for OSP OMANTEL and OOREDOO telecom projects." 
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

