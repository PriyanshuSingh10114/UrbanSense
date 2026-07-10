import React from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { LogOut, Activity, AlertTriangle, Users, Database, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DashboardLayout({ role }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    navigate('/')
  }

  const links = role === 'admin' ? [
    { name: 'System Core', path: '/admin/dashboard', icon: Database },
  ] : [
    { name: 'Command Center', path: '/government/dashboard', icon: Activity },
    { name: 'Live Intel', path: '/map', icon: Database },
    { name: 'Threats', path: '/advisory', icon: AlertTriangle },
    { name: 'Demographics', path: '/cities', icon: Users },
  ]

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary/30">
      
      {/* Floating Side Navigation (Arc style) */}
      <motion.nav 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-16 md:w-64 m-4 flex flex-col gap-4 z-20"
      >
        {/* Brand / Role indicator */}
        <div className="glass-panel p-4 rounded-2xl flex items-center justify-center md:justify-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="hidden md:block">
            <h2 className="text-sm font-bold tracking-tight capitalize">{role}</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Secure Node</p>
          </div>
        </div>

        {/* Links */}
        <div className="glass-panel flex-1 rounded-2xl py-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
          {links.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.name}
                to={link.path}
                className="group relative flex items-center justify-center md:justify-start gap-3 mx-2 px-3 py-2.5 rounded-xl transition-all"
              >
                {isActive && (
                  <motion.div layoutId="activeNav" className="absolute inset-0 bg-white/10 rounded-xl" />
                )}
                <Icon className={`h-4 w-4 shrink-0 relative z-10 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
                <span className={`text-sm font-medium relative z-10 hidden md:block transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                  {link.name}
                </span>
              </Link>
            )
          })}

          <div className="mt-auto px-2">
            <button 
              onClick={handleLogout}
              className="w-full group relative flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-danger/10"
            >
              <LogOut className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-danger transition-colors" />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-danger transition-colors hidden md:block">
                Terminate Session
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <motion.main 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
        className="flex-1 my-4 mr-4 glass-panel rounded-[2rem] overflow-hidden relative border border-white/5"
      >
        <div className="absolute inset-0 overflow-y-auto no-scrollbar p-6 md:p-10">
          <Outlet />
        </div>
      </motion.main>
    </div>
  )
}
