'use client'
import React, { useRef } from 'react'
import { paradas } from '@/data/paradas'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Sub-componente para la Tarjeta 3D Inclinable (Tilt Card)
function TiltCard({ parada, index }: { parada: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    // Centro = 0, Bordes = -1 o 1
    const x = (e.clientX - left - width / 2) / (width / 2)
    const y = (e.clientY - top - height / 2) / (height / 2)
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 })
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 })

  // Rango de rotación (inclinación) más sutil para las tarjetas
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8])
  const rotateY = useTransform(smoothX, [-1, 1], [-8, 8])

  const isReverse = index % 2 !== 0

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`perspective-container flex flex-col md:flex-row items-center gap-12 ${
        isReverse ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Contenedor de la Imagen con 3D Tilt */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full md:w-1/2 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-spatial-light/10 bg-spatial-dark cursor-crosshair group"
      >
        <Image
          src={parada.imagen}
          alt={parada.nombre}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        {/* Glow de interacción que sigue al cursor */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              () => `radial-gradient(circle at ${(mouseX.get() + 1) * 50}% ${(mouseY.get() + 1) * 50}%, rgba(255, 46, 91, 0.4) 0%, transparent 60%)`
            )
          }}
        />
      </motion.div>

      {/* Contenido de Texto Flotante */}
      <div className="w-full md:w-1/2 flex flex-col space-y-6 relative">
        <h3 className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-frutilla-500 to-frutilla-700">
          {parada.nombre}
        </h3>
        
        <div className="glass-effect p-6 rounded-2xl relative overflow-hidden">
           {/* Decoración sutil de cristal */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-frutilla-500/10 blur-[50px] rounded-full" />
           <p className="text-lg font-light leading-relaxed relative z-10 opacity-90">
            {parada.descripcion}
          </p>
        </div>

        {parada.actividades?.length > 0 && (
          <div className="pl-4 border-l-2 border-frutilla-500/30">
            <h4 className="text-sm uppercase tracking-widest text-frutilla-500 font-bold mb-3">Actividades</h4>
            <ul className="space-y-2">
              {parada.actividades.map((actividad: string, i: number) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex items-center text-sm font-medium opacity-80"
                >
                  <span className="w-2 h-2 rounded-full bg-frutilla-500 mr-3 shadow-[0_0_8px_rgba(255,46,91,0.8)]" />
                  {actividad}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function RutaSection() {
  return (
    <section className="bg-background py-32 px-6 text-foreground relative overflow-hidden">
      {/* Elementos ambientales de fondo */}
      <div className="absolute top-40 -left-64 w-[500px] h-[500px] bg-frutilla-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-40 -right-64 w-[500px] h-[500px] bg-frutilla-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center relative z-10"
        >
          <h2 className="font-display text-5xl md:text-6xl font-black tracking-tight mb-4">
            Nodos Espaciales
          </h2>
          <p className="text-xl font-light opacity-60">Explora los puntos interactivos de nuestro ecosistema.</p>
        </motion.div>

        <div className="space-y-40">
          {paradas.map((parada, index) => (
            <TiltCard key={parada.id} parada={parada} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
