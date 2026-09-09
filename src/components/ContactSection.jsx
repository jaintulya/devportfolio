"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// SVG icons for contact cards
const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.859L.057 23.054a.5.5 0 0 0 .612.612l5.195-1.475A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 0 1-5.273-1.534l-.378-.224-3.919 1.028 1.049-3.832-.246-.393A9.797 9.797 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12.7 19.79 19.79 0 0 1 1.06 4.11 2 2 0 0 1 3.05 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="currentColor" stroke="none"/>
  </svg>
);

const PinterestIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const contactMethods = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Chat directly about your wedding date, plans and vision.",
    IconComponent: WhatsAppIcon,
    ctaText: "START A CHAT ↗",
    link: "https://wa.me/919377150889",
    className: "c1",
  },
  {
    id: "email",
    title: "Email",
    description: "Send your dates, venue, details and everything you're imagining.",
    IconComponent: EmailIcon,
    ctaText: "WRITE TO US ↗",
    link: "mailto:shaadi.pitaraa@gmail.com",
    className: "c2",
  },
  {
    id: "call",
    title: "Call",
    description: "Prefer talking? Let's discuss your celebration together.",
    IconComponent: PhoneIcon,
    ctaText: "CALL US ↗",
    link: "tel:+919377150889",
    className: "c3",
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "Explore real weddings, reels, behind-the-scenes and our latest work.",
    IconComponent: InstagramIcon,
    ctaText: "FOLLOW ALONG ↗",
    link: "https://www.instagram.com/shaadi.pitara",
    className: "c4",
  },
  {
    id: "youtube",
    title: "YouTube",
    description: "Watch extended cinematic wedding films and full stories.",
    IconComponent: YouTubeIcon,
    ctaText: "WATCH FILMS ↗",
    link: "https://youtube.com/@shaadi.pitara",
    className: "c5",
  },
  {
    id: "pinterest",
    title: "Pinterest",
    description: "Discover wedding inspiration, moodboards and visual references.",
    IconComponent: PinterestIcon,
    ctaText: "EXPLORE IDEAS ↗",
    link: "https://pin.it/5GKckms5T",
    className: "c6",
  },
];

