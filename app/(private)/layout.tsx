import { Header } from '@/features/header'
import { Footer } from '@/features/footer'
import React from 'react'

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}