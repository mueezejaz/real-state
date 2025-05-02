'use client'
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Dynamically import the PDF viewer component to avoid hydration issues
const PDFViewer = dynamic(() => import('../components/PDFviewer.js'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-estate-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PDFViewer />
      <Footer />
    </div>
  );
};

export default ServicesPage;