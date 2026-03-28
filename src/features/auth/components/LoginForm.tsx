import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/features/auth/store/authStore"
import {
	MAX_EMAIL_LENGTH,
	MAX_PASSWORD_LENGTH,
	MIN_PASSWORD_LENGTH,
	isValidEmailFormat,
	sanitizeEmailInput,
	sanitizePasswordInput,
} from "@/features/auth/utils/authInput"

type AuthMode = "login" | "register"

type LoginFormProps = {
	mode?: AuthMode
}

type FormErrors = {
	email?: string
	password?: string
	confirmPassword?: string
}

const LAST_VISITED_PATH_KEY = "lastVisitedPath"

function isSafeRedirectPath(path: string | undefined): path is string {
	return !!path && path.startsWith("/") && path !== "/login"
}

function LoginForm({ mode = "login" }: LoginFormProps) {
	const navigate = useNavigate()
	const location = useLocation()

	const locationState = location.state as { from?: string; intentMessage?: string } | null
	const fromPath = locationState?.from
	const intentMessage = locationState?.intentMessage
	const lastVisitedPath = sessionStorage.getItem(LAST_VISITED_PATH_KEY) || undefined
	const redirectAfterAuth =
		isSafeRedirectPath(fromPath)
			? fromPath
			: isSafeRedirectPath(lastVisitedPath)
				? lastVisitedPath
			: "/"

	const isLoading = useAuthStore((state) => state.isLoading)
	const authError = useAuthStore((state) => state.error)
	const signIn = useAuthStore((state) => state.signIn)
	const signUp = useAuthStore((state) => state.signUp)
	const clearError = useAuthStore((state) => state.clearError)

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [formErrors, setFormErrors] = useState<FormErrors>({})

	const isRegisterMode = mode === "register"

	const title = useMemo(() => {
		return isRegisterMode ? "Create your account" : "Welcome back"
	}, [isRegisterMode])

	const description = useMemo(() => {
		return isRegisterMode
			? "Register with your email to start using our services."
			: "Log in to start writing blog posts."
	}, [isRegisterMode])

	useEffect(() => {
		return () => {
			clearError()
		}
	}, [clearError])

	const validateForm = (values: {
		email: string
		password: string
		confirmPassword: string
	}): FormErrors => {
		const nextErrors: FormErrors = {}
		const { email: nextEmail, password: nextPassword, confirmPassword: nextConfirmPassword } = values

		if (!nextEmail) {
			nextErrors.email = "Email is required"
		} else if (nextEmail.length > MAX_EMAIL_LENGTH) {
			nextErrors.email = `Email must be at most ${MAX_EMAIL_LENGTH} characters`
		} else if (!isValidEmailFormat(nextEmail)) {
			nextErrors.email = "Email format is invalid"
		}

		if (!nextPassword) {
			nextErrors.password = "Password is required"
		} else if (nextPassword.length < MIN_PASSWORD_LENGTH) {
			nextErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`
		} else if (nextPassword.length > MAX_PASSWORD_LENGTH) {
			nextErrors.password = `Password must be at most ${MAX_PASSWORD_LENGTH} characters`
		}

		if (isRegisterMode) {
			if (!nextConfirmPassword) {
				nextErrors.confirmPassword = "Please confirm your password"
			} else if (nextConfirmPassword !== nextPassword) {
				nextErrors.confirmPassword = "Passwords do not match"
			}
		}

		return nextErrors
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const normalizedEmail = sanitizeEmailInput(email)
		const sanitizedPassword = sanitizePasswordInput(password)
		const sanitizedConfirmPassword = sanitizePasswordInput(confirmPassword)

		clearError()
		const nextErrors = validateForm({
			email: normalizedEmail,
			password: sanitizedPassword,
			confirmPassword: sanitizedConfirmPassword,
		})
		setFormErrors(nextErrors)
		setEmail(normalizedEmail)
		setPassword(sanitizedPassword)
		setConfirmPassword(sanitizedConfirmPassword)

		if (Object.keys(nextErrors).length > 0) {
			return
		}

		try {
			if (isRegisterMode) {
				await signUp(normalizedEmail, sanitizedPassword)
			} else {
				await signIn(normalizedEmail, sanitizedPassword)
			}

			navigate(redirectAfterAuth, { replace: true })
		} catch {
			// Store already keeps error state for UI.
		}
	}

	return (
		<Card className="w-full max-w-md shadow-lg ring-1 ring-primary/10">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>

			<CardContent>
				<form className="space-y-4" onSubmit={handleSubmit} noValidate>
					<div className="space-y-1.5">
						<label htmlFor="email" className="text-sm font-medium text-foreground/90">
							Email
						</label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(event) => {
								setEmail(sanitizeEmailInput(event.target.value))
								setFormErrors((prev) => ({ ...prev, email: undefined }))
							}}
							placeholder="you@example.com"
							maxLength={MAX_EMAIL_LENGTH}
							autoComplete="email"
							aria-invalid={Boolean(formErrors.email)}
							disabled={isLoading}
						/>
						{formErrors.email ? <p className="text-xs text-destructive">{formErrors.email}</p> : null}
					</div>

					<div className="space-y-1.5">
						<label htmlFor="password" className="text-sm font-medium text-foreground/90">
							Password
						</label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(event) => {
								setPassword(sanitizePasswordInput(event.target.value))
								setFormErrors((prev) => ({ ...prev, password: undefined }))
							}}
							placeholder="Minimum 6 characters"
							maxLength={MAX_PASSWORD_LENGTH}
							autoComplete={isRegisterMode ? "new-password" : "current-password"}
							aria-invalid={Boolean(formErrors.password)}
							disabled={isLoading}
						/>
						{formErrors.password ? <p className="text-xs text-destructive">{formErrors.password}</p> : null}
					</div>

					{isRegisterMode ? (
						<div className="space-y-1.5">
							<label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/90">
								Confirm Password
							</label>
							<Input
								id="confirmPassword"
								type="password"
								value={confirmPassword}
								onChange={(event) => {
									setConfirmPassword(sanitizePasswordInput(event.target.value))
									setFormErrors((prev) => ({ ...prev, confirmPassword: undefined }))
								}}
								placeholder="Repeat your password"
								maxLength={MAX_PASSWORD_LENGTH}
								autoComplete="new-password"
								aria-invalid={Boolean(formErrors.confirmPassword)}
								disabled={isLoading}
							/>
							{formErrors.confirmPassword ? (
								<p className="text-xs text-destructive">{formErrors.confirmPassword}</p>
							) : null}
						</div>
					) : null}

					{intentMessage ? (
						<p className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm text-primary">
							{intentMessage}
						</p>
					) : null}

					{authError ? <p className="text-sm text-destructive">{authError}</p> : null}

					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? "Please wait..." : isRegisterMode ? "Register" : "Login"}
					</Button>

					<p className="text-center text-xs text-muted-foreground">
						Use your existing account to continue.
					</p>
				</form>
			</CardContent>
		</Card>
	)
}

export default LoginForm
