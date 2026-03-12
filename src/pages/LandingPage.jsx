import React from 'react'
import LandingPageNavbar from '../components/LandingPageNavbar';
import LandingPageHero from '../components/LandingPageHero';
import LandingPageAboutUs from '../components/LandingPageAboutUs';
import LandingPageServicesUI from '../components/LandingPageServicesUI';
import LandingPageFooter from '../components/LandingPageFooter';

const LandingPage = () => {
  return (
    <>
      <div className="w-full min-h-screen items-center justify-center p-6 bg-linear-to-br from-[#c9d2e8] via-[#bfc9e2] to-[#aeb8d8] relative overflow-hidden shadow-2xl">

        <div className="absolute w-96 h-96 bg-[#7c8ac9] rounded-full blur-3xl -top-25 left-[20%]" />
        <div className="absolute w-80 h-80 bg-[#7c8ac9] rounded-full blur-3xl -bottom-25 right-[2%]" />
        <div className="absolute w-4 h-4 bg-[#7c8ac9] rounded-full top-[30%] left-[60%]" />
        <div className="absolute w-3 h-3 bg-[#7c8ac9] rounded-full bottom-[20%] right-[30%]" />

        <LandingPageNavbar/>

        <LandingPageHero />
      </div>
        <LandingPageAboutUs/>
      <LandingPageServicesUI />
      <LandingPageFooter/>
    </>
  );
}

export default LandingPage;