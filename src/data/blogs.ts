import type { Blog } from "@/features/blog/types/blog.types"

export const sampleBlogs: Blog[] = [
	{
		id: "blog-sample-001",
		title: "Building Production-Ready React Apps in 2024",
		summary:
			"Learn the best practices and patterns for building modern React applications that scale. From component architecture to state management, we cover everything you need to know.",
		content: `# Building Production-Ready React Apps in 2024

In this comprehensive guide, we'll explore the essential patterns and best practices for building React applications that are ready for production.

## Component Architecture

Modern React development requires careful consideration of component design. Here are the key principles:

- Keep components small and focused
- Use composition over inheritance
- Leverage hooks for state and side effects
- Extract custom hooks for reusable logic

## State Management

Choosing the right state management solution is crucial for scalability:

- useState for local component state
- useContext for provider patterns
- External libraries like Zustand or Redux for complex applications
- Server state management with React Query or SWR

## Performance Optimization

Performance should be a primary concern from the start:

- Use React.memo for expensive components
- Implement code splitting with lazy loading
- Monitor bundle size and use dynamic imports
- Profile your application with browser DevTools

## Testing Strategy

Comprehensive testing ensures reliability:

- Unit tests for utilities and hooks
- Integration tests for components
- End-to-end tests for critical user flows
- Consider testing library for better test practices

By following these patterns, you'll build applications that are maintainable, performant, and ready for production use.`,
		authorName: "Alex Johnson",
		createdAt: new Date(2024, 0, 15).toISOString(),
		tags: ["React", "Best Practices", "Frontend"],
	},
]
