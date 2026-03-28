import { createBrowserRouter } from "react-router-dom"
import PageLayout from "@/components/layout/PageLayout"
import HomePage from "@/pages/HomePage"
import AboutPage from "@/pages/AboutPage"
import ServicesPage from "@/pages/ServicesPage"
import TeamsPage from "@/pages/TeamsPage"
import BlogListPage from "@/pages/BlogListPage"
import BlogDetailPage from "@/pages/BlogDetailPage"
import CreateBlogPage from "@/pages/CreateBlogPage"
import LoginPage from "@/pages/LoginPage"
import { AuthRouteGuard, GuestRouteGuard } from "@/app/routeGuards"


export const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "services",
        element: <ServicesPage />
      },
      {
        path: "teams",
        element: <TeamsPage />
      },
      {
        path: "blog",
        element: <BlogListPage />
      },
      {
        path: "blog/:id",
        element: <BlogDetailPage />
      },
      {
        element: <AuthRouteGuard />,
        children: [
          {
            path: "blog/create",
            element: <CreateBlogPage />
          }
        ]
      },
      {
        element: <GuestRouteGuard />,
        children: [
          {
            path: "login",
            element: <LoginPage />
          }
        ]
      }
    ]
  }
])