'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function SignBoard() {
  return (
    <section className="py-16 bg-[#fef6f2] dark:bg-gray-950 text-gray-900 dark:text-white px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-red-600 mb-6"
        >
          Señalización Turística de la Ruta
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="rounded-xl overflow-hidden border border-red-300 shadow-md"
        >
          <Image
            src="/images/letrero.png"
            alt="Letrero turístico de la Ruta de la Frutilla"
            width={800}
            height={600}
            className="mx-auto"
          />
        </motion.div>

        <p className="text-lg mt-6 max-w-3xl mx-auto">
          Este letrero está ubicado en la comunidad de <strong>Tolomosa Grande</strong>. Fue diseñado para destacar el inicio de la ruta y está construido sobre una base de concreto, con una placa metálica resistente al clima, incluyendo el logotipo y la identidad visual del proyecto.
        </p>
      </div>
    </section>
  )
}
