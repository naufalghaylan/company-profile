import type { LucideIcon } from "lucide-react"
import { Code, Zap, Shield, TrendingUp, Users, Smartphone } from "lucide-react"

export interface Service {
	id: string
	icon: LucideIcon
	title: string
	description: string
	features: string[]
}

export const services: Service[] = [
	{
		id: "web-development",
		icon: Code,
		title: "Web Development",
		description: "We build responsive, fast, and user-friendly websites with cutting-edge technology.",
		features: [
			"React, TypeScript, and modern frameworks",
			"Responsive design across all devices",
			"Optimized performance & SEO"
		]
	},
	{
		id: "mobile-app-development",
		icon: Smartphone,
		title: "Mobile App Development",
		description: "Native and cross-platform mobile applications with high engagement and reliability.",
		features: [
			"iOS and Android development",
			"Native performance with cross-platform efficiency",
			"Push notifications & offline support"
		]
	},
	{
		id: "performance-optimization",
		icon: Zap,
		title: "Performance Optimization",
		description: "Increase your application's speed and efficiency for a better user experience.",
		features: [
			"Code splitting & lazy loading",
			"Database query optimization",
			"Caching strategy implementation"
		]
	},
	{
		id: "security-infrastructure",
		icon: Shield,
		title: "Security & Infrastructure",
		description: "Protect your data with secure, scalable, and reliable infrastructure solutions.",
		features: [
			"Cloud deployment (AWS, GCP, Azure)",
			"SSL/TLS encryption & security audit",
			"Monitoring & disaster recovery"
		]
	},
	{
		id: "digital-strategy",
		icon: TrendingUp,
		title: "Digital Strategy",
		description: "Comprehensive digital strategy to achieve your business goals in the modern era.",
		features: [
			"Market research & competitive analysis",
			"Growth hacking & conversion optimization",
			"Analytics & data-driven insights"
		]
	},
	{
		id: "team-augmentation",
		icon: Users,
		title: "Team Augmentation",
		description: "Expand your team with experienced developers ready to contribute immediately.",
		features: [
			"Full-time & part-time resources",
			"Skilled across diverse technologies",
			"Seamless integration with your team"
		]
	}
]
