import Container from "@/components/layout/Container"
import { Button } from "@/components/ui/button"
import heroLanding from "@/assets/HeroLanding.mp4"

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
        <div className="relative mx-auto max-w-3xl text-center text-white space-y-6" data-aos="fade-up">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm backdrop-blur"
            data-aos="fade-up"
            data-aos-delay="60"
          >
            ● New Release Available
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold leading-tight md:text-6xl" data-aos="fade-up" data-aos-delay="120">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Business Today
            </span>
          </h1>

          {/* Description */}
          <p
            className="inline-block rounded-sm bg-black/75 px-2 py-1 text-lg text-white/80"
            data-aos="fade-up"
            data-aos-delay="180"
          >
            Build powerful, scalable applications with our cutting-edge
            platform. Trusted by 500+ companies worldwide.
          </p>

          <p
            className="mx-auto max-w-2xl rounded-sm bg-white/10 px-3 py-2 text-sm text-white/90 md:text-base"
            data-aos="fade-up"
            data-aos-delay="220"
          >
            Our mission is to help ambitious teams turn complex ideas into
            clear, reliable digital products that create measurable business
            impact.
          </p>

          {/* CTA */}
          <div className="flex justify-center gap-4 pt-4" data-aos="fade-up" data-aos-delay="260">
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
        <div className="relative mt-16 flex justify-center" data-aos="zoom-in-up" data-aos-delay="180">
          <div className="w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
            <video
              className="block w-[125%] max-w-none -translate-x-[10%]"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src={heroLanding} type="video/mp4" />
              Browser Anda tidak mendukung video.
            </video>
          </div>
        </div>

      </Container>
    </section>
  )
}

export default HeroSection