import { useCallback, useEffect, useState } from "react"
import { getBlogById } from "@/features/blog/services/blogService"
import type { Blog } from "@/features/blog/types/blog.types"

export type UseBlogDetailResult = {
	blog: Blog | null
	isLoading: boolean
	error: string | null
	refetch: () => Promise<void>
}

export function useBlogDetail(id: string): UseBlogDetailResult {
	const [blog, setBlog] = useState<Blog | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchBlog = useCallback(async () => {
		setIsLoading(true)
		setError(null)

		try {
			const data = await getBlogById(id)
			setBlog(data)
		} catch (fetchError) {
			if (fetchError instanceof Error) {
				setError(fetchError.message)
			} else {
				setError("Failed to load blog. Please try again.")
			}
		} finally {
			setIsLoading(false)
		}
	}, [id])

	useEffect(() => {
		void fetchBlog()
	}, [fetchBlog])

	return {
		blog,
		isLoading,
		error,
		refetch: fetchBlog,
	}
}
