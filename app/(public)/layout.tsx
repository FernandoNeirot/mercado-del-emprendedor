import { Footer } from '@/features/footer'
import { Header } from '@/features/header'
import { BottomNav } from '@/features/navigation'
import React from 'react'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <div className="md:hidden">
        <BottomNav currentPath="/" /> 
      </div>
      <Footer />
    </div>
  )
}