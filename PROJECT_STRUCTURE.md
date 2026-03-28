# Company Profile - Project Structure

```
src/
│
├── app/
│   ├── navigations.ts          # Route navigation definitions
│   ├── providers.tsx           # Global providers wrapper
│   └── router.tsx              # Route configuration
│
├── components/
│   │
│   ├── layout/
│   │   ├── Navbar.tsx          # Navigation bar component
│   │   ├── Footer.tsx          # Footer component
│   │   ├── MobileMenu.tsx      # Mobile navigation menu
│   │   ├── Container.tsx       # Layout container wrapper
│   │   ├── NavLinkItem.tsx     # Navigation link item
│   │   └── PageLayout.tsx      # Main page layout wrapper
│   │
│   └── ui/
│       ├── avatar.tsx          # Avatar component
│       ├── button.tsx          # Button component
│       ├── button-group.tsx    # Button group component
│       ├── card.tsx            # Card component
│       ├── input.tsx           # Input field component
│       ├── input-group.tsx     # Input group component
│       ├── select.tsx          # Select dropdown component
│       ├── textarea.tsx        # Textarea component
│       ├── separator.tsx       # Separator component
│       ├── scroll-area.tsx     # Scroll area component
│       └── sheet.tsx           # Sheet/modal component
│
├── sections/
│   │
│   ├── home/
│   │   ├── HeroSection.tsx              # Hero banner section
│   │   ├── CompanyOverviewSection.tsx   # Company overview section
│   │   ├── ServicesPreviewSection.tsx   # Services preview section
│   │   ├── TestimonialsSection.tsx      # Testimonials section
│   │   └── CTASection.tsx               # Call to action section
│   │
│   ├── services/
│   │   ├── ServicesHero.tsx             # Services page hero
│   │   ├── ServicesGrid.tsx             # Grid layout for services
│   │   ├── ServiceCard.tsx              # Individual service card
│   │   ├── PricingSection.tsx           # Pricing section
│   │   ├── PricingCard.tsx              # Individual pricing card
│   │   ├── ServiceTestimonials.tsx      # Services testimonials
│   │   └── WhyChooseUs.tsx              # Why choose us section
│   │
│   ├── aboutus/                         # About us page sections (placeholder)
│   │
│   └── teams/                           # Team page sections (placeholder)
│
├── features/
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginForm.tsx            # Login form component
│   │   │
│   │   ├── store/
│   │   │   └── authStore.ts            # Auth state management store
│   │   │
│   │   ├── services/
│   │   │   └── authService.ts          # Auth API services
│   │   │
│   │   └── types/
│   │       └── auth.types.ts           # Auth TypeScript types
│   │
│   ├── blog/
│   │   ├── components/
│   │   │   ├── BlogCard.tsx            # Blog card component
│   │   │   ├── BlogGrid.tsx            # Blog grid layout
│   │   │   └── BlogHeader.tsx          # Blog page header
│   │   │
│   │   ├── hooks/
│   │   │   └── useBlogs.ts             # Custom hook for blog data
│   │   │
│   │   ├── services/
│   │   │   └── blogService.ts          # Blog API services
│   │   │
│   │   └── types/
│   │       └── blog.types.ts           # Blog TypeScript types
│   │
│   ├── teams/
│   │   ├── components/
│   │   │   ├── TeamCard.tsx            # Team member card
│   │   │   └── TeamsGrid.tsx           # Teams grid layout
│   │   │
│   │   ├── services/
│   │   │   └── teamService.ts          # Teams API services
│   │   │
│   │   └── types/
│   │       └── team.types.ts           # Teams TypeScript types
│   │
│   ├── services/                        # Shared feature services (placeholder)
│   │
│   └── shared/
│       ├── FeatureCard.tsx             # Shared feature card component
│       └── TestimonialCard.tsx         # Shared testimonial card component
│
├── pages/
│   ├── HomePage.tsx                    # Home page
│   ├── AboutPage.tsx                   # About page
│   ├── ServicesPage.tsx                # Services listing page
│   ├── TeamsPage.tsx                   # Teams page
│   ├── BlogListPage.tsx                # Blog list page
│   ├── CreateBlogPage.tsx              # Create blog post page
│   └── LoginPage.tsx                   # User login page
│
├── services/
│   ├── axiosClient.ts                  # Axios HTTP client configuration
│   └── api.ts                          # API endpoints definitions
│
├── data/
│   └── services.ts                     # Static services data
│
├── hooks/                              # Custom React hooks (directory)
│
├── lib/
│   ├── design-system.ts                # Design system tokens & utilities
│   └── utils.ts                        # Utility functions
│
├── types/                              # Global TypeScript types (directory)
│
├── utils/                              # Utility functions (directory)
│
├── assets/                             # Static assets (images, fonts, etc.)
│
├── index.css                           # Global styles
│
└── main.tsx                            # React app entry point
```

## Folder Structure Explanation

### 🎨 **app/**
Global app configuration including routing and providers setup.

### 🧩 **components/**
Reusable UI components organized by purpose:
- **layout/** - Page layout components (Navbar, Footer, etc.)
- **ui/** - Low-level UI components (shadcn/ui based)

### 📄 **sections/**
Page section components that make up different pages:
- **home/** - Homepage sections
- **services/** - Services page sections
- **aboutus/** - About page sections
- **teams/** - Teams page sections

### ⚙️ **features/**
Feature-specific modules with isolated business logic:
- **auth/** - Authentication feature
- **blog/** - Blog feature
- **teams/** - Teams feature
- **shared/** - Shared feature components

Each feature follows the pattern:
- `components/` - Feature-specific components
- `services/` - API service calls
- `store/` - State management
- `types/` - TypeScript definitions
- `hooks/` - Custom hooks

### 📑 **pages/**
Top-level page components that combine sections and features.

### 🔌 **services/**
Global API services and HTTP client configuration.

### 📦 **data/**
Static data and mock data definitions.

### 🎯 **lib/**
Utility libraries for design system and helpers.

### 📚 **hooks/, types/, utils/**
Shared custom hooks, global types, and utility functions.

---

**Total: 7 Pages | 3 Major Features | 20+ UI Components | Well-organized & scalable**
