import { useEffect, useRef } from "react"
import Container from "@/components/layout/Container"
import TestimonialCard from "@/features/shared/TestimonialCard"
import { ds } from "@/lib/design-system"

const testimonials = [
  {
    id: "sarah-kim",
    quote:
      "The team delivered our platform ahead of schedule with exceptional quality.",
    name: "Sarah Kim",
    role: "Product Manager",
    company: "Northstar Labs",
  },
  {
    id: "david-miller",
    quote:
      "Communication was clear, execution was fast, and the final result exceeded our expectations.",
    name: "David Miller",
    role: "Head of Operations",
    company: "Blue Ridge Co.",
  },
  {
    id: "alicia-gomez",
    quote:
      "We saw measurable growth after launch. Their process felt structured and reliable.",
    name: "Alicia Gomez",
    role: "Marketing Director",
    company: "Brightline Studio",
  },
  {
    id: "ryan-cho",
    quote:
      "Their team translated our messy requirements into a clean product roadmap and execution plan.",
    name: "Ryan Cho",
    role: "Founder",
    company: "Vertex Works",
  },
  {
    id: "maya-patel",
    quote:
      "From kickoff to deployment, every milestone was transparent and delivered exactly when promised.",
    name: "Maya Patel",
    role: "Operations Lead",
    company: "Summit Retail",
  },
  {
    id: "james-okafor",
    quote:
      "Their UX decisions reduced friction across our onboarding flow and improved conversion quickly.",
    name: "James Okafor",
    role: "Growth Manager",
    company: "OrbitPay",
  },
  {
    id: "lina-hartono",
    quote:
      "They were proactive, detail-oriented, and genuinely invested in helping our team scale confidently.",
    name: "Lina Hartono",
    role: "Chief Strategy Officer",
    company: "Astera Group",
  },
]

function splitAlternating<T>(items: T[]) {
  const first: T[] = []
  const second: T[] = []

  items.forEach((item, index) => {
    if (index % 2 === 0) {
      first.push(item)
      return
    }

    second.push(item)
  })

  return { first, second }
}

