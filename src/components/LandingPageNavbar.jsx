import React, { useState } from "react";
import { Menu, X, LogIn, UserPlus, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import { IoMdKey } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const LandingPageNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 px-6 md:px-12 py-6 flex items-center justify-between">
      <div className="h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md border border-gray-200">
        <BrainCircuit className="h-3/4 w-3/4 text-blue-600" />
      </div>
      <div className="hidden md:flex items-center gap-15">
        <ul className="flex gap-12 text-[#1f2b6c] font-medium">
          <li className="hover:text-blue-400 cursor-pointer transition">Home</li>
          <li className="hover:text-blue-400  cursor-pointer transition">About Us</li>
          <li className="hover:text-blue-400 cursor-pointer transition">Services</li>
        </ul>
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="text-[#1f2b6c]"
        >
          <Menu size={28} />
        </button>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="font-semibold text-[#1f2b6c]">Menu</h2>
          <X
            size={24}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <ul className="flex flex-col gap-6 px-8 py-8 text-[#1f2b6c] font-medium">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={() => setIsOpen(false)}>
              Services
            </Link>
          </li>
        </ul>
       </div>
    </nav>
  );
};

export default LandingPageNavbar;