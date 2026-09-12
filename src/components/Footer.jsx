"use client";
import Link from "next/link";
import Image from "next/image";

const WHATSAPP_URL = `https://wa.me/919377150889?text=${encodeURIComponent("Hi Shaadi Pitara, I would like to enquire about your wedding services. Please share more details. Thank you!")}`;

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--brand-maroon-dark)",
        padding: "clamp(64px, 8vw, 100px) clamp(16px, 4vw, 48px) 40px",
        color: "var(--brand-cream)",
        borderTop: "1px solid rgba(200, 155, 93, 0.12)",
        position: "relative",
        zIndex: 70,
        margin: 0,
      }}
    >
      {/* Texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, opacity: 0.04,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Main footer grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 48,
          marginBottom: 64,
          paddingBottom: 56,
          borderBottom: "1px solid rgba(200, 155, 93, 0.08)",
        }}>
          {/* Brand column */}
          <div style={{ maxWidth: 400 }}>
            <div style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative", width: 38, height: 38, borderRadius: 8, overflow: "hidden" }}>
                <Image src="/1.jpg" alt="Shaadi Pitara — Cinematic Wedding Reels & Content Studio Logo" fill sizes="38px" style={{ objectFit: "cover" }} />
              </div>
              <span style={{
                fontFamily: "var(--font-display, serif)",
                fontSize: 22, fontWeight: 600,
                color: "var(--brand-cream)", letterSpacing: "0.03em",
              }}>
                Shaadi Pitara
              </span>
            </div>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: 14,
              color: "var(--brand-beige-muted)", lineHeight: 1.75,
              marginBottom: 28, opacity: 0.8,
            }}>
              Crafting cinematic wedding reels, intimate candid moments, and social-first storytelling that preserves the grandeur and warmth of your celebration.
            </p>

            <div style={{ display: "flex", gap: 10 }}>
              {[
                { href: "https://www.instagram.com/shaadi.pitara", label: "Instagram", icon: <svg key="ig" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="18" cy="6" r="1" /></svg> },
                { href: "https://youtube.com/@shaadi.pitara", label: "YouTube", icon: <svg key="yt" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3" /></svg> },
                { href: "mailto:shaadi.pitaraa@gmail.com", label: "Email", icon: <svg key="em" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                { href: WHATSAPP_URL, label: "WhatsApp", icon: <svg key="wa" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg> },
              ].map((social) => {
                const isMail = social.label === "Email";
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    onClick={isMail ? (e) => {
                      e.preventDefault();
                      const email = "shaadi.pitaraa@gmail.com";
                      if (navigator?.clipboard?.writeText) {
                        navigator.clipboard.writeText(email).catch(() => {});
                      }
                      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=shaadi.pitaraa@gmail.com&su=Wedding%20Inquiry%20-%20Shaadi%20Pitara", "_blank", "noopener,noreferrer");
                      window.location.href = "mailto:shaadi.pitaraa@gmail.com?subject=Wedding%20Inquiry%20-%20Shaadi%20Pitara";
                    } : undefined}
                    aria-label={"Shaadi Pitara on " + social.label}
                    className="focus-sq"
                  style={{
                    width: 42, height: 42,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(200, 155, 93, 0.25)",
                    borderRadius: "50%", transition: "all 0.3s ease",
                    color: "var(--brand-cream)", textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--brand-gold)";
                    e.currentTarget.style.background = "rgba(200, 155, 93, 0.15)";
                    e.currentTarget.style.color = "var(--brand-gold-light)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(200, 155, 93, 0.25)";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--brand-cream)";
                  }}
                >
                  {social.icon}
                </a>
              );
            })}
          </div>
        </div>

        {/* Explore column */}
          <div>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.26em", textTransform: "uppercase",
              color: "var(--brand-gold)", display: "block", marginBottom: 22,
            }}>
              Explore Studio
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 14 }}>
              {[
                { label: "Home", href: "/" },
                { label: "Work", href: "/work" },
                { label: "Full Work Showcase", href: "/works" },
                { label: "Services & Offerings", href: "/#services" },
                { label: "Our Story", href: "/#story" },
                { label: "Client Love", href: "/#testimonials" },
                { label: "Frequently Asked", href: "/#faq" },
                { label: "Get In Touch", href: "/#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: "var(--font-body)", fontSize: 14,
                      color: "var(--brand-cream)", textDecoration: "none",
                      opacity: 0.7, transition: "all 0.25s ease", display: "inline-block",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.color = "var(--brand-gold)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.7"; e.currentTarget.style.color = "var(--brand-cream)"; e.currentTarget.style.transform = "translateX(0)"; }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.26em", textTransform: "uppercase",
              color: "var(--brand-gold)", display: "block", marginBottom: 22,
            }}>
              Reach Out
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}>
               <li>
                 <a
                   href="mailto:shaadi.pitaraa@gmail.com"
                   onClick={(e) => {
                     e.preventDefault();
                     const email = "shaadi.pitaraa@gmail.com";
                     if (navigator?.clipboard?.writeText) {
                       navigator.clipboard.writeText(email).catch(() => {});
                     }
                     window.open("https://mail.google.com/mail/?view=cm&fs=1&to=shaadi.pitaraa@gmail.com&su=Wedding%20Inquiry%20-%20Shaadi%20Pitara", "_blank", "noopener,noreferrer");
                     window.location.href = "mailto:shaadi.pitaraa@gmail.com?subject=Wedding%20Inquiry%20-%20Shaadi%20Pitara";
                   }}
                   style={{
                     fontFamily: "var(--font-body)", fontSize: 14,
                     color: "var(--brand-cream)", textDecoration: "none",
                     opacity: 0.85, transition: "all 0.25s ease", display: "inline-flex", alignItems: "center", gap: 10,
                   }}
                   onMouseEnter={(e) => { e.currentTarget.style.color = "var(--brand-gold)"; }}
                   onMouseLeave={(e) => { e.currentTarget.style.color = "var(--brand-cream)"; }}>
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                   shaadi.pitaraa@gmail.com
                 </a>
               </li>
               <li>
                 <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "var(--font-body)", fontSize: 14,
                  color: "var(--brand-cream)", textDecoration: "none",
                  opacity: 0.85, transition: "all 0.25s ease", display: "inline-flex", alignItems: "center", gap: 10,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--brand-gold)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--brand-cream)"; }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                  +91 93771 50889
                </a>
              </li>
              <li>
                <a href="tel:+919377150889" style={{
                  fontFamily: "var(--font-body)", fontSize: 14,
                  color: "var(--brand-cream)", textDecoration: "none",
                  opacity: 0.85, transition: "all 0.25s ease", display: "inline-flex", alignItems: "center", gap: 10,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--brand-gold)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--brand-cream)"; }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  Call +91 93771 50889
                </a>
              </li>
              <li style={{
                fontFamily: "var(--font-body)", fontSize: 14,
                color: "rgba(212,184,150,0.5)", display: "flex", alignItems: "center", gap: 10,
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Ahmedabad, Gujarat, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 16,
        }}>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 13,
            color: "rgba(212,184,150,0.4)",
          }}>
            &copy; {new Date().getFullYear()} Shaadi Pitara by Devarsh Jain. All rights reserved.
          </p>
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: 9,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(212,184,150,0.25)",
          }}>
            Crafted with love in Ahmedabad
          </p>
        </div>
      </div>
    </footer>
  );
}
