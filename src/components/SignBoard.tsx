'use client'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import Map, { Marker, NavigationControl, Source, Layer } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { paradas } from '@/data/paradas'
import { X, MapPin } from 'lucide-react'

// Coordenadas mapeadas por ID de parada: [longitud, latitud]
const coordsMap: Record<number, [number, number]> = {
  1: [-64.77309619451307, -21.623307648349506],
  2: [-64.76343889188541, -21.620660668070645],
  3: [-64.73200228832951, -21.533959015084026],
  4: [-64.73237594599293, -21.511310051945838],
  5: [-64.70789482008038, -21.554869716554695],
  1.1: [-64.77546201822129, -21.628319380275666],
  1.2: [-64.76981690663243, -21.62832823107448],
  2.1: [-64.76262288716805, -21.62133688840548],
  2.5: [-64.76750048865921, -21.592686216644207]
}

const routeCoordinates = [
  coordsMap[1], coordsMap[2], coordsMap[3], coordsMap[4], coordsMap[5]
]

export default function SignBoard() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const [popupInfo, setPopupInfo] = useState<any>(null)
  const [routeData, setRouteData] = useState<any>(null)

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const coordsString = routeCoordinates.map(c => c.join(',')).join(';')
        const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson`)
        const data = await res.json()
        if (data.routes && data.routes.length > 0) {
          setRouteData({
            type: 'Feature',
            properties: {},
            geometry: data.routes[0].geometry
          })
        }
      } catch (err) {
        console.error("Error fetching route:", err)
        setRouteData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routeCoordinates
          }
        })
      }
    }
    fetchRoute()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / (width / 2)
    const y = (e.clientY - top - height / 2) / (height / 2)
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 })
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 })

  const rotateX = useTransform(smoothY, [-1, 1], [15, -15])
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15])

  return (
    <>
      <section className="py-32 bg-background text-foreground px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full max-w-3xl h-[600px] bg-frutilla-500/5 blur-[200px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-spatial-light to-frutilla-200 mb-6">
              Punto Cero: Señalización & Coordenadas
            </h2>
            <p className="text-lg md:text-xl text-spatial-light/70 max-w-3xl mx-auto font-light">
              Explora el monolito en 3D y descubre la red de caminos a través de la cartografía satelital inmersiva.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-16 items-start">
            
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-frutilla-500 mb-2">Visor 3D del Letrero Original</h3>
              <p className="text-sm text-spatial-light/60 mb-6">Interactúa con el ratón para rotar el monolito.</p>
              
              <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="perspective-container relative w-full max-w-4xl mx-auto aspect-video rounded-3xl cursor-crosshair group flex items-center justify-center"
              >
                <motion.div
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                  className="w-full h-full relative rounded-2xl overflow-hidden glass-effect border border-frutilla-500/20 shadow-[0_0_40px_rgba(255,46,91,0.2)]"
                >
                  <Image
                    src="/images/letrero.png"
                    alt="Letrero turístico de la Ruta de la Frutilla"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="pointer-events-none"
                  />
                  <motion.div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: useTransform(
                        () => `radial-gradient(circle at ${(mouseX.get() + 1) * 50}% ${(mouseY.get() + 1) * 50}%, rgba(255, 46, 91, 0.3) 0%, transparent 60%)`
                      )
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-frutilla-500 mb-2">Cartografía Satelital</h3>
              <p className="text-sm text-spatial-light/60 mb-6">Nodos principales <span className="text-frutilla-500 font-bold">(Magenta)</span> y sitios de interés <span className="text-spatial-light/80 font-bold">(Azul Eléctrico)</span>. Rutas trazadas sobre los caminos existentes. Haz clic para ver detalles.</p>
              
              <div className="relative w-full aspect-square md:aspect-video rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.05)] border border-spatial-light/10 glass-effect p-2">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                  <Map
                    initialViewState={{
                      longitude: -64.745,
                      latitude: -21.575,
                      zoom: 11
                    }}
                    mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
                    interactive={true}
                  >
                    <NavigationControl position="bottom-right" />
                    
                    {routeData && (
                      <Source id="ruta-frutilla" type="geojson" data={routeData}>
                        <Layer
                          id="ruta-glow"
                          type="line"
                          paint={{
                            'line-color': '#FF2E5B',
                            'line-width': 8,
                            'line-blur': 10,
                            'line-opacity': 0.6
                          }}
                        />
                        <Layer
                          id="ruta-core"
                          type="line"
                          paint={{
                            'line-color': '#FFF',
                            'line-width': 3,
                          }}
                        />
                      </Source>
                    )}

                    {paradas.map((parada) => {
                      const coords = coordsMap[parada.id]
                      if (!coords) return null
                      
                      const isMain = Number.isInteger(parada.id)

                      return (
                        <Marker 
                          key={parada.id} 
                          longitude={coords[0]} 
                          latitude={coords[1]} 
                          anchor="bottom"
                          onClick={e => {
                            e.originalEvent.stopPropagation();
                            setPopupInfo({ ...parada, coords });
                          }}
                        >
                          <div className="relative group cursor-pointer flex flex-col items-center">
                            <div className={`absolute top-0 w-12 h-12 -mt-4 rounded-full blur-xl opacity-30 group-hover:opacity-70 animate-pulse transition-opacity ${isMain ? 'bg-frutilla-500' : 'bg-blue-500'}`}></div>
                            <div className={`relative w-4 h-4 border-2 border-white rounded-full shadow-lg ${isMain ? 'bg-frutilla-500' : 'bg-blue-500 opacity-80'}`}></div>
                          </div>
                        </Marker>
                      )
                    })}
                  </Map>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Holográfico para Detalles del Mapa */}
      <AnimatePresence>
        {popupInfo && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-spatial-dark/80 backdrop-blur-md"
              onClick={() => setPopupInfo(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-background glass-effect border border-spatial-light/10 shadow-[0_0_80px_rgba(255,46,91,0.2)] rounded-[2rem] overflow-hidden flex flex-col"
            >
              {/* Encabezado Imagen */}
              <div className="relative w-full h-64 bg-spatial-dark">
                <Image 
                  src={popupInfo.imagen} 
                  alt={popupInfo.nombre} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  className="opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <button
                  onClick={() => setPopupInfo(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-frutilla-500 text-white rounded-full backdrop-blur-md transition-colors border border-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Contenido */}
              <div className="p-8 -mt-12 relative z-10 flex flex-col gap-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 text-frutilla-500 text-sm font-bold uppercase tracking-widest mb-2">
                    <MapPin size={16} />
                    <span>{popupInfo.lugar}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-spatial-light mb-4">{popupInfo.nombre}</h3>
                  <p className="text-spatial-light/70 font-light leading-relaxed mb-6">
                    {popupInfo.descripcion}
                  </p>
                  
                  {popupInfo.actividades && (
                    <div>
                      <h4 className="text-sm font-bold text-white/90 mb-3 border-b border-white/10 pb-2">Actividades Destacadas</h4>
                      <ul className="space-y-2">
                        {popupInfo.actividades.map((act: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-spatial-light/80">
                            <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-frutilla-500 shrink-0" /> 
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setPopupInfo(null)}
                  className="mt-2 w-full py-4 rounded-xl bg-gradient-to-r from-frutilla-600 to-frutilla-500 hover:from-frutilla-500 hover:to-frutilla-400 text-white font-bold text-sm tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,46,91,0.3)] hover:shadow-[0_0_30px_rgba(255,46,91,0.5)]"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
