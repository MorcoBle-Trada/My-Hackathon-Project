import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Menu, LayoutDashboard, Users, Globe } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`h-screen bg-gray-900/90 backdrop-blur-lg text-white flex flex-col justify-between transition-all duration-300 z-30 ${
        isOpen ? "w-64 px-6" : "w-20 items-center"
      }`}
    >
      {/* Top Section */}
      <div className="flex flex-col  mt-9 space-y-8">
        {/* Menu Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:text-blue-400 transition duration-300"
        >
          <Menu className="hover:cursor-pointer" size={26} />
        </button>

        <div className="mt-10 flex flex-col space-y-10">
          <Link
            to="/admin"
            className="flex items-center gap-4 hover:text-blue-400 transition duration-300"
          >
            <LayoutDashboard size={22} />
            {isOpen && <span>Admin Dashboard</span>}
          </Link>

          <Link
            to="/intern"
            className="flex items-center gap-4 hover:text-blue-400 transition duration-300"
          >
            <Users size={22} />
            {isOpen && <span>Student Dashboard</span>}
          </Link>

          <Link
            to="/public"
            className="flex items-center gap-4 hover:text-blue-400 transition duration-300"
          >
            <Globe size={22} />
            {isOpen && <span>Public Dashboard</span>}
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="mb-6 text-sm opacity-70">
        {isOpen && (
          <div className="border-t border-gray-700 pt-4 text-center">
            © {new Date().getFullYear()} TrackMyStack
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
