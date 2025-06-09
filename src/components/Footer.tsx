'use client'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-red-100 dark:bg-gray-800 py-10 px-4 text-gray-800 dark:text-gray-200 mt-20 border-t border-red-300 dark:border-gray-600">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4 text-center">

        {/* Logo principal */}
        <Image
          src="/logo-frutilla.png"
          alt="Logo Ruta de la Frutilla"
          width={80}
          height={80}
          className="rounded-full"
        />

        {/* Título */}
        <p className="text-lg font-semibold">
          Ruta de la Frutilla – Tarija, Bolivia
        </p>

        {/* Información académica */}
        <p className="text-sm leading-relaxed">
          <strong>Facultad de Humanidades – UAJMS</strong><br />
          Grupo <strong>Parque Nacional Amboró</strong><br />
          Competencias Comunicativas Para el Turismo – 2025
        </p>

        {/* Logos y desarrollador */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4">

          {/* GitHub */}
          <div className="flex items-center space-x-2">
            
            <a
              href="https://github.com/danimtx"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-sm font-medium"
            >
              Desarrollado por <strong>danimtx</strong>
            </a>
            <FaGithub size={24} />
          </div>
          
        </div>
        {/* Copyright */}
<div className="text-sm italic text-gray-600 dark:text-gray-400">
  © 2025 Todos los derechos reservados.
</div>
      </div>
    </footer>
  )
}
