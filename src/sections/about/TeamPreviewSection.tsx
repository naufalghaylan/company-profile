import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { teamPreview } from "@/data/about"
import { useTeams } from "@/features/teams/hooks/useTeams"
import { ds } from "@/lib/design-system"
import { Link } from "react-router-dom"

function TeamPreviewSection() {
  const { teams, isLoading, error, refetch } = useTeams(3)

  return (
    <section
      aria-labelledby="team-preview-title"
      className="border-y border-primary/10 bg-sky-50/40 py-24"
    >
      <Container>
        <div className={ds.section.header} data-aos="fade-up">
          <h2 id="team-preview-title" className={ds.section.title}>
            {teamPreview.title}
          </h2>
          <p className={ds.section.description}>{teamPreview.description}</p>
        </div>

        {isLoading ? (
          <div className={ds.section.gridStandard}>
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-xl border border-border/60 bg-linear-to-b from-muted/70 to-muted/30"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              />
            ))}
          </div>
        ) : null}

        {!isLoading && error ? (
          <section
            className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center"
            data-aos="fade-up"
          >
            <p className="mb-4 text-sm text-muted-foreground">{error}</p>
            <Button onClick={() => void refetch()}>Try Again</Button>
          </section>
        ) : null}

        {!isLoading && !error ? (
          <div className={ds.section.gridStandard}>
            {teams.map((member, index) => (
              <article
                key={member.id}
                className={`${ds.card.featureShell} bg-card p-6`}
                data-aos="fade-up"
                data-aos-delay={index * 90}
              >
                <div className="space-y-4">
                  <div
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary transition-transform duration-300 group-hover:scale-105"
                  >
                    {member.name.charAt(0)}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-semibold leading-tight">{member.name}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{member.role}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {member.bio || "Team member focused on delivering practical, high-impact digital work."}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        <div className={ds.section.cta} data-aos="fade-up" data-aos-delay="120">
          <Button
            asChild
            size="lg"
            className="px-6 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35"
          >
            <Link to={teamPreview.ctaHref}>{teamPreview.ctaLabel}</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default TeamPreviewSection