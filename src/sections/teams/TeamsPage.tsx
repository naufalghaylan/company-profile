import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "motion/react"
import TeamsGrid from "@/sections/teams/TeamsGrid"
import { useTeams } from "@/features/teams/hooks/useTeams"

type TeamSkeletonCardProps = {
  shouldReduceMotion: boolean
}

function TeamSkeletonCard({ shouldReduceMotion }: TeamSkeletonCardProps) {
  return (
    <div className="relative h-72 overflow-hidden rounded-xl border border-border/60 bg-linear-to-b from-muted/70 to-muted/30">
      {!shouldReduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary/20 to-transparent"
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 1.35, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        />
      ) : null}
    </div>
  )
}

function TeamsPageSection() {
  const { teams, isLoading, error, refetch } = useTeams(9)
  const shouldReduceMotion = !!useReducedMotion()

  return (
    <main className="bg-sky-50/40 py-16 md:py-24">
      <Container>
        <section className="mb-12 space-y-4 text-center md:mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Meet Our Team
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Built by People Who Ship Great Products
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Our cross-functional squad combines product thinking, design craft, and engineering excellence to deliver software that matters.
          </p>
        </section>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <TeamSkeletonCard key={index} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>
        ) : null}

        {!isLoading && error ? (
          <section className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
            <p className="mb-4 text-sm text-muted-foreground">{error}</p>
            <motion.div
              className="inline-flex"
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
              whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.6 }}
            >
              <Button onClick={() => void refetch()}>Try Again</Button>
            </motion.div>
          </section>
        ) : null}

        {!isLoading && !error ? <TeamsGrid teams={teams} /> : null}
      </Container>
    </main>
  )
}

export default TeamsPageSection