import About from "@/components/sections/About";
import FinalCTA from "@/components/sections/FinalCTA";
import Hero from "@/components/sections/Hero";
import Location from "@/components/sections/Location";
import Masters from "@/components/sections/Masters";
import Portfolio from "@/components/sections/Portfolio";
import Pricing from "@/components/sections/Pricing";
import Reviews from "@/components/sections/Reviews";
import Services from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Masters />
      <Pricing />
      <Reviews />
      <FinalCTA />
      <Location />
    </>
  );
}
