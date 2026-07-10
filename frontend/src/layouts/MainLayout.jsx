import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar.jsx'

export default function MainLayout() {
  const location = useLocation()
  const isRoot = location.pathname === '/'

  return (
    <div className={`flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground ${isRoot ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
      <Navbar />
      <main className="flex-1 relative">
        <Outlet />
      </main>
      {!isRoot && (
        <footer className="border-t border-border py-8 bg-card mt-auto text-center text-sm text-muted-foreground">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} UrbanSense AI Platform. All rights reserved.</p>
          </div>
        </footer>
      )}
    </div>
  )
}
