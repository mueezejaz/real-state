import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href="/" className="flex items-center">
              <img src="./adada.png" alt="Blue Estate Logo" className="h-[50px] w-[45px]" />
            </a>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink href="#home" label="Home" />
              <NavLink href="#about" label="About Us" />
              <NavLink href="#why-choose" label="Why Choose Us" />
              <NavLink href="#properties" label="Properties" />
              <NavLink href="#contact" label="Contact" />
              <NavLink href="#reviews" label="Reviews" />
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-estate-darkText hover:text-estate-blue"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <MobileNavLink href="#home" label="Home" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="#about" label="About Us" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="#why-choose" label="Why Choose Us" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="#properties" label="Properties" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="#contact" label="Contact" onClick={() => setIsOpen(false)} />
            <MobileNavLink href="#reviews" label="Reviews" onClick={() => setIsOpen(false)} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const NavLink = ({ href, label }) => (
    <a
    href={href}
    className="group relative px-3 py-2 text-sm font-medium text-estate-darkText hover:text-estate-blue"
  >
    {label}
    <span
      className="absolute bottom-0 left-0 w-full h-0.5 bg-estate-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
    />
  </a>
);

const MobileNavLink = ({ href, label, onClick }) => (
  <motion.a
    href={href}
    className="text-estate-darkText hover:text-estate-blue block px-3 py-2 rounded-md text-base font-medium"
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.a>
);

export default Navbar;