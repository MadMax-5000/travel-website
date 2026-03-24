import FAQ from "@/components/FAQ";
import GetApp from "@/components/GetApp";
import Guide from "@/components/Guide";
import Hero from "@/components/Hero";
import TourGrid from "@/components/TourGrid";
import Highlights from "@/components/Highlights";

export default function Home() {
  return (
    <>
      <Hero />
      <TourGrid />
      <Highlights />
      <Guide />
      <FAQ />
      <GetApp />
    </>
  )
}
