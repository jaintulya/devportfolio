"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Chat directly about your wedding date, plans and vision.",
    icon: "◌",
    ctaText: "START A CHAT ↗",
    link: "https://wa.me/919377150889",
    className: "c1",
  },
  {
    id: "email",
    title: "Email",
    description: "Send your dates, venue, details and everything you're imagining.",
    icon: "✉",
    ctaText: "WRITE TO US ↗",
    link: "mailto:shaadi.pitaraa@gmail.com",
    className: "c2",
  },
  {
    id: "call",
    title: "Call",
    description: "Prefer talking? Let's discuss your celebration together.",
    icon: "⌕",
    ctaText: "CALL US ↗",
    link: "tel:+919377150889",
    className: "c3",
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "Explore real weddings, reels, behind-the-scenes and our latest work.",
    icon: "◎",
    ctaText: "FOLLOW ALONG ↗",
    link: "https://www.instagram.com/shaadi.pitara",
    className: "c4",
  },
  {
    id: "youtube",
    title: "YouTube",
    description: "Watch extended cinematic wedding films and full stories.",
    icon: "▶",
    ctaText: "WATCH FILMS ↗",
    link: "https://youtube.com/@shaadi.pitara",
    className: "c5",
  },
  {
    id: "pinterest",
    title: "Pinterest",
    description: "Discover wedding inspiration, moodboards and visual references.",
    icon: "◉",
    ctaText: "EXPLORE IDEAS ↗",
    link: "https://pin.it/5GKckms5T",
    className: "c6",
  },
];

