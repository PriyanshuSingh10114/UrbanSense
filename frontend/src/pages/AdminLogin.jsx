import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Settings, ArrowRight, ShieldAlert } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      navigate('/admin/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      
      {/* Background aesthetics */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="glass-panel p-10 rounded-[2rem] border border-white/10 shadow-2xl">
          <div className="mb-10 text-center">
            <div className="mx-auto h-16 w-16 bg-white/5 border border-accent/20 flex items-center justify-center rounded-2xl mb-6 shadow-inner glow-accent">
              <Settings className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              System Administration
            </h2>
            <p className="text-sm text-muted-foreground font-light">
              Root access. Connect securely.
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="relative group">
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="Root ID"
                />
              </div>
              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  placeholder="Cryptographic Key"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold text-background bg-foreground hover:bg-foreground/90 transition-all disabled:opacity-70 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center gap-2"><ShieldAlert className="h-4 w-4 animate-pulse text-background" /> Establishing Handshake...</span>
              ) : (
                <span className="flex items-center gap-2">Initialize Connection <ArrowRight className="h-4 w-4" /></span>
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <Link to="/government/login" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
              &larr; Return to Government Portal
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
