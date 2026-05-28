'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function LocalizacionRuta() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Anima la ruta a medida que el usuario hace scroll
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1])

  return (
    <section ref={containerRef} className="py-32 bg-spatial-dark text-spatial-light px-6 relative overflow-hidden">
      {/* Luz ambiental holográfica */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-frutilla-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-spatial-light to-frutilla-100 mb-6">
            Trayectoria Holográfica
          </h2>
          <p className="text-lg md:text-xl font-light text-spatial-light/70 max-w-3xl mx-auto">
            La ruta inicia en las coordenadas de <strong className="text-frutilla-500">Tolomosa</strong> (14km), atravesando el tejido urbano hacia el barrio <strong className="text-frutilla-500">San Geronimo</strong>. Altitud sostenida: 1850 msnm.
          </p>
        </motion.div>

        {/* Mapa Interactivo SVG */}
        <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] bg-spatial-dark/50 border border-spatial-light/10 rounded-3xl shadow-2xl glass-effect flex items-center justify-center p-8">
          
          <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Grilla de fondo para dar look espacial */}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Camino base difuso */}
            <path 
              d="M100,400 C300,400 300,100 500,100 C700,100 700,350 900,350" 
              stroke="rgba(255,46,91,0.2)" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeDasharray="10 10" 
            />

            {/* Camino activo animado por scroll */}
            <motion.path 
              d="M100,400 C300,400 300,100 500,100 C700,100 700,350 900,350" 
              stroke="url(#paint0_linear)" 
              strokeWidth="6" 
              strokeLinecap="round" 
              style={{ pathLength }}
              className="drop-shadow-[0_0_15px_rgba(255,46,91,0.8)]"
            />

            {/* Nodos de Paradas */}
            <g>
              <motion.circle cx="100" cy="400" r="12" fill="#FF2E5B" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.1 }} className="filter drop-shadow-[0_0_10px_#FF2E5B]" />
              <motion.circle cx="500" cy="100" r="12" fill="#FF2E5B" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.4 }} className="filter drop-shadow-[0_0_10px_#FF2E5B]" />
              <motion.circle cx="900" cy="350" r="12" fill="#FF2E5B" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.7 }} className="filter drop-shadow-[0_0_10px_#FF2E5B]" />
              
              {/* Etiquetas Holográficas */}
              <text x="100" y="435" fill="white" fontSize="16" fontFamily="var(--font-outfit)" textAnchor="middle" className="opacity-80">Tolomosa</text>
              <text x="500" y="70" fill="white" fontSize="16" fontFamily="var(--font-outfit)" textAnchor="middle" className="opacity-80">Centro Tarija</text>
              <text x="900" y="390" fill="white" fontSize="16" fontFamily="var(--font-outfit)" textAnchor="middle" className="opacity-80">San Gerónimo</text>
            </g>

            {/* Gradiente del camino */}
            <defs>
              <linearGradient id="paint0_linear" x1="100" y1="400" x2="900" y2="350" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF2E5B" />
                <stop offset="1" stopColor="#E5A93C" />
              </linearGradient>
            </defs>
          </svg>

        </div>
      </div>
    </section>
  )
}
