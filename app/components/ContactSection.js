import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

// Define Zod schema for form validation
const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

const ContactSection = () => {
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    
    console.log("Form Data:", formValues);
    
    try {
      const validatedData = contactFormSchema.parse(formValues);
      console.log("Validated Data:", validatedData);
      setFormErrors({});
      alert("Form submitted successfully!");
    } catch (error) {
      if (error.errors) {
        const errors = {};
        error.errors.forEach((err) => {
          const path = err.path[0];
          errors[path] = err.message;
        });
        setFormErrors(errors);
        console.error("Validation errors:", errors);
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-estate-lightPurple via-white to-estate-lightGreen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-estate-darkText mb-4">
            Get In <span className="text-estate-blue">Touch</span> With Us
          </h2>
          <div className="w-24 h-1 bg-purple-green-blue-gradient mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-estate-darkText/80 text-lg">
            Want to know more about our construction, fiber optic, OSP, or civil works? Reach out to Future Prospects Modern Business LLC — we’re here to help you build with quality, efficiency, and innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-white rounded-lg p-8 shadow-lg border-t-4 border-estate-purple"
          >
            <h3 className="text-2xl font-bold text-estate-purple mb-6">Contact Information</h3>
            
            <div className="space-y-8">
              <ContactInfo 
                icon={<Phone className="text-estate-blue" />}
                title="Phone"
                details={["+971 50 123 4567", "+971 55 987 6543"]}
                bgColor="bg-estate-lightBlue"
              />
              
              <ContactInfo 
                icon={<Mail className="text-estate-green" />}
                title="Email"
                details={["info@futureprospectsllc.com", "projects@futureprospectsllc.com"]}
                bgColor="bg-estate-lightGreen"
              />
              
              <ContactInfo 
                icon={<MapPin className="text-estate-purple" />}
                title="Office"
                details={["Business Bay, Dubai", "United Arab Emirates"]}
                bgColor="bg-estate-lightPurple"
              />
            </div>
            
            <div className="mt-10 p-6 bg-blue-purple-gradient rounded-lg text-white">
              <h4 className="text-lg font-semibold mb-4">Office Hours</h4>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white rounded-lg p-8 shadow-xl border-t-4 border-estate-blue"
          >
            <h3 className="text-2xl font-bold text-estate-blue mb-6">Send Us a Message</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput 
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  required
                  error={formErrors.firstName}
                  borderColor="focus:ring-estate-purple focus:border-estate-purple"
                />
                
                <FormInput 
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Your last name"
                  required
                  error={formErrors.lastName}
                  borderColor="focus:ring-estate-purple focus:border-estate-purple"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput 
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  error={formErrors.email}
                  borderColor="focus:ring-estate-blue focus:border-estate-blue"
                />
                
                <FormInput 
                  label="Phone"
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  error={formErrors.phone}
                  borderColor="focus:ring-estate-blue focus:border-estate-blue"
                />
              </div>
              
              <FormSelect 
                label="Service Interested In"
                name="service"
                options={[
                  { value: "", label: "Select a service" },
                  { value: "building", label: "Building Contracting" },
                  { value: "fiber", label: "Fiber Optic / OSP Works" },
                  { value: "tower", label: "Tower Construction" },
                  { value: "roads", label: "Road Maintenance" },
                  { value: "civil", label: "Civil Works & Waterline" },
                ]}
                error={formErrors.service}
                borderColor="focus:ring-estate-green focus:border-estate-green"
              />
              
              <FormTextarea 
                label="Message"
                name="message"
                placeholder="Tell us about your project requirements or questions..."
                rows={4}
                error={formErrors.message}
                borderColor="focus:ring-estate-green focus:border-estate-green"
              />
              
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-estate-purple via-estate-blue to-estate-green text-white px-8 py-3 rounded-md font-medium w-full flex items-center justify-center gap-2 hover:opacity-90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ContactInfo = ({ icon, title, details, bgColor }) => (
  <div className="flex items-start gap-4">
    <div className={`mt-1 flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full ${bgColor || "bg-estate-lightGray"}`}>
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-estate-darkText mb-1">{title}</h4>
      {details.map((detail, index) => (
        <p key={index} className="text-estate-darkText/70">{detail}</p>
      ))}
    </div>
  </div>
);

const FormInput = ({ label, type, name, placeholder, required = false, error, borderColor }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-estate-darkText mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${borderColor || "focus:ring-estate-blue"} focus:border-transparent transition-all`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FormSelect = ({ label, name, options, error, borderColor }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-estate-darkText mb-2">
      {label}
    </label>
    <select
      id={name}
      name={name}
      className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${borderColor || "focus:ring-estate-blue"} focus:border-transparent transition-all`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FormTextarea = ({ label, name, placeholder, rows = 4, error, borderColor }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-estate-darkText mb-2">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      rows={rows}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${borderColor || "focus:ring-estate-blue"} focus:border-transparent transition-all`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default ContactSection;
