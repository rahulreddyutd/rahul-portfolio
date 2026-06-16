"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,10,11,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid #242420" : "1px solid transparent",
      padding: "0 max(24px, calc((100% - 1040px)/2))",
      height: "56px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.3s",
    }}>
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "10px" }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", color: "#C9922A", fontWeight: 600, letterSpacing: "0.01em" }}>
          Rahul Reddy Puchakayala
        </span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", color: "#4A4742", letterSpacing: "0.04em" }}>
          AI Product Manager
        </span>
      </Link>
      <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
        {[
          { href: "/#projects", label: "Projects" },
          { href: "/#why", label: "About" },
          { href: "/#experience", label: "Experience" },
          { href: "/#contact", label: "Contact" },
        ].map(({ href, label }) => (
          <a key={label} href={href} style={{
            fontSize: "13px", color: "#9C9790",
            textDecoration: "none", letterSpacing: "0.02em",
            transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#F2EDE6")}
          onMouseLeave={e => (e.currentTarget.style.color = "#9C9790")}
          >{label}</a>
        ))}
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{
          padding: "6px 16px",
          background: "#C9922A", color: "#0A0A0B",
          borderRadius: "5px", fontSize: "12px", fontWeight: 600,
          textDecoration: "none", transition: "opacity 0.15s",
          letterSpacing: "0.02em",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >Resume ↓</a>
      </div>
    </nav>
  );
}
