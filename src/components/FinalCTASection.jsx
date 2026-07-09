"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection() {
  const secRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 50,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headRef.current,
          start: "top 80%",
        },
      });
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={secRef}
      style={{
        padding: "160px 24px",
        background:
          "linear-gradient(135deg,#C9A27E 0%,#A8825A 55%,#6B4820 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <div ref={headRef}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.8)",
              marginBottom: 24,
            }}
          >
            Ready to Tell Your Story?
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant,serif)",
              fontSize: "clamp(40px, 8vw, 72px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: 24,
              fontStyle: "italic",
            }}
          >
            Let\'s Create Magic Together
          </h2>
          <p
            style={{
              fontFamily: "var(--font-jost, sans-serif)",
              fontSize: 18,
              color: "rgba(255,255,255,0.9)",
              marginBottom: 40,
              lineHeight: 1.7,
            }}
          >
            Your love story deserves to be told beautifully. Let\'s work
            together to create cinematic memories you\'ll cherish forever.
          </p>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="focus-sq"
            style={{
              padding: "18px 48px",
              background: "#fff",
              color: "#6B4820",
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              border: "none",
              borderRadius: 40,
              cursor: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 15px 50px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.2)";
            }}
          >
            Let\'s Begin Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}
