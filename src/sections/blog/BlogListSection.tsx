import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import BlogGrid from "@/features/blog/components/BlogGrid"
import BlogHeader from "@/features/blog/components/BlogHeader"
import { useBlogs } from "@/features/blog/hooks/useBlogs"
import { useAuthStore } from "@/features/auth/store/authStore"
import { useNavigate } from "react-router-dom"

type BlogSkeletonCardProps = {
  shouldReduceMotion: boolean
}

function BlogSkeletonCard({ shouldReduceMotion }: BlogSkeletonCardProps) {
  return (
    <div className="relative h-96 overflow-hidden rounded-xl border border-border/60 bg-linear-to-b from-muted/70 to-muted/30">
      {!shouldReduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary/20 to-transparent"
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 1.35, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
        />
      ) : null}
    </div>
  )
}

function BlogListSection() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const { blogs, isLoading, error, refetch } = useBlogs()
  const shouldReduceMotion = !!useReducedMotion()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const availableTags = useMemo(() => {
    const tags = blogs.flatMap((blog) => blog.tags || [])
    return Array.from(new Set(tags.map((tag) => tag.trim()).filter(Boolean))).sort((a, b) =>
      a.localeCompare(b)
    )
  }, [blogs])

  const filteredBlogs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return blogs.filter((blog) => {
      const matchesTag = activeTag ? (blog.tags || []).includes(activeTag) : true

      if (!matchesTag) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const searchableText = [blog.title, blog.summary, blog.content, blog.authorName, ...(blog.tags || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()

      return searchableText.includes(normalizedQuery)
    })
  }, [activeTag, blogs, searchQuery])

  const handleCreateBlog = () => {
    if (user) {
      navigate("/blog/create")
      return
    }

    navigate("/login", {
      state: {
        from: "/blog/create",
        intentMessage: "Log in to create blog post",
      },
    })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setActiveTag(null)
  }

  let content: React.ReactNode = null

  if (isLoading) {
    content = (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <BlogSkeletonCard key={index} shouldReduceMotion={shouldReduceMotion} />
        ))}
      </div>
    )
  } else if (error) {
    content = (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
        <p className="mb-2 text-sm font-medium text-foreground">
          Something went wrong. Please try again.
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          We could not load blog posts right now.
        </p>
        <details className="mb-4 text-left text-xs text-muted-foreground">
          <summary className="cursor-pointer">Show technical details</summary>
          <p className="mt-2 wrap-break-word">{error}</p>
        </details>
        <motion.div
          className="inline-flex"
          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.6 }}
        >
          <Button onClick={() => void refetch()}>Try again</Button>
        </motion.div>
      </div>
    )
  } else if (blogs.length === 0) {
    content = (
      <div className="rounded-xl border border-border/70 bg-card p-10 text-center">
        <h2 className="text-xl font-semibold">No blog posts yet</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your first post from the create page, then it will appear here.
        </p>
        <motion.div
          className="inline-flex"
          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.6 }}
        >
          <Button className="mt-6" onClick={handleCreateBlog}>
            Create your first blog
          </Button>
        </motion.div>
      </div>
    )
  } else if (filteredBlogs.length === 0) {
    content = (
      <div className="rounded-xl border border-border/70 bg-card p-10 text-center">
        <h2 className="text-xl font-semibold">No matching articles</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Try different keywords or clear the current tag filter.
        </p>
        <motion.div
          className="inline-flex"
          whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
          whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.6 }}
        >
          <Button variant="outline" className="mt-6" onClick={clearFilters}>
            Reset filters
          </Button>
        </motion.div>
      </div>
    )
  } else {
    content = <BlogGrid blogs={filteredBlogs} />
  }

  return (
    <main className="min-h-screen bg-sky-50/40">
      <BlogHeader
        totalBlogs={filteredBlogs.length}
        isLoading={isLoading}
        onCreateClick={handleCreateBlog}
        createButtonLabel={user ? "Create Blog" : "Login to Create Blog"}
      />

      <section aria-labelledby="blog-section" className="py-10 md:py-14">
        <Container>
          <h2 id="blog-section" className="sr-only">
            Blog posts
          </h2>

          {!isLoading && !error && blogs.length > 0 ? (
            <motion.div
              className="mb-8 rounded-xl border border-border/70 bg-card p-4 md:p-5"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                <div className="space-y-1.5">
                  <label htmlFor="blog-search" className="text-sm font-medium text-foreground/90">
                    Search articles
                  </label>
                  <Input
                    id="blog-search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search title, summary, author, or tags"
                  />
                </div>

                <motion.div
                  className="md:self-end"
                  whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
                  whileTap={shouldReduceMotion ? undefined : { y: 0, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.6 }}
                >
                  <Button variant="outline" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </motion.div>
              </div>

              {availableTags.length > 0 ? (
                <motion.div
                  className="mt-4 flex flex-wrap gap-2"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={shouldReduceMotion ? false : { opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  <motion.div
                    whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Button
                      size="sm"
                      variant={activeTag === null ? "default" : "outline"}
                      onClick={() => setActiveTag(null)}
                    >
                      All topics
                    </Button>
                  </motion.div>

                  {availableTags.map((tag) => (
                    <motion.div
                      key={tag}
                      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <Button
                        size="sm"
                        variant={activeTag === tag ? "default" : "outline"}
                        onClick={() => setActiveTag(tag)}
                      >
                        {tag}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}
            </motion.div>
          ) : null}

          {content}
        </Container>
      </section>
    </main>
  )
}

export default BlogListSection
