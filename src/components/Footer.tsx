'use client'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative bg-background overflow-hidden border-t border-spatial-light/10 pt-20 pb-10">
      {/* Luz Ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-frutilla-500/5 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Card Glassmorphism Contenedora */}
        <div className="w-full glass-effect rounded-[2rem] p-8 md:p-12 border border-spatial-light/5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col items-center text-center space-y-8">
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-frutilla-500/20 blur-xl rounded-full" />
            <Image
              src="/logo-frutilla.png"
              alt="Logo Ruta de la Frutilla"
              width={90}
              height={90}
              className="rounded-full relative border border-white/10"
            />
          </motion.div>

          <div className="space-y-2">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-spatial-light/70">
              Ruta de la Frutilla
            </h3>
            <p className="text-spatial-light/60 font-light tracking-wide uppercase text-sm">
              Tarija, Bolivia
            </p>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-frutilla-500/50 to-transparent" />

          <div className="text-sm font-light text-spatial-light/70 space-y-1">
            <p className="font-medium text-spatial-light/90">Facultad de Humanidades – UAJMS</p>
            <p>Grupo <strong className="text-frutilla-500 font-bold">Parque Nacional Amboró</strong></p>
            <p className="text-xs opacity-70">Competencias Comunicativas Para el Turismo – 2025</p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 w-full max-w-md flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-spatial-light/40 italic">
              © 2025 Todos los derechos reservados.
            </p>
            
            <a
              href="https://github.com/danimtx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-spatial-light/60 hover:text-frutilla-400 transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-frutilla-500/30"
            >
              <FaGithub size={18} />
              <span className="text-sm font-medium">danimtx</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}
