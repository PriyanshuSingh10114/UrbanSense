import React from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, HeartPulse, ShieldCheck, Info } from 'lucide-react'

export default function CitizenAdvisory() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4 border border-primary/20">
            <HeartPulse className="h-4 w-4" /> Public Health Protocol
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Citizen Advisory</h1>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
            Dynamic health recommendations generated in real-time based on your hyper-local environmental data.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card border border-danger/30 rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-danger/10 rounded-full blur-[50px] group-hover:bg-danger/20 transition-colors" />
            <div className="relative z-10">
              <ShieldAlert className="h-10 w-10 text-danger mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-3">High PM10 Levels</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Current particulate matter exceeds safe thresholds in the central business district. 
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-foreground"><div className="h-1.5 w-1.5 rounded-full bg-danger" /> Sensitive groups should avoid outdoor exertion.</li>
                  <li className="flex items-center gap-2 text-foreground"><div className="h-1.5 w-1.5 rounded-full bg-danger" /> N95 masks strongly recommended.</li>
                  <li className="flex items-center gap-2 text-foreground"><div className="h-1.5 w-1.5 rounded-full bg-danger" /> Keep windows closed during peak hours (14:00 - 18:00).</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card border border-success/30 rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-success/10 rounded-full blur-[50px] group-hover:bg-success/20 transition-colors" />
            <div className="relative z-10">
              <ShieldCheck className="h-10 w-10 text-success mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-3">General Health Optimal</h3>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Overall air quality in residential zones remains acceptable and poses little to no risk.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-foreground"><div className="h-1.5 w-1.5 rounded-full bg-success" /> Safe for outdoor exercise.</li>
                  <li className="flex items-center gap-2 text-foreground"><div className="h-1.5 w-1.5 rounded-full bg-success" /> Ventilation recommended to improve indoor air.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
