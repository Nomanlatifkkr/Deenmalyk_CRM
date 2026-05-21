'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const hashLink = target.closest('a[href^="/#"]')
      
      if (hashLink) {
        e.preventDefault()
        const hash = hashLink.getAttribute('href')?.replace('/#', '#')
        const element = document.querySelector(hash || '')
        
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          window.history.pushState(null, '', hash || '')
        }
      }
    }

    document.addEventListener('click', handleHashClick)
    return () => document.removeEventListener('click', handleHashClick)
  }, [])

  // Handle initial hash on page load
  useEffect(() => {
    if (window.location.hash && pathname === '/') {
      const element = document.querySelector(window.location.hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [pathname])

  return null
}