// src/components/Hero.tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      <Image
        src="/images/fondo.jpg"
        alt="Fondo Ruta Frutilla"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-80"
        priority
      />
      <div className="z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/logo-frutilla.png"
            alt="Logo Ruta de la Frutilla"
            width={400}
            height={400}
            className="mx-auto mb-4"
          />
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Ruta de la Frutilla</h1>
          <p className="text-lg md:text-2xl mt-2 font-medium italic">“El sabor dulce de la vida”</p>
        </motion.div>
      </div>
    </section>
  )
}
