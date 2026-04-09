import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const LandingPageHero = () => {
  return (
    <section
      id="home"
      style={{
        background: "#020408",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px 60px",
        fontFamily: "Syne ,Space Grotesk', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Syne:wght@700;800&display=swap');

        .hero-root { font-family: 'Space Grotesk', sans-serif; }

        .hero-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(80,120,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(80,120,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%);
          pointer-events: none;
        }

        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #5a8fff;
          box-shadow: 0 0 8px #5a8fff;
          animation: pulse 2s ease-in-out infinite;
        }

        .line-glow {
          display: block;
          background: linear-gradient(90deg, #5a8fff, #a78bff, #5a8fff);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .scanline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(100,140,255,0.5), transparent);
          animation: scan 6s ease-in-out infinite;
          pointer-events: none;
        }

        .orb-1 {
          position: absolute;
          width: 320px; height: 320px;
          top: -100px; left: -100px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(50,80,255,0.08) 0%, transparent 70%);
          animation: drift1 12s ease-in-out infinite;
          pointer-events: none;
        }

        .orb-2 {
          position: absolute;
          width: 280px; height: 280px;
          bottom: -60px; right: -60px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(100,60,255,0.07) 0%, transparent 70%);
          animation: drift2 15s ease-in-out infinite;
          pointer-events: none;
        }

        .orb-3 {
          position: absolute;
          width: 160px; height: 160px;
          top: 30%; right: 8%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(80,180,255,0.05) 0%, transparent 70%);
          animation: drift1 9s 2s ease-in-out infinite;
          pointer-events: none;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #3a5fff, #7a5fff);
          color: #fff;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 14px 28px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: opacity 0.2s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #8090c0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 14px 28px;
          border-radius: 10px;
          border: 1px solid rgba(80,120,255,0.22);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .btn-secondary:hover { border-color: rgba(80,120,255,0.5); color: #b0c0ff; transform: translateY(-1px); }

        .stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 10%;
          height: 80%; width: 1px;
          background: rgba(80,120,255,0.15);
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes drift1 {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(20px, 30px); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(-25px, -20px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Glow Center */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center top, rgba(60,80,255,0.13) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Scan line */}
      <div className="scanline" />

      {/* Orbs */}
      <div className="orb-1" />
      <div className="orb-2" />
      <div className="orb-3" />

      {/* Corner Brackets */}
      {[
        { top: 20, left: 20, borderWidth: "1px 0 0 1px" },
        { top: 20, right: 20, borderWidth: "1px 1px 0 0" },
        { bottom: 20, left: 20, borderWidth: "0 0 1px 1px" },
        { bottom: 20, right: 20, borderWidth: "0 1px 1px 0" },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 28,
            height: 28,
            borderColor: "rgba(80,120,255,0.25)",
            borderStyle: "solid",
            pointerEvents: "none",
            ...style,
          }}
        />
      ))}

      {/* Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          border: "1px solid rgba(80,120,255,0.3)",
          background: "rgba(80,120,255,0.07)",
          color: "#7ba4ff",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "6px 14px",
          borderRadius: 100,
          marginBottom: 36,
          animation: "fadeUp 0.8s ease both",
        }}
      >
        <div className="badge-dot" />
        Student Talent Intelligence Platform
      </div>

      {/* Headline */}
      <h1
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(40px, 7vw, 88px)",
          fontWeight: 800,
          lineHeight: 1.0,
          textAlign: "center",
          letterSpacing: "-0.02em",
          maxWidth: 900,
          margin: "0 auto 28px",
          animation: "fadeUp 0.9s 0.1s ease both",
        }}
      >
        <span style={{ color: "#d0d6e8", display: "block" }}>
          Track Student Growth.
        </span>
        <Typewriter
          words={["Showcase real talent", "Hire fresh graduates"]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={4000}
        />
        {/* <span className="line-glow">Showcase Real Talent.</span> */}
      </h1>

      {/* Subheading */}
      <p
        style={{
          color: "#6a7494",
          fontSize: "clamp(15px, 1.8vw, 18px)",
          lineHeight: 1.7,
          textAlign: "center",
          maxWidth: 560,
          margin: "0 auto 44px",
          fontWeight: 400,
          animation: "fadeUp 1s 0.2s ease both",
        }}
      >
        Our platform tracks student development, verifies practical skills, and
        showcases live projects — connecting emerging tech talents with real
        opportunities.
      </p>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 80,
          animation: "fadeUp 1s 0.3s ease both",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link to="/Dashboard">
          <button className="btn-primary">
            Explore Talent
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          maxWidth: 700,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(80,120,255,0.2), transparent)",
          marginBottom: 44,
          animation: "fadeUp 1s 0.4s ease both",
        }}
      />

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          width: "100%",
          maxWidth: 640,
          animation: "fadeUp 1s 0.5s ease both",
        }}
      >
        {[
          {
            num: <CountUp end={10000} duration={10} />,
            label: "Happy Clients",
          },
          { num: "98%", label: "Satisfaction Rate" },
          { num: "50+", label: "Countries Reached" },
        ].map((stat, i) => (
          <div
            key={i}
            className="stat-item"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              padding: "0 20px",
              position: "relative",
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, #c8d4ff, #8090e0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
              }}
            >
              {stat.num}
            </span>
            <span
              style={{
                color: "#404870",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandingPageHero;
