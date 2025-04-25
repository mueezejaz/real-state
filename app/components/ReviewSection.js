import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Home Buyer",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    text: "Blue Estate made finding our dream home so easy! Their team was attentive to our needs and found us the perfect property within our budget. We couldn't be happier with our new home."
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Property Investor",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
    text: "As an investor, I appreciate the market insights and property analysis provided by Blue Estate. They've helped me add several high-performing properties to my portfolio over the last few years."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "First-time Seller",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
    text: "Selling my home was a stressful prospect, but Blue Estate handled everything professionally. They got me above asking price and made the whole process smooth and transparent."
  },
  {
    id: 4,
    name: "David Wilson",
    title: "Commercial Client",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 4,
    text: "The commercial team at Blue Estate helped us find the perfect retail location for our business expansion. Their knowledge of the local market was invaluable to our success."
  },
  {
    id: 5,
    name: "Jessica Thompson",
    title: "Repeat Customer",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5,
    text: "I've used Blue Estate for three different property transactions now, and each time has been exceptional. They truly understand my preferences and always deliver outstanding service."
  }
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setMaxIndex(
          reviews.length - (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)
        );
      }
    };
    
    handleResize();
    
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  
  const handlePrev = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };
  
  const handleNext = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, maxIndex));
  };

  return (
    <section id="reviews" className="py-20 bg-estate-lightGray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-estate-darkText mb-4">Client <span className="text-estate-blue">Reviews</span></h2>
          <div className="w-24 h-1 bg-estate-blue mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-estate-darkText/80 text-lg">
            Don't just take our word for it. Here's what our valued clients have to say about their experience with Blue Estate.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6"
              initial={{ x: 0 }}
              animate={{ x: -currentIndex * (320 + 24) }} // Card width + gap
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {reviews.map((review, index) => (
                <ReviewCard key={review.id} review={review} index={index} />
              ))}
            </motion.div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-10 gap-4">
            <motion.button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full ${currentIndex === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-estate-blue text-white hover:bg-estate-blue/90'}`}
              whileHover={currentIndex !== 0 ? { scale: 1.1 } : {}}
              whileTap={currentIndex !== 0 ? { scale: 0.9 } : {}}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-3 rounded-full ${currentIndex >= maxIndex ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-estate-blue text-white hover:bg-estate-blue/90'}`}
              whileHover={currentIndex < maxIndex ? { scale: 1.1 } : {}}
              whileTap={currentIndex < maxIndex ? { scale: 0.9 } : {}}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
    className="flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-md"
  >
    <div className="flex items-center gap-4 mb-4">
      <img 
        src={review.image} 
        alt={review.name} 
        className="w-14 h-14 rounded-full object-cover"
      />
      <div>
        <h4 className="font-semibold text-estate-darkText">{review.name}</h4>
        <p className="text-sm text-estate-darkText/70">{review.title}</p>
      </div>
    </div>
    
    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < review.rating ? 'text-estate-orange fill-estate-orange' : 'text-gray-300'}`} 
        />
      ))}
    </div>
    
    <p className="text-estate-darkText/80 text-sm">{review.text}</p>
  </motion.div>
);

export default ReviewsSection;