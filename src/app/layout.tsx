import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Kaique Marlon | Desenvolvedor Full Stack",
  description:
    "Portfolio de Kaique Marlon - Desenvolvedor Full Stack especializado em React, Next.js, TypeScript e soluções web modernas. Baseado em Fortaleza-CE.",
  keywords: [
    "Desenvolvedor Full Stack",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Fortaleza",
    "Kaique Marlon",
  ],
  authors: [{ name: "Kaique Marlon" }],
  creator: "Kaique Marlon",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://seu-dominio.com",
    title: "Kaique Marlon | Desenvolvedor Full Stack",
    description:
      "Portfolio de Kaique Marlon - Desenvolvedor Full Stack especializado em React, Next.js, TypeScript e soluções web modernas.",
    siteName: "Kaique Marlon Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaique Marlon | Desenvolvedor Full Stack",
    description:
      "Portfolio de Kaique Marlon - Desenvolvedor Full Stack especializado em React, Next.js, TypeScript e soluções web modernas.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "seu-codigo-google-aqui", // Adicione seu código de verificação do Google
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
