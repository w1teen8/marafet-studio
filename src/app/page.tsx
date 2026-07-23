import About from "@/components/sections/About";
import Booking from "@/components/sections/Booking";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Hero from "@/components/sections/Hero";
import InstagramSection from "@/components/sections/Instagram";
import Location from "@/components/sections/Location";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import Reviews from "@/components/sections/Reviews";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Process />
      <Pricing />
      <Reviews />
      <InstagramSection />
      <FAQ />
      <Booking />
      <Location />
      <FinalCTA />
    </>
  );
}
