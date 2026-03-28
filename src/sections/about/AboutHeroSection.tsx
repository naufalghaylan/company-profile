import Container from "@/components/layout/Container"
import { ds } from "@/lib/design-system"

function AboutHeroSection() {
  return (
    <section
      className={`${ds.section.base} about-hero relative overflow-hidden border-b border-primary/10 bg-linear-to-br from-secondary/35 via-background to-background`}
      aria-labelledby="about-hero-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,hsl(var(--primary)/0.14),transparent_40%),radial-gradient(circle_at_82%_12%,hsl(200_100%_60%/0.16),transparent_36%),radial-gradient(circle_at_85%_82%,hsl(200_100%_70%/0.12),transparent_42%)]"
      />

      <Container>
        <div className="about-hero-layout relative flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <div
            className="about-hero-content mx-auto max-w-2xl flex-1 text-center md:mx-0 md:text-left"
            data-aos="fade-right"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 md:text-sm">
              About Us
            </p>
            <h1
              className="about-hero-title text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
              id="about-hero-title"
            >
              We build digital products that feel <span className="text-primary">clear</span>, useful, and human.
            </h1>
            <p className="about-hero-description mt-4 max-w-xl text-base leading-relaxed text-muted-foreground mx-auto md:mx-0 md:text-lg">
              We help ambitious teams move faster with practical strategy,
              thoughtful design, and reliable engineering.
            </p>
            <p className="mt-5 text-sm font-medium text-primary/80">
              120+ products delivered with measurable outcomes across industries.
            </p>
          </div>

          <figure
            className="about-hero-media group flex-1 w-full aspect-4/3 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15"
            data-aos="fade-left"
            data-aos-delay="120"
          >
            <img
              className="about-hero-image h-full w-full object-cover rounded-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Our team collaborating in a modern workspace"
              loading="lazy"
              decoding="async"
              width={1200}
              height={800}
            />
          </figure>
        </div>
      </Container>
    </section>
  )
}

export default AboutHeroSection