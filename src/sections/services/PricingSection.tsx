import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic",
    price: "$999",
    description: "Perfect for small projects and startups.",
    features: [
      "1–3 pages website",
      "Responsive design",
      "Basic SEO optimization"
    ],
    highlighted: false
  },
  {
    name: "Pro",
    price: "$2,499",
    description: "Best for growing businesses.",
    features: [
      "Up to 10 pages",
      "Advanced UI/UX design",
      "Performance optimization",
      "Analytics integration"
    ],
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for large-scale needs.",
    features: [
      "Unlimited pages",
      "Custom architecture",
      "Dedicated support",
      "Cloud & infrastructure setup"
    ],
    highlighted: false
  }
]

function PricingSection() {
  return (
    <section className="bg-linear-to-b from-muted/40 to-background py-20 md:py-28">
      <Container>

        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold md:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Flexible pricing options designed to fit your business needs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`
                relative flex flex-col rounded-xl border p-6
                transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                ${plan.highlighted
                  ? "scale-[1.02] border-primary bg-background shadow-lg md:scale-[1.05]"
                  : "border-border/50 bg-card"
                }
              `}
            data-aos="fade-up"
            data-aos-delay={index * 90}
            >

              {/* Badge */}
              {plan.highlighted && (
                <span className="absolute top-4 right-4 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  Most Popular
                </span>
              )}

              {/* Title */}
              <h3 className="text-lg font-semibold">
                {plan.name}
              </h3>

              {/* Price */}
              <p className="mt-2 text-3xl font-bold md:text-4xl">
                {plan.price}
              </p>

              {/* Description */}
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto pt-6">
                <Button
                  variant={plan.highlighted ? "default" : "secondary"}
                  className={`w-full transition-all duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 ${
                    plan.highlighted
                      ? "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35"
                      : "shadow-sm hover:shadow-lg"
                  }`}
                >
                  Get Started
                </Button>
              </div>

            </div>
          ))}
        </div>

      </Container>
    </section>
  )
}

export default PricingSection