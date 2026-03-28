import { useCallback, useEffect, useState } from "react"
import { getTeams } from "@/features/teams/services/teamService"
import type { Team } from "@/features/teams/types/team.types"

type UseTeamsResult = {
  teams: Team[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useTeams(initialCount = 8): UseTeamsResult {
  const [teams, setTeams] = useState<Team[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTeams = useCallback(async (options?: { force?: boolean }) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await getTeams(initialCount, options)
      setTeams(data)
    } catch (fetchError) {
      console.error("Failed to fetch teams:", fetchError)
      if (fetchError instanceof Error) {
        setError(fetchError.message)
      } else {
        setError("Failed to load teams. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }, [initialCount])

  useEffect(() => {
    void fetchTeams()
  }, [fetchTeams])

  const refetch = useCallback(async () => {
    await fetchTeams({ force: true })
  }, [fetchTeams])

  return {
    teams,
    isLoading,
    error,
    refetch,
  }
}
