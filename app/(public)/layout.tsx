import { BottomNav } from '@/features/navigation'
import React from 'react'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <div className="md:hidden">
        <BottomNav currentPath="/" />
      </div>
    </div>
  )
}