export type Blog = {
	id: string
	title: string
	summary: string
	content?: string
	authorName: string
	createdAt: string
	tags?: string[]
	thumbnail?: string
}

export type UseBlogsResult = {
	blogs: Blog[]
	isLoading: boolean
	error: string | null
	refetch: () => Promise<void>
}

export type CreateBlogInput = {
	title: string
	content: string
	tags?: string[]
}

