import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import '@/lib/fontawesome'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/providers/AuthProvider'

config.autoAddCss = false

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qui fait quoi",
  description: "Posez vos questions sur vos incidents locatifs",
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
      <body className={manrope.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
