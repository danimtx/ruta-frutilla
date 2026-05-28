// src/app/layout.tsx
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
})

export const metadata = {
  title: 'Ruta de la Frutilla - Tarija',
  description: 'El sabor dulce de la vida - Experiencia turística inmersiva 3D en Tarija, Bolivia',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${outfit.variable} ${plusJakarta.variable} font-sans bg-[#FAFAFA] text-[#050505] dark:bg-[#0A0608] dark:text-[#F0F0F0] transition-colors duration-500 antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
