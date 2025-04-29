import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

const Notification = ({ type, message, isVisible, onClose }) => {
  // Determine colors and icon based on notification type
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-50",
          borderColor: "border-green-500",
          textColor: "text-green-800",
          icon: <CheckCircle className="w-5 h-5 text-green-500" />
        };
      case "error":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-500",
          textColor: "text-red-800",
          icon: <XCircle className="w-5 h-5 text-red-500" />
        };
      default:
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-500",
          textColor: "text-blue-800",
          icon: null
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 right-4 z-50 max-w-md"
        >
          <div className={`flex items-start p-4 rounded-lg shadow-lg ${styles.bgColor} border ${styles.borderColor}`}>
            <div className="flex-shrink-0 mr-3">
              {styles.icon}
            </div>
            <div className="flex-1">
              <p className={`text-sm ${styles.textColor}`}>{message}</p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;