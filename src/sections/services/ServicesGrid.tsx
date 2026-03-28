import Container from "@/components/layout/Container"
import { services } from "@/data/services"

function ServicesGrid() {
	return (
		<section className="bg-sky-50/40 py-20 md:py-28">
			<Container>
				{/* Header */}
				<div className="mb-16 text-center" data-aos="fade-up">
					<h2 className="text-3xl font-bold md:text-4xl">
						Our Services
					</h2>
					<p className="mt-4 mx-auto max-w-2xl text-muted-foreground md:text-lg">
						Comprehensive technology solutions for your digital business transformation
					</p>
				</div>

				{/* Services Grid */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{services.map((service, index) => {
						const Icon = service.icon
						return (
							<article
								key={service.id}
								className="group flex h-full flex-col rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-primary/5 hover:shadow-lg"
								data-aos="fade-up"
								data-aos-delay={index * 90}
							>
								{/* Icon */}
								<div className="mb-4 w-fit rounded-lg border border-primary/20 bg-primary/10 p-3 text-primary transition-all duration-300 group-hover:scale-110">
									<Icon className="h-5 w-5" />
								</div>

								{/* Title */}
								<h3 className="mb-3 text-lg font-semibold text-foreground">
									{service.title}
								</h3>

								{/* Description */}
								<p className="mb-5 text-sm leading-relaxed text-muted-foreground">
									{service.description}
								</p>

								{/* Features List */}
								<ul className="mt-auto space-y-2.5">
									{service.features.map((feature) => (
										<li key={`${service.id}-${feature}`} className="flex items-start gap-3 text-sm text-muted-foreground">
											<span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</article>
						)
					})}
				</div>
			</Container>
		</section>
	)
}

export default ServicesGrid
