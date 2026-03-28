import LoginForm from "@/features/auth/components/LoginForm"

function LoginPage() {
  return (
    <main className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_35%)]" />

      <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <LoginForm mode="login" />
      </section>
    </main>
  )
}

export default LoginPage