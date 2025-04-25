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
    
    // Get form data
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    
    // Log form data to console
    console.log("Form Data:", formValues);
    
    // Validate form data with Zod
    try {
      const validatedData = contactFormSchema.parse(formValues);
      console.log("Validated Data:", validatedData);
      setFormErrors({});
      // Here you would typically send the data to your backend
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
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-estate-darkText mb-4">Get In <span className="text-estate-blue">Touch</span></h2>
          <div className="w-24 h-1 bg-estate-blue mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-estate-darkText/80 text-lg">
            Have questions about our properties or services? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-estate-lightGray rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-estate-darkText mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <ContactInfo 
                icon={<Phone className="text-estate-blue" />}
                title="Phone"
                details={["(123) 456-7890", "(098) 765-4321"]}
              />
              
              <ContactInfo 
                icon={<Mail className="text-estate-deepGreen" />}
                title="Email"
                details={["info@blueestate.com", "support@blueestate.com"]}
              />
              
              <ContactInfo 
                icon={<MapPin className="text-estate-orange" />}
                title="Office"
                details={["123 Real Estate Avenue", "New York, NY 10001"]}
              />
            </div>
            
            <div className="mt-10">
              <h4 className="text-lg font-semibold text-estate-darkText mb-4">Office Hours</h4>
              <div className="space-y-2 text-estate-darkText/70">
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
            className="lg:col-span-3 bg-white rounded-lg p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-estate-darkText mb-6">Send Us a Message</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput 
                  label="First Name"
                  type="text"
                  name="firstName"
                  placeholder="Your first name"
                  required
                  error={formErrors.firstName}
                />
                
                <FormInput 
                  label="Last Name"
                  type="text"
                  name="lastName"
                  placeholder="Your last name"
                  required
                  error={formErrors.lastName}
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
                />
                
                <FormInput 
                  label="Phone"
                  type="tel"
                  name="phone"
                  placeholder="Your phone number"
                  error={formErrors.phone}
                />
              </div>
              
              <FormSelect 
                label="Service Interested In"
                name="service"
                options={[
                  { value: "", label: "Select a service" },
                  { value: "buying", label: "Buying Property" },
                  { value: "selling", label: "Selling Property" },
                  { value: "renting", label: "Renting Property" },
                  { value: "investment", label: "Investment Consultation" },
                ]}
                error={formErrors.service}
              />
              
              <FormTextarea 
                label="Message"
                name="message"
                placeholder="Tell us about your requirements or questions..."
                rows={4}
                error={formErrors.message}
              />
              
              <motion.button
                type="submit"
                className="bg-estate-blue text-white px-8 py-3 rounded-md font-medium w-full flex items-center justify-center gap-2 hover:bg-estate-blue/90 transition-colors"
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

const ContactInfo = ({ icon, title, details }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white">
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

const FormInput = ({ label, type, name, placeholder, required = false, error }) => (
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
      className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-estate-blue focus:border-transparent transition-all`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FormSelect = ({ label, name, options, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-estate-darkText mb-2">
      {label}
    </label>
    <select
      id={name}
      name={name}
      className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-estate-blue focus:border-transparent transition-all`}
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

const FormTextarea = ({ label, name, placeholder, rows = 4, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-estate-darkText mb-2">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      rows={rows}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-estate-blue focus:border-transparent transition-all`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default ContactSection;