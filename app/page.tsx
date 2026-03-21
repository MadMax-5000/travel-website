import Camp from "@/components/Camp";
import Features from "@/components/Features";
import GetApp from "@/components/GetApp";
import Guide from "@/components/Guide";
import Hero from "@/components/Hero";
import TourGrid from "@/components/TourGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <TourGrid />
      <Camp />
      <Guide />
      <Features />
      <GetApp />
    </>
  )
}
