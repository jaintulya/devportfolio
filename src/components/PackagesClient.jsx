"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════
   ICONS — inline SVG, consistent 18px / stroke 1.6
══════════════════════════════════════════ */
const Icon = {
  Video: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" /><path d="M16 10l5.5-3.5v11L16 14" />
    </svg>
  ),
  Heart: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Camera: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
  ),
  Stories: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Users: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Monitor: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
    </svg>
  ),
  Package: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Live: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M4.93 19.07A10 10 0 0 1 4.93 4.93M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Drone: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M4 4l4 4" /><path d="M4 8l4-4" /><path d="M20 4l-4 4" /><path d="M20 8l-4-4" />
      <path d="M4 16l4 4" /><path d="M4 20l4-4" /><path d="M20 16l-4 4" /><path d="M20 20l-4-4" />
      <circle cx="4" cy="6" r="2" /><circle cx="20" cy="6" r="2" />
      <circle cx="4" cy="18" r="2" /><circle cx="20" cy="18" r="2" />
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Dash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="6" y1="12" x2="18" y2="12" />
    </svg>
  ),
  WhatsApp: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.652c1.746.951 3.71 1.453 5.71 1.454h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  VerticalPhone: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <polygon points="10.5,9.5 14.5,12 10.5,14.5" fill="currentColor" stroke="none" />
      <line x1="11" y1="18.5" x2="13" y2="18.5" />
    </svg>
  ),
  TrendRhythm: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 13h3.5l2-6 3.5 13 3-9 2 4.5h4" />
      <polyline points="16 4 21 4 21 9" />
      <line x1="21" y1="4" x2="14" y2="11" />
    </svg>
  ),
  Cinema4K: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="8" />
      <line x1="12" y1="16" x2="12" y2="22" />
      <line x1="2" y1="12" x2="8" y2="12" />
      <line x1="16" y1="12" x2="22" y2="12" />
    </svg>
  ),
  FastDelivery: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  CreditCard: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  Plane: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4c-1 0-2 .5-2.5 1L13 8.8 4.8 7 3 8.8l6.9 3.5L7.5 15l-2 1.5L7 18l2.5-1 3.5 2.4L13 23l1.8-1.8-1-6.5 4-4z" />
    </svg>
  ),
  Hotel: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V12h18v10" /><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5" /><path d="M9 22v-4h6v4" />
    </svg>
  ),
  Info: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
};

/* ══════════════════════════════════════════
   DATA & PRICING
══════════════════════════════════════════ */
const PRICING = {
  classic: { 2: "₹60,000", 3: "₹80,000", 4: "₹1,00,000" },
  luxe:    { 2: "₹80,000", 3: "₹1,00,000", 4: "₹1,20,000" },
  royal:   { 2: "₹1,20,000", 3: "₹1,40,000", 4: "₹1,60,000" },
};

const WA_NUMBER = "919377150889";

