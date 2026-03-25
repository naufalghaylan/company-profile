import { Card, CardContent } from "@/components/ui/card"
import { ds } from "@/lib/design-system"

type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  company: string
  avatar?: string
}

type Props = {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: Props) {
  return (
    <Card className={`${ds.card.featureShell} h-full rounded-2xl bg-card`}>
      <CardContent className="flex min-h-52 flex-col p-6">
        {/* Quote */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          "{testimonial.quote}"
        </p>

        {/* Author */}
        <div className="mt-auto flex items-center gap-3 pt-6">
          {/* Avatar / Initial */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            {testimonial.avatar ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              testimonial.name.charAt(0)
            )}
          </div>

          {/* Meta */}
          <div>
            <p className="text-sm font-semibold">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}