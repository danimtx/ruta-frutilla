// src/components/IntroRuta.tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function IntroRuta() {
  return (
    <section className="bg-[#fff8f2] dark:bg-gray-900 py-16 px-4 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="md:w-1/2"
        >
          <h2 className="text-3xl font-bold text-red-600 mb-4">Ubicación de la Ruta</h2>
          <p className="text-lg">
            La <strong>Ruta de la Frutilla</strong> se encuentra localizada en el departamento de Tarija, al sur de Bolivia. Se desarrolla en la provincia de <strong>Cercado</strong> y recorre comunidades rurales como <em>Tolomosa Grande</em>, así como zonas urbanas dentro del centro de Tarija, el barrio <strong>3 de mayo</strong> y <strong>San Gerónimo</strong>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="md:w-1/2"
        >
          <Image
            src="/images/mapa-tarija.jpg"
            alt="Mapa de la ruta en Tarija"
            width={600}
            height={400}
            className="rounded-lg shadow-md border border-red-200"
          />
        </motion.div>
      </div>

      {/* Lista de puntos de la ruta */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 1 }}
        className="max-w-4xl mx-auto mt-12"
      >
        <h3 className="text-2xl font-bold text-red-600 mb-4 text-center">La ruta sigue los siguientes puntos:</h3>
        <ol className="list-decimal list-inside text-lg space-y-2">
          <li><strong>Finca de Frutilla de don Samuel Maraz</strong> – Tolomosa Grande</li>
          <li><strong>GUZMÁN – Tradición de familia</strong> – A 4 km de Tolomosa Grande</li>
          <li><strong>The Cake</strong> – Cafetería temática en el centro de Tarija</li>
          <li><strong>Bodega El PAICHEÑO</strong> – Barrio 3 de mayo</li>
          <li><strong>Bodega La CHAPAQUITA</strong> – Barrio San Gerónimo</li>
        </ol>
      </motion.div>

              {/* Tipo de ruta */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-red-600 mb-4">Tipo de Ruta</h3>
          <p className="text-lg max-w-3xl mx-auto">
            La Ruta de la Frutilla es una propuesta <strong>agro-ecoturística y gastronómica</strong> que recorre zonas del municipio de Cercado en el departamento de Tarija. Se centra en la fruta de la frutilla y combina paisajes naturales, cultura productiva local y gastronomía tradicional.
          </p>
        </div>
    </section>
  )
}
