/**
 * Format date to human-readable format (Indonesian locale)
 * @param createdAt - ISO date string
 * @returns Formatted date string (e.g., "28 Mar 2026")
 */
export function formatCreatedAt(createdAt: string): string {
const date = new Date(createdAt)

if (Number.isNaN(date.getTime())) {
return "Unknown date"
}

return new Intl.DateTimeFormat("id-ID", {
day: "2-digit",
month: "short",
year: "numeric",
}).format(date)
}
