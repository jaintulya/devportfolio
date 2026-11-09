import PackagesClient from "@/components/PackagesClient";

export const metadata = {
  title: "Wedding Packages — Shaadi Pitara | Classic, Luxe & Royal",
  description:
    "Explore Shaadi Pitara's wedding content packages — Classic, Luxe, and Royal — across 2-day, 3-day, and 4-day weddings. Cinematic reels, live stories, page management and more in Ahmedabad.",
  alternates: {
    canonical: "https://www.shaadipitara.in/packages",
  },
  openGraph: {
    title: "Wedding Packages — Shaadi Pitara | Classic, Luxe & Royal",
    description:
      "Explore Shaadi Pitara's three wedding collections: Classic, Luxe, and Royal across 2, 3, and 4-day weddings. Cinematic reels, live stories, and dedicated page management.",
    url: "https://www.shaadipitara.in/packages",
    type: "website",
    locale: "en_IN",
    siteName: "Shaadi Pitara",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Shaadi Pitara Wedding Packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Packages — Shaadi Pitara | Classic, Luxe & Royal",
    description:
      "Explore Shaadi Pitara's three wedding collections: Classic, Luxe, and Royal for 2, 3, and 4-day weddings.",
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
      name: "Packages",
      item: "https://www.shaadipitara.in/packages",
    },
  ],
};

const offersSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Shaadi Pitara Wedding Packages",
  description: "Wedding content creation packages by Shaadi Pitara",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Offer",
        name: "Classic — 2 Days Wedding Package",
        price: "40000",
        priceCurrency: "INR",
        description: "10–12 Edited Reels, 2–3 Stories per event, 1 Content Creator (Founder not included), Page management during wedding only.",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Offer",
        name: "Luxe — 2 Days Wedding Package",
        price: "70000",
        priceCurrency: "INR",
        description: "20 Edited Reels, 6–8 Stories per event + Live coverage, Team of 2 Content Creators (Founder Included), Page management during & post-wedding.",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Offer",
        name: "Royal — 2 Days Wedding Package",
        price: "100000",
        priceCurrency: "INR",
        description: "30 Edited Reels, Unlimited Stories & Live Stories, Team of 2–3 Creators (Founder Included), Full page management pre/during/post, Drone included.",
      },
    },
  ],
};

export default function PackagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }}
      />
      <PackagesClient />
    </>
  );
}

