import React, { useEffect, useState } from "react";
import { ArrowUp, BrainCircuit, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPageFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 200);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about-us" },
    { label: "Services", to: "/services" },
    { label: "Dashboard", to: "/dashboard" },
  ];

  const contactLinks = [
    {
      label: "hello@talentos.dev",
      href: "mailto:hello@talentos.dev",
      icon: <Mail size={13} />,
    },
    {
      label: "Chat on WhatsApp",
      href: "#",
      icon: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.882a.5.5 0 00.61.641l6.239-1.637A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.5-5.241-1.376l-.374-.215-3.875 1.017 1.034-3.768-.23-.389A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Syne:wght@700;800&display=swap');

        .footer-root { font-family: 'Space Grotesk', sans-serif; }

        .footer-link {
          font-size: 14px;
          color: #4a5478;
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
          transition: color 0.2s;
          padding: 3px 0;
        }
        .footer-link:hover { color: #8090c0; }

        .footer-contact-link {
          font-size: 13px;
          color: #4a5478;
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: color 0.2s;
          padding: 4px 0;
        }
        .footer-contact-link:hover { color: #7ba4ff; }

        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(80,120,255,0.15), transparent);
          margin: 40px 0;
        }

        .scroll-top-btn {
          position: fixed;
          bottom: 28px; right: 28px;
          width: 44px; height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3a5fff, #7a5fff);
          border: none;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(58,95,255,0.3);
          transition: opacity 0.3s, transform 0.2s;
          z-index: 999;
        }
        .scroll-top-btn:hover { transform: translateY(-2px); }

        .newsletter-input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(80,120,255,0.15);
          border-radius: 10px 0 0 10px;
          padding: 11px 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px;
          color: #8090c0;
          outline: none;
          transition: border-color 0.2s;
        }
        .newsletter-input::placeholder { color: #2e3655; }
        .newsletter-input:focus { border-color: rgba(80,120,255,0.35); }

        .newsletter-btn {
          background: linear-gradient(135deg, #3a5fff, #7a5fff);
          border: none;
          border-radius: 0 10px 10px 0;
          padding: 11px 18px;
          color: #fff;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13px; font-weight: 500;
          transition: opacity 0.2s;
        }
        .newsletter-btn:hover { opacity: 0.85; }

        .footer-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #5a8fff;
          border: 1px solid rgba(80,120,255,0.2);
          background: rgba(80,120,255,0.05);
          padding: 3px 10px; border-radius: 100px;
          margin-bottom: 16px;
        }
        .footer-badge-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #5a8fff; box-shadow: 0 0 5px #5a8fff;
        }

        .social-btn {
          width: 36px; height: 36px;
          border-radius: 9px;
          background: rgba(80,120,255,0.06);
          border: 1px solid rgba(80,120,255,0.14);
          display: flex; align-items: center; justify-content: center;
          color: #4a5478;
          cursor: pointer; text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .social-btn:hover {
          background: rgba(80,120,255,0.12);
          border-color: rgba(80,120,255,0.35);
          color: #7ba4ff;
        }
      `}</style>

      <footer className="footer-root w-full bg-[#020408] relative overflow-hidden pt-20 pb-10 px-6 md:px-10">
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(80,120,255,0.025) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(80,120,255,0.025) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 600,
            height: 200,
            background:
              "radial-gradient(ellipse at top, rgba(58,95,255,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* ── TOP ROW ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand col */}
            <div className="md:col-span-4 flex flex-col gap-5">
              <div>
                <div className="footer-badge">
                  <div className="footer-badge-dot" />
                  Student Intelligence Platform
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="flex items-center justify-center rounded-xl"
                    style={{
                      width: 38,
                      height: 38,
                      background:
                        "linear-gradient(135deg, rgba(58,95,255,0.18), rgba(122,95,255,0.18))",
                      border: "1px solid rgba(80,120,255,0.25)",
                    }}
                  >
                    <BrainCircuit size={18} color="#7ba4ff" />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 20,
                      letterSpacing: "-0.02em",
                      background: "linear-gradient(90deg, #c8d4ff, #7ba4ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    TalentOS
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#3a4060",
                    lineHeight: 1.75,
                    maxWidth: 280,
                  }}
                >
                  Bridging the gap between education and employment — tracking
                  growth, verifying skills, and showcasing real talent.
                </p>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {/* Twitter/X */}
                <a href="#" className="social-btn">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="social-btn">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                {/* GitHub */}
                <a href="#" className="social-btn">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Nav links */}
            <div className="md:col-span-2 md:col-start-6 flex flex-col gap-3">
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#2e3655",
                  marginBottom: 4,
                }}
              >
                Navigation
              </p>
              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#2e3655",
                  marginBottom: 4,
                }}
              >
                Contact
              </p>
              {contactLinks.map((c) => (
                <a key={c.label} href={c.href} className="footer-contact-link">
                  {c.icon}
                  {c.label}
                </a>
              ))}
              <p
                style={{
                  fontSize: 12,
                  color: "#2e3655",
                  marginTop: 6,
                  lineHeight: 1.6,
                }}
              >
                Lithuania, Vilnius
                <br />
                EDUARDO ANDRĖ G. 14-5
                <br />
                LT-02232
              </p>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-3 md:col-start-10 flex flex-col gap-4">
              <p
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#2e3655",
                  marginBottom: 4,
                }}
              >
                Stay Updated
              </p>
              <p style={{ fontSize: 13, color: "#3a4060", lineHeight: 1.7 }}>
                Get notified about new talent, platform updates, and
                opportunities.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">
                  <Send size={13} />
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider" />

          {/* ── BOTTOM ROW ── */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p style={{ fontSize: 12, color: "#2e3655" }}>
              © {new Date().getFullYear()} TalentOS. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <a
                    key={item}
                    href="#"
                    className="footer-link"
                    style={{ fontSize: 12 }}
                  >
                    {item}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          className="scroll-top-btn"
          style={{
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none",
          }}
        >
          <ArrowUp size={18} />
        </button>
      </footer>
    </>
  );
};

export default LandingPageFooter;
