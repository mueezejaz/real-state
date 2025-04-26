import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-estate-lightGreen border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <img src="./real.png"   alt="Blue Estate Logo" className="h-[200px] w-[170px]" />
            </div>
            <p className="text-estate-darkText/70 mb-4">
              Your premier real estate agency committed to helping you find your perfect property with professional service and local expertise.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook />} href="#" />
              <SocialIcon icon={<Twitter />} href="#" />
              <SocialIcon icon={<Instagram />} href="#" />
              <SocialIcon icon={<Linkedin />} href="#" />
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-estate-darkText mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="#home" text="Home" />
              <FooterLink href="#about" text="About Us" />
              <FooterLink href="#why-choose" text="Why Choose Us" />
              <FooterLink href="#properties" text="Properties" />
              <FooterLink href="#contact" text="Contact" />
              <FooterLink href="#reviews" text="Reviews" />
            </ul>
          </motion.div>
          
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-estate-darkText mb-4">Our Services</h3>
            <ul className="space-y-2">
              <FooterLink href="#" text="Property Buying" />
              <FooterLink href="#" text="Property Selling" />
              <FooterLink href="#" text="Property Renting" />
              <FooterLink href="#" text="Market Analysis" />
              <FooterLink href="#" text="Investment Consulting" />
              <FooterLink href="#" text="Property Management" />
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-estate-darkText mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-estate-blue mt-0.5" />
                <span className="text-estate-darkText/70">123 Real Estate Avenue, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-estate-blue" />
                <span className="text-estate-darkText/70">(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-estate-blue" />
                <span className="text-estate-darkText/70">info@blueestate.com</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <hr className="my-8 border-gray-200" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-estate-darkText/70 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} Blue Estate. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-estate-darkText/70 hover:text-estate-blue transition-colors">Privacy Policy</a>
            <a href="#" className="text-estate-darkText/70 hover:text-estate-blue transition-colors">Terms of Service</a>
            <a href="#" className="text-estate-darkText/70 hover:text-estate-blue transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }) => (
  <motion.a
    href={href}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-estate-lightGray text-estate-blue hover:bg-estate-blue hover:text-white transition-colors"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    {icon}
  </motion.a>
);

const FooterLink = ({ href, text }) => (
  <li>
    <a 
      href={href} 
      className="text-estate-darkText/70 hover:text-estate-blue transition-colors relative inline-block"
    >
      <span className="relative">
        {text}
        <motion.span
          className="absolute left-0 bottom-0 w-full h-0.5 bg-estate-blue rounded-full"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </span>
    </a>
  </li>
);

export default Footer;