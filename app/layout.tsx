import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import '@/lib/fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ThemeProvider } from '@/components/theme-provider'

// Désactiver l'ajout automatique de CSS par Font Awesome
config.autoAddCss = false

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qui fait quoi - Dashboard",
  description: "Dashboard de gestion Qui fait quoi",
  icons: {
    icon: '/logo-default.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel='icon' href='/logo-default.png' type='image/png' />
      </head>
      <body className={`${manrope.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
