import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import servicesDashboard from "@/assets/servicesdashboard.avif"

function ServicesHero() {
	return (
		<section className="py-16 md:py-28">
			<Container>
				<div className="grid items-center gap-10 md:grid-cols-2">
					
					{/* LEFT — TEXT CONTENT */}
					<div className="space-y-6" data-aos="fade-right">
						<p className="text-sm font-medium text-primary">
							Services
						</p>

						<h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
							Build and Scale Digital Products with <span className="text-primary">Confidence</span>
						</h1>

						<p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
							We deliver scalable and innovative digital solutions tailored to your business needs. From strategy to implementation, we're with you every step of the way.
						</p>

						<div className="pt-2">
							<Button variant="secondary">
								Explore Services
							</Button>
						</div>
					</div>

					{/* RIGHT — VISUAL */}
					<div
						className="relative h-80 md:h-[420px] overflow-hidden rounded-xl border bg-background/40 backdrop-blur-xl"
						data-aos="fade-left"
						data-aos-delay="120"
					>
						<img
							src={servicesDashboard}
							alt="Performance analytics dashboard on a laptop"
							className="absolute inset-0 h-full w-full object-cover"
							loading="lazy"
						/>

						{/* Gradient base */}
						<div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent" />

						{/* Glow blobs */}
						<div className="absolute top-4 right-4 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
						<div className="absolute bottom-8 -left-8 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl" />

						{/* Floating elements */}
						<div className="absolute top-10 left-10 h-6 w-6 rounded-full bg-primary/30 blur-sm" />
						<div className="absolute bottom-16 right-12 h-10 w-10 rounded-full bg-primary/20 blur-md" />
						<div className="absolute top-1/2 right-1/4 h-4 w-4 rounded-full bg-primary/40 blur-sm" />

						<div className="absolute inset-0 bg-black/10" />
					</div>

				</div>
			</Container>
		</section>
	)
}

export default ServicesHero