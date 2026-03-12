import React from 'react';
import { BrainCircuit } from 'lucide-react';

const LandingPageServicesUI = () => {
  const services = [
    {
      title: "Cybersecurity:",
      desc: "Students learn how to protect systems, networks, and data from cyber threats. The program introduces key areas such as ethical hacking, network security, and vulnerability detection, preparing students to secure digital platforms and infrastructures.",
      className: "md:col-span-7 bg-blue-900/40 text-white",
      bgImage: "https://images.unsplash.com/photo-1655036387197-566206c80980?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3liZXJyc2VjdXJpdHklMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      title: "Web Design:",
      desc: "Our web design service focuses on creating visually appealing and user-friendly interfaces for websites and web-based applications. We prioritize the user experience and ensure that the design elements align with your brand's identity and values.",
      className: "md:col-span-5 bg-purple-400/50 text-white",
      bgImage: "https://i.pinimg.com/736x/82/44/fc/8244fc5edbf467dfa508e86f127cbc58.jpg"
    },
    {
      title: "Data Science:",
      desc: "Students learn how to analyze and interpret data to uncover insights and support decision-making. The program covers key areas such as data analysis, visualization, and machine learning fundamentals.",
      className: "md:col-span-5 bg-white/60 text-slate-800",
      bgImage: "https://i.pinimg.com/736x/51/f2/33/51f233f4e9ceab328fda4882eb6457ad.jpg"
    },
    {
      title: "Frontend Development:",
      desc: "Students learn how to build modern and responsive websites using technologies like HTML, CSS, JavaScript, React, and Tailwind CSS. They work on real projects that demonstrate their creativity and technical skills.",
      className: "md:col-span-7 bg-green-50/60 text-slate-800",
      bgImage: "https://i.pinimg.com/736x/db/8e/f0/db8ef06167f8314b2ed79b95d5621eed.jpg"
    },
    {
      title: "Backend Development:",
      desc: "Our backend training focuses on building the server-side logic and databases that power applications. Students gain hands-on experience with technologies used to create secure and scalable systems.",
      className: "md:col-span-12 bg-sky-500/40 text-white",
      bgImage: "https://i.pinimg.com/1200x/c1/7a/92/c17a92cfcd8108005d42aa63d825bc16.jpg"
    },
    {
      title: "Digital Marketing:",
      desc: "Students learn how to grow businesses online through social media marketing, content creation, SEO, and online advertising strategies.",
      className: "md:col-span-7 bg-purple-500/50 text-white",
      bgImage: "https://i.pinimg.com/736x/fc/39/ca/fc39caff68f41da8351c1ab52be3bd27.jpg"
    },
    {
      title: "UI/UX Design:",
      desc: "We train students to design user-friendly and visually appealing digital products. They learn how to create wireframes, prototypes, and design systems that improve user experience.",
      className: "md:col-span-5 bg-white/70 text-slate-800",
      bgImage: "https://i.pinimg.com/736x/38/fb/b9/38fbb9189bc092ce7e32212cbb247518.jpg"
    }
  ];


  const offerings = [
    {
      title: "Empowering Students:",
      desc: "We provide students with the tools and opportunities to showcase their skills, connect with potential employers, and gain real-world experience, making the path from learning to career seamless.",
      position: "top-left"
    },
    {
      title: "Connecting Recruiters:",
      desc: "Our platform helps recruiters efficiently find talented students suited to their projects or roles, streamlining the hiring process and ensuring meaningful matches for both parties.",
      position: "top-right"
    },
    {
      title: "Innovative Problem Solving:",
      desc: "We aim to revolutionize the way skills meet opportunities by solving traditional hiring and learning challenges through intuitive technology, smart recommendations, and user-friendly interfaces.",
      position: "bottom-left"
    },
    {
      title: "Building a Smarter Tech Ecosystem:",
      desc: "By bridging the gap between education and employment, we contribute to a more connected, tech-driven ecosystem that benefits students, companies, and the broader tech community.",
      position: "bottom-right"
    }
  ];

  return (
    <div className="min-h-screen w-full -mt-6 pb-25 bg-[#cbdcf7] bg-linear-to-br from-[#d1dffb] via-[#e2e8f0] to-[#e9d5ff] py-8 px-4 font-sans relative overflow-hidden">
      <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-50" />
      <div className="absolute top-1/4 right-10 w-6 h-6 bg-purple-400 rounded-full opacity-40" />
      <div className="absolute bottom-1/4 left-5 w-8 h-8 bg-blue-300 rounded-full opacity-30" />

      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#1f2b6c] mt-3 mb-15">Services:</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden rounded-3xl p-8 shadow-sm backdrop-blur-md transition-transform hover:scale-[1.01] ${service.className} min-h-60 flex flex-col justify-center group`}
            >
              <div 
                className="absolute inset-0 opacity-40 z-300 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: `url(${service.bgImage})` }}
              />
              <div className="absolute inset-0 bg-black/80  z-5 transition-opacity group-hover:bg-black/60" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-white drop-shadow-md">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white font-medium drop-shadow-sm">
                  {service.desc}  
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-60 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white opacity-60 blur-3xl" />
      <div className="absolute top-20 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-40" />
      <div className="absolute top-10 right-10 w-8 h-8 bg-indigo-300 rounded-full opacity-50" />
      <div className="absolute bottom-10 left-10 w-6 h-6 bg-indigo-400 rounded-full opacity-40" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-12 md:pt-16 pb-20">
        <h2 className="text-3xl font-bold text-[#1e293b] mb-12 md:mb-4">We offer:</h2>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-16 md:gap-y-48 items-center">
          <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 z-0">
            <div className="absolute inset-0 border-2 border-dashed border-blue-400/30 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="relative w-full h-full bg-linear-to-br from-white/60 to-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white shadow-[0_0_50px_rgba(59,130,246,0.15)] overflow-hidden">
              <div className="absolute w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
              <BrainCircuit 
                size={180} 
                strokeWidth={1}
                className="relative z-10 text-blue-600/40 group-hover:text-blue-600/60 transition-colors duration-700" 
              />
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-white/40" />
            </div>
          </div>
          {offerings.map((item, idx) => (
            <div 
              key={idx} 
              className={`max-w-md ${idx % 2 === 1 ? 'md:text-left md:ml-auto' : 'md:text-left'}`}
            >
              <h3 className="text-[#3b82f6] font-bold text-xl mb-4">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600 font-medium">
                {item.desc}
              </p>
            </div>
          ))}
          <div className="md:hidden flex justify-center order-first mb-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative w-48 h-48 bg-linear-to-br from-blue-600 to-indigo-700 rounded-full p-1 shadow-2xl flex items-center justify-center border-4 border-white/30 backdrop-blur-sm">
                <BrainCircuit 
                  size={80} 
                  strokeWidth={1.5} 
                  className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse-slow" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LandingPageServicesUI;