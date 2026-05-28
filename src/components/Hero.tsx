'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    // Normalizamos coordenadas de -1 a 1 para rotaciones precisas
    const x = (e.clientX - left - width / 2) / (width / 2)
    const y = (e.clientY - top - height / 2) / (height / 2)
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Físicas elásticas (Springs) para movimiento sedoso y natural
  const springConfig = { damping: 25, stiffness: 120, mass: 1 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // Rotaciones 3D para el contenido principal (Tilt effect)
  const rotateX = useTransform(smoothY, [-1, 1], [15, -15]) // Inclinación Arriba/Abajo
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]) // Inclinación Izq/Der
  
  // Parallax inverso y sutil para el fondo
  const backgroundX = useTransform(smoothX, [-1, 1], ["-1.5%", "1.5%"])
  const backgroundY = useTransform(smoothY, [-1, 1], ["-1.5%", "1.5%"])

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-spatial-dark perspective-container"
    >
      {/* Fondo Profundo con Parallax */}
      <motion.div 
        className="absolute inset-[-5%] z-0"
        style={{ x: backgroundX, y: backgroundY }}
      >
        <Image
          src="/images/fondo.jpg"
          alt="Fondo Ruta Frutilla"
          fill
          style={{ objectFit: 'cover' }}
          className="opacity-40 dark:opacity-20"
          priority
        />
        {/* Máscaras de Gradiente para integrarse con la página */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-100"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-spatial-dark/80 to-transparent"></div>
      </motion.div>

      {/* Contenedor 3D Flotante (Zero-Gravity) */}
      <div className="z-10 px-4 w-full max-w-4xl">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex flex-col items-center text-center"
        >
          {/* Halo de Luz Neón Ambiental (Ambient Glow) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-frutilla-500/20 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div 
            className="mb-8 relative"
            style={{ translateZ: 120 }} // Altamente despegado de la pantalla
          >
            <Image
              src="/logo-frutilla.png"
              alt="Logo Ruta de la Frutilla"
              width={220}
              height={220}
              className="drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          <motion.h1 
            style={{ translateZ: 80 }} 
            className="font-display text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-spatial-light via-spatial-light to-frutilla-100 drop-shadow-2xl mb-4 leading-tight uppercase"
          >
            Ruta de la <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-frutilla-500 to-frutilla-700 filter drop-shadow-[0_0_15px_rgba(255,46,91,0.5)]">
              Frutilla
            </span>
          </motion.h1>

          <motion.p 
            style={{ translateZ: 40 }}
            className="text-lg md:text-xl lg:text-2xl mt-4 font-sans font-light text-spatial-light/80 max-w-2xl drop-shadow-md"
          >
            Descubre el sabor dulce de la vida en una experiencia interactiva sin límites.
          </motion.p>
          
          <motion.button 
            style={{ translateZ: 100 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 40px -5px rgba(255,46,91,0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 px-10 py-4 bg-frutilla-500 text-spatial-light font-bold rounded-full shadow-[0_0_30px_-5px_rgba(255,46,91,0.4)] border border-frutilla-500/80 transition-all uppercase tracking-[0.2em] text-sm"
          >
            Iniciar Viaje Espacial
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
