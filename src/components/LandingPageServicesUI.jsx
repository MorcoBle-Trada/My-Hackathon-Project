import React from "react";
import { BrainCircuit } from "lucide-react";

const services = [
  {
    title: "Cybersecurity",
    desc: "Students learn how to protect systems, networks, and data from cyber threats. The program introduces key areas such as ethical hacking, network security, and vulnerability detection, preparing students to secure digital platforms and infrastructures.",
    className: "md:col-span-7",
    bgImage:
      "https://images.unsplash.com/photo-1655036387197-566206c80980?w=500&auto=format&fit=crop&q=60",
  },
  {
    title: "Web Design",
    desc: "Our web design service focuses on creating visually appealing and user-friendly interfaces for websites and web-based applications. We prioritize user experience and ensure design elements align with your brand.",
    className: "md:col-span-5",
    bgImage:
      "https://i.pinimg.com/736x/82/44/fc/8244fc5edbf467dfa508e86f127cbc58.jpg",
  },
  {
    title: "Data Science",
    desc: "Students learn how to analyze and interpret data to uncover insights and support decision-making. The program covers data analysis, visualization, and machine learning fundamentals.",
    className: "md:col-span-5",
    bgImage:
      "https://i.pinimg.com/736x/51/f2/33/51f233f4e9ceab328fda4882eb6457ad.jpg",
  },
  {
    title: "Frontend Development",
    desc: "Students learn how to build modern and responsive websites using HTML, CSS, JavaScript, React, and Tailwind CSS. They work on real projects that demonstrate their creativity and technical skills.",
    className: "md:col-span-7",
    bgImage:
      "https://i.pinimg.com/736x/db/8e/f0/db8ef06167f8314b2ed79b95d5621eed.jpg",
  },
  {
    title: "Backend Development",
    desc: "Our backend training focuses on building the server-side logic and databases that power applications. Students gain hands-on experience with technologies used to create secure and scalable systems.",
    className: "md:col-span-12",
    bgImage:
      "https://i.pinimg.com/1200x/c1/7a/92/c17a92cfcd8108005d42aa63d825bc16.jpg",
  },
  {
    title: "Digital Marketing",
    desc: "Students learn how to grow businesses online through social media marketing, content creation, SEO, and online advertising strategies.",
    className: "md:col-span-7",
    bgImage:
      "https://i.pinimg.com/736x/fc/39/ca/fc39caff68f41da8351c1ab52be3bd27.jpg",
  },
  {
    title: "UI/UX Design",
    desc: "We train students to design user-friendly and visually appealing digital products. They learn how to create wireframes, prototypes, and design systems that improve user experience.",
    className: "md:col-span-5",
    bgImage:
      "https://i.pinimg.com/736x/38/fb/b9/38fbb9189bc092ce7e32212cbb247518.jpg",
  },
];

const offerings = [
  {
    title: "Empowering Students",
    desc: "We provide students with the tools and opportunities to showcase their skills, connect with potential employers, and gain real-world experience, making the path from learning to career seamless.",
    position: "top-left",
  },
  {
    title: "Connecting Recruiters",
    desc: "Our platform helps recruiters efficiently find talented students suited to their projects or roles, streamlining the hiring process and ensuring meaningful matches for both parties.",
    position: "top-right",
  },
  {
    title: "Innovative Problem Solving",
    desc: "We aim to revolutionize the way skills meet opportunities by solving traditional hiring and learning challenges through intuitive technology, smart recommendations, and user-friendly interfaces.",
    position: "bottom-left",
  },
  {
    title: "Building a Smarter Tech Ecosystem",
    desc: "By bridging the gap between education and employment, we contribute to a more connected, tech-driven ecosystem that benefits students, companies, and the broader tech community.",
    position: "bottom-right",
  },
];

const ServicesSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Syne:wght@700;800&display=swap');

        .services-root { font-family: 'Space Grotesk', sans-serif; }

        .service-card {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(80,120,255,0.1);
          min-height: 240px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          cursor: pointer;
          transition: border-color 0.3s, transform 0.3s;
        }
        .service-card:hover {
          border-color: rgba(80,120,255,0.35);
          transform: translateY(-3px);
        }
        .service-card-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: transform 0.6s ease;
          opacity: 0.25;
        }
        .service-card:hover .service-card-bg {
          transform: scale(1.07);
          opacity: 0.35;
        }
        .service-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(2,4,8,0.97) 40%, rgba(2,4,8,0.5) 100%);
          transition: opacity 0.3s;
        }
        .service-card:hover .service-card-overlay {
          background: linear-gradient(to top, rgba(2,4,8,0.95) 30%, rgba(10,20,60,0.6) 100%);
        }
        .service-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #5a8fff;
          margin-bottom: 10px;
        }
        .service-tag-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #5a8fff;
          box-shadow: 0 0 6px #5a8fff;
        }
        .service-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(18px, 2vw, 22px);
          font-weight: 800;
          color: #d0d6e8;
          margin-bottom: 8px;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .service-desc {
          font-size: 13px;
          line-height: 1.65;
          color: #4a5478;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.4s ease;
          opacity: 0;
        }
        .service-card:hover .service-desc {
          max-height: 120px;
          opacity: 1;
        }
        .service-arrow {
          width: 32px; height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(80,120,255,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #5a8fff;
          margin-top: 14px;
          transition: background 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .service-card:hover .service-arrow {
          background: rgba(80,120,255,0.12);
          border-color: rgba(80,120,255,0.4);
        }

        /* Offerings */
        .offering-item {
          padding: 28px;
          border-radius: 16px;
          border: 1px solid rgba(80,120,255,0.08);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
          max-width: 380px;
        }
        .offering-item:hover {
          border-color: rgba(80,120,255,0.25);
          background: rgba(80,120,255,0.04);
          transform: translateY(-2px);
        }
        .offering-num {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: rgba(90,143,255,0.4);
          margin-bottom: 12px;
        }
        .offering-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 800;
          color: #c8d4ff;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .offering-desc {
          font-size: 13px;
          line-height: 1.7;
          color: #4a5478;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow { animation: spin-slow 24s linear infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #5a8fff;
          border: 1px solid rgba(80,120,255,0.25);
          background: rgba(80,120,255,0.06);
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
        }
        .section-label-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #5a8fff;
          box-shadow: 0 0 6px #5a8fff;
        }
        .grid-line-v {
          position: absolute;
          left: 50%; top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(80,120,255,0.1) 30%, rgba(80,120,255,0.1) 70%, transparent);
        }
        .grid-line-h {
          position: absolute;
          top: 50%; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(80,120,255,0.1) 30%, rgba(80,120,255,0.1) 70%, transparent);
        }
      `}</style>

      <div
        id="services"
        className="services-root w-full bg-[#020408] relative overflow-hidden"
      >
        {/* Shared background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(80,120,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(80,120,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* ── SERVICES GRID ── */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-24 pb-20">
          {/* Section header */}
          <div className="flex flex-col items-center mb-14">
            <div className="section-label">
              <div className="section-label-dot" />
              What We Teach
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-center leading-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(90deg, #d0d6e8, #7ba4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {services.map((service, index) => (
              <div key={index} className={`service-card ${service.className}`}>
                {/* BG image */}
                <div
                  className="service-card-bg"
                  style={{ backgroundImage: `url(${service.bgImage})` }}
                />
                {/* Overlay */}
                <div className="service-card-overlay" />

                {/* Content */}
                <div className="relative z-10 p-7">
                  <div className="service-tag">
                    <div className="service-tag-dot" />
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                  <div className="service-arrow">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(80,120,255,0.15), transparent)",
            }}
          />
        </div>

        {/* ── OFFERINGS ── */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-20 pb-28">
          {/* Section header */}
          <div className="flex flex-col items-center mb-16">
            <div className="section-label">
              <div className="section-label-dot" />
              Our Mission
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-center"
              style={{
                fontFamily: "'Syne', sans-serif",
                background: "linear-gradient(90deg, #d0d6e8, #7ba4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              We Offer
            </h2>
          </div>

          {/* Center orb + 4 offerings */}
          <div className="relative">
            {/* Cross lines — desktop only */}
            <div className="hidden md:block">
              <div className="grid-line-v" />
              <div className="grid-line-h" />
            </div>

            {/* Center orb — desktop */}
            <div
              className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center"
              style={{ width: 180, height: 180 }}
            >
              {/* Spinning ring */}
              <div
                className="spin-slow absolute inset-0 rounded-full"
                style={{ border: "1px dashed rgba(80,120,255,0.2)" }}
              />
              {/* Inner glow disc */}
              <div
                className="absolute inset-4 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle, rgba(58,95,255,0.1) 0%, rgba(2,4,8,0.9) 70%)",
                  border: "1px solid rgba(80,120,255,0.2)",
                  boxShadow: "0 0 40px rgba(58,95,255,0.12)",
                }}
              >
                <BrainCircuit
                  size={56}
                  strokeWidth={1}
                  color="rgba(90,143,255,0.5)"
                />
              </div>
            </div>

            {/* 2×2 grid of offerings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-48 md:gap-y-16">
              {offerings.map((item, idx) => (
                <div
                  key={idx}
                  className={`offering-item ${idx % 2 === 1 ? "md:ml-auto" : ""}`}
                >
                  <div className="offering-num">0{idx + 1}</div>
                  <h3 className="offering-title">{item.title}</h3>
                  <p className="offering-desc">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Center orb — mobile */}
            <div className="md:hidden flex justify-center my-10">
              <div
                className="relative flex items-center justify-center"
                style={{ width: 120, height: 120 }}
              >
                <div
                  className="spin-slow absolute inset-0 rounded-full"
                  style={{ border: "1px dashed rgba(80,120,255,0.2)" }}
                />
                <div
                  className="absolute inset-3 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(58,95,255,0.12) 0%, rgba(2,4,8,0.9) 70%)",
                    border: "1px solid rgba(80,120,255,0.2)",
                  }}
                >
                  <BrainCircuit
                    size={36}
                    strokeWidth={1}
                    color="rgba(90,143,255,0.5)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse at center bottom, rgba(58,95,255,0.07) 0%, transparent 70%)",
          }}
        />
      </div>
    </>
  );
};

export default ServicesSection;
