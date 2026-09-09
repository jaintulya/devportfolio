import Home from '../page';

export const metadata = {
  title: "Book Your Wedding Story — Contact Shaadi Pitara | Ahmedabad",
  description:
    "Connect with Devarsh Jain at Shaadi Pitara. Inquire about dates and availability for cinematic wedding reels and content creation in Ahmedabad, Udaipur, Jaipur, Goa, Mumbai, or worldwide.",
  alternates: {
    canonical: "https://www.shaadipitara.in/contact",
  },
  openGraph: {
    title: "Book Your Wedding Story — Contact Shaadi Pitara | Ahmedabad",
    description:
      "Connect with Devarsh Jain at Shaadi Pitara. Inquire about dates and availability for cinematic wedding reels and content creation in Ahmedabad, Udaipur, Jaipur, Goa, Mumbai, or worldwide.",
    url: "https://www.shaadipitara.in/contact",
    type: "website",
    locale: "en_IN",
    siteName: "Shaadi Pitara",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Shaadi Pitara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Your Wedding Story — Contact Shaadi Pitara",
    description:
      "Connect with Devarsh Jain at Shaadi Pitara to co-create your wedding reel story.",
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
      name: "Contact",
      item: "https://www.shaadipitara.in/contact",
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
