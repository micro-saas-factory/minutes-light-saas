import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Minutes Lite - Meeting Transcripts to Actionable Summaries",
  description: "Upload your transcript. Get a TL;DR, decisions, and action items in seconds.",
  icons: '/images/icon.svg'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <main className="relative min-h-screen flex flex-col">
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                style: { 
                  borderRadius: '32px',
                  padding: '12px 16px',
                  margin: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  fontSize: '1rem',
                  fontWeight: '500'
                },
                className: 'rounded-[32px]'
              }}
              richColors
            />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
