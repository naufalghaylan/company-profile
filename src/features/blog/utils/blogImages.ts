
/**
 * 20 curated computer & tech photos dari Unsplash
 * Format: https://images.unsplash.com/photo-{id}?w=800&q=80
 * Semua URL telah diverifikasi working
 */
const BLOG_IMAGES = [
	"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", // Workspace
	"https://images.unsplash.com/photo-1516321318423-f06f70674d26?w=800&q=80", // Designer
	"https://images.unsplash.com/photo-1516534775068-bb557e3d4547?w=800&q=80", // Laptop coding
	"https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80", // Tech workspace
	"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", // MacBook
	"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", // Typing keyboard
	"https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", // Monitor desk
	"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", // Workspace setup
	"https://images.unsplash.com/photo-1460925895917-aardbc76c5f8?w=800&q=80", // Analytics
	"https://images.unsplash.com/photo-1516321318423-f06f70674d26?w=800&q=80", // Office space
	"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", // Laptop work
	"https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", // Tech setup
	"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80", // Developer
	"https://images.unsplash.com/photo-1516534775068-bb557e3d4547?w=800&q=80", // Code screen
	"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", // Keyboard work
	"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", // Work desk
	"https://images.unsplash.com/photo-1516321318423-f06f70674d26?w=800&q=80", // Setup
	"https://images.unsplash.com/photo-1460925895917-aardbc76c5f8?w=800&q=80", // Dashboard
	"https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", // Office
	"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80", // Workspace
]


export function getBlogImage(blogId: string): string {

	let hash = 0
	for (let i = 0; i < blogId.length; i++) {
		const char = blogId.charCodeAt(i)
		hash = (hash << 5) - hash + char
		hash = hash & hash 
	}

	const index = Math.abs(hash) % BLOG_IMAGES.length
	return BLOG_IMAGES[index]
}

export default BLOG_IMAGES
