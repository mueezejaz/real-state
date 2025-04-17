import { NextResponse } from 'next/server';
import dbConnect from '../../../libs/dbConnect';
import Property from '../../../libs/models/property';
import { verifyToken } from '../../../libs/auth/Token.js';

// Get a single property
export async function GET(request, { params }) {
  try {
    // Authenticate admin
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const isAuthenticated = await verifyToken(token);
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const property = await Property.findById(params.id);
    
    if (!property) {
      return NextResponse.json(
        { success: false, message: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch property' },
      { status: 500 }
    );
  }
}

// Update a property
// Update a property
export async function PUT(request, { params }) {
  try {
    // Authenticate admin
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const isAuthenticated = await verifyToken(token);
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const formData = await request.formData();
    
    // Handle property data
    const propertyData = {
      title: formData.get('title'),
      location: formData.get('location'),
      price: formData.get('price'),
      bedrooms: formData.get('bedrooms'),
      bathrooms: formData.get('bathrooms'),
      area: formData.get('area'),
    };
    
    // Handle image upload
    const image = formData.get('image');
    
    if (image && image.size > 0) {
      // Process the image file
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const imageType = image.type;
      const base64Image = `data:${imageType};base64,${imageBuffer.toString('base64')}`;
      propertyData.imageUrl = base64Image;
    } else if (formData.get('imageUrl')) {
      // If no image was uploaded but an image URL was provided
      propertyData.imageUrl = formData.get('imageUrl');
    }
    
    const property = await Property.findByIdAndUpdate(
      params.id,
      propertyData,
      { new: true, runValidators: true }
    );
    
    if (!property) {
      return NextResponse.json(
        { success: false, message: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Property updated successfully',
      property
    });
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update property' },
      { status: 500 }
    );
  }
}

// Delete a property
export async function DELETE(request, { params }) {
  try {
    // Authenticate admin
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const isAuthenticated = await verifyToken(token);
    
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const property = await Property.findByIdAndDelete(params.id);
    
    if (!property) {
      return NextResponse.json(
        { success: false, message: 'Property not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to delete property' },
      { status: 500 }
    );
  }
}