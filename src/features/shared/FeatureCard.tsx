import { Card, CardContent } from "@/components/ui/card"
import { ds } from "@/lib/design-system"

type FeatureCardProps = {
  title: string
  description: string
  icon: React.ElementType
}

function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <Card className={ds.card.featureShell}>
      <CardContent className="p-6 space-y-4">

        {/* Icon */}
        <div className={ds.card.icon}>
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold leading-tight">
            {title}
          </h3>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

      </CardContent>
    </Card>
  )
}

export default FeatureCard