"use client";

import Link from "next/link";
import { useState } from "react";

function LogoC1() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <polygon
        points="20,3 35,11.5 35,28.5 20,37 5,28.5 5,11.5"
        stroke="#5C6BC0"
        strokeWidth="2"
        fill="#0F1117"
      />
      <polygon points="20,10 28,14.5 28,23.5 20,28 12,23.5 12,14.5" fill="#1A1A2E" />
      <circle cx="20" cy="19" r="4.5" fill="#5C6BC0" />
      <line x1="20" y1="14.5" x2="20" y2="10.5" stroke="#7F8FE0" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="23.9" y1="21.2" x2="27.2" y2="23.2" stroke="#7F8FE0" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="16.1" y1="21.2" x2="12.8" y2="23.2" stroke="#7F8FE0" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LogoC2() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <polygon points="20,3 35,11.5 35,28.5 20,37 5,28.5 5,11.5" fill="#5C6BC0" />
      <circle cx="20" cy="20" r="5" fill="#0F1117" />
      <line x1="20" y1="15" x2="20" y2="8" stroke="#ECECEC" strokeWidth="2" strokeLinecap="round" />
      <line x1="24.8" y1="22.5" x2="30.5" y2="25.8" stroke="#ECECEC" strokeWidth="2" strokeLinecap="round" />
      <line x1="15.2" y1="22.5" x2="9.5" y2="25.8" stroke="#ECECEC" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        background: "#0F1117",
        borderBottom: "0.5px solid #1E2030",
        position: "relative",
        zIndex: 50,
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Desktop logo */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-2.5 flex-shrink-0 hover:opacity-90 transition-opacity"
          aria-label="utilbox.lat — inicio"
        >
          <LogoC1 />
          <span
            style={{
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "-0.3px",
              color: "#ECECEC",
            }}
          >
            utilbox
            <span style={{ color: "#5C6BC0" }}>.lat</span>
          </span>
        </Link>

        {/* Mobile logo */}
        <Link
          href="/"
          className="flex sm:hidden items-center gap-2 flex-shrink-0 hover:opacity-90 transition-opacity"
          aria-label="utilbox.lat — inicio"
        >
          <LogoC2 />
          <span
            style={{
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "-0.3px",
              color: "#ECECEC",
            }}
          >
            utilbox
            <span style={{ color: "#5C6BC0" }}>.lat</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-7">
          {[
            { href: "/", label: "Herramientas" },
            { href: "/finanzas", label: "Categorías" },
            { href: "/#acerca", label: "Acerca de" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ fontSize: "13px", color: "#999" }}
              className="hover:!text-[#CCCCCC] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="flex sm:hidden flex-col justify-center gap-[5px] w-9 h-9 items-center"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            style={{
              display: "block",
              width: "18px",
              height: "1.5px",
              background: "#999",
              transition: "all 0.2s ease",
              transform: open ? "rotate(45deg) translate(0, 6.5px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "18px",
              height: "1.5px",
              background: "#999",
              transition: "all 0.2s ease",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "18px",
              height: "1.5px",
              background: "#999",
              transition: "all 0.2s ease",
              transform: open ? "rotate(-45deg) translate(0, -6.5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav
          style={{
            background: "#0A0B10",
            borderTop: "0.5px solid #1E2030",
          }}
        >
          {[
            { href: "/", label: "Herramientas" },
            { href: "/finanzas", label: "Categorías" },
            { href: "/#acerca", label: "Acerca de" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 hover:bg-[#141520] transition-colors"
              style={{ fontSize: "14px", color: "#888", borderBottom: "0.5px solid #1E2030" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
