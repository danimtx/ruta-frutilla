// src/app/page.tsx
'use client'
import Hero from '@/components/Hero'
import RutaSection from '@/components/RutaSection'
import SignBoard from '@/components/SignBoard'
import Footer from '@/components/Footer'
import IntroRuta from '@/components/IntroRuta'
import LocalizacionRuta from '@/components/LocalizacionRuta'
import VideoRuta from '@/components/VideoRuta'
import TemporalidadRuta from '@/components/TemporalidadRuta'
import PromocionRuta from '@/components/PromocionRuta'
import Navbar from '@/components/Navbar'
import ChatBot from '@/components/ChatBot'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <IntroRuta />
      <LocalizacionRuta />
      <RutaSection />
      <SignBoard />
      <TemporalidadRuta />
      <VideoRuta />
      <PromocionRuta />
      <ChatBot />
      <Footer />
    </main>
  )
}
