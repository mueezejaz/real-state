import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 bg-estate-skyblue z-50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Removed as per request */}
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavLink href="/" label="Home" isActive={pathname === "/"} />
              {pathname === "/" ? (
                <>
                  <NavLink href="#about" label="About Us" />
                  <NavLink href="#why-choose" label="Why Choose Us" />
                  <NavLink href="#contact" label="Contact" />
                  <NavLink href="#reviews" label="Reviews" />
                </>
              ) : null}
              <NavLink href="/services" label="Services" isActive={pathname === "/services"} />
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
            <MobileNavLink href="/" label="Home" onClick={() => setIsOpen(false)} isActive={pathname === "/"} />
            {pathname === "/" ? (
              <>
                <MobileNavLink href="#about" label="About Us" onClick={() => setIsOpen(false)} />
                <MobileNavLink href="#why-choose" label="Why Choose Us" onClick={() => setIsOpen(false)} />
                <MobileNavLink href="#contact" label="Contact" onClick={() => setIsOpen(false)} />
                <MobileNavLink href="#reviews" label="Reviews" onClick={() => setIsOpen(false)} />
              </>
            ) : null}
            <MobileNavLink href="/services" label="Services" onClick={() => setIsOpen(false)} isActive={pathname === "/services"} />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const NavLink = ({ href, label, isActive }) => {
  const linkClasses = `group relative px-3 py-2 text-sm font-medium ${
    isActive ? "text-estate-blue" : "text-estate-darkText hover:text-estate-blue"
  }`;

  // For section links (starting with #)
  if (href.startsWith("#")) {
    return (
      <a href={href} className={linkClasses}>
        {label}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-estate-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
      </a>
    );
  }

  // For page links
  return (
    <Link href={href} className={linkClasses}>
      {label}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-estate-blue transition-transform duration-200 origin-left ${
        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`} />
    </Link>
  );
};

const MobileNavLink = ({ href, label, onClick, isActive }) => {
  const linkClasses = `block px-3 py-2 rounded-md text-base font-medium ${
    isActive ? "text-estate-blue" : "text-estate-darkText hover:text-estate-blue"
  }`;

  // For section links (starting with #)
  if (href.startsWith("#")) {
    return (
      <motion.a
        href={href}
        className={linkClasses}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        {label}
      </motion.a>
    );
  }

  // For page links
  return (
    <Link href={href} legacyBehavior>
      <motion.a
        className={linkClasses}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        {label}
      </motion.a>
    </Link>
  );
};

export default Navbar;