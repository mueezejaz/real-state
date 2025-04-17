"use client";
import { motion } from 'framer-motion';

// Sample property data
const properties = [
  {
    id: 1,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "$4,500,000",
    bedrooms: 5,
    bathrooms: 6,
    area: "4,500 sq ft",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHxS3LQIU40KnF9zpzcAGGgYzxymcRYpWrHg&s"
  },
  {
    id: 2,
    title: "Luxury Penthouse",
    location: "Manhattan, NY",
    price: "$8,200,000",
    bedrooms: 4,
    bathrooms: 4.5,
    area: "3,800 sq ft",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiAkWFmFood_pyF6wtMtWeFNIa9e_FRbMbFXeP394a1JKugxtdbNnsY9WFpHsmf-3Kljg&usqp=CAU"
  },
  {
    id: 3,
    title: "Waterfront Estate",
    location: "Miami, FL",
    price: "$12,900,000",
    bedrooms: 7,
    bathrooms: 9,
    area: "8,200 sq ft",
    imageUrl: "https://c1.wallpaperflare.com/preview/282/222/441/new-home-house-realtor-real-estate.jpg"
  }
];

export default function FeaturedProperties() {
  return (
    <section id="properties" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Properties</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties in the most desirable locations
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Properties
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ property, index }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white py-1 px-3 rounded-full font-semibold">
          {property.price}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location}
        </p>
        
        <div className="flex justify-between text-gray-700 mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <span>{property.area}</span>
          </div>
        </div>
        
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-blue-600 font-medium py-2 rounded-lg transition-colors">
          View Details
        </button>
      </div>
    </motion.div>
  );
}
