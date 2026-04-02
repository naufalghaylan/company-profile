import { useBlogDetail } from "@/features/blog/hooks/useBlogDetail"
import { BlogDetail } from "@/features/blog/components/BlogDetail"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Pencil, Trash2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/features/auth/store/authStore"
import { deleteBlog } from "@/features/blog/services/blogService"
import { useState } from "react"

type BlogDetailSectionProps = {
	blogId: string
}

export function BlogDetailSection({ blogId }: BlogDetailSectionProps) {
	const navigate = useNavigate()
	const user = useAuthStore((state) => state.user)
	const { blog, isLoading, error } = useBlogDetail(blogId)
	const [isDeleting, setIsDeleting] = useState(false)
	const [actionError, setActionError] = useState<string | null>(null)

	const handleDelete = async () => {
		if (!blog || isDeleting) {
			return
		}

		const shouldDelete = window.confirm("Delete this blog permanently?")
		if (!shouldDelete) {
			return
		}

		setActionError(null)
		setIsDeleting(true)

		try {
			await deleteBlog(blog.id)
			navigate("/blog", { replace: true })
		} catch (deleteError) {
			if (deleteError instanceof Error) {
				setActionError(deleteError.message)
			} else {
				setActionError("Failed to delete blog. Please try again.")
			}
		} finally {
			setIsDeleting(false)
		}
	}

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
			{user && blog ? (
				<div className="flex flex-wrap items-center gap-3">
					<Button asChild variant="outline">
						<Link to={`/blog/${blog.id}/edit`} aria-label="Edit this blog">
							<Pencil className="h-4 w-4" />
							Edit Blog
						</Link>
					</Button>

					<Button
						variant="destructive"
						onClick={() => void handleDelete()}
						disabled={isDeleting}
						aria-label="Delete this blog"
					>
						<Trash2 className="h-4 w-4" />
						{isDeleting ? "Deleting..." : "Delete Blog"}
					</Button>
				</div>
			) : null}

			{actionError ? (
				<div className="rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
					{actionError}
				</div>
			) : null}
			<BlogDetail blog={blog} />
		</section>
	)
}
