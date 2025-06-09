'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function PromocionRuta() {
  const posters = [
    '/promocion/poster1.png',
    '/promocion/poster2.png',
    '/promocion/poster3.png'
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-red-600 mb-8"
        >
          ¡Sé parte de nuestra aventura frutillosa!
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posters.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="overflow-hidden rounded-xl shadow-md border border-red-200"
            >
              <Image
                src={src}
                alt={`Póster ${i + 1}`}
                width={400}
                height={600}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
