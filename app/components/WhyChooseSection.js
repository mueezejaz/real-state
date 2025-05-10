import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const WhyChooseSection = () => {
  const reasons = [
    {
      image: "/whychooseusimage/green.png", // Path to your image
      title: "Sustainable Practices",
      description: "We prioritize environmentally responsible methods, integrating green technologies and smart design into every project we build.",
      bgClass: "bg-estate-green"
    },
    {
      image: "/whychooseusimage/2nd.png", // Path to your image
      title: "Innovation & Technology",
      description: "We embrace modern construction technologies and forward-thinking strategies to stay ahead of industry standards and trends.",
      bgClass: "bg-estate-blue"
    },
    {
      image: "/whychooseusimage/3rd.png", // Path to your image
      title: "Quality & Precision",
      description: "Each project is executed with meticulous attention to detail, using top-grade materials and practices to ensure lasting results.",
      bgClass: "bg-estate-purple"
    },
    {
      image: "/whychooseusimage/4th.png", // Path to your image
      title: "Transparency & Trust",
      description: "We believe in open communication and honesty, fostering lasting relationships with clients, partners, and communities alike.",
      bgClass: "bg-estate-deepGreen"
    }
  ];

  return (
    <section id="why-choose" className="py-20 bg-estate-skyblue">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-estate-darkText mb-4">
            Why Choose Future Prospects
          </h2>
          <div className="w-24 h-1 mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-estate-darkText/80 text-lg">
            At Future Prospects, We create value,
            trust, and sustainable growth — building a legacy that lasts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              image={reason.image}
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
          <Link href="/services">
            <motion.button
              className="bg-estate-blue text-white px-8 py-3 rounded-md font-medium hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More About Our Services
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ReasonCard = ({ image, title, description, bgClass, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
  >
    <div className="relative h-48 w-full">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      <div className={`absolute inset-0 ${bgClass} opacity-30`}></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-estate-darkText mb-3">{title}</h3>
      <p className="text-estate-darkText/70">{description}</p>
    </div>
  </motion.div>
);

export default WhyChooseSection;
