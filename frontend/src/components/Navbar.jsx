import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { name: 'Platform', path: '/dashboard' },
    { name: 'Intelligence', path: '/map' },
    { name: 'Forecasting', path: '/forecast' },
    { name: 'Advisory', path: '/advisory' },
  ]

  const isActive = (path) => {
    return location.pathname.startsWith(path)
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-background/70 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Globe className="h-4 w-4 text-foreground group-hover:text-primary transition-colors" />
              </div>
              <span className="font-semibold text-[15px] tracking-tight">UrbanSense</span>
            </Link>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-1 glass-card px-2 py-1 rounded-full">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-white/10 text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* CTA / Gov Portal */}
          <div className="hidden md:flex items-center">
            <Link
              to="/government/login"
              className="px-4 py-2 rounded-full text-[13px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-95"
            >
              Sign In
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/5"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive(link.path)
                      ? 'bg-white/10 text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-white/10">
                <Link
                  to="/government/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2 rounded-lg text-sm font-medium bg-foreground text-background"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