export default function TestimonialsSection() {
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null)
  const marqueeRef = useRef<HTMLDivElement | null>(null)
  const rowLeftRef = useRef<HTMLDivElement | null>(null)
  const rowRightRef = useRef<HTMLDivElement | null>(null)

  // Keep both rows evenly distributed so each marquee row has balanced density.
  const { first: firstRow, second: secondRow } = splitAlternating(testimonials)

  const row1 = [...firstRow, ...firstRow]
  const row2 = [...secondRow, ...secondRow]
  const mobileRow = [...testimonials, ...testimonials]

  useEffect(() => {
    const scroller = mobileScrollerRef.current
    if (!scroller) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches

    if (prefersReducedMotion || !isMobileViewport) {
      return
    }

    let frameId = 0
    let lastTime = 0
    let isInteracting = false
    let resumeTimer: number | null = null
    const speedPxPerSecond = 28

    let loopWidth = scroller.scrollWidth / 2

    const recalculateLoopWidth = () => {
      loopWidth = scroller.scrollWidth / 2
    }

    const keepInLoopRange = () => {
      if (loopWidth <= 0) {
        return
      }

      if (scroller.scrollLeft >= loopWidth) {
        scroller.scrollLeft -= loopWidth
      }
    }

    const pauseTemporarily = () => {
      isInteracting = true

      if (resumeTimer !== null) {
        window.clearTimeout(resumeTimer)
      }

      resumeTimer = window.setTimeout(() => {
        isInteracting = false
      }, 900)
    }

    const tick = (timestamp: number) => {
      if (lastTime === 0) {
        lastTime = timestamp
      }

      const delta = (timestamp - lastTime) / 1000
      lastTime = timestamp

      if (!isInteracting) {
        scroller.scrollLeft += speedPxPerSecond * delta
        keepInLoopRange()
      }

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    window.addEventListener("resize", recalculateLoopWidth)
    scroller.addEventListener("pointerdown", pauseTemporarily)
    scroller.addEventListener("touchstart", pauseTemporarily, { passive: true })
    scroller.addEventListener("scroll", keepInLoopRange, { passive: true })

    return () => {
      window.cancelAnimationFrame(frameId)

      if (resumeTimer !== null) {
        window.clearTimeout(resumeTimer)
      }

      window.removeEventListener("resize", recalculateLoopWidth)
      scroller.removeEventListener("pointerdown", pauseTemporarily)
      scroller.removeEventListener("touchstart", pauseTemporarily)
      scroller.removeEventListener("scroll", keepInLoopRange)
    }
  }, [])

  useEffect(() => {
    const marquee = marqueeRef.current
    const leftRow = rowLeftRef.current
    const rightRow = rowRightRef.current

    if (!marquee || !leftRow || !rightRow) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const isDesktopViewport = window.matchMedia("(min-width: 768px)").matches

    if (prefersReducedMotion || !isDesktopViewport) {
      return
    }

    let frameId = 0
    let lastTime = 0
    let isPaused = false
    let leftOffset = 0
    let rightOffset = 0

    const leftSpeedPxPerSecond = 24
    const rightSpeedPxPerSecond = 20

    let leftLoopWidth = leftRow.scrollWidth / 2
    let rightLoopWidth = rightRow.scrollWidth / 2

    const recalculateLoopWidths = () => {
      leftLoopWidth = leftRow.scrollWidth / 2
      rightLoopWidth = rightRow.scrollWidth / 2
    }

    const handlePointerEnter = () => {
      isPaused = true
    }

    const handlePointerLeave = () => {
      isPaused = false
    }

    const tick = (timestamp: number) => {
      if (lastTime === 0) {
        lastTime = timestamp
      }

      const delta = (timestamp - lastTime) / 1000
      lastTime = timestamp

      if (!isPaused) {
        if (leftLoopWidth > 0) {
          leftOffset = (leftOffset + leftSpeedPxPerSecond * delta) % leftLoopWidth
          leftRow.style.transform = `translate3d(${-leftOffset}px, 0, 0)`
        }

        if (rightLoopWidth > 0) {
          rightOffset = (rightOffset + rightSpeedPxPerSecond * delta) % rightLoopWidth
          rightRow.style.transform = `translate3d(${(-rightLoopWidth + rightOffset)}px, 0, 0)`
        }
      }

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)

    window.addEventListener("resize", recalculateLoopWidths)
    marquee.addEventListener("pointerenter", handlePointerEnter)
    marquee.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener("resize", recalculateLoopWidths)
      marquee.removeEventListener("pointerenter", handlePointerEnter)
      marquee.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [])

  return (
    <section className={`${ds.section.base} bg-sky-50/60 `}>
      <Container>
        {/* Heading */}
        <div className={ds.section.header} data-aos="fade-up">
          <h2 className={ds.section.title}>
            What Our <span className="text-primary">Clients Say</span> 
          </h2>
          <p className={ds.section.description}>
            Trusted by teams around the world
          </p>
        </div>

        {/* Mobile: swipe carousel */}
        <div className="md:hidden" data-aos="fade-up" data-aos-delay="80">
          <div
            ref={mobileScrollerRef}
            className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex w-max snap-x snap-mandatory gap-4 touch-pan-x">
              {mobileRow.map((item, index) => (
                <div
                  key={`mobile-${item.id}-${index}`}
                  className="w-[86vw] max-w-[320px] shrink-0 snap-center"
                >
                  <TestimonialCard testimonial={item} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: auto marquee */}
        <div
          ref={marqueeRef}
          data-aos="fade-up"
          data-aos-delay="100"
          className="testimonials-marquee hidden space-y-6 overflow-hidden py-1 md:block
          mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
          [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
        "
        >
          
          {/* Row 1 */}
          <div ref={rowLeftRef} className="testimonials-track">
            {row1.map((item, index) => (
              <div key={`row1-${item.id}-${index}`} className="w-[320px] shrink-0">
                <TestimonialCard testimonial={item} />
              </div>
            ))}
          </div>

          {/* Row 2 (reverse) */}
          <div ref={rowRightRef} className="testimonials-track">
            {row2.map((item, index) => (
              <div key={`row2-${item.id}-${index}`} className="w-[320px] shrink-0">
                <TestimonialCard testimonial={item} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}