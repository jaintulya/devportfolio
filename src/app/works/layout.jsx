import { reelData } from "@/lib/reelData";

export const metadata = {
  title: "Our Works & Wedding Reel Showcase — Shaadi Pitara | Ahmedabad",
  description:
    "Explore the complete wedding reel portfolio by Shaadi Pitara. Browse editorial films, emotional vows, joyful dances, decor aesthetics, and unscripted wedding stories across Ahmedabad, Udaipur, Jaipur, and Goa.",
  alternates: {
    canonical: "https://www.shaadipitara.in/works",
  },
  openGraph: {
    title: "Our Works & Wedding Reel Showcase — Shaadi Pitara",
    description:
      "Explore the complete wedding reel portfolio by Shaadi Pitara. Browse editorial films, emotional vows, joyful dances, and unscripted wedding stories across Ahmedabad, Udaipur, Jaipur, and Goa.",
    url: "https://www.shaadipitara.in/works",
    type: "website",
    locale: "en_IN",
    siteName: "Shaadi Pitara",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Shaadi Pitara Wedding Works Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Works & Wedding Reel Showcase — Shaadi Pitara",
    description:
      "Explore the complete wedding reel portfolio by Shaadi Pitara. Browse editorial films, emotional vows, and unscripted wedding stories.",
    images: ["/logo.jpg"],
  },
};

function toIsoDuration(durationStr) {
  if (!durationStr) return "PT1M";
  const parts = durationStr.split(":").map(Number);
  if (parts.length === 2) {
    return `PT${parts[0]}M${parts[1]}S`;
  }
  return "PT1M";
}

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
      name: "Our Works",
      item: "https://www.shaadipitara.in/works",
    },
  ],
};

const videoListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: reelData.slice(0, 12).map((reel, index) => ({
    "@type": "VideoObject",
    position: index + 1,
    name: `${reel.title} — ${reel.couple} Wedding Reel`,
    description: `Cinematic ${reel.category} wedding reel capturing ${reel.couple} in ${reel.location}, filmed and edited by Shaadi Pitara.`,
    thumbnailUrl: reel.poster.startsWith("http")
      ? reel.poster
      : `https://www.shaadipitara.in${reel.poster}`,
    uploadDate: "2024-01-01T00:00:00+05:30",
    duration: toIsoDuration(reel.duration),
    embedUrl: reel.embedUrl,
    creator: {
      "@type": "Person",
      name: "Devarsh Jain",
      url: "https://www.shaadipitara.in",
    },
  })),
};

export default function WorksLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoListSchema) }}
      />
      {children}
    </>
  );
}
