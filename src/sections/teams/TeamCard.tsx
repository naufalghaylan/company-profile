import { Mail, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import type { Team } from "@/features/teams/types/team.types"
import { ds } from "@/lib/design-system"

type TeamCardProps = {
  team: Team
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("")
}

function TeamCard({ team }: TeamCardProps) {
  return (
    <motion.article
      className="h-full"
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.7 }}
    >
      <Card className={`${ds.card.featureShell} flex h-full flex-col border-primary/10 bg-linear-to-b from-card to-primary/5`}>
        <CardContent className="flex h-full flex-col gap-4 p-6">
          <div className="flex items-start gap-4">
            <Avatar size="lg" className="ring-2 ring-primary/20">
              <AvatarImage src={team.avatar} alt={`Avatar of ${team.name}`} />
              <AvatarFallback>{getInitials(team.name)}</AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-tight">{team.name}</h3>
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="size-3.5" />
                {team.role}
              </p>
            </div>
          </div>

          {team.email ? (
            <a
              href={`mailto:${team.email}`}
              className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="size-4" />
              {team.email}
            </a>
          ) : null}

          {team.bio ? <p className="text-sm leading-relaxed text-muted-foreground">{team.bio}</p> : null}
        </CardContent>
      </Card>
    </motion.article>
  )
}

export default TeamCard