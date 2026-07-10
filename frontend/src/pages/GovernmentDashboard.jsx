import React from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertTriangle, Users, Settings, Download } from 'lucide-react'

// Stagger animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
}

export default function GovernmentDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Command Center</h2>
          <p className="text-sm text-muted-foreground mt-1">Real-time municipal telemetry and incident response.</p>
        </div>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95">
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-full blur-[40px] group-hover:bg-success/20 transition-colors" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Active Nodes</h3>
            <Activity className="h-4 w-4 text-success" />
          </div>
          <div className="text-4xl data-number font-medium text-foreground relative z-10">1,204</div>
          <p className="text-[11px] font-mono text-success mt-2 relative z-10">+1.2% THIRTY_DAY</p>
        </motion.div>
        
        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-danger/10 rounded-full blur-[40px] group-hover:bg-danger/20 transition-colors" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Critical Vectors</h3>
            <AlertTriangle className="h-4 w-4 text-danger animate-pulse" />
          </div>
          <div className="text-4xl data-number font-medium text-foreground relative z-10">03</div>
          <p className="text-[11px] font-mono text-danger mt-2 relative z-10">REQUIRES_INTERVENTION</p>
        </motion.div>

        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-[40px] group-hover:bg-primary/20 transition-colors" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Citizen Reach</h3>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="text-4xl data-number font-medium text-foreground relative z-10">45.2k</div>
          <p className="text-[11px] font-mono text-primary mt-2 relative z-10">+1.2k THIS_CYCLE</p>
        </motion.div>
        
        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-[40px] group-hover:bg-white/10 transition-colors" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">System Integrity</h3>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-4xl data-number font-medium text-foreground relative z-10">99.9%</div>
          <p className="text-[11px] font-mono text-muted-foreground mt-2 relative z-10">NOMINAL_OPERATIONS</p>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6 min-h-[400px] flex flex-col border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Geospatial Hotspots</h3>
            <div className="px-2 py-1 rounded bg-white/5 text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Live Feed</div>
          </div>
          <div className="flex-1 bg-black/40 rounded-xl overflow-hidden border border-white/5 relative flex items-center justify-center">
             {/* Mock Map View */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-[#0a0a0a]" />
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-danger/20 rounded-full blur-[40px] animate-pulse" />
             <p className="relative z-10 text-muted-foreground font-mono text-sm uppercase tracking-widest">Map Render Engine Initializing...</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 min-h-[400px] flex flex-col border border-white/5"
        >
          <h3 className="font-semibold text-lg mb-6">Incident Logs</h3>
          <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-2 no-scrollbar">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-mono text-danger uppercase tracking-widest">Alert_Lvl_{i}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">14:0{i}:22Z</span>
                </div>
                <p className="text-sm text-foreground">Anomalous SO2 reading detected in Sector 4G.</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
