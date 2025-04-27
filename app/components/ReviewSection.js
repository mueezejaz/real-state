import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const reviews = [
  {
    id: 1,
    name: "أحمد الزهراني",
    title: "عميل سكني",
    image: "./persons/1.webp",
    rating: 5,
    text: "حولت شركة Future Prospects رؤيتنا إلى حقيقة! لقد تجاوز انتباههم للتصميم المستدام وجودة البناء توقعاتنا. منزل أحلامنا الآن هو عرض للهندسة المعمارية الحديثة والميزات الصديقة للبيئة."
  },
  {
    id: 2,
    name: "سالم الهنائي",
    title: "مطور تجاري",
    image: "./persons/2.webp",
    rating: 5,
    text: "بصفتي مطورًا، أقدر الدقة ونهج Future Prospects المبتكر في كل مشروع. لقد كانت خبرتهم في البناء التجاري لا تقدر بثمن بالنسبة لنمو أعمالنا."
  },
  {
    id: 3,
    name: "محمد البلوشي",
    title: "بناء لأول مرة",
    image: "./persons/3.webp",
    rating: 5,
    text: "بناء منزلنا الأول كان يبدو مرهقًا، لكن Future Prospects أرشدتنا في كل خطوة بشفافية واحترافية. كانت النتيجة أفضل مما تصورنا ضمن ميزانيتنا."
  },
  {
    id: 4,
    name: "خالد الرواحي",
    title: "مدير مشروع تجزئة",
    image: "./persons/4.webp",
    rating: 4,
    text: "لقد حولت Future Prospects مساحة التجزئة لدينا بشكل كامل، مما أحدث تغييرًا في تجربة العملاء لدينا. كان فهمهم لاحتياجات البيع بالتجزئة الحديثة مثيرًا للإعجاب."
  },
  {
    id: 5,
    name: "ناصر الشيباني",
    title: "عميل متكرر",
    image: "./persons/5.webp",
    rating: 5,
    text: "لقد عملت مع Future Prospects في ثلاثة مشاريع بناء مختلفة، وكل مرة كانت استثنائية. الجودة المستمرة لديهم وقدرتهم على الوفاء بالمواعيد تجعلهم شريك البناء الموثوق بالنسبة لي."
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
    <section id="reviews" className="py-20 bg-estate-lightPurple relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-purple-pattern opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-estate-darkText mb-4">
            Customer Success <span className="text-estate-blue">Stories</span>
          </h2>
          <div className="w-24 h-1 bg-purple-green-blue-gradient mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-estate-darkText/80 text-lg">
            Here's what our clients are saying about their experience with Future Prospects.
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
              className={`p-3 rounded-full ${currentIndex === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-estate-purple to-estate-blue text-white hover:opacity-90'}`}
              whileHover={currentIndex !== 0 ? { scale: 1.1 } : {}}
              whileTap={currentIndex !== 0 ? { scale: 0.9 } : {}}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-3 rounded-full ${currentIndex >= maxIndex ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-estate-blue to-estate-green text-white hover:opacity-90'}`}
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

const ReviewCard = ({ review, index }) => {
  // Alternate card styles
  const cardStyles = [
    "border-t-4 border-estate-purple",
    "border-t-4 border-estate-blue",
    "border-t-4 border-estate-green"
  ];
  
  const cardStyle = cardStyles[index % cardStyles.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
      whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
      className={`flex-shrink-0 w-80 bg-white p-6 rounded-lg shadow-md ${cardStyle} transition-all duration-300`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          <img 
            src={review.image} 
            alt={`Avatar of ${review.name}`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-estate-darkText">{review.name}</h4>
          <p className="text-sm text-estate-darkText/70">{review.title}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      
      <p className="text-estate-darkText/80 text-sm italic">{review.text}</p>
    </motion.div>
  );
};

export default ReviewsSection;

