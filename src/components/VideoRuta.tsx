'use client'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { motion } from 'framer-motion'

export default function VideoRuta() {
  const [isClient, setIsClient] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="py-32 bg-background relative overflow-hidden text-foreground px-6 flex flex-col items-center justify-center min-h-[90vh]">
      
      {/* Luz ambiental interactiva del Teatro (Se intensifica si hay play) */}
      <motion.div 
        animate={{ opacity: isPlaying ? 0.8 : 0.2, scale: isPlaying ? 1.1 : 0.9 }}
        transition={{ duration: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-frutilla-500/20 blur-[200px] rounded-[100%] pointer-events-none" 
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-spatial-light to-frutilla-200 tracking-tight mb-4">
            Teatro Cinemático
          </h2>
          <p className="text-xl font-light opacity-60 max-w-2xl mx-auto">
            Sumérgete en la experiencia audiovisual de la Ruta, capturada en máxima resolución.
          </p>
        </motion.div>

        {isClient && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full max-w-5xl mx-auto rounded-[2rem] overflow-hidden glass-effect p-3 shadow-[0_0_80px_rgba(255,46,91,0.15)] border border-spatial-light/10"
          >
            {/* Pantalla 16:9 Real */}
            <div className="relative aspect-video w-full rounded-[1.5rem] overflow-hidden bg-spatial-dark">
              <ReactPlayer
                url="https://www.youtube.com/watch?v=Do6djJwHxfQ"
                width="100%"
                height="100%"
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            </div>
          </motion.div>
        )}

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm mt-8 text-center text-spatial-light/50 font-mono tracking-widest uppercase"
        >
          Producción Visual // <strong className="text-frutilla-500">Parque Nacional Amboró</strong>
        </motion.p>
      </div>
    </section>
  )
}
