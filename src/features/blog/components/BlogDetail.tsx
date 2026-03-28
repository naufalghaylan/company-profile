import { CalendarDays, UserRound } from "lucide-react"
import type { Blog } from "@/features/blog/types/blog.types"
import { formatCreatedAt } from "@/utils/date"

type BlogDetailProps = {
	blog: Blog
}

export function BlogDetail({ blog }: BlogDetailProps) {
	const normalizedTags = (blog.tags ?? []).map((tag) => tag.trim()).filter(Boolean)

	return (
		<article className="space-y-8">
			{/* Header */}
			<div className="space-y-4">
				<h1 className="text-4xl font-bold leading-tight">{blog.title}</h1>

				{/* Meta Info */}
				<div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
					<div className="inline-flex items-center gap-2">
						<UserRound className="h-4 w-4" />
						<span>{blog.authorName}</span>
					</div>

					<div className="inline-flex items-center gap-2">
						<CalendarDays className="h-4 w-4" />
						<span>{formatCreatedAt(blog.createdAt)}</span>
					</div>
				</div>
			</div>

			{/* Thumbnail */}
			{blog.thumbnail && (
				<div className="overflow-hidden rounded-lg border border-border/60">
					<img
						src={blog.thumbnail}
						alt={blog.title}
						className="h-96 w-full object-cover"
					/>
				</div>
			)}

			{/* Tags */}
			{normalizedTags.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{normalizedTags.map((tag) => (
						<span
							key={`${blog.id}-${tag}`}
							className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
						>
							#{tag}
						</span>
					))}
				</div>
			)}

			{/* Content */}
			{blog.content && (
				<div className="prose prose-sm max-w-none break-words dark:prose-invert">
					{blog.content.split("\n").map((paragraph, index) => (
						paragraph.trim() && (
							<p key={index} className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
								{paragraph}
							</p>
						)
					))}
				</div>
			)}

			{!blog.content && (
				<div className="rounded-lg bg-muted/50 p-6 text-center text-muted-foreground">
					<p>No content available for this blog post.</p>
				</div>
			)}
		</article>
	)
}
