'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LocalizacionRuta() {
  return (
    <section className="py-16 bg-[#fef6f2] dark:bg-gray-950 text-gray-900 dark:text-white px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-red-600 mb-4 text-center"
        >
          Localización de la Ruta
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg text-center max-w-3xl mx-auto"
        >
          La ruta de la frutilla está localizada en el municipio de <strong>Cercado</strong>, iniciando en la comunidad de <strong>Tolomosa</strong> ubicada a unos 14 km de la ciudad de Tarija. Continúa por el centro de la ciudad, y el barrio 3 de mayo para finalizar en el barrio <strong>San Geronimo</strong>. El recorrido se realiza a una altitud promedio de <strong>1850 msnm</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <Image
            src="/images/mapa.png"
            alt="Mapa de la ruta de la frutilla"
            width={800}
            height={600}
            className="rounded-xl border border-red-300 shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  )
}
