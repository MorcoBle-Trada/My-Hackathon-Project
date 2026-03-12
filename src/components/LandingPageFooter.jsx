import React, { useEffect, useState } from 'react';
import { ArrowUp } from "lucide-react";
import { Send, Mail, BrainCircuit } from 'lucide-react';
import { BsWhatsapp } from 'react-icons/bs';

const LandingPageFooter = () => {

  const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className="w-full bg-[#9da8e3] py-12 -mb-6 px-8 md:px-24 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto">
          <div className="h-10 w-10 flex items-center justify-center bg-blue-600/10 rounded-lg border border-blue-500/20 group hover:bg-blue-600 transition-colors duration-300">
            <BrainCircuit 
              size={22} 
              strokeWidth={2} 
              className="text-blue-600 group-hover:text-white transition-colors duration-300" 
            />
          </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end text-sm md:text-base">
          <div className="space-y-1">
            <p className="font-medium">Lithuania, Vilnius, EDUARDO ANDRĖ</p>
            <p className="font-medium">G. 14-5, LT-02232</p>
            <p className="mt-4 opacity-80">&copy; {new Date().getFullYear()}</p>
          </div>
           <button
              onClick={scrollToTop}
              className={`fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg transition-opacity duration-300 hover:bg-blue-700 ${
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <ArrowUp size={24} />
            </button>
        </div>
      </div>
    </footer>
  );
};

export default LandingPageFooter;