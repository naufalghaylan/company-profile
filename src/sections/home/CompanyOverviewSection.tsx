import Container from "@/components/layout/Container"
import FeatureCard from "@/features/shared/FeatureCard"
import { ds } from "@/lib/design-system"
import { Zap, Rocket, Shield } from "lucide-react"

const features = [
  {
    title: "Lightning Fast Integration",
    description: "Integrate our platform into your workflow in minutes.",
    icon: Zap
  },
  {
    title: "Scalable Infrastructure",
    description: "Handle millions of users without performance issues.",
    icon: Rocket
  },
  {
    title: "Enterprise Security",
    description: "Your data is protected with industry-grade security.",
    icon: Shield
  }
]

function CompanyOverviewSection() {
  return (
    <section className={ds.section.base}>
      <Container>

        {/* Header */}
        <div className={ds.section.header}>
          <h2 className={ds.section.title}>
            Powerful Tools for <span className="text-primary">Modern Teams</span>
          </h2>

          <p className={ds.section.description}>
            TechFlow helps companies build, deploy, and scale applications
            faster than ever.
          </p>
        </div>

        {/* Grid */}
        <div className={ds.section.gridStandard}>
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>

      </Container>
    </section>
  )
}

export default CompanyOverviewSection