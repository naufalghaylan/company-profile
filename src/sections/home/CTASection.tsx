import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function CTASection() {
	return (
		<section className="relative overflow-hidden bg-muted/35 py-20 md:py-28">
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,hsl(var(--primary)/0.12),transparent_60%)]"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border/80"
			/>

			<Container>
				<div className="relative z-10 mx-auto max-w-2xl text-center">
					<div className="space-y-6 md:space-y-8">
						<h2 className="text-3xl font-bold tracking-[-0.02em] leading-tight md:text-5xl md:leading-[1.08]">
							Ready to unlock your next stage of <span className="text-primary">business growth</span>?
						</h2>

						<p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
							Discover how we turn ideas into scalable digital solutions that drive real business growth.
						</p>

						<div className="flex flex-col items-center justify-center gap-3 pt-3 sm:flex-row sm:gap-4 md:pt-4">
							<Button
								asChild
								size="lg"
								className="w-full shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:-translate-y-0.5 sm:w-auto"
							>
								<Link to="/services">See How We Help</Link>
							</Button>

							<Button
								asChild
								variant="outline"
								size="lg"
								className="w-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted/70 sm:w-auto"
							>
								<Link to="/blog">Read Our Insights</Link>
							</Button>
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}

export default CTASection
