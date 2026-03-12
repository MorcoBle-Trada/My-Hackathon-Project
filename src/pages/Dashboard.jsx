import React, { useState } from "react";
import { Settings, BookOpen, Users, BrainCircuit } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";

const videos = ["/first.mp4", "/second.mp4"];

const Dashboard = () => {
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden flex bg-black text-white">
      <video
        key={currentVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-10"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 z-20" />

      <Sidebar />


      <div className="flex-1 relative z-30">
        <nav className="w-full z-40 backdrop-blur-md bg-black/30 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between px-8 md:px-12 py-3">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-indigo-500/20 p-2 rounded-lg border border-indigo-500/30">
                <BrainCircuit className="w-6 h-6 text-indigo-400" />
              </div>
              <span className="text-xl md:text-2xl font-extrabold tracking-tight">
                TalentOS
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs md:text-sm font-medium opacity-70 tracking-wide uppercase">
                Company Talent Intelligence
              </p>
            </div>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center min-h-screen px-4">

          <h1 className="text-3xl md:text-4xl font-semibold text-center">
            Welcome to TalentOS
          </h1>

          <p className="opacity-80 mt-2 text-center">
            Your Hub for Tech Educational Management
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full max-w-4xl">

            <Link to="/admin">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 flex flex-col items-center hover:bg-white/20 transition duration-300">
                <Settings size={40} className="mb-4 text-blue-400" />
                <p className="font-medium">ADMIN CONTROLS</p>
              </div>
            </Link>

            <Link to="/student">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 flex flex-col items-center hover:bg-white/20 transition duration-300">
                <BookOpen size={40} className="mb-4 text-blue-400" />
                <p className="font-medium">STUDENT PORTAL</p>
              </div>
            </Link>

           <Link to="/public">
             <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 flex flex-col items-center hover:bg-white/20 transition duration-300">
              <Users size={40} className="mb-4 text-blue-400" />
              <p className="font-medium">COMMUNITY HUB</p>
            </div>
           </Link>

          </div>

          <Link to="">
            <button className="mt-10 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md transition">
              EXPLORE FURTHER
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;