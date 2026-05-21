'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type CompanyContextType = {
  currentCompany: string
  setCurrentCompany: (company: string) => void
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined)

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [currentCompany, setCurrentCompany] = useState('screed') // default

  useEffect(() => {
    const stored = localStorage.getItem('currentCompany')
    if (stored) setCurrentCompany(stored)
  }, [])

  const handleSetCompany = (company: string) => {
    setCurrentCompany(company)
    localStorage.setItem('currentCompany', company)
  }

  return (
    <CompanyContext.Provider value={{ currentCompany, setCurrentCompany: handleSetCompany }}>
      {children}
    </CompanyContext.Provider>
  )
}

export function useCompany() {
  const context = useContext(CompanyContext)
  if (!context) throw new Error('useCompany must be used within CompanyProvider')
  return context
}