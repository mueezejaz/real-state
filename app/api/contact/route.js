import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,                
  secure: true,             
  auth: {
    user: 'syed@futureprospectsmodern.com', 
    pass: process.env.EMAIL_PASSWORD    
  }
});

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Extract form data
    const { firstName, lastName, email, phone, service, message } = body;
    
    // Form validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Format the email content
    const emailContent = `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Service Interested: ${service || 'Not specified'}
      
      Message:
      ${message}
    `;
    
    // Set up email options
    const mailOptions = {
      from: email,
      to: 'syed@futureprospectsmodern.com',
      subject: `Contact Form: ${firstName} ${lastName} - ${service || 'General Inquiry'}`,
      text: emailContent,
      replyTo: email
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email',
        details: error.message 
      },
      { status: 500 }
    );
  }
}