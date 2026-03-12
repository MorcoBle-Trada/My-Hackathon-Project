import React from 'react'
import { Link } from 'react-router-dom';

const LandingPageHero = () => {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="max-w-6xl mx-auto mb-8 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-tight">
          
          <span className="block lg:inline text-[#320bbd]">
            Track Student Growth.
          </span>{" "}
          
          <span className="block lg:inline text-white">
            Showcase Real Talent.
          </span>
          
        </h1>
      </div>
      <p className="max-w-2xl mx-auto text-gray-900 text-lg md:text-xl leading-relaxed mb-12">
        Our platform tracks student development, verifies practical skills, and showcases live projects — connecting emerging tech talents with real opportunities.
      </p>
      <div className="sm:flex-row items-center justify-center gap-4 mb-24 w-full">        
        <Link to='/Dashboard'>
          <button className="w-full sm:w-auto border border-slate-700 hover:bg-slate-800 text-white font-semibold py-4 px-8 rounded-lg transition-all">
            Explore Talent
          </button>
        </Link>
      </div>
      <div className="w-full max-w-5xl border-t border-slate-800/60 mb-12"></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 w-full max-w-4xl">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-[#1f2b6c] mb-1">10K+</span>
            <span className="text-slate-500 text-sm font-medium tracking-wide">Happy Clients</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-[#1f2b6c] mb-1">98%</span>
            <span className="text-slate-500 text-sm font-medium tracking-wide">Satisfaction Rate</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-[#1f2b6c] mb-1">50+</span>
            <span className="text-slate-500 text-sm font-medium tracking-wide">Countries Reached</span>
          </div>
      </div>
    </section>
    </>
  )
}

export default LandingPageHero;