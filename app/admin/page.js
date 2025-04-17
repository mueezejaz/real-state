"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }

    // Fetch properties
    fetchProperties();
  }, [router]);

  async function fetchProperties() {
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/properties', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch properties');
      }
      
      const data = await response.json();
      setProperties(data);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err.message || 'An error occurred while fetching properties');
      
      // If unauthorized, redirect to login
      if (err.message === 'Unauthorized') {
        localStorage.removeItem('adminToken');
        router.push('/admin');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  const handleAddProperty = () => {
    setCurrentProperty({
      title: '',
      location: '',
      price: '',
      bedrooms: 0,
      bathrooms: 0,
      area: '',
      imageUrl: '',
      image: null
    });
    setShowAddModal(true);
  };

  const handleEditProperty = (property) => {
    setCurrentProperty({
      ...property,
      image: null // Reset image since we're editing
    });
    setShowEditModal(true);
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    setIsProcessing(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete property');
      }
      
      // Show success message
      alert('Property deleted successfully');
      
      // Refresh properties list
      fetchProperties();
    } catch (err) {
      console.error('Error deleting property:', err);
      setError(err.message || 'An error occurred while deleting the property');
      
      // If unauthorized, redirect to login
      if (err.message === 'Unauthorized') {
        localStorage.removeItem('adminToken');
        router.push('/admin');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">LuxuryEstates Admin</h1>
          <button 
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Properties Management</h2>
          <button 
            onClick={handleAddProperty}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
            disabled={isProcessing}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Property
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
            <button 
              onClick={() => setError(null)} 
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {properties.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No properties found. Add your first property.
                    </td>
                  </tr>
                ) : (
                  properties.map((property) => (
                    <tr key={property._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-16 w-16 rounded overflow-hidden relative">
                          <img 
                            src={property.imageUrl} 
                            alt={property.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{property.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{property.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {property.bedrooms} beds • {property.bathrooms} baths • {property.area}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditProperty(property)}
                          className="text-blue-600 hover:text-blue-800 mr-4"
                          disabled={isProcessing}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property._id)}
                          className="text-red-600 hover:text-red-800"
                          disabled={isProcessing}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Add Property Modal */}
      {showAddModal && currentProperty && (
        <PropertyFormModal
          property={currentProperty}
          onClose={() => setShowAddModal(false)}
          onSubmit={async (formData) => {
            setIsProcessing(true);
            try {
              const token = localStorage.getItem('adminToken');
              
              // Create formData object for file upload
              const form = new FormData();
              for (const key in formData) {
                if (key === 'image' && formData[key]) {
                  form.append('image', formData[key]);
                } else if (key !== 'image') {
                  form.append(key, formData[key]);
                }
              }
              
              const response = await fetch('/api/properties', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                body: form,
              });
              
              if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to add property');
              }
              
              // Show success message
              alert('Property added successfully');
              
              setShowAddModal(false);
              fetchProperties();
            } catch (err) {
              console.error('Error adding property:', err);
              setError(err.message || 'An error occurred while adding the property');
              
              // If unauthorized, redirect to login
              if (err.message === 'Unauthorized') {
                localStorage.removeItem('adminToken');
                router.push('/admin');
              }
            } finally {
              setIsProcessing(false);
            }
          }}
          title="Add New Property"
          submitLabel="Add Property"
          isProcessing={isProcessing}
        />
      )}

      {/* Edit Property Modal */}
      {showEditModal && currentProperty && (
        <PropertyFormModal
          property={currentProperty}
          onClose={() => setShowEditModal(false)}
          onSubmit={async (formData) => {
            setIsProcessing(true);
            try {
              const token = localStorage.getItem('adminToken');
              
              // Create formData object for file upload
              const form = new FormData();
              for (const key in formData) {
                if (key === 'image' && formData[key]) {
                  form.append('image', formData[key]);
                } else if (key !== 'image' && key !== '_id') {
                  form.append(key, formData[key]);
                }
              }
              
              const response = await fetch(`/api/properties/${currentProperty._id}`, {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                body: form,
              });
              
              if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update property');
              }
              
              // Show success message
              alert('Property updated successfully');
              
              setShowEditModal(false);
              fetchProperties();
            } catch (err) {
              console.error('Error updating property:', err);
              setError(err.message || 'An error occurred while updating the property');
              
              // If unauthorized, redirect to login
              if (err.message === 'Unauthorized') {
                localStorage.removeItem('adminToken');
                router.push('/admin');
              }
            } finally {
              setIsProcessing(false);
            }
          }}
          title="Edit Property"
          submitLabel="Save Changes"
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
}

function PropertyFormModal({ property, onClose, onSubmit, title, submitLabel, isProcessing }) {
  const [formData, setFormData] = useState(property);
  const [previewImage, setPreviewImage] = useState(property.imageUrl || null);
  const [validationErrors, setValidationErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // For number inputs, convert to number
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setValidationErrors(prev => ({ 
        ...prev, 
        image: 'Image file is too large. Maximum size is 5MB.'
      }));
      return;
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setValidationErrors(prev => ({ 
        ...prev, 
        image: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP).' 
      }));
      return;
    }
    
    // Clear validation error
    setValidationErrors(prev => ({ ...prev, image: null }));
    
    // Set the file in state
    setFormData(prev => ({ ...prev, image: file }));
    
    // Generate preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.price.trim()) errors.price = 'Price is required';
    if (formData.bedrooms < 0) errors.bedrooms = 'Bedrooms cannot be negative';
    if (formData.bathrooms < 0) errors.bathrooms = 'Bathrooms cannot be negative';
    if (!formData.area.trim()) errors.area = 'Area is required';
    
    // Check if we have an image URL or a new image
    if (!formData.imageUrl && !formData.image) {
      errors.image = 'Please provide an image';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isProcessing}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${validationErrors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                required
              />
              {validationErrors.title && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Location*</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${validationErrors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                required
              />
              {validationErrors.location && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.location}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Price*</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${validationErrors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                placeholder="$1,000,000"
                required
              />
              {validationErrors.price && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.price}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Bedrooms*</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${validationErrors.bedrooms ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                min="0"
                required
              />
    {validationErrors.bedrooms && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.bedrooms}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Bathrooms*</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${validationErrors.bathrooms ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                min="0"
                step="0.5"
                required
              />
              {validationErrors.bathrooms && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.bathrooms}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Area*</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${validationErrors.area ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                placeholder="2,500 sq ft"
                required
              />
              {validationErrors.area && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.area}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${validationErrors.imageUrl ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                placeholder="Only needed if not uploading an image"
              />
              {validationErrors.imageUrl && (
                <p className="mt-1 text-sm text-red-500">{validationErrors.imageUrl}</p>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className={`border-2 border-dashed ${validationErrors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50`}>
                  <input
                    type="file"
                    id="image-upload"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer text-center w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600">Click to upload an image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF or WebP (max 5MB)</p>
                  </label>
                </div>
                {validationErrors.image && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.image}</p>
                )}
              </div>
              <div>
                {previewImage && (
                  <div className="relative h-48 rounded-lg overflow-hidden">
                    <img 
                      src={previewImage} 
                      alt="Property preview" 
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setFormData(prev => ({ ...prev, image: null, imageUrl: '' }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}