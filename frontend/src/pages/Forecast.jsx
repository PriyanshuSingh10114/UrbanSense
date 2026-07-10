import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, Activity, AlertTriangle, ArrowUpRight } from 'lucide-react'

export default function Forecast() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase tracking-widest mb-4 border border-accent/20">
            <Cpu className="h-4 w-4" /> Predictive Engine Active
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">AI Forecasting Models</h1>
          <p className="text-muted-foreground max-w-2xl text-lg font-light">
            Gemini-powered 72-hour predictive modeling of air quality indices, correlating meteorological data, traffic patterns, and industrial schedules.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-panel rounded-3xl p-8 border border-white/5 min-h-[500px] flex flex-col relative overflow-hidden"
          >
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3 className="text-xl font-semibold">Citywide PM2.5 Trajectory</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                Live Processing
              </div>
            </div>
            
            <div className="flex-1 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-muted-foreground relative z-10 bg-white/[0.02]">
              {/* Abstract Chart Representation */}
              <div className="w-full h-full p-8 flex items-end justify-between opacity-50">
                {[40, 35, 45, 60, 80, 75, 65, 50, 45, 55, 70, 85].map((height, i) => (
                  <div key={i} className="w-[6%] bg-gradient-to-t from-primary/20 to-primary/80 rounded-t-sm" style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-6 border border-white/5"
            >
              <h4 className="text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-4">Critical Vectors</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <div className="text-sm font-medium">Industrial Zone B</div>
                    <div className="text-xs text-muted-foreground mt-1">Expected spike at 14:00</div>
                  </div>
                  <div className="flex items-center gap-1 text-danger">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="data-number font-medium">+24%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <div className="text-sm font-medium">Highway Corridor</div>
                    <div className="text-xs text-muted-foreground mt-1">Evening rush hour</div>
                  </div>
                  <div className="flex items-center gap-1 text-warning">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="data-number font-medium">+12%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-3xl p-6 border border-white/5 glow-accent"
            >
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-5 w-5 text-accent" />
                <h4 className="font-semibold text-foreground">AI Insight</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Meteorological models indicate a temperature inversion tonight. Pollutants will be trapped close to the surface, raising AQI significantly by 22:00.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
