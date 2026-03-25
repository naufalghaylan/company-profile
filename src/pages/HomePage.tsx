import CompanyOverviewSection from "@/sections/home/CompanyOverviewSection"
import CTASection from "@/sections/home/CTASection"
import HeroSection from "@/sections/home/HeroSection"
import ServicesPreviewSection from "@/sections/home/ServicesPreviewSection"
import TestimonialsSection from "@/sections/home/TestimonialsSection"
// import CompanyOverviewSection from "@/sections/home/CompanyOverviewSection"
// import ServicesPreviewSection from "@/sections/home/ServicesPreviewSection"
// import TestimonialsSection from "@/sections/home/TestimonialsSection"
// import CTASection from "@/sections/home/CTASection"

function HomePage() {
  return (
    <>
      <HeroSection />
      <CompanyOverviewSection />
      <ServicesPreviewSection />
      <TestimonialsSection />
      <CTASection />
      {/* <CompanyOverviewSection />
      <ServicesPreviewSection />
      <TestimonialsSection />
      <CTASection /> */}
    </>
  )
}

export default HomePage