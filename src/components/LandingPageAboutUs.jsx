import React from "react";
import { CheckCircle2, Rocket, Users } from "lucide-react"; 

const LandingPageAboutUs = () => {
  return (
    <section className="relative bg-white py-20 lg:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
           <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                  alt="Students collaborating"
                  className="w-full h-auto hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-10 -left-6 md:left-10 z-20 bg-[#1f2b6c] text-white p-6 rounded-xl shadow-xl max-w-60">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Rocket className="text-blue-400" size={24} />
                  </div>
                  <span className="font-bold text-lg">Live Tracking</span>
                </div>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Real-time updates on student projects, from first line of code to final deployment.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-sm">
                About Our Platform
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f2b6c] leading-tight">
                More Than a Course, <br />
                <span className="text-blue-600">A Career Showcase.</span>
              </h2>
            </div>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                We realized that the tech industry doesn't just hire resumes; they hire **results**. That’s why we built this platform to bridge the gap between learning and employment.
              </p>
              
              <p className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600 italic">
                "Our mission is to provide a transparent window into the growth of our students, allowing mentors and recruiters to see their journey in real-time."
              </p>

              <ul className="space-y-4">
                {[
                  "Verified project history for every student",
                  "Cross-disciplinary talent: Web, Design, and Marketing",
                  "Real-world milestones and skill validation"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 mt-1 shrink-0" size={20} />
                    <span className="text-gray-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <a 
                href="/Dashboard" 
                className="inline-block bg-[#1f2b6c] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors"
              >
                See How It Works
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingPageAboutUs;