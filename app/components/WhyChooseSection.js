import { motion } from "framer-motion";
import { Building2, Leaf, Lightbulb, Handshake } from "lucide-react";

const WhyChooseSection = () => {
  const reasons = [
    {
      icon: <Leaf className="w-12 h-12 text-white" />,
      title: "Sustainable Practices",
      description: "We prioritize environmentally responsible methods, integrating green technologies and smart design into every project we build.",
      bgClass: "bg-estate-green"
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-white" />,
      title: "Innovation & Technology",
      description: "We embrace modern construction technologies and forward-thinking strategies to stay ahead of industry standards and trends.",
      bgClass: "bg-estate-blue"
    },
    {
      icon: <Building2 className="w-12 h-12 text-white" />,
      title: "Quality & Precision",
      description: "Each project is executed with meticulous attention to detail, using top-grade materials and practices to ensure lasting results.",
      bgClass: "bg-estate-purple"
    },
    {
      icon: <Handshake className="w-12 h-12 text-white" />,
      title: "Transparency & Trust",
      description: "We believe in open communication and honesty, fostering lasting relationships with clients, partners, and communities alike.",
      bgClass: "bg-estate-deepGreen"
    }
  ];

  return (
    <section id="why-choose" className="py-20 bg-estate-lightGreen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-estate-darkText mb-4">
            Why <span className="text-estate-green">Choose</span> <span className="text-estate-purple">Future</span> <span className="text-estate-blue">Prospects</span>
          </h2>
          <div className="w-24 h-1 bg-purple-green-gradient mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-estate-darkText/80 text-lg">
            At Future Prospects, we go beyond construction. We create value,
            trust, and sustainable growth — building a legacy that lasts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
              bgClass={reason.bgClass}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.button
            className="bg-purple-green-gradient text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More About Our Services
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const ReasonCard = ({ icon, title, description, bgClass, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-estate-blue"
  >
    <motion.div
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + (0.1 * index) }}
      className={`mb-4 w-16 h-16 rounded-full ${bgClass} flex items-center justify-center shadow-lg mx-auto`}
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-semibold text-estate-darkText mb-3 text-center">{title}</h3>
    <p className="text-estate-darkText/70 text-center">{description}</p>
  </motion.div>
);

export default WhyChooseSection;
