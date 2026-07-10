import React from 'react'
import { motion } from 'framer-motion'
import { Server, Database, HardDrive, Cpu, Terminal } from 'lucide-react'

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

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">System Core</h2>
          <p className="text-sm text-muted-foreground mt-1">Infrastructure topology and API telemetry.</p>
        </div>
        <button className="flex items-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95">
          <Terminal className="h-4 w-4" /> Root Access
        </button>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-full blur-[40px]" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Gateway Node</h3>
            <Server className="h-4 w-4 text-success" />
          </div>
          <div className="text-4xl data-number font-medium text-success relative z-10">42<span className="text-sm font-mono text-muted-foreground ml-1">ms</span></div>
          <p className="text-[11px] font-mono text-success mt-2 relative z-10">LATENCY_OPTIMAL</p>
        </motion.div>
        
        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-[40px]" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Data Lake</h3>
            <Database className="h-4 w-4 text-primary" />
          </div>
          <div className="text-4xl data-number font-medium text-foreground relative z-10">100%</div>
          <p className="text-[11px] font-mono text-primary mt-2 relative z-10">SYNC_COMPLETE</p>
        </motion.div>

        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-warning/10 rounded-full blur-[40px]" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Compute Tier</h3>
            <Cpu className="h-4 w-4 text-warning" />
          </div>
          <div className="text-4xl data-number font-medium text-foreground relative z-10">84%</div>
          <p className="text-[11px] font-mono text-warning mt-2 relative z-10">LOAD_WARNING</p>
        </motion.div>
        
        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-[40px]" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Storage Array</h3>
            <HardDrive className="h-4 w-4 text-accent" />
          </div>
          <div className="text-4xl data-number font-medium text-foreground relative z-10">1.2<span className="text-sm font-mono text-muted-foreground ml-1">PB</span></div>
          <p className="text-[11px] font-mono text-accent mt-2 relative z-10">CAPACITY_NOMINAL</p>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-2xl p-6 min-h-[400px] flex flex-col border border-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
        
        <h3 className="font-semibold text-lg mb-6 relative z-10">Infrastructure Topology</h3>
        <div className="flex-1 bg-black/40 rounded-xl overflow-hidden border border-white/5 relative flex items-center justify-center p-8">
          
          {/* Mock Topology Visual */}
          <div className="w-full h-full border border-dashed border-white/10 rounded-xl relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-16">
               <div className="h-16 w-16 rounded-full border border-primary/50 flex items-center justify-center glow-primary bg-black/50 backdrop-blur">
                 <Server className="h-6 w-6 text-primary" />
               </div>
               
               <div className="h-px w-32 bg-gradient-to-r from-primary to-accent relative">
                 <div className="absolute top-1/2 left-0 -translate-y-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white] animate-[ping_2s_infinite]" />
               </div>
               
               <div className="h-16 w-16 rounded-full border border-accent/50 flex items-center justify-center glow-accent bg-black/50 backdrop-blur">
                 <Database className="h-6 w-6 text-accent" />
               </div>
            </div>
            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              Live Topology Rendering
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
