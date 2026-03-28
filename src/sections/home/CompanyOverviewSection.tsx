import Container from "@/components/layout/Container"
import FeatureCard from "@/features/shared/FeatureCard"
import { ds } from "@/lib/design-system"
import { Building2, Sparkles, Users } from "lucide-react"

const features = [
  {
    title: "Our Background",
    description:
      "Founded as a product engineering studio, we help companies turn complex business goals into practical digital products.",
    icon: Building2
  },
  {
    title: "Our Team",
    description:
      "Our cross-functional team combines product, design, and engineering expertise to ship reliable solutions faster.",
    icon: Users
  },
  {
    title: "Our Culture",
    description:
      "We value ownership, clear communication, and continuous learning so every project stays collaborative and outcome-focused.",
    icon: Sparkles
  }
]

function CompanyOverviewSection() {
  return (
    <section className={ds.section.base}>
      <Container>
        <div className={ds.section.header} data-aos="fade-up">
          <h2 className={ds.section.title}>
            A Quick Look at <span className="text-primary">Who We Are</span>
          </h2>

          <p className={ds.section.description}>
            TechFlow partners with growth-focused teams to design and deliver
            digital products that scale with confidence.
          </p>
        </div>

        <div
          className="mx-auto mb-10 max-w-4xl text-center text-sm leading-relaxed text-muted-foreground md:text-base"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Since day one, we have focused on blending strategy, execution, and
          long-term partnership. From discovery to launch, we work as an
          extension of your team and build with measurable business impact in
          mind.
        </div>

        <div className={ds.section.gridStandard}>
          {features.map((feature, index) => (
            <div key={feature.title} data-aos="fade-up" data-aos-delay={index * 90}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default CompanyOverviewSection