import { NextResponse } from 'next/server';
import dbConnect from '../../../libs/dbConnect.js';
import Admin from '../../../libs/models/admin.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
export async function POST(request) {
  try {
    // Connect to database
    await dbConnect();
    
    // Parse request body
    const { email, password } = await request.json();
    
    // Check if admin exists
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Create token
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('Error in admin login API:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}