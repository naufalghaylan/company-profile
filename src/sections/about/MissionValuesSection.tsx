import Container from "@/components/layout/Container"
import { Lightbulb, Rocket, Shield } from "lucide-react"
import { cultureStatement, mission, values } from "@/data/about"
import { ds } from "@/lib/design-system"

const iconMap = {
  Lightbulb,
  Rocket,
  Shield,
}

function MissionValuesSection() {
  return (
    <section
      aria-labelledby="mission-values-title"
      className={`${ds.section.base} relative overflow-hidden bg-linear-to-b from-background via-secondary/15 to-background`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,hsl(var(--primary)/0.16),transparent_42%),radial-gradient(circle_at_85%_78%,hsl(var(--primary)/0.12),transparent_40%)]"
      />
      <Container>
        <div className="relative space-y-12 md:space-y-16">
          <div className="max-w-2xl" data-aos="fade-up">
            <h2 id="mission-values-title" className="text-3xl md:text-4xl font-bold">
              Culture, Mission & Values
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              The standards that shape how we work and what we deliver
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {cultureStatement}
            </p>
          </div>

          <div className="flex justify-center" data-aos="zoom-in" data-aos-delay="100">
            <div className="max-w-3xl rounded-2xl border border-primary/20 bg-card/90 px-6 py-8 text-center shadow-lg shadow-primary/10 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/20 md:px-10 md:py-10">
              <p className="text-center text-xl font-semibold leading-relaxed md:text-3xl">
                {mission}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {values.map((value, index) => {
              const Icon = iconMap[value.icon]

              return (
                <article
                  key={value.title}
                  className={`${ds.card.featureShell} group relative overflow-hidden bg-card/95 p-6 space-y-4 shadow-sm shadow-primary/5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-primary/20 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/15`}
                  data-aos="fade-up"
                  data-aos-delay={index * 90}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className={`${ds.card.icon} rounded-xl transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default MissionValuesSection