import Home from '../page';

export const metadata = {
  title: "Our Story & Philosophy — Shaadi Pitara | Devarsh Jain",
  description:
    "The story behind Shaadi Pitara. Meet founder Devarsh Jain and discover our philosophy of capturing authentic, unscripted Indian wedding stories with cinematic intimacy.",
  alternates: {
    canonical: "https://www.shaadipitara.in/story",
  },
  openGraph: {
    title: "Our Story & Philosophy — Shaadi Pitara | Devarsh Jain",
    description:
      "The story behind Shaadi Pitara. Meet founder Devarsh Jain and discover our philosophy of capturing authentic, unscripted Indian wedding stories with cinematic intimacy.",
    url: "https://www.shaadipitara.in/story",
    type: "website",
    locale: "en_IN",
    siteName: "Shaadi Pitara",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "The Story Behind Shaadi Pitara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story & Philosophy — Shaadi Pitara | Devarsh Jain",
    description:
      "Meet founder Devarsh Jain and discover our philosophy of capturing authentic, unscripted Indian wedding stories.",
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
      name: "Our Story",
      item: "https://www.shaadipitara.in/story",
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
