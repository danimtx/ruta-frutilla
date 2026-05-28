'use client'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'

function PosterCard({ src, index }: { src: string, index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[2/3] rounded-3xl cursor-pointer group perspective-container"
    >
      <div className="absolute inset-0 bg-frutilla-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: "translateZ(-50px)" }} />
      
      <div className="relative w-full h-full rounded-3xl overflow-hidden glass-effect border border-spatial-light/10 shadow-2xl transition-all duration-500">
        <Image
          src={src}
          alt={`Póster Promocional ${index + 1}`}
          fill
          style={{ objectFit: 'cover' }}
          className="scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
        />
        
        {/* Capa de reflejo tipo cristal */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  )
}

export default function PromocionRuta() {
  const posters = [
    '/promocion/poster1.png',
    '/promocion/poster2.png',
    '/promocion/poster3.png'
  ]

  return (
    <section className="py-32 bg-background relative overflow-hidden text-foreground px-6">
      {/* Luces Ambientales */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-frutilla-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-bold tracking-widest text-frutilla-500 uppercase mb-4">Galería Visual</p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-spatial-light to-frutilla-200 mb-6 leading-tight">
            Sé parte de nuestra <br className="hidden md:block" />
            <span className="italic font-light">Aventura Frutillosa</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4 md:px-0">
          {posters.map((src, i) => (
            <PosterCard key={i} src={src} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
