'use client'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { motion } from 'framer-motion'

export default function VideoRuta() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <section className="py-16 bg-[#fefefe] dark:bg-gray-900 text-gray-900 dark:text-white px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-red-600 mb-4"
        >
          Video Promocional de la Ruta
        </motion.h2>

        {isClient && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg border border-red-300"
          >
            <ReactPlayer
              url="https://youtu.be/Oj7h3htMp8M?si=n0KZcaAH6yyiPaGC"
              width="100%"
              height="100%"
              controls
            />
          </motion.div>
        )}

        <p className="text-sm mt-4 italic text-gray-600 dark:text-gray-300">
          Elaborado por el grupo <strong>Parque Nacional Amboró</strong>.
        </p>
      </div>
    </section>
  )
}
