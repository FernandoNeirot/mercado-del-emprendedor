import { Footer } from '@/features/footer'
import { Header } from '@/features/header'
import { BottomNav } from '@/features/navigation'
import { getServerUser } from '@/shared/lib/auth'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerUser()
  return (
    <div>
      <Header initialUser={user} />
      {children}
      <div className="md:hidden">
        <BottomNav currentPath="/" /> 
      </div>
      <Footer />
    </div>
  )
}