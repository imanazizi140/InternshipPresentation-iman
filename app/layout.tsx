import { Caveat, Geist_Mono, Manrope } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: "600",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, manrope.variable, caveat.variable)}
    >
      <body className={cn(manrope.className, "font-sans")}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
