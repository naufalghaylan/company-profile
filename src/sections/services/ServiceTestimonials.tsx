import Container from "@/components/layout/Container"

function ServiceTestimonials() {
	return (
		<section className="py-16 md:py-20">
			<Container>
				<div className="animate-pulse space-y-6">
					<div className="h-8 w-72 rounded bg-muted" />
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 3 }).map((_, index) => (
							<article key={index} className="space-y-4 rounded-xl border p-6">
								<div className="h-4 w-full rounded bg-muted" />
								<div className="h-4 w-11/12 rounded bg-muted" />
								<div className="h-4 w-4/5 rounded bg-muted" />
								<div className="flex items-center gap-3 pt-2">
									<div className="h-10 w-10 rounded-full bg-muted" />
									<div className="space-y-2">
										<div className="h-4 w-28 rounded bg-muted" />
										<div className="h-3 w-20 rounded bg-muted" />
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</Container>
		</section>
	)
}

export default ServiceTestimonials
