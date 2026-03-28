import axios, { AxiosError } from "axios"
import type { Team } from "@/features/teams/types/team.types"

type RandomUserLocation = {
	city?: string
	country?: string
}

type RandomUser = {
	login?: {
		uuid?: string
	}
	name?: {
		first?: string
		last?: string
	}
	picture?: {
		large?: string
	}
	email?: string
	location?: RandomUserLocation
}

type RandomUserResponse = {
	results: RandomUser[]
}

const randomUserClient = axios.create({
	baseURL: "https://randomuser.me/api",
	timeout: 10000,
})

const ROLE_POOL = [
	"Frontend Developer",
	"Backend Developer",
	"UI/UX Designer",
	"Product Manager",
] as const

type GetTeamsOptions = {
	force?: boolean
}

const teamsCache = new Map<number, Team[]>()
const inflightRequests = new Map<number, Promise<Team[]>>()

export async function getTeams(count = 8, options: GetTeamsOptions = {}): Promise<Team[]> {
	try {
		const safeCount = Number.isFinite(count) ? Math.max(1, Math.floor(count)) : 8
		const shouldForce = !!options.force

		if (!shouldForce) {
			const cachedTeams = teamsCache.get(safeCount)
			if (cachedTeams) {
				return cachedTeams
			}

			const inflight = inflightRequests.get(safeCount)
			if (inflight) {
				return inflight
			}
		}

		const requestPromise = randomUserClient
			.get<RandomUserResponse>("/", {
				params: {
					results: safeCount,
					inc: "login,name,picture,email,location",
					noinfo: "true",
				},
			})
			.then((response) => {
				const mappedTeams = response.data.results.map(mapUserToTeam)
				teamsCache.set(safeCount, mappedTeams)
				return mappedTeams
			})
			.finally(() => {
				inflightRequests.delete(safeCount)
			})

		if (!shouldForce) {
			inflightRequests.set(safeCount, requestPromise)
		}

		return requestPromise
	} catch (error) {
		if (error instanceof AxiosError) {
			const status = error.response?.status
			const detail = status
				? `randomuser API responded with status ${status}`
				: "network error while requesting randomuser API"

			throw new Error(`Failed to fetch teams: ${detail}`)
		}

		throw new Error("Failed to fetch teams: unexpected error")
	}
}

function mapUserToTeam(user: RandomUser): Team {
	const firstName = user.name?.first?.trim() || "Unknown"
	const lastName = user.name?.last?.trim() || "Member"
	const fullName = `${firstName} ${lastName}`.trim()
	const stableId = user.login?.uuid || `${fullName}-${user.email || "no-email"}`

	return {
		id: stableId,
		name: fullName,
		avatar: user.picture?.large || "https://randomuser.me/api/portraits/lego/1.jpg",
		role: getRandomRole(stableId),
		email: user.email,
		bio: generateBio(user.location),
	}
}

function getRandomRole(seed: string): string {
	const randomIndex = hashString(seed) % ROLE_POOL.length
	return ROLE_POOL[randomIndex]
}

function generateBio(location?: RandomUserLocation): string {
	const city = location?.city?.trim()
	const country = location?.country?.trim()

	if (city && country) {
		return `Based in ${city}, ${country}. Passionate about building scalable products.`
	}

	if (country) {
		return `Based in ${country}. Passionate about building scalable products.`
	}

	return "Remote team member. Passionate about building scalable products."
}

function hashString(value: string): number {
	let hash = 0

	for (let index = 0; index < value.length; index += 1) {
		hash = (hash * 31 + value.charCodeAt(index)) >>> 0
	}

	return hash
}

