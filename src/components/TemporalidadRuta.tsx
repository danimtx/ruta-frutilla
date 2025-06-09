'use client'
import { motion } from 'framer-motion'

export default function TemporalidadRuta() {
  return (
    <section className="py-16 bg-[#fdf4f8] dark:bg-gray-900 text-gray-900 dark:text-white px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-red-600 mb-6"
        >
          Temporalidad de la Ruta
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg max-w-3xl mx-auto"
        >
          La Ruta de la Frutilla se puede realizar durante todo el año, sin embargo, su máximo esplendor se vive entre los meses de <strong>junio y noviembre</strong>, cuando la producción de frutilla está en plena cosecha. En este periodo el clima es templado, ideal para disfrutar de actividades al aire libre, gastronomía tradicional y paisajes naturales del valle tarijeño.
        </motion.p>
      </div>
    </section>
  )
}