function buildWaUrl(tier, days) {
  const price = PRICING[tier.id][days];
  const msg = `Hi Shaadi Pitara! I would like to enquire about the ${tier.name} Package for ${days} Days, priced at ${price}. Please share more details about the inclusions and booking process.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const PACKAGES = [
  {
    id: "classic",
    name: "Classic",
    tagline: "Beautifully told, thoughtfully captured.",
    description: "Everything you need for a complete and memorable wedding coverage — cinematic reels, story coverage and dedicated page management.",
    inclusions: [
      { icon: "Video", label: "Up to 10 Edited Reels" },
      { icon: "Stories", label: "2–3 Stories per function" },
      { icon: "Users", label: "1–2 Content Creators" },
      { icon: "Package", label: "Post-event content delivery" },
      { icon: "Monitor", label: "Page management during the wedding" },
      { icon: "Drone", label: "Drone Coverage available as add-on (+₹10,000)" },
    ],
    highlight: false,
    badge: null,
  },
  {
    id: "luxe",
    name: "Luxe",
    tagline: "The experience most couples choose.",
    description: "More reels, live coverage and extended page management — for couples who want their celebration beautifully documented from every angle.",
    inclusions: [
      { icon: "Video", label: "Up to 20 Premium Edited Reels" },
      { icon: "Stories", label: "8–10 Stories + Live Stories coverage" },
      { icon: "Users", label: "Team of 2 Content Creators" },
      { icon: "Package", label: "Post-event content delivery" },
      { icon: "Monitor", label: "Page management: Live Stories & Post" },
      { icon: "Drone", label: "Drone Coverage available as add-on (+₹10,000)" },
    ],
    highlight: true,
    badge: "Most Chosen",
  },
  {
    id: "royal",
    name: "Royal",
    tagline: "Complete, immersive, unforgettable.",
    description: "Full-spectrum coverage — from pre-wedding anticipation through live moments to a month of curated post-wedding content, all in one.",
    inclusions: [
      { icon: "Video", label: "Up to 30 Premium Edited Reels" },
      { icon: "Live", label: "Unlimited Live Story Coverage" },
      { icon: "Calendar", label: "1 month Pre-event, Live & Post-event Posting" },
      { icon: "Users", label: "Team of 2–3 Creators (by event scale)" },
      { icon: "Monitor", label: "Page management pre, during & post-wedding" },
      { icon: "Drone", label: "Drone Coverage Included" },
    ],
    highlight: false,
    badge: null,
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Edited Reels",
    icon: "Video",
    classic: "Up to 10",
    luxe: "Up to 20",
    royal: "Up to 30",
  },
  {
    feature: "Stories",
    icon: "Stories",
    classic: "2–3 per function",
    luxe: "8–10 + Live Stories",
    royal: "Unlimited Live",
  },
  {
    feature: "Content Creators",
    icon: "Users",
    classic: "1–2",
    luxe: "2",
    royal: "2–3",
  },
  {
    feature: "Post-event Delivery",
    icon: "Package",
    classic: "yes",
    luxe: "yes",
    royal: "yes",
  },
  {
    feature: "Page Management",
    icon: "Monitor",
    classic: "During wedding",
    luxe: "Live Stories & Post",
    royal: "Pre + During + Post",
  },
  {
    feature: "Extended Posting",
    icon: "Calendar",
    classic: "no",
    luxe: "Post-wedding",
    royal: "1 month",
  },
  {
    feature: "Drone Coverage",
    icon: "Drone",
    classic: "Add-on (+₹10,000)",
    luxe: "Add-on (+₹10,000)",
    royal: "Included",
  },
];

const POLICIES = [
  {
    id: "payment",
    title: "Payment Terms",
    icon: "CreditCard",
    items: [
      "40% advance payment required for booking confirmation.",
      "40% due on the first day of events.",
      "Remaining 20% once all deliverables have been provided.",
    ],
  },
  {
    id: "travel",
    title: "Travel, Stay & Meals",
    icon: "Hotel",
    items: [
      "Client is responsible for team accommodation, travel and meals (2–3 members).",
      "Accommodation at the event property is preferred for seamless, uninterrupted coverage.",
    ],
  },
  {
    id: "posting",
    title: "Content & Credits",
    icon: "Stories",
    items: [
      "All reels and stories include the Shaadi Pitara logo and proper credits.",
      "Content is shared from both the official Shaadi Pitara account and the couple's page.",
      "Private content requests must be communicated before the event.",
      "Share your tagging preferences — including whom to tag or avoid — before the event.",
    ],
  },
  {
    id: "additional",
    title: "Additional Conditions",
    icon: "Info",
    items: [
      "Additional reels, extended coverage and date changes may be chargeable.",
      "Raw files are shared after all final deliverables are provided.",
      "Client consent is required before sharing content with external collaborators.",
      "Client must provide a Hard Drive or Pen Drive for raw footage transfer.",
    ],
  },
  {
    id: "delivery",
    title: "Delivery Timeline",
    icon: "Package",
    items: [
      "All raw and edited videos are delivered within 15–20 working days after the wedding.",
      "Note: The original package reference also mentions 3–4 weeks after the event. Please confirm your preferred timeline at the time of booking.",
    ],
  },
];

/* ══════════════════════════════════════════
   ICON RESOLVER
══════════════════════════════════════════ */
function RenderIcon({ name, size = 16 }) {
  const C = Icon[name];
  if (!C) return null;
  return <C />;
}

/* ══════════════════════════════════════════
   PACKAGE CARD
   Styled in RICH BEIGE TONES on Maroon background
══════════════════════════════════════════ */
function PackageCard({ pkg, days, animRef, index = 0 }) {
  const price = PRICING[pkg.id][days];
  const isLuxe = pkg.highlight;
  const waUrl = buildWaUrl(pkg, days);

  // All cards in rich beige tone per user request
  const bg = isLuxe
    ? "linear-gradient(160deg, #FFFDF9 0%, #F6E5CB 100%)"
    : "linear-gradient(165deg, #FAF5EE 0%, #F5ECE0 100%)";
  const border = isLuxe
    ? "2px solid #C4965F"
    : "1.5px solid rgba(196,150,95,0.38)";
  const shadow = isLuxe
    ? "0 24px 60px rgba(0,0,0,0.42), 0 0 0 1px rgba(196,150,95,0.4), inset 0 1px 0 rgba(255,255,255,0.95)"
    : "0 16px 44px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.85)";

  const nameColor = "#2E0A0D";
  const textColor = isLuxe ? "rgba(46,10,13,0.88)" : "rgba(46,10,13,0.82)";
  const mutedColor = "rgba(94,24,28,0.52)";
  const iconBg = isLuxe ? "rgba(94,24,28,0.09)" : "rgba(94,24,28,0.07)";
  const iconColor = isLuxe ? "#966A3A" : "#5E181C";
  const divider = isLuxe ? "rgba(94,24,28,0.14)" : "rgba(94,24,28,0.11)";
  const taglineColor = "#966A3A";

  const btnBg = isLuxe ? "#3A0B0E" : "transparent";
  const btnColor = isLuxe ? "#F3E1C4" : "#2E0A0D";
  const btnBorder = isLuxe ? "1px solid #3A0B0E" : "1.5px solid #3A0B0E";

  return (
    <article
      ref={animRef}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: bg,
        border,
        boxShadow: shadow,
        transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s cubic-bezier(0.23,1,0.32,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = isLuxe
          ? "0 34px 72px rgba(0,0,0,0.5), 0 0 0 1px rgba(196,150,95,0.6)"
          : "0 26px 56px rgba(0,0,0,0.44), 0 0 0 1px rgba(196,150,95,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = shadow;
      }}
    >
      {/* Most Chosen badge */}
      {isLuxe && (
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          background: "linear-gradient(90deg, #3A0B0E 0%, #5E181C 50%, #3A0B0E 100%)",
          padding: "7px 20px",
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: "#E8D0A8",
          fontWeight: 600,
        }}>
          Most Chosen
        </div>
      )}

      <div style={{
        padding: "clamp(24px,3vw,32px) clamp(22px,2.5vw,28px)",
        paddingTop: isLuxe ? "clamp(44px,5vw,52px)" : "clamp(24px,3vw,32px)",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}>
        {/* Index */}
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          color: mutedColor,
          marginBottom: 10,
        }}>
          {String((index ?? 0) + 1).padStart(2, "0")} / 03
        </div>

        {/* Package name */}
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px,3.2vw,38px)",
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: "-0.025em",
          color: nameColor,
          margin: "0 0 6px",
        }}>
          {pkg.name}
        </h3>

        {/* Tagline */}
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(13px,1.3vw,15px)",
          fontStyle: "italic",
          color: taglineColor,
          margin: "0 0 20px",
          lineHeight: 1.5,
        }}>
          {pkg.tagline}
        </p>

        {/* Price */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px,3.8vw,46px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: nameColor,
            lineHeight: 1,
            transition: "all 0.3s ease",
          }}>
            {price}
          </div>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: mutedColor,
            marginTop: 5,
          }}>
            for {days} day{days > 1 ? "s" : ""}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: divider, marginBottom: 20 }} />

        {/* Inclusions */}
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 20px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}>
          {pkg.inclusions.map((inc, i) => (
            <li key={i} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontFamily: "var(--font-body)",
              fontSize: "clamp(13px,1.2vw,14px)",
              lineHeight: 1.5,
              color: textColor,
            }}>
              <span style={{
                width: 26,
                height: 26,
                minWidth: 26,
                borderRadius: "50%",
                background: iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: iconColor,
                marginTop: 1,
                flexShrink: 0,
              }}>
                <RenderIcon name={inc.icon} />
              </span>
              {inc.label}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "13px 20px",
            borderRadius: 100,
            fontFamily: "var(--font-mono)",
            fontSize: 9.5,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 700,
            textDecoration: "none",
            background: btnBg,
            color: btnColor,
            border: btnBorder,
            transition: "all 0.32s cubic-bezier(0.23,1,0.32,1)",
          }}
          onMouseEnter={(e) => {
            if (isLuxe) {
              e.currentTarget.style.background = "#5E181C";
              e.currentTarget.style.borderColor = "#5E181C";
            } else {
              e.currentTarget.style.background = "#3A0B0E";
              e.currentTarget.style.color = "#F3E1C4";
            }
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            if (isLuxe) {
              e.currentTarget.style.background = "#3A0B0E";
              e.currentTarget.style.borderColor = "#3A0B0E";
            } else {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#2E0A0D";
            }
            e.currentTarget.style.transform = "none";
          }}
        >
          <Icon.WhatsApp />
          Enquire About {pkg.name}
        </a>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════
   SECTION 2: WHAT'S ALWAYS INCLUDED
   Background: BEIGE / IVORY (var(--brand-ivory))
══════════════════════════════════════════ */
const ALWAYS_INCLUDED_ITEMS = [
  {
    id: "vertical",
    title: "Vertical Reels Optimized for Instagram",
    tag: "9:16 Native Format",
    detail: "Shot natively in 9:16 high frame-rate for seamless story and feed presentation with zero awkward cropping.",
    icon: "VerticalPhone",
    badgeBg: "rgba(94, 24, 28, 0.08)",
    badgeColor: "#5E181C",
    accentBorder: "#5E181C",
    isVerticalReel: true,
  },
  {
    id: "trend",
    title: "Trend-based Editing Style",
    tag: "Trending Audio & Rhythm",
    detail: "Contemporary rhythm, seamless cuts, trending tracks, and tailored typography.",
    icon: "TrendRhythm",
    badgeBg: "rgba(180, 83, 9, 0.12)",
    badgeColor: "#B45309",
    accentBorder: "#B45309",
  },
  {
    id: "4k",
    title: "High-Quality 4K Capture",
    tag: "Pro Cinema Gear",
    detail: "Pro-grade mirrorless cinematography tuned for vibrant daylight and ambient indoor light.",
    icon: "Cinema4K",
    badgeBg: "rgba(94, 24, 28, 0.08)",
    badgeColor: "#5E181C",
    accentBorder: "#5E181C",
  },
  {
    id: "delivery",
    title: "Fast Content Delivery",
    tag: "Express Turnaround",
    detail: "Priority turnarounds so your circle experiences the celebration while emotions are fresh.",
    icon: "FastDelivery",
    badgeBg: "rgba(217, 119, 6, 0.12)",
    badgeColor: "#D97706",
    accentBorder: "#966A3A",
  },
  {
    id: "whatsapp",
    title: "Dedicated WhatsApp Support",
    tag: "Direct Creator Line",
    detail: "Direct, personal line with your lead creator before, during, and post celebrations.",
    icon: "WhatsApp",
    badgeBg: "rgba(37, 211, 102, 0.14)",
    badgeColor: "#128C7E",
    accentBorder: "#25D366",
  },
];

function RenderAlwaysIcon({ name }) {
  switch (name) {
    case "VerticalPhone":
      return <Icon.VerticalPhone />;
    case "TrendRhythm":
      return <Icon.TrendRhythm />;
    case "Cinema4K":
      return <Icon.Cinema4K />;
    case "FastDelivery":
      return <Icon.FastDelivery />;
    case "WhatsApp":
      return <Icon.WhatsApp />;
    default:
      return <Icon.Check />;
  }
}

function AlwaysIncludedSection() {
  return (
    <section
      style={{
        padding: "clamp(72px, 8vw, 108px) clamp(16px, 4vw, 48px)",
        background: "var(--brand-ivory)",
        position: "relative",
        borderTop: "1px solid rgba(212, 184, 150, 0.2)",
        borderBottom: "1px solid rgba(212, 184, 150, 0.2)",
      }}
    >
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(94, 24, 28, 0.035) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(36px, 4.5vw, 52px)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(58, 13, 16, 0.5)", marginBottom: 14,
          }}>
            <span style={{ width: 24, height: 1, background: "rgba(58, 13, 16, 0.35)", display: "block" }} />
            Every Package Includes
            <span style={{ width: 24, height: 1, background: "rgba(58, 13, 16, 0.35)", display: "block" }} />
          </div>

          <h2 className="c-heading on-light" style={{ margin: 0 }}>
            What&apos;s <i>Always Included</i>
          </h2>
        </div>

        <div className="always-included-grid">
          {ALWAYS_INCLUDED_ITEMS.map((item) => {
            if (item.isVerticalReel) {
              return (
                <div
                  key={item.id}
                  className="always-included-card is-vertical"
                  style={{
                    background: "linear-gradient(135deg, #FFFDF9 0%, #FAF3E8 100%)",
                    border: "1px solid rgba(212, 184, 150, 0.45)",
                    borderLeft: "5px solid #5E181C",
                    borderRadius: 14,
                    padding: "24px 28px",
                    boxShadow: "0 8px 24px rgba(58, 11, 14, 0.05)",
                    transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 16px 36px rgba(58, 11, 14, 0.11)";
                    e.currentTarget.style.borderColor = "rgba(150, 106, 58, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(58, 11, 14, 0.05)";
                    e.currentTarget.style.borderColor = "rgba(212, 184, 150, 0.45)";
                  }}
                >
                  <div className="vertical-reel-feature-content">
                    <div className="vertical-reel-left">
                      <div className="vertical-reel-tag-row">
                        <span style={{
                          width: 28, height: 28, minWidth: 28,
                          borderRadius: "50%",
                          background: item.badgeBg,
                          color: item.badgeColor,
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <RenderAlwaysIcon name={item.icon} />
                        </span>
                        <span className="vertical-pill-tag">9:16 NATIVE FORMAT</span>
                        <span className="vertical-pill-tag gold">ZERO CROPPING</span>
                      </div>

                      <h3 className="vertical-reel-title">
                        {item.title}
                      </h3>

                      <p className="vertical-reel-detail">
                        {item.detail}
                      </p>

                      <div className="vertical-reel-highlights">
                        <span className="v-pill">✦ 9:16 Full Screen Immersion</span>
                        <span className="v-pill">✦ 60fps Ultra-Smooth</span>
                        <span className="v-pill">✦ Instagram Story & Feed Native</span>
                      </div>
                    </div>

                    {/* Right side: Sleek 9:16 vertical smartphone frame mockup */}
                    <div className="vertical-phone-mockup-wrap" aria-hidden="true">
                      <div className="vertical-phone-frame">
                        <div className="phone-screen-inner">
                          <img
                            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80"
                            alt="Vertical Reel"
                            className="phone-screen-img"
                          />
                          <div className="phone-screen-overlay">
                            <span className="mock-ratio-pill">9:16 REEL</span>
                            <div className="mock-play-btn">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFFFFF"><polygon points="7,4 20,12 7,20" /></svg>
                            </div>
                            <div className="mock-waveform-wrap">
                              <span className="mock-audio-icon">♪</span>
                              <div className="mock-bars">
                                <span className="b1" /><span className="b2" /><span className="b3" /><span className="b4" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="always-included-card"
                style={{
                  background: "#FFFDF9",
                  border: "1px solid rgba(212, 184, 150, 0.35)",
                  borderLeft: `4px solid ${item.accentBorder}`,
                  borderRadius: 12,
                  padding: "22px 22px",
                  boxShadow: "0 6px 20px rgba(58, 11, 14, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 14px 32px rgba(58, 11, 14, 0.09)";
                  e.currentTarget.style.borderColor = "rgba(150, 106, 58, 0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(58, 11, 14, 0.04)";
                  e.currentTarget.style.borderColor = "rgba(212, 184, 150, 0.35)";
                }}
              >
                <div className="inc-card-head" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    width: 28, height: 28, minWidth: 28,
                    borderRadius: "50%",
                    background: item.badgeBg,
                    color: item.badgeColor,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <RenderAlwaysIcon name={item.icon} />
                  </span>
                  <h3 style={{
                    fontFamily: "var(--font-display), Georgia, serif",
                    fontSize: "clamp(15px, 1.6vw, 18.5px)",
                    fontWeight: 600,
                    color: "#2E0A0D",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                    margin: 0,
                  }}>
                    {item.title}
                  </h3>
                </div>

                <div className="inc-card-tag" style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 8.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: item.badgeColor,
                  fontWeight: 700,
                  marginTop: 2,
                  marginLeft: 38,
                }}>
                  {item.tag}
                </div>

                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(12px, 1.05vw, 13px)",
                  color: "rgba(46, 10, 13, 0.68)",
                  lineHeight: 1.5,
                  margin: "4px 0 0 38px",
                }}>
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: 28,
          background: "rgba(94, 24, 28, 0.035)",
          border: "1px solid rgba(212, 184, 150, 0.35)",
          borderLeft: "4px solid #966A3A",
          borderRadius: 10,
          padding: "16px 22px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}>
          <span style={{ color: "#966A3A", flexShrink: 0, display: "inline-flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </span>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(13px, 1.2vw, 14.5px)",
            color: "#2E0A0D",
            lineHeight: 1.6,
            margin: 0,
          }}>
            All the raw and edited videos will be given back to the client within <strong style={{ color: "#5E181C" }}>15–20 working days</strong> after the wedding is over.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 3: WHAT WE CREATE
   Background: MAROON (with seamless texture)
   All 8 Category Cards in BEIGE TONES for max beauty & contrast
══════════════════════════════════════════ */
const WHAT_WE_CREATE_ITEMS = [
  {
    name: "Editorial Reels",
    id: "editorial",
    tag: "Cinematic Portraits & Couture",
    desc: "Slow-motion bridal aesthetics, jewelry framing & royal couple portraiture.",
  },
  {
    name: "Emotional Reels",
    id: "emotional",
    tag: "Vidaai Tears & Blessings",
    desc: "Tearful parent embraces, heartfelt vows & deeply moving family moments.",
  },
  {
    name: "Joyful Reels",
    id: "joyful",
    tag: "Celebration Euphoria & Dance",
    desc: "Unstoppable celebration energy, laughter bursts & joyful festive choreography.",
  },
  {
    name: "Decor Reels",
    id: "decor",
    tag: "Venue Elegance & Mandap Details",
    desc: "Atmospheric floral setups, ambient lighting & architectural grandeur.",
  },
  {
    name: "Transition Reels",
    id: "transition",
    tag: "Outfit Reveals & Creative Cuts",
    desc: "High-energy beat drops, snap outfit changes & dynamic visual scene shifts.",
  },
  {
    name: "Dialogue Reels",
    id: "dialogue",
    tag: "Spoken Vows & Heartfelt Audio",
    desc: "Crystal-clear live audio capture of your vows, family toasts & promises.",
  },
  {
    name: "Funny Reels",
    id: "funny",
    tag: "Baarat Hype & Quirky Banter",
    desc: "Unscripted groom-squad shenanigans, quirky dance fails & pure celebration fun.",
  },
  {
    name: "Moment Reels",
    id: "moment",
    tag: "Candid Haldi & Sangeet Madness",
    desc: "Haldi splash chaos, stolen glances in the crowd & unposed authentic intimacy.",
  },
];

function WhatWeCreateSection() {
  return (
    <section
      style={{
        padding: "clamp(72px, 8vw, 110px) clamp(16px, 4vw, 48px)",
        backgroundColor: "#3A0B0E",
        backgroundImage: "url('/seamless-texture.jpg')",
        backgroundRepeat: "repeat",
        backgroundSize: "600px 600px",
        backgroundPosition: "0 0",
        position: "relative",
      }}
    >
      <div className="noise-overlay" />

      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(36px, 4.5vw, 52px)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "#DFC18A", marginBottom: 14, fontWeight: 600,
          }}>
            <span style={{ width: 24, height: 1, background: "currentColor", display: "block" }} />
            Content Categories
            <span style={{ width: 24, height: 1, background: "currentColor", display: "block" }} />
          </div>

          <h2 className="c-heading" style={{ margin: "0 0 14px" }}>
            What We <i>Create</i>
          </h2>

          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(14px, 1.35vw, 16px)",
            color: "rgba(246, 229, 203, 0.75)",
            maxWidth: 640,
            lineHeight: 1.7,
            margin: "0 auto 36px",
          }}>
            Every wedding is a collage of grandeur, tears, and spontaneous dance moves. Explore all 8 storytelling reel categories we capture for your celebration.
          </p>
        </div>

        {/* 8 Categories Grid — in Warm BEIGE TONES on Maroon Background */}
        <div className="create-categories-grid" style={{ marginBottom: 40 }}>
          {WHAT_WE_CREATE_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className="create-category-card"
              style={{
                background: "linear-gradient(165deg, #FAF5EE 0%, #F5ECE0 100%)",
                border: "1.5px solid rgba(196, 150, 95, 0.38)",
                borderRadius: 14,
                padding: "22px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)",
                transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 18px 44px rgba(0, 0, 0, 0.42)";
                e.currentTarget.style.borderColor = "#966A3A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.borderColor = "rgba(196, 150, 95, 0.38)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "#966A3A",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}>
                  0{i + 1}
                </span>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#966A3A",
                }} />
              </div>

              <h3 style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(18px, 1.8vw, 21px)",
                fontWeight: 600,
                color: "#2E0A0D",
                letterSpacing: "-0.01em",
                margin: 0,
              }}>
                {item.name}
              </h3>

              <span className="card-tag" style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#5E181C",
                fontWeight: 600,
                lineHeight: 1.3,
              }}>
                {item.tag}
              </span>

              <p className="card-desc" style={{
                fontFamily: "var(--font-body)",
                fontSize: 12.5,
                color: "rgba(46, 10, 13, 0.72)",
                lineHeight: 1.55,
                margin: "4px 0 0",
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button strictly linking to /work */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "15px 36px",
              borderRadius: 100,
              background: "#F3E1C4",
              color: "#2E0A0D",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              textDecoration: "none",
              border: "1px solid #F3E1C4",
              boxShadow: "0 6px 22px rgba(0, 0, 0, 0.3)",
              transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FEF5E6";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(247, 230, 204, 0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F3E1C4";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 6px 22px rgba(0, 0, 0, 0.3)";
            }}
          >
            Watch Our Work
            <Icon.ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 4: COMPARISON TABLE
   Background: BEIGE / IVORY (var(--brand-ivory))
══════════════════════════════════════════ */
function ComparisonSection() {
  return (
    <section
      id="pkg-comparison"
      style={{
        padding: "clamp(72px,8vw,110px) clamp(16px,4vw,48px)",
        background: "var(--brand-ivory)",
        position: "relative",
        borderTop: "1px solid rgba(212, 184, 150, 0.18)",
      }}
    >
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(94,24,28,0.035) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(36px,4.5vw,56px)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(58,13,16,0.4)", marginBottom: 14,
          }}>
            <span style={{ width: 24, height: 1, background: "rgba(58,13,16,0.3)", display: "block" }} />
            At a glance
            <span style={{ width: 24, height: 1, background: "rgba(58,13,16,0.3)", display: "block" }} />
          </div>
          <h2 className="c-heading on-light" style={{ margin: 0 }}>
            Find the experience that <i>feels right.</i>
          </h2>
        </div>

        <div className="compare-wrap">
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)" }}>
            <thead>
              <tr>
                <th style={{
                  padding: "14px 16px", textAlign: "left",
                  fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.22em",
                  textTransform: "uppercase", color: "rgba(58,13,16,0.4)",
                  borderBottom: "2px solid rgba(94,24,28,0.08)", width: "28%",
                }} />
                {PACKAGES.map((p) => (
                  <th key={p.id} style={{
                    padding: "14px 16px", textAlign: "center",
                    fontFamily: "var(--font-display)", fontSize: "clamp(18px,2vw,22px)",
                    fontWeight: 600, letterSpacing: "-0.02em",
                    color: p.highlight ? "#2E0A0D" : "var(--brand-maroon-dark)",
                    borderBottom: "2px solid rgba(94,24,28,0.08)",
                    background: p.highlight ? "rgba(212,184,150,0.12)" : "transparent",
                    borderRadius: p.highlight ? "12px 12px 0 0" : 0,
                    position: "relative",
                  }}>
                    {p.highlight && (
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        height: 3,
                        background: "linear-gradient(90deg, #5E181C, #966A3A, #5E181C)",
                        borderRadius: "12px 12px 0 0",
                      }} />
                    )}
                    {p.name}
                    {p.highlight && (
                      <div style={{
                        fontFamily: "var(--font-mono)", fontSize: 8,
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "#966A3A", fontWeight: 600, marginTop: 2,
                      }}>
                        Most Chosen
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "rgba(94,24,28,0.018)" : "transparent" }}>
                  <td style={{
                    padding: "13px 16px",
                    display: "flex", alignItems: "center", gap: 8,
                    fontFamily: "var(--font-body)", fontSize: 13,
                    color: "rgba(58,13,16,0.6)", borderBottom: "1px solid rgba(94,24,28,0.06)",
                  }}>
                    <span style={{ color: "rgba(94,24,28,0.4)", flexShrink: 0 }}>
                      <RenderIcon name={row.icon} />
                    </span>
                    {row.feature}
                  </td>
                  {[row.classic, row.luxe, row.royal].map((val, ci) => (
                    <td key={ci} style={{
                      padding: "13px 16px", textAlign: "center",
                      fontSize: 13, borderBottom: "1px solid rgba(94,24,28,0.06)",
                      background: ci === 1 ? "rgba(212,184,150,0.12)" : "transparent",
                    }}>
                      {val === "yes" ? (
                        <span style={{ color: "#5E181C", display: "inline-flex", justifyContent: "center" }}><Icon.Check /></span>
                      ) : val === "no" ? (
                        <span style={{ color: "rgba(58,13,16,0.25)", display: "inline-flex", justifyContent: "center" }}><Icon.Dash /></span>
                      ) : (
                        <span style={{ color: "rgba(58,13,16,0.72)", fontFamily: "var(--font-body)" }}>{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="compare-mobile">
          {COMPARISON_ROWS.map((row, i) => (
            <div key={i} style={{ borderBottom: "1px solid rgba(94,24,28,0.07)", padding: "16px 0" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "rgba(58,13,16,0.45)", marginBottom: 10,
              }}>
                <span style={{ color: "rgba(94,24,28,0.35)" }}><RenderIcon name={row.icon} /></span>
                {row.feature}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
                {PACKAGES.map((p, ci) => {
                  const val = ci === 0 ? row.classic : ci === 1 ? row.luxe : row.royal;
                  return (
                    <div key={p.id} style={{
                      padding: "10px 10px",
                      borderRadius: 8,
                      background: p.highlight ? "rgba(212,184,150,0.12)" : "rgba(94,24,28,0.04)",
                      border: p.highlight ? "1px solid rgba(196,150,95,0.25)" : "1px solid rgba(94,24,28,0.07)",
                    }}>
                      <div style={{
                        fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600,
                        color: p.highlight ? "#966A3A" : "var(--brand-maroon-dark)", marginBottom: 4,
                      }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(58,13,16,0.72)", fontFamily: "var(--font-body)" }}>
                        {val === "yes" ? <Icon.Check /> : val === "no" ? <Icon.Dash /> : val}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 5: POLICIES SECTION
   Background: MAROON (with seamless texture)
   Accordion Cards in BEIGE TONES for max readability
══════════════════════════════════════════ */
function PoliciesSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section style={{
      padding: "clamp(72px,8vw,110px) clamp(16px,4vw,48px)",
      backgroundColor: "#3A0B0E",
      backgroundImage: "url('/seamless-texture.jpg')",
      backgroundRepeat: "repeat",
      backgroundSize: "600px 600px",
      backgroundPosition: "0 0",
      position: "relative",
    }}>
      <div className="noise-overlay" />

      <div style={{ maxWidth: 840, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(36px,4.5vw,56px)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 12,
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#DFC18A", marginBottom: 14, fontWeight: 600,
          }}>
            <span style={{ width: 24, height: 1, background: "currentColor", display: "block" }} />
            Before You Book
            <span style={{ width: 24, height: 1, background: "currentColor", display: "block" }} />
          </div>
          <h2 className="c-heading" style={{ margin: 0 }}>
            Booking <i>Information</i>
          </h2>
        </div>

        {/* Accordions in Warm BEIGE TONES on Maroon background */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {POLICIES.map((pol, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={pol.id} style={{
                borderRadius: 12,
                border: "1.5px solid rgba(196,150,95,0.38)",
                borderLeft: "4px solid #5E181C",
                background: "linear-gradient(165deg, #FAF5EE 0%, #F5ECE0 100%)",
                boxShadow: "0 10px 28px rgba(0,0,0,0.25)",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%", padding: "18px 22px",
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", gap: 12,
                    background: "none", border: "none",
                    cursor: "pointer", textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color: "#966A3A", flexShrink: 0 }}>
                      <RenderIcon name={pol.icon} />
                    </span>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(16px,1.8vw,19.5px)",
                      fontWeight: 600,
                      color: "#2E0A0D",
                      letterSpacing: "-0.01em",
                    }}>
                      {pol.title}
                    </span>
                  </div>
                  <div style={{
                    width: 30, height: 30, minWidth: 30,
                    borderRadius: "50%",
                    border: "1px solid rgba(94, 24, 28, 0.2)",
                    background: isOpen ? "#3A0B0E" : "rgba(94, 24, 28, 0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.3s ease",
                    transform: isOpen ? "rotate(45deg)" : "none",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke={isOpen ? "#F3E1C4" : "#2E0A0D"} strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </button>
                <div style={{
                  maxHeight: isOpen ? 500 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.45s cubic-bezier(0.25,1,0.5,1)",
                }}>
                  <div style={{
                    padding: "0 22px 20px 22px",
                    borderTop: "1px solid rgba(94, 24, 28, 0.08)",
                    paddingTop: 14,
                  }}>
                    <ul style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}>
                      {pol.items.map((item, j) => (
                        <li key={j} style={{
                          display: "flex", alignItems: "flex-start", gap: 10,
                          fontFamily: "var(--font-body)",
                          fontSize: "clamp(13px,1.2vw,14.5px)",
                          color: "rgba(46, 10, 13, 0.78)",
                          lineHeight: 1.65,
                        }}>
                          <span style={{ color: "#5E181C", flexShrink: 0, marginTop: 4 }}>
                            <Icon.Check />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SECTION 6: CLOSING CTA ("Ready to plan your day?")
   Background: BEIGE / IVORY (var(--brand-ivory))
   Button 2: "Our Story" -> redirects to /story
══════════════════════════════════════════ */
function ClosingCtaSection() {
  return (
    <section style={{
      padding: "clamp(72px,8vw,110px) clamp(16px,4vw,48px)",
      background: "var(--brand-ivory)",
      textAlign: "center",
      position: "relative",
      borderTop: "1px solid rgba(212, 184, 150, 0.2)",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(94, 24, 28, 0.035) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          fontFamily: "var(--font-mono)", fontSize: 10,
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(58, 13, 16, 0.5)", marginBottom: 18,
        }}>
          <span style={{ width: 24, height: 1, background: "rgba(58, 13, 16, 0.35)", display: "block" }} />
          Let's Begin
          <span style={{ width: 24, height: 1, background: "rgba(58, 13, 16, 0.35)", display: "block" }} />
        </div>

        <h2 className="c-heading on-light" style={{ margin: "0 0 14px" }}>
          Ready to plan <i>your day?</i>
        </h2>

        <p style={{
          fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.4vw,15.5px)",
          color: "rgba(58, 13, 16, 0.72)", lineHeight: 1.75, margin: "0 auto 32px",
        }}>
          Reach out on WhatsApp and we&apos;ll help you choose the coverage that feels right for your wedding.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          {/* Button 1: WhatsApp */}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Shaadi Pitara! I would like to discuss wedding packages. Please share more details.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{
              padding: "15px 36px", borderRadius: 100,
              fontFamily: "var(--font-mono)", fontSize: 9.5,
              letterSpacing: "0.22em", fontWeight: 700,
              textDecoration: "none", display: "inline-flex",
              alignItems: "center", gap: 8,
              background: "#3A0B0E", color: "#F3E1C4",
              border: "1px solid #3A0B0E",
              transition: "all 0.32s cubic-bezier(0.23,1,0.32,1)",
              boxShadow: "0 6px 20px rgba(58, 11, 14, 0.22)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#5E181C";
              e.currentTarget.style.borderColor = "#5E181C";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(58, 11, 14, 0.32)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3A0B0E";
              e.currentTarget.style.borderColor = "#3A0B0E";
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(58, 11, 14, 0.22)";
            }}
          >
            <Icon.WhatsApp />
            Chat on WhatsApp
          </a>

          {/* Button 2: Our Story (redirects to /story) */}
          <Link
            href="/story"
            style={{
              padding: "15px 34px", borderRadius: 100,
              fontFamily: "var(--font-mono)", fontSize: 9.5,
              letterSpacing: "0.22em", fontWeight: 600,
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent",
              color: "#2E0A0D",
              border: "1.5px solid rgba(58, 11, 14, 0.32)",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.32s cubic-bezier(0.23,1,0.32,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#3A0B0E";
              e.currentTarget.style.background = "rgba(58, 11, 14, 0.06)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(58, 11, 14, 0.32)";
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "none";
            }}
          >
            Our Story
            <Icon.ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE COMPONENT
══════════════════════════════════════════ */
export default function PackagesClient() {
  const [days, setDays] = useState(2);
  const cardRefs = useRef([]);
  const heroRef = useRef(null);
  const selectorRef = useRef(null);
  const cardsRef = useRef(null);

  /* Duration switch — subtle card flash */
  const handleDurationChange = useCallback((d) => {
    if (d === days) return;
    setDays(d);

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0.65, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [days]);

  /* Scroll entrance animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero content
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll("[data-anim]"), {
          y: 28, opacity: 0, duration: 0.9, ease: "power3.out",
          stagger: 0.1, delay: 0.15,
        });
      }

      // Cards
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 40, opacity: 0, duration: 0.85, ease: "power3.out",
          delay: i * 0.09,
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  /* Duration options for refined switcher */
  const DURATION_OPTIONS = [
    { days: 2, label: "2 Days", sub: "Two days together" },
    { days: 3, label: "3 Days", sub: "Three days of events" },
    { days: 4, label: "4 Days", sub: "Grand celebrations" },
  ];

  return (
    <>
      <style>{`
        /* Responsive package cards */
        .pkg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(18px, 2.2vw, 28px);
        }
        @media (max-width: 1024px) {
          .pkg-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .pkg-grid { grid-template-columns: 1fr; }
        }

        /* Top 2-Column Hero Grid in Our Packages */
        .pkg-hero-grid {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          align-items: center;
          gap: clamp(32px, 5vw, 64px);
          margin-bottom: clamp(48px, 6vw, 68px);
        }
        @media (max-width: 900px) {
          .pkg-hero-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
        }

        /* Right column visual */
        .pkg-hero-visual {
          position: relative;
          max-width: 440px;
          margin-left: auto;
          width: 100%;
        }
        .hero-ref-photo-wrap {
          position: relative;
          height: 380px;
          width: 100%;
          border-radius: 170px 170px 20px 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: 0 28px 65px rgba(0, 0, 0, 0.45);
          background: linear-gradient(135deg, #351C24, #1A0507);
        }
        .hero-ref-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.92);
        }
        .hero-ref-count {
          position: absolute;
          right: -16px;
          top: 24px;
          background: #FAF4EB;
          color: #2E0A0D;
          border-radius: 50%;
          width: 90px;
          height: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
          transform: rotate(8deg);
          border: 1px solid rgba(212, 184, 150, 0.35);
          z-index: 3;
        }
        .hero-ref-count b {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 700;
          line-height: 1;
          color: #2E0A0D;
        }
        .hero-ref-count span {
          font-family: var(--font-mono);
          font-size: 7.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #795B38;
          line-height: 1.25;
          margin-top: 2px;
        }
        .hero-ref-photo-note {
          position: absolute;
          bottom: 18px;
          left: -20px;
          background: #FFFDF9;
          color: #2E0A0D;
          padding: 12px 18px;
          border-radius: 14px;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(212, 184, 150, 0.28);
          z-index: 3;
          max-width: 290px;
        }
        .hero-ref-photo-note .note-icon {
          width: 34px;
          height: 34px;
          min-width: 34px;
          border-radius: 50%;
          background: #F1E5D5;
          color: #351C24;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-ref-photo-note strong {
          display: block;
          font-family: var(--font-display);
          font-size: 14.5px;
          font-weight: 600;
          color: #2E0A0D;
          line-height: 1.2;
        }
        .hero-ref-photo-note small {
          display: block;
          font-family: var(--font-body);
          font-size: 10px;
          color: #746965;
          margin-top: 3px;
          line-height: 1.35;
        }

        @media (max-width: 900px) {
          .pkg-hero-visual {
            max-width: 400px;
            margin: 0 auto;
          }
          .hero-ref-photo-wrap {
            height: 300px;
            border-radius: 140px 140px 16px 16px;
          }
          .hero-ref-photo-note {
            left: 0;
            bottom: -10px;
          }
          .hero-ref-count {
            right: 0;
            top: 10px;
          }
        }
        @media (max-width: 480px) {
          .pkg-hero-visual {
            max-width: 100%;
          }
          .hero-ref-photo-note {
            position: static;
            margin-top: 12px;
            max-width: 100%;
          }
          .hero-ref-count {
            width: 76px;
            height: 76px;
          }
          .hero-ref-count b {
            font-size: 22px;
          }
        }

        /* Comparison responsive */
        .compare-wrap { display: block; overflow-x: auto; }
        .compare-mobile { display: none; }
        @media (max-width: 600px) {
          .compare-wrap { display: none; }
          .compare-mobile { display: block; }
        }

        /* Comparison table: td needs flex for icon */
        .compare-wrap table td:first-child {
          display: table-cell;
        }
        .compare-wrap table td:first-child > * {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation: none !important;
            transition: none !important;
          }
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* Always Included grid: 1 fir 2x2 */
        .always-included-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        .always-included-grid > *:first-child {
          grid-column: 1 / -1;
        }

        /* Vertical Reel Feature Card */
        .always-included-card.is-vertical {
          background: linear-gradient(135deg, #FFFDF9 0%, #FAF3E8 100%) !important;
          border-left: 5px solid #5E181C !important;
          position: relative;
          overflow: hidden;
        }
        .vertical-reel-feature-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          width: 100%;
        }
        .vertical-reel-left {
          flex: 1;
          min-width: 0;
        }
        .vertical-reel-tag-row {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .vertical-pill-tag {
          font-family: var(--font-mono);
          font-size: 8.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 100px;
          background: rgba(94, 24, 28, 0.08);
          color: #5E181C;
        }
        .vertical-pill-tag.gold {
          background: rgba(150, 106, 58, 0.12);
          color: #795B38;
        }
        .vertical-reel-title {
          font-family: var(--font-display), Georgia, serif;
          font-size: clamp(17px, 2vw, 21px);
          font-weight: 600;
          color: #2E0A0D;
          line-height: 1.25;
          letter-spacing: -0.015em;
          margin: 0 0 8px;
        }
        .vertical-reel-detail {
          font-family: var(--font-body);
          font-size: clamp(12.5px, 1.1vw, 13.5px);
          color: rgba(46, 10, 13, 0.72);
          line-height: 1.55;
          margin: 0 0 12px;
        }
        .vertical-reel-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .v-pill {
          font-family: var(--font-mono);
          font-size: 8px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #795B38;
          background: rgba(212, 184, 150, 0.22);
          padding: 3px 9px;
          border-radius: 4px;
          font-weight: 600;
        }

        /* 9:16 Vertical Phone Mockup */
        .vertical-phone-mockup-wrap {
          flex-shrink: 0;
        }
        .vertical-phone-frame {
          width: 86px;
          height: 152px;
          background: #1A0507;
          border-radius: 18px;
          padding: 4px;
          box-shadow: 0 12px 28px rgba(58, 11, 14, 0.22), 0 0 0 1px rgba(212, 184, 150, 0.4);
          position: relative;
        }
        .phone-screen-inner {
          width: 100%;
          height: 100%;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          background: #000;
        }
        .phone-screen-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(0.9);
        }
        .phone-screen-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 6px 5px;
          background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.65) 100%);
        }
        .mock-ratio-pill {
          align-self: flex-start;
          font-family: var(--font-mono);
          font-size: 6.5px;
          letter-spacing: 0.1em;
          font-weight: 700;
          color: #FFF;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          padding: 2px 5px;
          border-radius: 4px;
          border: 0.5px solid rgba(255, 255, 255, 0.3);
        }
        .mock-play-btn {
          align-self: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 2px;
        }
        .mock-waveform-wrap {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .mock-audio-icon {
          font-size: 8px;
          color: #FFF;
        }
        .mock-bars {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 8px;
        }
        .mock-bars span {
          width: 2px;
          background: #FFF;
          border-radius: 1px;
        }
        .mock-bars .b1 { height: 4px; }
        .mock-bars .b2 { height: 8px; }
        .mock-bars .b3 { height: 6px; }
        .mock-bars .b4 { height: 7px; }

        @media (max-width: 600px) {
          .always-included-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .always-included-grid > *:first-child {
            grid-column: 1 / -1 !important;
          }
          .always-included-card {
            padding: 14px 12px !important;
          }
          .always-included-card.is-vertical {
            padding: 14px 12px !important;
          }
          .vertical-phone-frame {
            width: 68px !important;
            height: 120px !important;
            border-radius: 14px !important;
            padding: 3px !important;
          }
          .phone-screen-inner {
            border-radius: 11px !important;
          }
          .mock-play-btn {
            width: 22px !important;
            height: 22px !important;
          }
          .vertical-reel-highlights {
            display: none !important;
          }
          .vertical-reel-title {
            font-size: 14px !important;
            margin-bottom: 4px !important;
          }
          .vertical-reel-detail {
            font-size: 11px !important;
            line-height: 1.4 !important;
            margin-bottom: 0 !important;
          }
          .inc-card-head {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
          .inc-card-tag {
            margin-left: 0 !important;
            font-size: 7.5px !important;
            margin-top: 0 !important;
          }
          .always-included-card h3 {
            font-size: 13.5px !important;
            line-height: 1.25 !important;
          }
          .always-included-card p {
            font-size: 11px !important;
            margin-left: 0 !important;
            margin-top: 4px !important;
            line-height: 1.4 !important;
          }
        }

        /* What We Create grid: responsive 1 fir 2x2 1 2x2 */
        .create-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .create-categories-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .create-categories-grid > *:nth-child(1),
          .create-categories-grid > *:nth-child(6) {
            grid-column: 1 / -1 !important; /* 1 full width */
          }
        }
        @media (max-width: 600px) {
          .create-categories-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .create-categories-grid > *:nth-child(1),
          .create-categories-grid > *:nth-child(6) {
            grid-column: 1 / -1 !important; /* 1 full width */
          }
          .create-category-card {
            padding: 14px 12px !important;
          }
          .create-category-card h3 {
            font-size: 14.5px !important;
          }
          .create-category-card .card-tag {
            font-size: 8.5px !important;
          }
          .create-category-card .card-desc {
            font-size: 11px !important;
            line-height: 1.4 !important;
          }
        }

        /* Duration Switcher responsive */
        .dur-switcher-wrap {
          display: inline-flex;
          gap: 8px;
          padding: 8px;
          background: rgba(26, 5, 7, 0.45);
          border: 1px solid rgba(212, 184, 150, 0.22);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          max-width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }
        .dur-tab-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px 28px;
          border-radius: 12px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
          min-width: 140px;
          text-align: center;
        }
        @media (max-width: 600px) {
          .dur-switcher-wrap {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            padding: 6px;
          }
          .dur-tab-btn {
            min-width: auto;
            padding: 10px 8px;
          }
        }
      `}</style>

      {/* Floating Capsule Navbar */}
      <Navbar />

      <main id="main-content">
        {/* ════════════════════════════════
            1. OUR PACKAGES (Starting Section)
            Background: MAROON (with seamless texture)
            Top: 2-column layout (Text on LEFT, Image frame on RIGHT)
            Bottom: Days Switcher + 3 Package Cards in BEIGE TONES
        ════════════════════════════════ */}
        <section
          id="pkg-cards"
          style={{
            padding: "clamp(100px, 12vw, 136px) clamp(16px, 4vw, 48px) clamp(72px, 8vw, 100px)",
            backgroundColor: "#3A0B0E",
            backgroundImage: "url('/seamless-texture.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "600px 600px",
            backgroundPosition: "0 0",
            position: "relative",
          }}
        >
          <div className="noise-overlay" />

          <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 2 }}>
            {/* Top 2-Column: Text LEFT + Visual Frame RIGHT */}
            <div ref={heroRef} className="pkg-hero-grid">
              {/* Left Column: Text & Actions */}
              <div data-anim>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 12,
                  fontFamily: "var(--font-mono)", fontSize: 10.5,
                  letterSpacing: "0.28em", textTransform: "uppercase",
                  color: "#DFC18A", marginBottom: 16, fontWeight: 600,
                }}>
                  <span style={{ width: 24, height: 1, background: "currentColor", display: "block" }} />
                  Wedding Collections · Shaadi Pitara
                </div>

                <h1 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(38px, 4.8vw, 64px)",
                  fontWeight: 500,
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  color: "#FAF5EE",
                  margin: "0 0 18px",
                }}>
                  Our <em>Packages</em>
                </h1>

                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(14px, 1.3vw, 15.5px)",
                  lineHeight: 1.8,
                  color: "rgba(250, 242, 232, 0.78)",
                  maxWidth: 520,
                  margin: "0 0 28px",
                  fontWeight: 300,
                }}>
                  The happy chaos, the quiet glances, the laughter on the dance floor — choose the coverage that feels right for your celebration. From intimate 2-day gatherings to grand multi-day celebrations.
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 28 }}>
                  <Link
                    href="/works"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "13px 32px",
                      borderRadius: 100,
                      background: "#F3E1C4",
                      color: "#2E0A0D",
                      fontFamily: "var(--font-mono)",
                      fontSize: 9.5,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      textDecoration: "none",
                      border: "1px solid #F3E1C4",
                      boxShadow: "0 6px 22px rgba(0,0,0,0.3)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#FEF5E6";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#F3E1C4";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    Watch Our Work
                    <Icon.ArrowRight />
                  </Link>

                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Shaadi Pitara! I'd love some help choosing the right wedding package.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 9,
                      padding: "13px 30px",
                      borderRadius: 100,
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.42)",
                      color: "#fffaf4",
                      fontFamily: "var(--font-mono)",
                      fontSize: 9.5,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.42)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    Chat with Us
                    <Icon.WhatsApp />
                  </a>
                </div>

                <div style={{ display: "flex", gap: 20, paddingTop: 18, borderTop: "1px solid rgba(212, 184, 150, 0.16)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(250, 242, 232, 0.75)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em" }}>
                    <Icon.Calendar /> 2–4 days of coverage
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(250, 242, 232, 0.75)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em" }}>
                    <Icon.Drone /> Drone available
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Couple Frame */}
              <div className="pkg-hero-visual" data-anim>
                <div className="hero-ref-photo-wrap">
                  <img
                    src="https://images.squarespace-cdn.com/content/v1/6013a32a9fd19e5662185fde/1703154535751-HN0PYYVSA6V97UYQJ7VU/TYD_RADHICA_SARTHAK-335.jpg"
                    alt="Shaadi Pitara wedding couple celebration"
                    onError={(e) => {
                      e.currentTarget.src = "/thumbnails/styled_together.jpg";
                    }}
                  />
                </div>

                {/* Floating 03 collections badge */}
                <div className="hero-ref-count">
                  <b>03</b>
                  <span>collections<br />to choose from</span>
                </div>

                {/* Floating photo note */}
                <div className="hero-ref-photo-note">
                  <span className="note-icon">
                    <Icon.Camera />
                  </span>
                  <div>
                    <strong>More than a highlight reel</strong>
                    <small>A story you can feel all over again.</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Duration Switcher (Immediately Below 2-column header) */}
            <div style={{ textAlign: "center", marginBottom: "clamp(36px, 4.5vw, 52px)" }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "rgba(212,184,150,0.6)",
                marginBottom: 14,
              }}>
                Select Duration of Festivities
              </div>

              <div ref={selectorRef} className="dur-switcher-wrap">
                {DURATION_OPTIONS.map((opt) => {
                  const isSelected = days === opt.days;
                  return (
                    <button
                      key={opt.days}
                      onClick={() => handleDurationChange(opt.days)}
                      aria-pressed={isSelected}
                      className="dur-tab-btn"
                      style={{
                        background: isSelected ? "#F3E1C4" : "rgba(246,229,203,0.04)",
                        borderColor: isSelected ? "#F3E1C4" : "rgba(212,184,150,0.18)",
                        boxShadow: isSelected ? "0 8px 24px rgba(0,0,0,0.35)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = "rgba(246,229,203,0.08)";
                          e.currentTarget.style.borderColor = "rgba(212,184,150,0.4)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.background = "rgba(246,229,203,0.04)";
                          e.currentTarget.style.borderColor = "rgba(212,184,150,0.18)";
                        }
                      }}
                    >
                      <span style={{
                        fontFamily: "var(--font-display), Georgia, serif",
                        fontSize: "clamp(16px, 1.8vw, 19px)",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                        color: isSelected ? "#2E0A0D" : "#FAF5EE",
                        lineHeight: 1.15,
                      }}>
                        {opt.label}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "clamp(8px, 0.9vw, 9px)",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: isSelected ? "rgba(46,10,13,0.7)" : "rgba(212,184,150,0.55)",
                        marginTop: 3,
                        lineHeight: 1.2,
                      }}>
                        {opt.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3 Package Cards in Rich BEIGE TONE */}
            <div ref={cardsRef} className="pkg-grid">
              {PACKAGES.map((pkg, i) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  days={days}
                  index={i}
                  animRef={(el) => { cardRefs.current[i] = el; }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            2. WHAT'S ALWAYS INCLUDED
            Background: BEIGE / IVORY (var(--brand-ivory))
        ════════════════════════════════ */}
        <AlwaysIncludedSection />

        {/* ════════════════════════════════
            3. WHAT WE CREATE
            Background: MAROON (with seamless texture)
            Cards: BEIGE TONES (All 8 categories)
        ════════════════════════════════ */}
        <WhatWeCreateSection />

        {/* ════════════════════════════════
            4. COMPARISON MATRIX
            Background: BEIGE / IVORY (var(--brand-ivory))
        ════════════════════════════════ */}
        <ComparisonSection />

        {/* ════════════════════════════════
            5. POLICIES SECTION (Before You Book)
            Background: MAROON (with seamless texture)
            Cards: BEIGE TONES (Accordions)
        ════════════════════════════════ */}
        <PoliciesSection />

        {/* ════════════════════════════════
            6. CLOSING CTA ("Ready to plan your day?")
            Background: BEIGE / IVORY (var(--brand-ivory))
            Button: "Our Story" -> /story
        ════════════════════════════════ */}
        <ClosingCtaSection />
      </main>

      {/* ════════════════════════════════
          7. FOOTER
          Background: MAROON (with seamless texture)
      ════════════════════════════════ */}
      <Footer />
    </>
  );
}
