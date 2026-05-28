'use client'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send } from 'lucide-react'

export default function ChatBot() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'bot', text: '¡Hola! Soy Frutillín, tu asistente espacial en la Ruta de la Frutilla. ¿En qué te ayudo hoy?' }
  ])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const toggleChat = () => setIsOpen(prev => !prev)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMessage = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      const data = await res.json()
      const botMessage = {
        sender: 'bot',
        text: data?.reply || 'Interferencia espacial... no pude generar una respuesta.',
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Conexión holográfica fallida.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col rounded-3xl overflow-hidden glass-effect border border-frutilla-500/30 shadow-[0_10px_50px_rgba(255,46,91,0.2)]"
          >
            {/* Header Holográfico */}
            <div className="bg-spatial-dark/50 backdrop-blur-md p-4 flex items-center justify-between border-b border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-frutilla-500/20 to-transparent pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <Image src="/frutillin.png" alt="Frutillín" width={40} height={40} className="rounded-full shadow-[0_0_15px_#FF2E5B]" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-spatial-dark"></span>
                </div>
                <div>
                  <h3 className="font-bold text-spatial-light leading-none">Frutillín AI</h3>
                  <span className="text-[10px] text-frutilla-500 uppercase tracking-widest font-bold">En Línea</span>
                </div>
              </div>
              <button onClick={toggleChat} className="relative z-10 p-2 text-spatial-light/60 hover:text-white transition-colors hover:bg-white/10 rounded-full">
                <X size={20} />
              </button>
            </div>

            {/* Area de Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-frutilla-500/30 scrollbar-track-transparent">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-br from-frutilla-500 to-frutilla-700 text-white rounded-tr-sm shadow-[0_5px_15px_rgba(255,46,91,0.3)]' 
                        : 'bg-spatial-light/10 text-spatial-light rounded-tl-sm border border-white/5 backdrop-blur-md'
                    }`}>
                      <p className="text-sm font-light leading-relaxed">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {loading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-spatial-light/5 backdrop-blur-md px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-frutilla-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-frutilla-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-frutilla-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-4 bg-spatial-dark/80 backdrop-blur-md border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  className="w-full bg-spatial-light/5 border border-white/10 rounded-full px-5 py-3 pr-12 text-spatial-light placeholder-spatial-light/40 focus:outline-none focus:border-frutilla-500/50 focus:ring-1 focus:ring-frutilla-500/50 transition-all text-sm"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Inicia transmisión..."
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="absolute right-2 p-2 bg-frutilla-500 hover:bg-frutilla-400 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante Pulsante */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 relative flex items-center justify-center bg-spatial-dark rounded-full border-2 border-frutilla-500 shadow-[0_0_30px_rgba(255,46,91,0.4)] group overflow-hidden"
      >
        {!isOpen ? (
          <>
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(255,46,91,0.5)_360deg)] opacity-50"
            />
            <Image src="/frutillin.png" alt="Frutillín Bot" width={56} height={56} className="rounded-full relative z-10" />
          </>
        ) : (
          <X size={28} className="text-frutilla-500" />
        )}
      </motion.button>
    </div>
  )
}
