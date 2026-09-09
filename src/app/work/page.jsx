import Home from '../page';

export const metadata = {
  title: "Featured Wedding Reels & Films — Shaadi Pitara | Ahmedabad",
  description:
    "Watch selected cinematic wedding reels, couple stories, and celebration highlights filmed in Ahmedabad, Gujarat, and destination venues by Shaadi Pitara.",
  alternates: {
    canonical: "https://www.shaadipitara.in/work",
  },
  openGraph: {
    title: "Featured Wedding Reels & Films — Shaadi Pitara",
    description:
      "Watch selected cinematic wedding reels, couple stories, and celebration highlights filmed in Ahmedabad, Gujarat, and destination venues by Shaadi Pitara.",
    url: "https://www.shaadipitara.in/work",
    type: "website",
    locale: "en_IN",
    siteName: "Shaadi Pitara",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Shaadi Pitara Featured Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Featured Wedding Reels & Films — Shaadi Pitara",
    description:
      "Watch selected cinematic wedding reels, couple stories, and celebration highlights by Shaadi Pitara.",
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
      name: "Featured Work",
      item: "https://www.shaadipitara.in/work",
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
