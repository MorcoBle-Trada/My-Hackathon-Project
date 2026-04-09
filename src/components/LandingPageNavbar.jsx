import React, { useState } from "react";
import { Menu, X, BrainCircuit } from "lucide-react";
import { Link as ScrollLink, Element } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const LandingPageNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Syne:wght@700;800&display=swap');
        .nav-root { font-family: 'Space Grotesk', sans-serif; }
        .nav-link {
          position: relative;
          color: #6a7494;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, #5a8fff, #a78bff);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #c8d4ff; }
        .nav-link:hover::after { width: 100%; }
        .mobile-link {
          display: block;
          color: #6a7494;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-decoration: none;
          padding: 12px 0;
          border-bottom: 1px solid rgba(80,120,255,0.08);
          transition: color 0.2s;
        }
        .mobile-link:hover { color: #c8d4ff; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .mobile-nav-open { animation: slideIn 0.25s ease both; }
      `}</style>

      <nav
        className="nav-root fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between"
        style={{
          background: "rgba(2, 4, 8, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(80,120,255,0.08)",
        }}
      >
        {/* Logo */}
        <RouterLink to="/ " className="flex items-center gap-3 no-underline">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 40,
              height: 40,
              background:
                "linear-gradient(135deg, rgba(58,95,255,0.2), rgba(122,95,255,0.2))",
              border: "1px solid rgba(80,120,255,0.3)",
            }}
          >
            <BrainCircuit size={20} color="#7ba4ff" />
          </div>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg, #c8d4ff, #7ba4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            TackMyStack
          </span>
        </RouterLink>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-10 list-none m-0 p-0">
          <ScrollLink to="home" smooth={true} duration={500}>
            {" "}
            <li className="nav-link">Home</li>
          </ScrollLink>

          <ScrollLink to="about" smooth={true} duration={500}>
            {" "}
            <li className="nav-link">About</li>
          </ScrollLink>
          <ScrollLink to="services" smooth={true} duration={500}>
            {" "}
            <li className="nav-link">Services</li>
          </ScrollLink>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <RouterLink to="/dashboard">
            <button
              className="text-sm font-medium transition-all duration-200"
              style={{
                color: "#fff",
                background: "linear-gradient(135deg, #3a5fff, #7a5fff)",
                border: "none",
                borderRadius: 8,
                padding: "8px 18px",
                fontFamily: "'Space Grotesk', sans-serif",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Get Started
            </button>
          </RouterLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center rounded-lg transition-all"
          onClick={() => setIsOpen(true)}
          style={{
            width: 38,
            height: 38,
            background: "rgba(80,120,255,0.07)",
            border: "1px solid rgba(80,120,255,0.18)",
            color: "#7ba4ff",
            cursor: "pointer",
          }}
        >
          <Menu size={18} />
        </button>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(2,4,8,0.7)", backdropFilter: "blur(4px)" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-50 md:hidden transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          width: 280,
          background: "#080d18",
          borderLeft: "1px solid rgba(80,120,255,0.12)",
        }}
      >
        {/* Drawer Header */}
        <div
          className="flex justify-between items-center px-6 py-5"
          style={{ borderBottom: "1px solid rgba(80,120,255,0.08)" }}
        >
          <div className="flex items-center gap-2">
            <BrainCircuit size={18} color="#7ba4ff" />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                background: "linear-gradient(90deg, #c8d4ff, #7ba4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TalentOS
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "rgba(80,120,255,0.07)",
              border: "1px solid rgba(80,120,255,0.18)",
              borderRadius: 8,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6a7494",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Links */}
        <ul className="flex flex-col list-none m-0 px-6 pt-6 pb-4">
          {[
            { label: "Home", to: "/" },
            { label: "About Us", to: "/about-us" },
            { label: "Services", to: "/services" },
          ].map((item) => (
            <li key={item.label}>
              <RouterLink
                to={item.to}
                className="mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </RouterLink>
            </li>
          ))}
        </ul>

        <div
          className="flex flex-col gap-3 px-6 pt-4"
          style={{ borderTop: "1px solid rgba(80,120,255,0.08)" }}
        >
          <RouterLink to="/dashboard" onClick={() => setIsOpen(false)}>
            <button
              className="w-full py-3 rounded-lg text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, #3a5fff, #7a5fff)",
                border: "none",
                color: "#fff",
                fontFamily: "'Space Grotesk', sans-serif",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Get Started
            </button>
          </RouterLink>
        </div>
      </div>
    </>
  );
};

export default LandingPageNavbar;
