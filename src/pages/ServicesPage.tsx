import CTASection from "@/sections/home/CTASection"
import PricingSection from "@/sections/services/PricingSection"
import ServicesGrid from "@/sections/services/ServicesGrid"
import ServicesHero from "@/sections/services/ServicesHero"
import WhyChooseUs from "../sections/services/WhyChooseUs"
import TestimonialsSection from "@/sections/home/TestimonialsSection"

function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <WhyChooseUs />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}

export default ServicesPage