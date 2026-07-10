import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Wind, AlertCircle, Thermometer, Droplets, Map as MapIcon, Crosshair } from 'lucide-react'
import MapComponent from '@/components/MapComponent'

export default function PublicDashboard() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      
      {/* Background Map layer */}
      <div className="absolute inset-0 z-0">
        <MapComponent />
        {/* Subtle vignette over the map for better text readability on edges */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10" />
      </div>

      {/* Floating UI Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none pt-24 pb-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-between max-w-[1600px] mx-auto">
        
        {/* Top Header Area */}
        <div className="flex justify-between items-start w-full">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-panel p-4 rounded-2xl pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <MapIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">Metropolitan Area</h1>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Live Telemetry Active
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-2 pointer-events-auto"
          >
            <button className="glass-card p-3 rounded-full hover:bg-white/10 transition-colors">
              <Crosshair className="h-5 w-5" />
            </button>
            <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium">
              <Activity className="h-4 w-4 text-primary" />
              Global AQI: <span className="data-number text-success ml-1">42</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Widgets Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-5 rounded-3xl pointer-events-auto"
          >
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">Atmospheric Conditions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-muted-foreground">PM2.5</span>
                </div>
                <div className="text-2xl data-number">12 <span className="text-sm font-sans text-muted-foreground">µg/m³</span></div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer className="h-4 w-4 text-orange-400" />
                  <span className="text-xs text-muted-foreground">Temp</span>
                </div>
                <div className="text-2xl data-number">24°</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="h-4 w-4 text-blue-300" />
                  <span className="text-xs text-muted-foreground">Humidity</span>
                </div>
                <div className="text-2xl data-number">45%</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="h-4 w-4 text-slate-400" />
                  <span className="text-xs text-muted-foreground">Wind</span>
                </div>
                <div className="text-2xl data-number">14 <span className="text-sm font-sans text-muted-foreground">km/h</span></div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-5 rounded-3xl pointer-events-auto md:col-span-2 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Intelligence Stream</h3>
              <span className="text-xs text-primary font-medium">View All</span>
            </div>
            
            <div className="flex-1 space-y-3 overflow-hidden">
              {/* Alert Item */}
              <div className="flex gap-3 items-start p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
                <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Moderate Pollen Alert</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">High tree pollen levels expected in the northern district.</p>
                </div>
                <div className="ml-auto text-[10px] text-muted-foreground">Just now</div>
              </div>

              {/* Info Item */}
              <div className="flex gap-3 items-start p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
                <Activity className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Traffic Congestion Cleared</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">Downtown sector showing normal emission levels.</p>
                </div>
                <div className="ml-auto text-[10px] text-muted-foreground">12m ago</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
