'use client'
import { paradas } from '@/data/paradas'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function RutaSection() {
  return (
    <section className="bg-white dark:bg-gray-900 py-5 px-4 text-gray-900 dark:text-white">
        <div className='mt-0 text-center'>
            <h3 className="text-2xl font-bold text-red-600 mb-4">Actividades de la Ruta</h3>
        </div>
      <div className="max-w-6xl mx-auto space-y-24">
        {paradas.map((parada, index) => (
          <motion.div
            key={parada.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <Image
              src={parada.imagen}
              alt={parada.nombre}
              width={550}
              height={350}
              className="rounded-lg shadow-lg object-cover border border-red-200 dark:border-red-800"
            />
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-red-600 mb-2">{parada.nombre}</h3>
              <p className="text-base md:text-lg mb-4">{parada.descripcion}</p>
              {parada.actividades?.length > 0 && (
                <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                  {parada.actividades.map((actividad, i) => (
                    <li key={i}>{actividad}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
