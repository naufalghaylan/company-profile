import type { Blog, CreateBlogInput, UpdateBlogInput } from "@/features/blog/types/blog.types"
import Backendless from "@/lib/backendless/backendless.config"
import { useAuthStore } from "@/features/auth/store/authStore"
import { getBlogImage } from "@/features/blog/utils/blogImages"
import { sampleBlogs } from "@/data/blogs"

type UnknownRecord = Record<string, unknown>

type BackendlessBlog = {
  objectId?: string
  title?: string
  summary?: string
  excerpt?: string
  content?: string
  authorName?: string
  author?: {
    name?: string
  }
  createdAt?: string
  created?: string | number
  publishedAt?: string
  publishDate?: string
  tags?: unknown
  thumbnail?: string
  name?: unknown
}

type CreateBlogPayload = {
  title: string
  content: string
  summary: string
  authorName: string
  tags: string
}

type UpdateBlogPayload = CreateBlogPayload & {
  objectId: string
}

const BLOG_TABLE = import.meta.env.VITE_BACKENDLESS_BLOG_TABLE || "BlogPosts"
const SORT_BY = import.meta.env.VITE_BACKENDLESS_SORT_BY || "created DESC"
const SUMMARY_MAX_LENGTH = 160

function isObject(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function readStringArray(value: unknown): string[] | undefined {
  const collectTags = (raw: string): string[] => {
    return raw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
  }

  if (typeof value === "string") {
    const normalized = collectTags(value)
    return normalized.length > 0 ? normalized : undefined
  }

  if (!Array.isArray(value)) {
    return undefined
  }

  const normalized = value
    .filter((item): item is string => typeof item === "string")
    .flatMap((item) => collectTags(item))

  return normalized.length > 0 ? normalized : undefined
}

function toIsoDate(value: unknown): string | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Date(value).toISOString()
  }

  if (typeof value === "string") {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString()
    }
  }

  return undefined
}

function toSummary(content: string): string {
  const normalized = content.replace(/\s+/g, " ").trim()

  if (normalized.length <= SUMMARY_MAX_LENGTH) {
    return normalized
  }

  return `${normalized.slice(0, SUMMARY_MAX_LENGTH - 3).trim()}...`
}

function toAuthorName(value: string | undefined): string {
  if (value && value.trim()) {
    return value.trim()
  }

  return "Unknown author"
}

