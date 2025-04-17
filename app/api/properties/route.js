import { NextResponse } from 'next/server';
import dbConnect from '../../libs/dbConnect';
import Property from '../../libs/models/property';
import { verifyToken } from '../../libs/auth/Token.js';

// Get all properties
export async function GET(request) {
  try {
    // Authenticate admin
    const token = request.headers.get('Authorization')?.split(' ')[1];
    const isAuthenticated = await verifyToken(token);
   console.log(isAuthenticated) 
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    const properties = await Property.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// Create new property
export async function POST(request) {
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
    
    if (image) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const imageType = image.type;
      const base64Image = `data:${imageType};base64,${imageBuffer.toString('base64')}`;
      propertyData.imageUrl = base64Image;
    } else if (formData.get('imageUrl')) {
      // If no image was uploaded but an image URL was provided
      propertyData.imageUrl = formData.get('imageUrl');
    } else {
      return NextResponse.json(
        { success: false, message: 'Please provide an image' },
        { status: 400 }
      );
    }
    
    const property = await Property.create(propertyData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Property created successfully',
      property 
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create property' },
      { status: 500 }
    );
  }
}