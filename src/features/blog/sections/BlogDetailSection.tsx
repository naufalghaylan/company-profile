import { useBlogDetail } from "@/features/blog/hooks/useBlogDetail"
import { BlogDetail } from "@/features/blog/components/BlogDetail"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

type BlogDetailSectionProps = {
	blogId: string
}

export function BlogDetailSection({ blogId }: BlogDetailSectionProps) {
	const { blog, isLoading, error } = useBlogDetail(blogId)

	const backToBlogLink = (
		<Button asChild variant="ghost" className="w-fit">
			<Link to="/blog" aria-label="Back to blog list">
				<ArrowLeft className="h-4 w-4" />
				Back to Blog
			</Link>
		</Button>
	)

	if (isLoading) {
		return (
			<section className="space-y-8 py-12">
				{backToBlogLink}
				<div className="space-y-4 animate-pulse">
					<div className="h-12 w-3/4 rounded-lg bg-muted" />
					<div className="h-6 w-full rounded-lg bg-muted" />
					<div className="h-6 w-2/3 rounded-lg bg-muted" />
				</div>
				<div className="h-96 w-full rounded-lg bg-muted" />
				<div className="space-y-3">
					<div className="h-6 w-full rounded-lg bg-muted" />
					<div className="h-6 w-full rounded-lg bg-muted" />
					<div className="h-6 w-3/4 rounded-lg bg-muted" />
				</div>
			</section>
		)
	}

	if (error || !blog) {
		return (
			<section className="space-y-8 py-12">
				{backToBlogLink}
				<div className="rounded-lg border border-destructive/20 bg-destructive/10 p-8 text-center">
					<p className="text-lg font-semibold text-destructive">
						{error || "Blog not found"}
					</p>
					<p className="mt-2 text-sm text-muted-foreground">
						The blog post you're looking for doesn't exist or has been deleted.
					</p>
				</div>
			</section>
		)
	}

	return (
		<section className="space-y-8 py-12">
			{backToBlogLink}
			<BlogDetail blog={blog} />
		</section>
	)
}
