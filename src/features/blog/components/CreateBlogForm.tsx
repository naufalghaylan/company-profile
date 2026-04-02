import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createBlog, getBlogById, updateBlog } from "@/features/blog/services/blogService"
import type { CreateBlogInput } from "@/features/blog/types/blog.types"

type CreateBlogFormMode = "create" | "edit"

type CreateBlogFormProps = {
  mode?: CreateBlogFormMode
  blogId?: string
}

type FormErrors = {
  title?: string
  content?: string
}

function parseTagInput(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function CreateBlogForm({ mode = "create", blogId }: CreateBlogFormProps) {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tagsInput, setTagsInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(mode === "edit")
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const isEditMode = mode === "edit"

  const validate = (values: { title: string; content: string }): FormErrors => {
    const nextErrors: FormErrors = {}

    if (!values.title.trim()) {
      nextErrors.title = "Title is required"
    }

    if (!values.content.trim()) {
      nextErrors.content = "Content is required"
    }

    return nextErrors
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError(null)

    const nextErrors = validate({ title, content })
    setFormErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    const payload: CreateBlogInput = {
      title: title.trim(),
      content: content.trim(),
      tags: parseTagInput(tagsInput),
    }

    try {
      setIsSubmitting(true)

      if (isEditMode && blogId) {
        const updated = await updateBlog(blogId, payload)
        navigate(`/blog/${updated.id}`, { replace: true })
      } else {
        await createBlog(payload)
        navigate("/blog", { replace: true })
      }
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message)
      } else {
        setError("Failed to publish blog. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!isEditMode) {
      setIsLoadingInitialData(false)
      return
    }

    if (!blogId) {
      setError("Blog ID not found.")
      setIsLoadingInitialData(false)
      return
    }

    let isMounted = true

    const hydrateForm = async () => {
      setError(null)
      setIsLoadingInitialData(true)

      try {
        const blog = await getBlogById(blogId)
        if (!isMounted) {
          return
        }

        setTitle(blog.title)
        setContent(blog.content || "")
        setTagsInput((blog.tags || []).join(", "))
      } catch (fetchError) {
        if (!isMounted) {
          return
        }

        if (fetchError instanceof Error) {
          setError(fetchError.message)
        } else {
          setError("Failed to load blog data. Please try again.")
        }
      } finally {
        if (isMounted) {
          setIsLoadingInitialData(false)
        }
      }
    }

    void hydrateForm()

    return () => {
      isMounted = false
    }
  }, [blogId, isEditMode])

  return (
    <main className="min-h-screen bg-linear-to-b from-sky-50 via-background to-background py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Card className="shadow-xl ring-1 ring-primary/15">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                {isEditMode ? "Edit Blog" : "Create New Blog"}
              </CardTitle>
              <CardDescription>
                {isEditMode
                  ? "Update your blog content and tags before publishing your changes."
                  : "Share your insight with a concise title, useful content, and relevant tags."}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {isLoadingInitialData ? (
                <div className="space-y-4" aria-hidden>
                  <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
                  <div className="h-44 w-full animate-pulse rounded-md bg-muted" />
                  <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
                </div>
              ) : null}

              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <div className="space-y-1.5">
                  <label htmlFor="title" className="text-sm font-medium text-foreground/90">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value)
                      setFormErrors((prev) => ({ ...prev, title: undefined }))
                    }}
                    placeholder="Write a clear, punchy title"
                    maxLength={140}
                    aria-invalid={Boolean(formErrors.title)}
                    disabled={isSubmitting || isLoadingInitialData}
                  />
                  {formErrors.title ? <p className="text-xs text-destructive">{formErrors.title}</p> : null}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="content" className="text-sm font-medium text-foreground/90">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(event) => {
                      setContent(event.target.value)
                      setFormErrors((prev) => ({ ...prev, content: undefined }))
                    }}
                    placeholder="Write your blog content here..."
                    className="min-h-44"
                    aria-invalid={Boolean(formErrors.content)}
                    disabled={isSubmitting || isLoadingInitialData}
                  />
                  {formErrors.content ? <p className="text-xs text-destructive">{formErrors.content}</p> : null}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="tags" className="text-sm font-medium text-foreground/90">
                    Tambah Tag
                  </label>
                  <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(event) => {
                      setTagsInput(event.target.value)
                    }}
                    placeholder="contoh: react, frontend, backendless"
                    disabled={isSubmitting || isLoadingInitialData}
                  />
                  <p className="text-xs text-muted-foreground">Pisahkan setiap tag dengan koma.</p>
                </div>

                {error ? (
                  <p className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                ) : null}

                <Button type="submit" className="w-full" disabled={isSubmitting || isLoadingInitialData}>
                  {isSubmitting
                    ? isEditMode
                      ? "Saving..."
                      : "Publishing..."
                    : isEditMode
                      ? "Save Changes"
                      : "Publish Blog"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  )
}

export default CreateBlogForm
