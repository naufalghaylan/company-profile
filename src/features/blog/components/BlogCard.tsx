import { Link } from "react-router-dom"
import { CalendarDays, UserRound } from "lucide-react"
import type { Blog } from "@/features/blog/types/blog.types"
import { formatCreatedAt } from "@/utils/date"

type BlogCardProps = {
	blog: Blog
}

function BlogCard({ blog }: BlogCardProps) {
	const normalizedTags = (blog.tags ?? []).map((tag) => tag.trim()).filter(Boolean)
	const visibleTags = normalizedTags.slice(0, 3)
	const remainingTagsCount = normalizedTags.length - visibleTags.length

	const cardContent = (
		<article className="flex h-full flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/15">
			{blog.thumbnail ? (
				<img
					src={blog.thumbnail}
					alt={`Thumbnail for ${blog.title || "Untitled"}`}
					loading="lazy"
					className="h-48 w-full object-cover"
				/>
			) : (
				<div className="h-48 w-full bg-linear-to-br from-primary/12 via-primary/5 to-secondary" />
			)}

			<div className="flex flex-1 flex-col p-5">
				<h2 className="line-clamp-2 text-xl font-semibold leading-snug">
					{blog.title || "Untitled"}
				</h2>

				<p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
					{blog.summary}
				</p>

				{visibleTags.length > 0 ? (
					<div className="mt-4 flex flex-wrap gap-2">
						{visibleTags.map((tag) => (
							<span
								key={`${blog.id}-${tag}`}
								className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-medium leading-none text-primary"
							>
								#{tag}
							</span>
						))}

						{remainingTagsCount > 0 ? (
							<span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium leading-none text-muted-foreground">
								+{remainingTagsCount}
							</span>
						) : null}
					</div>
				) : null}

				<div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
					<p className="inline-flex items-center gap-1.5">
						<UserRound className="h-3.5 w-3.5" />
						<span>{blog.authorName}</span>
					</p>

					<p className="inline-flex items-center gap-1.5">
						<CalendarDays className="h-3.5 w-3.5" />
						<span>{formatCreatedAt(blog.createdAt)}</span>
					</p>
				</div>

				<div className="mt-6">
					<span className="inline-flex items-center text-sm font-semibold text-primary">
						Read detail →
					</span>
				</div>
			</div>
		</article>
	)

	return (
		<Link
			to={`/blog/${blog.id}`}
			className="group block h-full transition-transform duration-300 active:scale-95"
		>
			{cardContent}
		</Link>
	)
}

export default BlogCard

