import Link from "next/link";

export const metadata = {
  title: "404 — Page Not Found | Shaadi Pitara",
  description: "The page you are looking for could not be found. Return to Shaadi Pitara homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1A0507",
        color: "var(--brand-cream, #F7E6CC)",
        padding: "24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 520 }}>
        <div
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "clamp(12px, 1.5vw, 14px)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--brand-gold, #DFB15B)",
            marginBottom: 16,
          }}
        >
          404 — Chapter Not Found
        </div>

        <h1
          style={{
            fontFamily: "var(--font-serif-luxury, 'Playfair Display', serif)",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.1,
            margin: "0 0 20px",
            color: "var(--brand-cream, #F7E6CC)",
          }}
        >
          Lost in the <i style={{ color: "var(--brand-gold, #DFB15B)" }}>Moments?</i>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body, sans-serif)",
            fontSize: "clamp(15px, 1.8vw, 17px)",
            color: "rgba(247, 230, 204, 0.65)",
            lineHeight: 1.7,
            marginBottom: 36,
          }}
        >
          The page you are looking for has moved or does not exist. Let&apos;s guide you back to our wedding stories.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "14px 36px",
            background: "linear-gradient(135deg, #DFB15B 0%, #C49746 100%)",
            color: "#1A0507",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 600,
            borderRadius: 6,
            textDecoration: "none",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: "0 4px 20px rgba(223, 177, 91, 0.25)",
          }}
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