export default function ContactSection() {
  const stageRef = useRef(null);
  const wallRef = useRef(null);
  const cardsRef = useRef([]);
  const [toast, setToast] = useState(null);

  const handleEmailAction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const email = "shaadi.pitaraa@gmail.com";
    const subject = encodeURIComponent("Wedding Inquiry — Shaadi Pitara");
    const body = encodeURIComponent(
      "Hi Devarsh,\n\nWe love your cinematic storytelling and would like to discuss covering our wedding.\n\nEvent Dates:\nCity / Venue:\nEstimated Guests:\n\nLooking forward to speaking with you!"
    );

    // 1. Copy email directly to clipboard
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email).catch(() => {});
    }

    // 2. Open Gmail Web Compose in a new tab (failsafe across all modern browsers)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    // 3. Trigger native mail client via hidden iframe
    try {
      const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = mailtoUrl;
      document.body.appendChild(iframe);
      setTimeout(() => {
        try { document.body.removeChild(iframe); } catch {}
      }, 1200);
    } catch {}

    // 4. Show on-screen toast
    setToast("Email address copied: shaadi.pitaraa@gmail.com · Opening composer...");
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".c-top > *", {
        y: 20, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: "#contact", start: "top 80%" }
      });
      gsap.from(".copy-col > *, .handwritten", {
        y: 30, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: stageRef.current, start: "top 80%" }
      });
      gsap.from(".card-3d", {
        y: 40, opacity: 0, scale: 0.95, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.15,
        scrollTrigger: { trigger: stageRef.current, start: "top 80%" }
      });
    }, stageRef);
    return () => ctx.revert();
  }, []);

  const handleStageMove = (e) => {
    if (!stageRef.current || !wallRef.current) return;
    if (window.innerWidth < 780) return;
    const r = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    wallRef.current.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 7}deg)`;
  };

  const handleStageLeave = () => {
    if (!wallRef.current) return;
    wallRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  const handleCardMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    if (window.innerWidth < 780) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateZ(120px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg)`;
  };

  const handleCardLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    card.style.transform = '';
  };

  return (
    <section id="contact" className="contact-3d-section" ref={stageRef}>
      <style dangerouslySetInnerHTML={{ __html: `
        .contact-3d-section {
          width: 100%;
          min-height: 100vh;
          background: var(--brand-maroon-dark);
          color: var(--brand-cream);
          font-family: var(--font-body);
          position: relative;
          overflow: hidden;
          padding: 82px clamp(16px, 4vw, 52px) 48px;
        }
        .contact-3d-section::before {
          content: "";
          position: absolute; inset: 0; pointer-events: none; z-index: 1; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .c-top {
          text-align: center; position: relative; z-index: 5; max-width: 800px; margin: 0 auto;
        }
        .c-kicker {
          display: flex; align-items: center; justify-content: center; gap: 17px;
          color: var(--brand-gold); font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.42em;
          text-transform: uppercase;
        }
        .c-kicker::before, .c-kicker::after {
          content: ""; width: 44px; height: 1px; background: rgba(214, 180, 119, 0.4);
        }
        .c-heading {
          margin: 22px 0 12px;
          font-family: var(--font-display);
          font-size: clamp(42px, 7vw, 94px);
          font-weight: 500;
          line-height: 0.84;
          letter-spacing: -0.04em;
        }
        .c-heading i { font-weight: 400; font-style: italic; color: var(--brand-gold); }
        .c-intro {
          max-width: 610px; margin: auto; color: rgba(245, 230, 204, 0.6); font-size: 13px; line-height: 1.85;
        }

        .c-stage {
          max-width: 1160px; min-height: 575px; margin: 55px auto 0; position: relative;
          perspective: 1400px; display: grid; grid-template-columns: 1fr 1fr; gap: 35px; align-items: center; z-index: 5;
        }
        
        .copy-col { position: relative; z-index: 4; padding: 12px 10px; }
        .copy-label { color: rgba(214, 180, 119, 0.7); font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.25em; margin-bottom: 20px; text-transform: uppercase; }
        .copy-col h2 {
          color: var(--brand-cream); font-family: var(--font-display);
          font-weight: 500; font-size: clamp(32px, 5vw, 68px); line-height: 0.9; letter-spacing: -0.035em;
        }
        .copy-col h2 span { color: var(--brand-gold); font-style: italic; font-weight: 400; }
        .copy-col p { max-width: 430px; color: rgba(245, 230, 204, 0.5); font-size: 13px; line-height: 1.85; margin: 22px 0 0; }
        .handwritten { margin-top: 34px; color: var(--brand-gold); font-family: var(--font-display); font-style: italic; font-size: 24px; transform: rotate(-3deg); display: inline-block; }

        .card-wall {
          height: 520px; position: relative; transform-style: preserve-3d; transition: transform 0.18s ease-out;
        }

        .card-3d {
          position: absolute; width: 245px; height: 178px; padding: 22px; border-radius: 6px;
          color: var(--brand-maroon-dark);
          background: linear-gradient(145deg, #f7e8ca, #ead4ac);
          box-shadow: 18px 25px 50px rgba(7,1,2,0.40), inset 0 1px 0 rgba(255,255,255,0.72);
          transform-style: preserve-3d;
          transition: transform 0.55s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.55s ease, filter 0.55s ease;
          cursor: pointer; overflow: hidden; text-decoration: none;
        }
        .card-3d::before {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.5) 47%, transparent 64%);
          transform: translateX(-130%); transition: transform 0.8s ease; z-index: 10; pointer-events: none;
        }
        @media (hover: hover) and (pointer: fine) {
          .card-3d:hover::before { transform: translateX(130%); }
          .card-3d:hover {
            transform: translateZ(180px) rotateX(0) rotateY(0) !important;
            box-shadow: 25px 35px 65px rgba(5,1,2,0.55), 0 0 35px rgba(214,180,119,0.15);
            filter: saturate(1.05); z-index: 50 !important;
          }
        }

        /* Default desktop positions with slight vertical overlap */
        .c1 { left: 8px; top: 15px; transform: translateZ(25px) rotate(-6deg); z-index: 3; }
        .c2 { right: 8px; top: 5px; transform: translateZ(20px) rotate(5deg); z-index: 3; }
        .c3 { left: 20px; top: 156px; transform: translateZ(45px) rotate(4deg); z-index: 4; }
        .c4 { right: 18px; top: 145px; transform: translateZ(40px) rotate(-5deg); z-index: 4; }
        .c5 { left: 12px; top: 298px; transform: translateZ(65px) rotate(-4deg); z-index: 5; }
        .c6 { right: 14px; top: 288px; transform: translateZ(60px) rotate(5deg); z-index: 5; }

        .card-num { position: absolute; right: 18px; top: 17px; color: #a68474; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; }
        .card-icon {
          width: 42px; height: 42px; display: grid; place-items: center; border-radius: 12px;
          background: rgba(122, 78, 23, 0.08); border: 1px solid rgba(122, 78, 23, 0.18);
          color: #7A4E17; font-size: 20px; margin-bottom: 15px; transform: translateZ(20px);
        }
        .card-3d h3 {
          margin: 0 0 6px; font-family: var(--font-display); font-size: 25px; font-weight: 600; line-height: 1.1;
          color: #7A4E17 !important; text-shadow: 0 1px 0 rgba(255, 255, 255, 0.45);
        }
        .card-3d p { margin: 0; max-width: 190px; color: #5D3D35; font-size: 10.5px; line-height: 1.6; font-family: var(--font-body); }
        .card-go {
          display: inline-block; margin-top: 10px; color: #3d1114; font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.11em; border-bottom: 1px solid rgba(61,17,20,0.35); padding-bottom: 3px; font-weight: 600;
        }

        .c-ribbon {
          position: absolute; left: 45%; top: 9%; width: 95px; height: 25px; background: #641c21; opacity: 0.75;
          transform: rotate(-18deg) translateZ(80px); box-shadow: 0 10px 20px rgba(9,2,3,0.3); z-index: 8;
          pointer-events: none !important;
        }
        .c-ribbon::after {
          content: ""; position: absolute; right: -17px; top: 0; border-top: 12.5px solid transparent; border-bottom: 12.5px solid transparent; border-left: 17px solid #641c21;
        }
        
        .c-spark { position: absolute; color: var(--brand-gold); font-size: 12px; z-index: 9; animation: sparkAnim 3.5s ease-in-out infinite; pointer-events: none !important; }
        .s1 { left: 4%; top: 14%; } .s2 { right: 5%; top: 37%; animation-delay: 1s; } .s3 { left: 43%; bottom: 4%; animation-delay: 1.8s; }

        @keyframes sparkAnim { 50% { transform: translateY(-9px); opacity: 0.3; } }

        .c-bottom {
          max-width: 1160px; margin: 40px auto 0; border-top: 1px solid rgba(244,222,185,0.08); padding-top: 19px;
          display: flex; justify-content: space-between; color: rgba(245,230,204,0.4); font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.09em; text-transform: uppercase; position: relative; z-index: 5;
        }
        .c-bottom strong { color: var(--brand-gold); font-weight: 500; }

        /* Responsive Layouts */
        @media (max-width: 1000px) {
          .c-stage { grid-template-columns: 0.85fr 1.15fr; gap: 10px; }
          .card-3d { width: 215px; height: 165px; padding: 18px; }
          .card-wall { height: 480px; }
          .c1 { left: 0; top: 15px; } .c2 { right: 0; top: 5px; }
          .c3 { left: 8px; top: 145px; } .c4 { right: 8px; top: 135px; }
          .c5 { left: 4px; top: 275px; } .c6 { right: 4px; top: 265px; }
        }
        @media (max-width: 780px) {
          .contact-3d-section { padding: 60px 16px 40px; }
          .c-stage { display: block; min-height: auto; margin-top: 36px; perspective: none; }
          .copy-col { text-align: center; padding: 0 8px; }
          .copy-col p { margin-left: auto; margin-right: auto; }
          .handwritten { margin-top: 18px; }
          .card-wall {
            height: auto; width: 100%; max-width: 500px; margin: 32px auto 0;
            transform: none !important; perspective: none; padding-bottom: 10px;
            display: grid !important; grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .card-3d { 
            position: relative !important; width: 100% !important; max-width: 100% !important;
            height: auto !important; min-height: 148px !important; padding: 14px 12px !important; 
            margin: 0 !important; transform: none !important; 
            transition: transform 0.3s ease, box-shadow 0.3s ease; 
            top: auto !important; bottom: auto !important; left: auto !important; right: auto !important;
            box-sizing: border-box !important;
            border-radius: 8px !important;
          }
          .card-3d h3 { font-size: 16px !important; margin: 0 0 4px !important; color: #7A4E17 !important; }
          .card-3d p { font-size: 9px !important; line-height: 1.4 !important; max-width: 100% !important; color: #5D3D35 !important; }
          .card-icon { width: 32px !important; height: 32px !important; font-size: 15px !important; margin-bottom: 8px !important; color: #7A4E17 !important; border-color: rgba(122, 78, 23, 0.18) !important; background: rgba(122, 78, 23, 0.08) !important; }
          .card-num { right: 10px !important; top: 10px !important; font-size: 8px !important; }
          .card-go { font-size: 8px !important; margin-top: 8px !important; }
          .card-3d:hover { transform: translateY(-3px) !important; box-shadow: 0 12px 28px rgba(0,0,0,0.5) !important; z-index: 10 !important; }
          .c-ribbon, .c-spark { display: none; }
          .c-bottom {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: 6px !important;
            margin-top: 32px !important;
            padding-top: 16px !important;
          }
          .c-bottom span {
            font-size: clamp(7px, 2.1vw, 8.5px) !important;
            white-space: nowrap !important;
            letter-spacing: 0.06em !important;
            opacity: 0.65 !important;
          }
          .c-bottom strong {
            font-size: clamp(7.5px, 2.35vw, 9.5px) !important;
            white-space: nowrap !important;
            letter-spacing: 0.08em !important;
            display: block !important;
            text-align: center !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .card-3d, .card-wall, .c-spark { transition: none !important; animation: none !important; transform: none !important; }
        }
      ` }} />

      <div className="c-top">
        <div className="c-kicker">LET&apos;S CONNECT</div>
        <h2 className="c-heading">Co-create <i>Your Story</i></h2>
        <p className="c-intro">
          Your wedding deserves more than a booking form. Choose the way you want to connect
          and let&apos;s start turning your celebration into a story worth remembering.
        </p>
      </div>

      <div
        className="c-stage"
        onPointerMove={handleStageMove}
        onPointerLeave={handleStageLeave}
      >
        <div className="copy-col">
          <div className="copy-label">SIX WAYS · ONE STORY</div>
          <h2>Every beautiful<br/>story starts with<br/><span>one little hello.</span></h2>
          <p>
            Whether you&apos;re planning your wedding, exploring our films,
            or simply want to say hello — we&apos;re only a click away.
          </p>
          <div className="handwritten">See you on the other side ✦</div>
        </div>

        <div className="card-wall" ref={wallRef}>
          <div className="c-ribbon"></div>
          <div className="c-spark s1">✦</div><div className="c-spark s2">✧</div><div className="c-spark s3">✦</div>

          {contactMethods.map((method, i) => {
            const isMail = method.id === "email";
            const isTel = method.id === "call";
            return (
              <a
                key={method.id}
                href={method.link}
                target={isMail || isTel ? undefined : "_blank"}
                rel={isMail || isTel ? undefined : "noopener noreferrer"}
                className={`card-3d ${method.className}`}
                ref={(el) => { cardsRef.current[i] = el; }}
                onPointerMove={(e) => handleCardMove(e, i)}
                onPointerLeave={() => handleCardLeave(i)}
                onClick={isMail ? handleEmailAction : undefined}
              >
                <span className="card-num">0{i + 1}</span>
                <div className="card-icon">
                  {(() => { const Icon = method.IconComponent; return <Icon />; })()}
                </div>
                <h3 style={{ color: "#7A4E17" }}>{method.title}</h3>
                <p>{method.description}</p>
                <span className="card-go">{method.ctaText}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="c-bottom">
        <span>WEDDING STORIES · CINEMATIC FILMS · REAL MOMENTS</span>
        <strong>YOUR DAY · YOUR PEOPLE · YOUR STORY</strong>
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 99999,
            background: "rgba(36, 5, 8, 0.95)",
            border: "1px solid var(--brand-gold)",
            borderRadius: 100,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "var(--brand-cream)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.06em",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(212,184,150,0.2)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <span style={{ color: "#4ade80", fontSize: 16 }}>✓</span>
          <span>{toast}</span>
        </div>
      )}
    </section>
  );
}