export default function ContactSection() {
  const stageRef = useRef(null);
  const wallRef = useRef(null);
  const cardsRef = useRef([]);

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
      <style>{`
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
          margin: 0; max-width: 460px;
          font-family: var(--font-display);
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
            transform: translateZ(120px) rotateX(0) rotateY(0) !important;
            box-shadow: 25px 35px 65px rgba(5,1,2,0.55), 0 0 35px rgba(214,180,119,0.15);
            filter: saturate(1.05); z-index: 20 !important;
          }
        }

        /* Default desktop positions */
        .c1 { left: 0; top: 35px; transform: translateZ(55px) rotate(-7deg); z-index: 5; }
        .c2 { right: 0; top: 8px; transform: translateZ(5px) rotate(6deg); z-index: 4; }
        .c3 { left: 18px; top: 220px; transform: translateZ(20px) rotate(5deg); z-index: 3; }
        .c4 { right: 12px; top: 205px; transform: translateZ(70px) rotate(-5deg); z-index: 6; }
        .c5 { left: 30px; bottom: 15px; transform: translateZ(10px) rotate(-5deg); z-index: 2; }
        .c6 { right: 20px; bottom: 5px; transform: translateZ(48px) rotate(6deg); z-index: 5; }

        .card-num { position: absolute; right: 18px; top: 17px; color: #a68474; font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.12em; }
        .card-icon {
          width: 42px; height: 42px; display: grid; place-items: center; border-radius: 12px;
          background: rgba(76,20,22,0.06); border: 1px solid rgba(74,23,24,0.08);
          color: #4b1719; font-size: 20px; margin-bottom: 15px; transform: translateZ(20px);
        }
        .card-3d h3 { margin: 0 0 6px; font-family: var(--font-display); font-size: 25px; font-weight: 500; line-height: 1.1; }
        .card-3d p { margin: 0; max-width: 190px; color: #7e625a; font-size: 10.5px; line-height: 1.6; font-family: var(--font-body); }
        .card-go {
          display: inline-block; margin-top: 10px; color: #3d1114; font-family: var(--font-mono); font-size: 9px;
          letter-spacing: 0.11em; border-bottom: 1px solid rgba(61,17,20,0.35); padding-bottom: 3px; font-weight: 600;
        }

        .c-ribbon {
          position: absolute; left: 45%; top: 9%; width: 95px; height: 25px; background: #641c21; opacity: 0.75;
          transform: rotate(-18deg) translateZ(80px); box-shadow: 0 10px 20px rgba(9,2,3,0.3); z-index: 8;
        }
        .c-ribbon::after {
          content: ""; position: absolute; right: -17px; top: 0; border-top: 12.5px solid transparent; border-bottom: 12.5px solid transparent; border-left: 17px solid #641c21;
        }
        .c-ribbon::after {
          content: ""; position: absolute; right: -17px; top: 0; border-top: 12.5px solid transparent; border-bottom: 12.5px solid transparent; border-left: 17px solid #641c21;
        }
        
        .c-spark { position: absolute; color: var(--brand-gold); font-size: 12px; z-index: 9; animation: sparkAnim 3.5s ease-in-out infinite; }
        .s1 { left: 4%; top: 14%; } .s2 { right: 5%; top: 37%; animation-delay: 1s; } .s3 { left: 43%; bottom: 4%; animation-delay: 1.8s; }

        @keyframes sparkAnim { 50% { transform: translateY(-9px); opacity: 0.3; } }

        .c-bottom {
          max-width: 1160px; margin: 65px auto 0; border-top: 1px solid rgba(244,222,185,0.08); padding-top: 19px;
          display: flex; justify-content: space-between; color: rgba(245,230,204,0.4); font-family: var(--font-mono);
          font-size: 9px; letter-spacing: 0.09em; text-transform: uppercase; position: relative; z-index: 5;
        }
        .c-bottom strong { color: var(--brand-gold); font-weight: 500; }

        /* Responsive Layouts */
        @media (max-width: 1000px) {
          .c-stage { grid-template-columns: 0.8fr 1.2fr; gap: 10px; }
          .card-3d { width: 215px; height: 165px; padding: 18px; }
          .card-wall { height: 500px; }
          .c1 { left: 0; } .c2 { right: 0; } .c3 { left: 5px; } .c4 { right: 0; } .c5 { left: 40px; } .c6 { right: 25px; }
        }
        @media (max-width: 780px) {
          .contact-3d-section { padding: 60px 20px 40px; }
          .c-stage { display: block; min-height: auto; margin-top: 45px; perspective: none; }
          .copy-col { text-align: center; padding: 0 8px; }
          .copy-col p { margin-left: auto; margin-right: auto; }
          .handwritten { margin-top: 18px; }
          .card-wall {
            height: auto; width: 100%; margin: 40px auto 0;
            transform: none !important; perspective: none; padding-bottom: 20px;
            display: flex; flex-direction: column; gap: 24px; align-items: center;
          }
          .card-3d { 
            position: relative; width: 100%; max-width: 320px; height: auto; padding: 24px; 
            margin: 0; transform: none !important; 
            transition: transform 0.3s ease, box-shadow 0.3s ease; 
          }
          .card-3d:last-child { margin-bottom: 0; }
          .card-3d:hover { transform: translateY(-5px) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.5) !important; z-index: 10 !important; }
          .c-ribbon, .c-spark { display: none; }
          .c-bottom { display: block; text-align: center; line-height: 2.2; margin-top: 40px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .card-3d, .card-wall, .c-spark { transition: none !important; animation: none !important; transform: none !important; }
        }
      `}</style>

      <div className="c-top">
        <div className="c-kicker">LET&apos;S CONNECT</div>
        <h1 className="c-heading">Co-create <i>Your Story</i></h1>
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

          {contactMethods.map((method, i) => (
            <a
              key={method.id}
              href={method.link}
              target={method.link.startsWith("mailto") || method.link.startsWith("tel") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className={`card-3d ${method.className}`}
              ref={(el) => { cardsRef.current[i] = el; }}
              onPointerMove={(e) => handleCardMove(e, i)}
              onPointerLeave={() => handleCardLeave(i)}
            >
              <span className="card-num">0{i + 1}</span>
              <div className="card-icon">{method.icon}</div>
              <h3>{method.title}</h3>
              <p>{method.description}</p>
              <span className="card-go">{method.ctaText}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="c-bottom">
        <span>WEDDING STORIES · CINEMATIC FILMS · REAL MOMENTS</span>
        <strong>YOUR DAY · YOUR PEOPLE · YOUR STORY</strong>
      </div>
    </section>
  );
}
