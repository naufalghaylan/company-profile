export const ds = {
  section: {
    base: "py-24",
    header: "mx-auto mb-16 max-w-2xl text-center space-y-4",
    title: "text-3xl font-bold md:text-4xl",
    description: "text-muted-foreground md:text-lg",
    cta: "mt-12 flex justify-center",
    gridStandard: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
    gridWide: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
  },
  card: {
    featureShell:
      "group h-full rounded-xl border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
    serviceShell:
      "group flex h-full flex-col rounded-xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg",
    icon:
      "w-fit rounded-lg border border-primary/20 bg-primary/10 p-3 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-md group-hover:shadow-primary/20"
  }
} as const
