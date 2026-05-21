'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Play, Building2, HardHat, Calendar, FileText, Zap } from 'lucide-react'

export function Hero() {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  
  const words = ['Heizungsbau', 'Estrichbau', 'Elektrotechnik']

  useEffect(() => {
    let currentWord = words[index % words.length]
    let currentText = ''
    let i = 0
    
    const interval = setInterval(() => {
      if (i <= currentWord.length) {
        currentText = currentWord.slice(0, i)
        setText(currentText)
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setIndex(index + 1)
        }, 2000)
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [index])

  const icons = [Building2, HardHat, Calendar, FileText, Zap]

  return (
    <section className="relative min-h-screen flex items-center bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-300">KI-gestützte Plattform</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Intelligentes CRM für</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {text}
            </span>
            <span className="inline-block w-0.5 h-12 bg-purple-500 ml-1 animate-blink"></span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Eine Plattform zur Verwaltung all Ihrer Bauunternehmen.
            Automatisieren Sie Arbeitsabläufe, verwalten Sie Teams und steigern Sie Ihren Umsatz.
          </p>

          {/* Icon Row */}
          <div className="flex justify-center gap-4 mb-10">
            {icons.map((Icon, idx) => (
              <div key={idx} className="h-12 w-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <Icon className="h-6 w-6 text-blue-400" />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button className="px-8 py-3 bg-white text-black rounded-full font-semibold flex items-center hover:bg-gray-100 transition">
              Kostenlos testen
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="px-8 py-3 border border-white/20 rounded-full font-semibold flex items-center gap-2 hover:bg-white/5 transition">
              <Play className="h-4 w-4" />
              Demo ansehen
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  )
}