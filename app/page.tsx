import FAQ from "@/components/FAQ";
import GetApp from "@/components/GetApp";
import Guide from "@/components/Guide";
import Hero from "@/components/Hero";
import TourAndPacksGrid from "@/components/TourAndPacksGrid";
import Highlights from "@/components/Highlights";

export default function Home() {
  return (
    <>
      <Hero />
      <TourAndPacksGrid />
      <Highlights />
      <Guide />
      <FAQ />
      <GetApp />
    </>
  )
}
