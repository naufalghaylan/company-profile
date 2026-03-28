import Container from "@/components/layout/Container"
import { companyStory } from "@/data/about"
import { ds } from "@/lib/design-system"

function CompanyStorySection() {
  return (
    <section
      aria-labelledby="company-story-title"
      className={`${ds.section.base} relative overflow-hidden bg-linear-to-br from-background via-secondary/20 to-background`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,hsl(var(--primary)/0.16),transparent_45%),radial-gradient(circle_at_90%_85%,hsl(var(--primary)/0.1),transparent_40%)]"
      />
      <Container>
        <div className="company-story-layout relative flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
          <div className="company-story-content md:w-[65%]" data-aos="fade-up">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 md:text-sm">
              Company History
            </p>
            <h2
              id="company-story-title"
              className="text-3xl font-bold tracking-tight md:text-4xl"
            >
              {companyStory.title}
            </h2>

            <div className="mt-5 max-w-prose space-y-5">
              <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-500 ease-out md:text-lg">
                {companyStory.background}
              </p>
              <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-500 ease-out md:text-lg">
                {companyStory.foundingStory}
              </p>
              {companyStory.paragraphs.slice(0, 2).map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-muted-foreground transition-colors duration-500 ease-out md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold md:text-xl">Key Milestones</h3>
              <div className="grid gap-3 md:grid-cols-3">
                {companyStory.milestones.map((milestone, index) => (
                  <article
                    key={milestone.year}
                    className="rounded-xl border border-border/70 bg-card/90 p-4"
                    data-aos="zoom-in-up"
                    data-aos-delay={index * 80}
                  >
                    <p className="text-sm font-semibold text-primary">{milestone.year}</p>
                    <h4 className="mt-1 text-base font-semibold">{milestone.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <figure
            className="company-story-highlight group md:mt-8 md:w-[35%]"
            data-aos="fade-left"
            data-aos-delay="120"
          >
            <blockquote className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card/90 p-6 text-lg font-medium italic leading-relaxed shadow-lg shadow-primary/10 backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/20 md:text-2xl">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-7 -top-10 text-8xl leading-none text-primary/15 transition-transform duration-500 ease-out group-hover:translate-y-1"
              >
                "
              </span>
              <span className="relative">
                "Great products are built through clarity, discipline, and shared ownership."
              </span>
            </blockquote>
            <figcaption className="mt-4 text-sm font-medium text-muted-foreground">
              Our Operating Principle
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}

export default CompanyStorySection