function parseTags(tags: string[] | undefined): string[] {
  if (!tags || tags.length === 0) {
    return []
  }

  return tags
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function mapBlog(rawBlog: BackendlessBlog, index: number): Blog {
  const authorRelation = rawBlog.name
  const authorFromRelation = isObject(authorRelation)
    ? readString(authorRelation.name) || readString(authorRelation.email)
    : readString(authorRelation)
  const nestedAuthorName = rawBlog.author?.name
  const rawContent = readString(rawBlog.content)

  const id = rawBlog.objectId || readString((rawBlog as UnknownRecord).id) || `blog-${index + 1}`
  const title = readString(rawBlog.title) || "Untitled blog"

  const summary =
    readString(rawBlog.summary) ||
    readString(rawBlog.excerpt) ||
    rawContent ||
    "No summary available yet."

  const thumbnail = readString(rawBlog.thumbnail) || getBlogImage(id)

  return {
    id,
    title,
    summary,
    content: rawContent,
    authorName:
      readString(rawBlog.authorName) ||
      readString(nestedAuthorName) ||
      authorFromRelation ||
      "Unknown author",
    createdAt:
      toIsoDate(rawBlog.createdAt) ||
      toIsoDate(rawBlog.publishedAt) ||
      toIsoDate(rawBlog.publishDate) ||
      toIsoDate(rawBlog.created) ||
      new Date().toISOString(),
    tags: readStringArray(rawBlog.tags),
    thumbnail,
  }
}

export async function createBlog(input: CreateBlogInput): Promise<Blog> {
  const normalizedTitle = input.title.trim()
  const normalizedContent = input.content.trim()

  if (!normalizedTitle) {
    throw new Error("Title is required.")
  }

  if (!normalizedContent) {
    throw new Error("Content is required.")
  }

  const authUser = useAuthStore.getState().user
  const derivedAuthorName = authUser?.name || authUser?.email?.split("@")[0]
  const authorName = toAuthorName(derivedAuthorName)
  const normalizedTags = parseTags(input.tags)

  const payload: CreateBlogPayload = {
    title: normalizedTitle,
    content: normalizedContent,
    summary: toSummary(normalizedContent),
    authorName,
    tags: normalizedTags.join(", "),
  }

  try {
    const dataStore = Backendless.Data.of(BLOG_TABLE)
    const created = (await dataStore.save(payload)) as BackendlessBlog

    return mapBlog(
      {
        ...created,
        ...payload,
      },
      0
    )
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create blog in Backendless: ${error.message}`)
    }

    throw new Error("Failed to create blog in Backendless: unexpected error")
  }
}

export async function updateBlog(id: string, input: UpdateBlogInput): Promise<Blog> {
  const normalizedId = id.trim()
  const normalizedTitle = input.title.trim()
  const normalizedContent = input.content.trim()

  if (!normalizedId) {
    throw new Error("Blog ID is required.")
  }

  if (!normalizedTitle) {
    throw new Error("Title is required.")
  }

  if (!normalizedContent) {
    throw new Error("Content is required.")
  }

  const authUser = useAuthStore.getState().user
  const derivedAuthorName = authUser?.name || authUser?.email?.split("@")[0]
  const authorName = toAuthorName(derivedAuthorName)
  const normalizedTags = parseTags(input.tags)

  const payload: UpdateBlogPayload = {
    objectId: normalizedId,
    title: normalizedTitle,
    content: normalizedContent,
    summary: toSummary(normalizedContent),
    authorName,
    tags: normalizedTags.join(", "),
  }

  try {
    const dataStore = Backendless.Data.of(BLOG_TABLE)
    const updated = (await dataStore.save(payload)) as BackendlessBlog

    return mapBlog(
      {
        ...updated,
        ...payload,
      },
      0
    )
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update blog in Backendless: ${error.message}`)
    }

    throw new Error("Failed to update blog in Backendless: unexpected error")
  }
}

export async function deleteBlog(id: string): Promise<void> {
  const normalizedId = id.trim()

  if (!normalizedId) {
    throw new Error("Blog ID is required.")
  }

  try {
    const dataStore = Backendless.Data.of(BLOG_TABLE)
    await dataStore.remove(normalizedId)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete blog in Backendless: ${error.message}`)
    }

    throw new Error("Failed to delete blog in Backendless: unexpected error")
  }
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const dataStore = Backendless.Data.of(BLOG_TABLE)

    const response = (await dataStore.find({
      pageSize: 50,
      offset: 0,
      sortBy: [SORT_BY],
    })) as unknown

    if (!Array.isArray(response)) {
      // Return sample blogs for preview if no data
      return sampleBlogs.map((blog, index) => mapBlog(blog as unknown as BackendlessBlog, index))
    }

    const blogs = response.filter(isObject).map((blog, index) => mapBlog(blog as BackendlessBlog, index))
    
    // If empty result, return sample blogs for preview
    if (blogs.length === 0) {
      return sampleBlogs.map((blog, index) => mapBlog(blog as unknown as BackendlessBlog, index))
    }

    return blogs
  } catch (error) {
    // Return sample blogs on error for better UX during development
    console.warn("Failed to fetch blogs from Backendless, using sample data:", error)
    return sampleBlogs.map((blog, index) => mapBlog(blog as unknown as BackendlessBlog, index))
  }
}

export async function getBlogById(id: string): Promise<Blog> {
  try {
    const dataStore = Backendless.Data.of(BLOG_TABLE)
    const blog = (await dataStore.findById(id)) as BackendlessBlog

    if (!blog) {
      throw new Error("Blog not found")
    }

    return mapBlog(blog, 0)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch blog from Backendless: ${error.message}`)
    }

    throw new Error("Failed to fetch blog from Backendless: unexpected error")
  }
}
