export const companyStory = {
  title: "Our Story",
  background:
    "TechFlow was founded by product engineers and designers who had built software across both startups and enterprise organizations.",
  foundingStory:
    "In 2019, we started the company to solve a recurring challenge: ambitious teams had bold ideas, but not always a practical partner to turn those ideas into reliable products.",
  milestones: [
    {
      year: "2019",
      title: "Company Founded",
      description: "Launched TechFlow as a focused digital product studio.",
    },
    {
      year: "2021",
      title: "Global Delivery Expansion",
      description: "Expanded delivery to support distributed teams across multiple regions.",
    },
    {
      year: "2023",
      title: "100+ Product Launches",
      description: "Surpassed 100 successful product launches with client teams.",
    },
  ],
  paragraphs: [
    "Today, we help teams turn complex ideas into clear products users trust.",
    "Our approach combines product strategy, modern engineering, and close collaboration from discovery through launch.",
  ],
}

export const mission =
  "Our mission is to turn complex ideas into reliable digital products with measurable business impact."

export const cultureStatement =
  "Our workplace culture is collaborative, low-ego, and feedback-driven. We value ownership, thoughtful communication, and continuous improvement in every engagement."

export type ValueIconName = "Lightbulb" | "Rocket" | "Shield"

export const values: Array<{
  title: string
  description: string
  icon: ValueIconName
}> = [
  {
    title: "Clarity",
    description: "We keep communication and decisions simple, direct, and actionable.",
    icon: "Lightbulb",
  },
  {
    title: "Ownership",
    description: "We act proactively and stay accountable from strategy through delivery.",
    icon: "Rocket",
  },
  {
    title: "Impact",
    description: "We prioritize work that creates measurable outcomes for users and the business.",
    icon: "Shield",
  },
]

export const teamPreview = {
  title: "Meet The Team",
  description:
    "The cross-functional team behind our strategy, design, and engineering delivery.",
  ctaLabel: "View All Team Members",
  ctaHref: "/teams",
}