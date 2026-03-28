import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"

type BlogHeaderProps = {
	totalBlogs: number
	isLoading: boolean
	onCreateClick: () => void
	createButtonLabel?: string
}

function BlogHeader({
	totalBlogs,
	isLoading,
	onCreateClick,
	createButtonLabel = "Create Blog",
}: BlogHeaderProps) {
	return (
		<section className="border-b border-primary/10 bg-linear-to-br from-secondary/40 via-background to-background py-14 md:py-18">
			<Container>
				<p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
					Insights & Updates
				</p>

				<h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
					Company Blog
				</h1>

				<p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
					Explore practical stories, engineering notes, and product insights from our team.
				</p>

				<p className="mt-6 text-sm text-muted-foreground">
					{isLoading ? "Loading posts..." : `${totalBlogs} post${totalBlogs === 1 ? "" : "s"} available`}
				</p>

				<div className="mt-6">
					<Button onClick={onCreateClick}>{createButtonLabel}</Button>
				</div>
			</Container>
		</section>
	)
}

export default BlogHeader

