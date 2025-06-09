'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-lg ${
          scrolled
            ? 'bg-pink-100/95 dark:bg-pink-800/90 shadow-md'
            : 'bg-gradient-to-r from-rose-200 via-pink-300 to-rose-300 dark:from-pink-900 dark:via-rose-800 dark:to-pink-900'
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center px-4 py-3 space-y-2">
          <motion.div
            animate={{ rotate: scrolled ? 0 : 360 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <Image
              src="/logo-frutilla.png"
              alt="Logo Ruta de la Frutilla"
              width={65}
              height={65}
              className="rounded-full border border-white shadow-lg"
            />
          </motion.div>
        </div>
      </motion.header>
    </AnimatePresence>
  )
}
