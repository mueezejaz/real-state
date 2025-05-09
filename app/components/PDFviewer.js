'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Download, ZoomIn, ZoomOut } from 'lucide-react';
import Link from 'next/link';

const PDFViewer = () => {
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const googleDriveFileId = '1dI56TrE7UHuRcyQmsnbR-l6Ik5l2B86h'; 
  const pdfUrl = './companyprofilepage.pdf';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.6));

  return (
    <div className="min-h-screen bg-estate-lightGray pt-24 pb-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            href="/" 
            className="inline-flex items-center text-estate-blue hover:text-estate-deepGreen transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-estate-darkText mt-4">Our Services</h1>
          <p className="text-estate-darkText/70 mt-2">
            Explore our comprehensive range of services and solutions.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between"
        >
          <div className="flex space-x-2">
            <button 
              onClick={handleZoomIn} 
              className="p-2 rounded-md hover:bg-estate-skyblue transition-colors text-estate-darkText"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button 
              onClick={handleZoomOut} 
              className="p-2 rounded-md hover:bg-estate-skyblue transition-colors text-estate-darkText"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <a 
              href={pdfUrl} 
              download
              className="p-2 rounded-md bg-estate-blue text-white hover:bg-estate-deepGreen transition-colors"
              title="Download PDF"
            >
              <Download className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-4 sm:p-8 flex justify-center overflow-hidden"
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 border-4 border-estate-blue border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-estate-darkText">Loading PDF...</p>
            </div>
          ) : (
            <div 
              className="w-full max-w-4xl transition-all duration-300 ease-in-out flex justify-center"
              style={{ 
                transform: `scale(${scale})`,
                transformOrigin: 'center center'
              }}
            >
              <iframe
                src={`https://drive.google.com/file/d/${googleDriveFileId}/preview`}
                className="w-full min-h-screen border-0"
                title="Google Drive PDF Viewer"
                frameBorder="0"
                allow="autoplay"
              ></iframe>
            </div>
          )}
        </motion.div>

        {/* Fallback Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-center text-estate-darkText/80"
        >
          <p>Having trouble viewing the PDF? Try the download option above.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default PDFViewer;

