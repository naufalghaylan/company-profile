import { useCallback, useEffect, useState } from "react"
import { getBlogs } from "@/features/blog/services/blogService"
import type { Blog, UseBlogsResult } from "@/features/blog/types/blog.types"

export function useBlogs(): UseBlogsResult {
	const [blogs, setBlogs] = useState<Blog[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchBlogs = useCallback(async () => {
		setIsLoading(true)
		setError(null)

		try {
			const data = await getBlogs()
			setBlogs(data)
		} catch (fetchError) {
			if (fetchError instanceof Error) {
				setError(fetchError.message)
			} else {
				setError("Failed to load blogs. Please try again.")
			}
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		void fetchBlogs()
	}, [fetchBlogs])

	const refetch = useCallback(async () => {
		await fetchBlogs()
	}, [fetchBlogs])

	return {
		blogs,
		isLoading,
		error,
		refetch,
	}
}

