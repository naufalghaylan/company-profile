import { useMemo, useState } from "react"
import { Building2, Mail, MapPin, Phone, SendHorizontal } from "lucide-react"

import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ContactFormData = {
	name: string
	email: string
	subject: string
	message: string
}

type SubmitStatus = "idle" | "success" | "error"

const initialFormData: ContactFormData = {
	name: "",
	email: "",
	subject: "",
	message: "",
}

function Footer() {
	const [formData, setFormData] = useState<ContactFormData>(initialFormData)
	const [status, setStatus] = useState<SubmitStatus>("idle")

	const year = useMemo(() => new Date().getFullYear(), [])

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))

		if (status !== "idle") {
			setStatus("idle")
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const { name, email, message } = formData
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (!name.trim() || !email.trim() || !message.trim() || !emailPattern.test(email)) {
			setStatus("error")
			return
		}

		setStatus("success")
		setFormData(initialFormData)
	}

	return (
		<footer className="relative overflow-hidden border-t bg-linear-to-b from-background to-sky-50/55 py-10 md:py-12">
			<div
				className="pointer-events-none absolute -left-24 top-8 h-52 w-52 rounded-full bg-primary/10 blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute -right-20 bottom-4 h-56 w-56 rounded-full bg-sky-300/20 blur-3xl"
				aria-hidden="true"
			/>

			<Container>
				<div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-background/65 px-5 py-6 shadow-[0_30px_80px_-50px_rgba(37,99,235,0.45)] backdrop-blur-xl sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-10 lg:py-10">
					<div
						className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"
						aria-hidden="true"
					/>

					<div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-8 xl:gap-10">
						<div className="space-y-5 lg:pr-4">
							<div className="space-y-2.5">
								<p className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase">
									Studio Profile
								</p>
								<h2 className="flex items-center gap-2 text-[clamp(1.4rem,1.1vw+1rem,2rem)] font-semibold tracking-tight">
									<Building2 className="size-5 text-primary" aria-hidden="true" />
									TechFlow
								</h2>
								<p className="max-w-xl text-[0.92rem] leading-relaxed text-muted-foreground md:text-[0.95rem]">
									We help businesses build digital products that are scalable,
									secure, and designed to feel effortless in everyday use.
								</p>
							</div>

							<div className="space-y-3.5 text-sm text-muted-foreground md:text-[0.9rem]">
								<p className="flex items-start gap-3 border-b border-border/60 pb-3.5">
									<span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
										<MapPin className="size-4" aria-hidden="true" />
									</span>
									<span>88 Innovation Avenue, South Jakarta, Jakarta 12345</span>
								</p>

								<p className="flex items-center gap-3 border-b border-border/60 pb-3.5">
									<span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
										<Mail className="size-4" aria-hidden="true" />
									</span>
									<a href="mailto:hello@techflow.id" className="transition-colors hover:text-foreground">
										hello@techflow.id
									</a>
								</p>

								<p className="flex items-center gap-3">
									<span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
										<Phone className="size-4" aria-hidden="true" />
									</span>
									<a href="tel:+622155550001" className="transition-colors hover:text-foreground">
										+62 21 5555 0001
									</a>
								</p>
							</div>

							<p className="pt-3 text-xs tracking-wide text-muted-foreground/80 uppercase">
								Copyright {year} TechFlow. All rights reserved.
							</p>
						</div>

						<div className="relative lg:pt-0.5">
							<form
								className="relative space-y-3.5"
								onSubmit={handleSubmit}
								noValidate
							>
								<div className="mb-1.5 space-y-1.5">
									<p className="text-[0.65rem] font-semibold tracking-[0.18em] text-primary uppercase">
										Get In Touch
									</p>
									<h3 className="text-[clamp(1.25rem,0.9vw+1rem,1.65rem)] leading-tight font-semibold tracking-tight">
										Let&apos;s create your next bold digital move.
									</h3>
									<p className="text-sm leading-relaxed text-muted-foreground md:text-[0.9rem]">
										Send a short brief and our team will follow up with a tailored plan.
									</p>
								</div>

								<div className="space-y-1.5">
									<label htmlFor="footer-name" className="text-[0.72rem] font-semibold tracking-[0.16em] text-foreground/80 uppercase">
										Name
									</label>
									<Input
										id="footer-name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										placeholder="Your name"
										autoComplete="name"
										className="h-9 rounded-none border-0 border-b border-border/70 bg-transparent px-0 focus-visible:border-primary focus-visible:ring-0"
										aria-invalid={status === "error" && !formData.name.trim()}
									/>
								</div>

								<div className="space-y-1.5">
									<label htmlFor="footer-email" className="text-[0.72rem] font-semibold tracking-[0.16em] text-foreground/80 uppercase">
										Email
									</label>
									<Input
										id="footer-email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleInputChange}
										placeholder="you@example.com"
										autoComplete="email"
										className="h-9 rounded-none border-0 border-b border-border/70 bg-transparent px-0 focus-visible:border-primary focus-visible:ring-0"
										aria-invalid={status === "error" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
									/>
								</div>

								<div className="space-y-1.5">
									<label htmlFor="footer-subject" className="text-[0.72rem] font-semibold tracking-[0.16em] text-foreground/80 uppercase">
										Subject
									</label>
									<Input
										id="footer-subject"
										name="subject"
										value={formData.subject}
										onChange={handleInputChange}
										placeholder="What can we help with?"
										className="h-9 rounded-none border-0 border-b border-border/70 bg-transparent px-0 focus-visible:border-primary focus-visible:ring-0"
									/>
								</div>

								<div className="space-y-1.5">
									<label htmlFor="footer-message" className="text-[0.72rem] font-semibold tracking-[0.16em] text-foreground/80 uppercase">
										Message
									</label>
									<Textarea
										id="footer-message"
										name="message"
										rows={4}
										value={formData.message}
										onChange={handleInputChange}
										placeholder="Write your message here..."
										className="min-h-20 rounded-none border-0 border-b border-border/70 bg-transparent px-0 focus-visible:border-primary focus-visible:ring-0"
										aria-invalid={status === "error" && !formData.message.trim()}
									/>
								</div>

								{status === "error" ? (
									<p className="rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
										Please complete Name, a valid Email, and Message.
									</p>
								) : null}

								{status === "success" ? (
									<p className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary">
										Message sent successfully. Our team will contact you shortly.
									</p>
								) : null}

								<Button type="submit" className="h-9 w-full rounded-full px-6 tracking-wide sm:w-auto">
									Send Message
									<SendHorizontal className="size-4" aria-hidden="true" />
								</Button>
							</form>
						</div>
					</div>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
