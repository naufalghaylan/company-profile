import Container from "@/components/layout/Container"
import { Zap, ShieldCheck, Rocket, Users } from "lucide-react"

const reasons = [
  {
    icon: Rocket,
    title: "Fast & Scalable",
    description:
      "We build solutions designed to grow with your business, ensuring performance at every stage."
  },
  {
    icon: Users,
    title: "User-Centered Design",
    description:
      "Every product is crafted with real users in mind to deliver intuitive and engaging experiences."
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "We follow best practices to keep your systems safe, stable, and always available."
  },
  {
    icon: Zap,
    title: "Efficient Delivery",
    description:
      "Our streamlined process ensures faster development without compromising quality."
  }
]

function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28  relative w-full overflow-hidden border-t border-primary/10 bg-linear-to-br from-secondary/40 via-background to-background">
      <Container>
        
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold md:text-4xl">
            Why Choose <span className="text-primary">Us</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            We combine technology, design, and strategy to deliver solutions that truly make an impact.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = reason.icon

            return (
              <div
                key={index}
                className="group rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                data-aos="fade-up"
                data-aos-delay={index * 90}
              >
                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            )
          })}
        </div>

      </Container>
    </section>
  )
}

export default WhyChooseUs