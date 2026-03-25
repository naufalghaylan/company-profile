import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { ds } from "@/lib/design-system"
import { Link } from "react-router-dom"

export type Service = {
	id: string
	title: string
	description: string
	icon: LucideIcon
	href: string
}

type ServiceCardProps = {
	service: Service
}

function ServiceCard({ service }: ServiceCardProps) {
	const Icon = service.icon

	return (
		<article className={ds.card.serviceShell}>
			<div className="mb-5 space-y-4">
				<div className={`${ds.card.icon} relative inline-flex group-hover:scale-105`}>
					<Icon className="h-5 w-5" aria-hidden="true" />
				</div>

				<h3 className="text-xl font-semibold leading-tight">{service.title}</h3>
			</div>
			<p className="text-sm leading-relaxed text-muted-foreground md:text-base">
				{service.description}
			</p>

			<Link
				to={service.href}
				className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary/80 no-underline transition-all duration-300 hover:text-primary"
			>
				Learn more
				<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
			</Link>
		</article>
	)
}

export default ServiceCard
