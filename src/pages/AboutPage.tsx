
import CTASection from "@/sections/home/CTASection"
import AboutHeroSection from "@/sections/about/AboutHeroSection"
import CompanyStorySection from "@/sections/about/CompanyStorySection"
import MissionValuesSection from "@/sections/about/MissionValuesSection"
import TeamPreviewSection from "@/sections/about/TeamPreviewSection"

function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <CompanyStorySection />
      <MissionValuesSection />
      <TeamPreviewSection />
      <CTASection />
    </>
  )
}

export default AboutPage