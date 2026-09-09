import './globals.css';

export const metadata = {
  metadataBase: new URL("https://shaadipitara.vercel.app"),
  title: 'Shaadi Pitara — Cinematic Wedding Reels & Content | Ahmedabad',
  description: 'Shaadi Pitara crafts cinematic wedding reels, couple stories, live stories, and Instagram content from Ahmedabad. Premium wedding storytelling by Devarsh Jain.',
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon-16.png',
    apple: '/favicon-192.png',
  },
  keywords: [
    'wedding reel Ahmedabad',
    'cinematic wedding video Gujarat',
    'wedding content creator Ahmedabad',
    'couple story reel',
    'Instagram wedding reel',
    'wedding videographer Ahmedabad',
    'Shaadi Pitara',
    'wedding content studio',
    'wedding films India',
    'pre-wedding reels',
    'live wedding stories',
    'wedding social media management',
    'Indian wedding storytelling',
    'Gujarat wedding content',
    'Devarsh Jain',
  ],
  openGraph: {
    title: 'Shaadi Pitara — Cinematic Wedding Content Studio',
    description: 'Premium wedding reels, live stories, and social-first storytelling from Ahmedabad. We tell your story the way it deserves to be told.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://shaadipitara.vercel.app',
    siteName: 'Shaadi Pitara',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Shaadi Pitara — Cinematic Wedding Content Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shaadi Pitara — Cinematic Wedding Content Studio',
    description: 'Premium wedding reels, live stories, and social-first storytelling from Ahmedabad.',
    images: ['/logo.jpg'],
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
  alternates: {
    canonical: 'https://shaadipitara.vercel.app',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://shaadipitara.vercel.app',
  name: 'Shaadi Pitara',
  description: 'Cinematic wedding reel and content studio based in Ahmedabad, Gujarat.',
  url: 'https://shaadipitara.vercel.app',
  founder: {
    '@type': 'Person',
    name: 'Devarsh Jain',
    url: 'https://www.instagram.com/shaadi.pitara',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    addressCountry: 'IN',
  },
  areaServed: ['Ahmedabad', 'Gujarat', 'India'],
  serviceType: [
    'Wedding Reel',
    'Cinematic Wedding Video',
    'Couple Story',
    'Instagram Reel',
    'Wedding Content',
    'Live Wedding Stories',
    'Social Media Management',
    'Wedding Page Management',
    'Live Reels',
    'Instant Reels',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-9377150889',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
    },
  ],
  sameAs: [
    'https://www.instagram.com/shaadi.pitara',
    'https://youtube.com/@shaadi.pitara',
    'https://pin.it/5GKckms5T',
  ],
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Shaadi Pitara',
  url: 'https://shaadipitara.vercel.app',
  logo: 'https://shaadipitara.vercel.app/logo.jpg',
  sameAs: [
    'https://www.instagram.com/shaadi.pitara',
    'https://youtube.com/@shaadi.pitara',
    'https://pin.it/5GKckms5T',
  ],
  founder: {
    '@type': 'Person',
    name: 'Devarsh Jain',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&family=Parisienne&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#2E0A0D" />
        <meta name="description" content="Shaadi Pitara crafts cinematic wedding reels, couple stories, live stories, and Instagram content from Ahmedabad. Premium wedding storytelling by Devarsh Jain." />
        <link rel="canonical" href="https://shaadipitara.vercel.app" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body style={{ margin: 0 }}>
        <a href="#main-content" className="skip-to-main">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
