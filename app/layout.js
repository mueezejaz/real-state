import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Future Prospects Modern Business LLC | Building Infrastructure with Innovation",
  description: "Future Prospects Modern Business LLC specializes in OSP works, tower construction, fiber optics, road maintenance, and civil works in Oman. Quality, efficiency, and innovation in infrastructure projects.",
  keywords: "Future Prospects Modern Business, OSP works, tower construction, fiber optics, civil works, Oman, infrastructure, OMANTEL, OREDOO, construction company",
  openGraph: {
    title: "Future Prospects Modern Business LLC | Telecom & Civil Infrastructure Experts",
    description: "Leading provider of telecommunication infrastructure, fiber optics, and civil construction services in Oman with 15+ years of experience.",
    url: "https://futureprospectsmodern.com",
    siteName: "Future Prospects Modern Business LLC",
    images: [
      {
        url: "./real.png", 
        width: 800,
        height: 600,
        alt: "Future Prospects Modern Business LLC Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Prospects Modern Business LLC",
    description: "Building Tomorrow's Infrastructure with Innovation",
    images: ["./real.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "verification_token", // Replace with your Google verification token
  },
  alternates: {
    canonical: "https://futureprospectsmodern.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./real.png" />
        <link rel="apple-touch-icon" href="./real.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#1a365d" />
        
        {/* Structured data for local business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Future Prospects Modern Business LLC",
              "image": "./real.png",
              "logo": "./real.png",
              "@id": "https://futureprospectsmodern.com",
              "url": "https://futureprospectsmodern.com",
              "telephone": "+96879995329",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Office 1/578, Block No: 262, Way No: 6210",
                "addressLocality": "Azaiba South, Muscat",
                "addressRegion": "Muscat",
                "postalCode": "",
                "addressCountry": "OM"
              },
              "priceRange": "$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
                  "opens": "08:00",
                  "closes": "18:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/futureprospectsmodern",
                "https://www.linkedin.com/company/futureprospectsmodern"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
