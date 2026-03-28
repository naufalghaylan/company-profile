import BlogCard from "@/features/blog/components/BlogCard"
import type { Blog } from "@/features/blog/types/blog.types"

type BlogGridProps = {
	blogs: Blog[]
}

type BlogGridSkeletonProps = {
	count?: number
}

function BlogGrid({ blogs }: BlogGridProps) {
	return (
		<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{blogs.map((blog) => (
				<BlogCard key={blog.id} blog={blog} />
			))}
		</section>
	)
}

export function BlogGridSkeleton({ count = 6 }: BlogGridSkeletonProps) {
	return (
		<section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
			{Array.from({ length: count }, (_, index) => (
				<div
					key={index}
					className="h-95 animate-pulse overflow-hidden rounded-xl border border-border/60 bg-muted/50"
				>
					<div className="h-48 w-full bg-muted" />
					<div className="space-y-3 p-5">
						<div className="h-4 w-3/4 rounded bg-muted" />
						<div className="h-3 w-full rounded bg-muted" />
						<div className="h-3 w-5/6 rounded bg-muted" />
						<div className="h-3 w-2/3 rounded bg-muted" />
					</div>
				</div>
			))}
		</section>
	)
}

export default BlogGrid

