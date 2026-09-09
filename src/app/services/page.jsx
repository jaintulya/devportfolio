import Home from '../page';

export const metadata = {
  title: "Wedding Reel & Content Creation Services — Shaadi Pitara",
  description:
    "Explore wedding content creation services by Shaadi Pitara: cinematic reels, same-day highlight edits, live story coverage, and full wedding social media management in Ahmedabad & destination locations.",
  alternates: {
    canonical: "https://www.shaadipitara.in/services",
  },
  openGraph: {
    title: "Wedding Reel & Content Creation Services — Shaadi Pitara",
    description:
      "Explore wedding content creation services by Shaadi Pitara: cinematic reels, same-day highlight edits, live story coverage, and full wedding social media management in Ahmedabad & destination locations.",
    url: "https://www.shaadipitara.in/services",
    type: "website",
    locale: "en_IN",
    siteName: "Shaadi Pitara",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Shaadi Pitara Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Reel & Content Creation Services — Shaadi Pitara",
    description:
      "Cinematic reels, same-day highlight edits, live story coverage, and full wedding social media management by Shaadi Pitara.",
    images: ["/logo.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.shaadipitara.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://www.shaadipitara.in/services",
    },
  ],
};

export default function SectionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Home />
    </>
  );
}
