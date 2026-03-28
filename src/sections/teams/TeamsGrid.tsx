import TeamCard from "@/sections/teams/TeamCard"
import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import type { Team } from "@/features/teams/types/team.types"

type TeamsGridProps = {
  teams: Team[]
}

function TeamsGrid({ teams }: TeamsGridProps) {
  const shouldReduceMotion = !!useReducedMotion()
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false)
  const isVisible = shouldReduceMotion || hasEnteredViewport

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: shouldReduceMotion ? 0 : 0.08,
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  }

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 26, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring" as const,
            stiffness: 190,
            damping: 20,
            mass: 0.75,
          },
        },
      }

  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate={isVisible ? "visible" : "hidden"}
      onViewportEnter={() => setHasEnteredViewport(true)}
      viewport={{ once: true, amount: 0.15 }}
    >
      {teams.map((team) => (
        <motion.div key={team.id} variants={itemVariants} className="h-full">
          <TeamCard team={team} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default TeamsGrid