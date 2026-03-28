import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { ds } from "@/lib/design-system"
import ServiceCard, { type Service } from "@/sections/services/ServiceCard"
import { Cloud, MonitorSmartphone, PenTool } from "lucide-react"
import { Link } from "react-router-dom"

const services: Service[] = [
	{
		id: "web-development",
		title: "Web Development",
		description:
			"Build fast, scalable web apps tailored to your business goals.",
		icon: MonitorSmartphone,
		href: "/services"
	},
	{
		id: "ui-ux-design",
		title: "UI/UX Design",
		description:
			"Design intuitive digital experiences that users enjoy and trust.",
		icon: PenTool,
		href: "/services"
	},
	{
		id: "cloud-solutions",
		title: "Cloud Solutions",
		description:
			"Deploy and manage reliable infrastructure with modern cloud practices.",
		icon: Cloud,
		href: "/services"
	}
]

function ServicesPreviewSection() {
	return (
		<section className={`${ds.section.base} relative w-full overflow-hidden border-t border-primary/10 bg-linear-to-br from-secondary/40 via-background to-background`}>
			<Container>
				{/* Header */}
				<div className={ds.section.header} data-aos="fade-up">
					<h2 className={ds.section.title}>Our <span className="text-primary">Services</span></h2>

					<p className={ds.section.description}>
						End-to-end solutions to help your team launch, scale, and grow
						faster.
					</p>
				</div>

				{/* Grid */}
				<div className={`mx-auto max-w-6xl ${ds.section.gridWide}`}>
					{services.map((service, index) => (
						<div key={service.id} data-aos="fade-up" data-aos-delay={index * 90}>
							<ServiceCard service={service} />
						</div>
					))}
				</div>

				<div className={ds.section.cta} data-aos="fade-up" data-aos-delay="120">
					<Button asChild size="lg" className="px-6 shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35">
						<Link to="/services">Explore all services</Link>
					</Button>
				</div>
			</Container>
		</section>
	)
}

export default ServicesPreviewSection
