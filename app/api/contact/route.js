import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create the first transporter (Syed)
const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  secure: true,
  auth: {
    user: 'syed@futureprospectsmodern.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Create the second transporter (Khalid)
const transporter2 = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  secure: true,
  auth: {
    user: 'khalid@futureprospectsmodern.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { firstName, lastName, email, phone, service, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Compose the email content
    const emailContent = `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Service Interested: ${service || 'Not specified'}
      
      Message:
      ${message}
    `;

    // Define email options
    const mailOptions = {
      from: 'no-reply@futureprospectsmodern.com',
      to: 'syed@futureprospectsmodern.com',
      subject: `Contact Form: ${firstName} ${lastName} - ${service || 'General Inquiry'}`,
      text: emailContent,
      replyTo: email,
    };

    const mailOptions2 = {
      ...mailOptions,
      to: 'khalid@futureprospectsmodern.com',
    };

    // Send both emails concurrently
    const [result1, result2] = await Promise.allSettled([
      transporter.sendMail(mailOptions),
      transporter2.sendMail(mailOptions2),
    ]);

    const hasFailure =
      result1.status === 'rejected' || result2.status === 'rejected';

    if (hasFailure) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send one or both emails',
          errors: {
            syed: result1.status === 'rejected' ? result1.reason.message : 'Sent',
            khalid: result2.status === 'rejected' ? result2.reason.message : 'Sent',
          },
        },
        { status: 500 }
      );
    }

    // Return success if both sent
    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send email',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
