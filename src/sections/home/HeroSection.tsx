import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"

function HeroSection() {
  return (
    <section
      className="relative py-32 bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1551288049-bebda4e38f71)"
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* blurred glow */}
      <div className="absolute left-1/2 top-32 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/40 blur-[120px]" />

      <Container>
        <div className="relative mx-auto max-w-3xl text-center text-white space-y-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm backdrop-blur">
            ● New Release Available
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Business Today
            </span>
          </h1>

          {/* Description */}
          <p className="inline-block rounded-sm bg-black/75 px-2 py-1 text-lg text-white/80">
            Build powerful, scalable applications with our cutting-edge
            platform. Trusted by 500+ companies worldwide.
          </p>

          {/* CTA */}
          <div className="flex justify-center gap-4 pt-4">
            <Button 
              size="lg"
              className="transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
            >
              Get Started
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="text-black transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
            > 
              Learn More
            </Button>
          </div>

        </div>

        {/* Floating dashboard */}
        <div className="relative mt-16 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3"
            alt="TechFlow dashboard"
            className="w-full max-w-4xl rounded-xl shadow-2xl ring-1 ring-white/10"
          />
        </div>

      </Container>
    </section>
  )
}

export default HeroSection