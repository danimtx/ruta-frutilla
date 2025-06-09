'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function ChatBot() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => setIsOpen(prev => !prev)

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
        text: data?.reply || 'Lo siento, no se pudo generar una respuesta.',
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error en el chatbot:', error)
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: 'Hubo un problema al conectar con el asistente.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end w-full max-w-[calc(100vw-2rem)] sm:max-w-[320px] px-2">
      {/* Botón flotante */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 bg-transparent rounded-full shadow-md border-2 border-pink-300 hover:scale-105 transition-transform"
      >
        <Image
          src="/frutillin.png" // asegurarte que esté en /public
          alt="Frutillín Bot"
          width={56}
          height={56}
          className="rounded-full"
        />
      </button>

      {/* Chat */}
      {isOpen && (
        <div className="mt-2 w-full sm:w-[320px] bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-pink-300 dark:border-pink-700 p-4 animate-fade-in">
          <h3 className="text-lg font-bold mb-2 text-pink-600 dark:text-pink-300">Frutillín 🍓</h3>

          <div className="h-52 overflow-y-auto mb-3 space-y-1 text-sm">
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
                <span
                  className={`inline-block px-3 py-1 rounded-lg max-w-[90%] break-words ${
                    msg.sender === 'user'
                      ? 'bg-pink-100 text-gray-800'
                      : 'bg-rose-100 dark:bg-pink-800 text-gray-900 dark:text-white'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <p className="text-gray-500 italic">Frutillín está escribiendo...</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              className="flex-1 px-3 py-1 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu pregunta..."
            />
            <button
              onClick={handleSend}
              className="px-3 py-1 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
