import React, { useEffect } from "react";
import { CheckCircle2, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPageAboutUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Syne:wght@700;800&display=swap');

        .about-root { font-family: 'Space Grotesk', sans-serif; }

        .about-img-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(80,120,255,0.15);
          transition: border-color 0.3s;
        }
        .about-img-wrap:hover { border-color: rgba(80,120,255,0.35); }
        .about-img-wrap img {
          width: 100%; height: auto; display: block;
          filter: brightness(0.75) saturate(0.8);
          transition: transform 0.7s ease, filter 0.4s ease;
        }
        .about-img-wrap:hover img {
          transform: scale(1.04);
          filter: brightness(0.85) saturate(0.9);
        }
        .about-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(2,4,8,0.7) 20%, transparent 70%);
          pointer-events: none;
        }

        .float-card {
          position: absolute;
          bottom: -36px; left: -20px;
          z-index: 20;
          background: rgba(8,13,24,0.92);
          border: 1px solid rgba(80,120,255,0.2);
          border-radius: 14px;
          padding: 18px 20px;
          max-width: 220px;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          transition: border-color 0.3s;
        }
        .float-card:hover { border-color: rgba(80,120,255,0.4); }

        .float-card-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(58,95,255,0.12);
          border: 1px solid rgba(80,120,255,0.2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
        }

        .quote-block {
          position: relative;
          padding: 20px 22px;
          border-radius: 12px;
          background: rgba(80,120,255,0.04);
          border: 1px solid rgba(80,120,255,0.1);
          border-left: 2px solid rgba(90,143,255,0.5);
        }
        .quote-mark {
          font-family: 'Syne', sans-serif;
          font-size: 48px;
          line-height: 1;
          color: rgba(90,143,255,0.2);
          position: absolute;
          top: 8px; left: 16px;
        }

        .check-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid rgba(80,120,255,0.07);
          background: rgba(255,255,255,0.01);
          transition: border-color 0.25s, background 0.25s;
        }
        .check-item:hover {
          border-color: rgba(80,120,255,0.2);
          background: rgba(80,120,255,0.03);
        }
        .check-icon {
          width: 20px; height: 20px;
          border-radius: 50%;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.25);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }

        .btn-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #3a5fff, #7a5fff);
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; font-weight: 500;
          padding: 14px 30px;
          border-radius: 10px;
          border: none; cursor: pointer;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: opacity 0.2s, transform 0.2s;
        }
        .btn-cta:hover { opacity: 0.88; transform: translateY(-2px); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent;
          color: #6a7494;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px; font-weight: 500;
          padding: 14px 24px;
          border-radius: 10px;
          border: 1px solid rgba(80,120,255,0.18);
          cursor: pointer; text-decoration: none;
          transition: color 0.2s, border-color 0.2s, transform 0.2s;
        }
        .btn-ghost:hover {
          color: #c8d4ff;
          border-color: rgba(80,120,255,0.4);
          transform: translateY(-2px);
        }

        .section-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #5a8fff;
          border: 1px solid rgba(80,120,255,0.25);
          background: rgba(80,120,255,0.06);
          padding: 5px 14px; border-radius: 100px;
        }
        .section-label-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #5a8fff;
          box-shadow: 0 0 6px #5a8fff;
        }

        .corner-bracket {
          position: absolute;
          width: 20px; height: 20px;
          border-color: rgba(80,120,255,0.2);
          border-style: solid;
          pointer-events: none;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        data-aos="zoom-in"
        data-aos-duration="1000"
        id="about"
        className="about-root w-full bg-[#020408] relative overflow-hidden py-28 lg:py-36"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(80,120,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(80,120,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 700,
            height: 500,
            background:
              "radial-gradient(ellipse, rgba(58,95,255,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-24">
            {/* ── LEFT: Image ── */}
            <div className="w-full lg:w-1/2">
              <div style={{ paddingBottom: "48px" }}>
                <div className="about-img-wrap relative">
                  {/* Corner brackets */}
                  <div
                    className="corner-bracket"
                    style={{
                      top: -8,
                      left: -8,
                      borderWidth: "1px 0 0 1px",
                      borderRadius: "4px 0 0 0",
                    }}
                  />
                  <div
                    className="corner-bracket"
                    style={{
                      top: -8,
                      right: -8,
                      borderWidth: "1px 1px 0 0",
                      borderRadius: "0 4px 0 0",
                    }}
                  />
                  <div
                    className="corner-bracket"
                    style={{
                      bottom: -8,
                      left: -8,
                      borderWidth: "0 0 1px 1px",
                      borderRadius: "0 0 0 4px",
                    }}
                  />
                  <div
                    className="corner-bracket"
                    style={{
                      bottom: -8,
                      right: -8,
                      borderWidth: "0 1px 1px 0",
                      borderRadius: "0 0 4px 0",
                    }}
                  />

                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                    alt="Students collaborating"
                  />
                  <div className="about-img-overlay" />
                </div>

                {/* Floating card */}
                <div className="float-card ml-14">
                  <div className="float-card-icon">
                    <Rocket size={18} color="#7ba4ff" />
                  </div>
                  <p
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 14,
                      color: "#c8d4ff",
                      marginBottom: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    Live Tracking
                  </p>
                  <p
                    style={{ fontSize: 12, color: "#4a5478", lineHeight: 1.6 }}
                  >
                    Real-time updates on student projects, from first line of
                    code to final deployment.
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Content ── */}
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              {/* Label */}
              <div>
                <div className="section-label">
                  <div className="section-label-dot" />
                  About Our Platform
                </div>
              </div>

              {/* Headline */}
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(32px, 4vw, 52px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                <span style={{ color: "#d0d6e8" }}>More Than a Course,</span>
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #5a8fff, #a78bff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  A Career Showcase.
                </span>
              </h2>

              {/* Body */}
              <p
                style={{
                  fontSize: 15,
                  color: "#4a5478",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                We realized the tech industry doesn't just hire resumes — they
                hire{" "}
                <span style={{ color: "#8090c0", fontWeight: 500 }}>
                  results
                </span>
                . That's why we built this platform to bridge the gap between
                learning and employment.
              </p>

              {/* Quote */}
              <div className="quote-block">
                <span className="quote-mark">"</span>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6a7494",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    paddingLeft: 8,
                    paddingTop: 20,
                    margin: 0,
                  }}
                >
                  Our mission is to provide a transparent window into the growth
                  of our students, allowing mentors and recruiters to see their
                  journey in real-time.
                </p>
              </div>

              {/* Checklist */}
              <div className="flex flex-col gap-3">
                {[
                  "Verified project history for every student",
                  "Cross-disciplinary talent: Web, Design, and Marketing",
                  "Real-world milestones and skill validation",
                ].map((item, i) => (
                  <div key={i} className="check-item">
                    <div className="check-icon">
                      <CheckCircle2 size={12} color="#22c55e" />
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        color: "#8090c0",
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/Dashboard" className="btn-cta">
                  See How It Works
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link to="/about" className="btn-ghost">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPageAboutUs;
