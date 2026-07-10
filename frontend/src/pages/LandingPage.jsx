import React from 'react'
import { motion } from 'framer-motion'
import { Activity, Wind, Thermometer, Droplets, ShieldAlert, Cpu, Layers, Play, Clock, Crosshair, TrendingUp, AlertTriangle } from 'lucide-react'
import MapComponent from '@/components/MapComponent'

export default function LandingPage() {
  return (
    <div className="absolute inset-0 w-full h-full bg-background overflow-hidden selection:bg-primary/30 text-foreground font-sans">
      
      {/* 
        Z-0: MAP LAYER (The Hero)
        Full viewport width and height.
      */}
      <div className="absolute inset-0 z-0">
        <MapComponent />
        {/* Vignette to ensure text legibility at edges */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] z-10" />
      </div>

      {/* 
        Z-10: MISSION CONTROL UI
        Data dense, floating glass panels.
      */}
      <div className="absolute inset-0 z-20 pointer-events-none p-4 pt-20 pb-6 flex flex-col justify-between h-full">
        
        {/* Main Interface Grid */}
        <div className="flex justify-between items-start h-full gap-4 max-w-[1800px] mx-auto w-full">
          
          {/* 
            LEFT PANEL: "WHAT & WHERE"
            Telemetry, KPIs, Hotspots
          */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[320px] flex flex-col gap-4 pointer-events-auto h-full"
          >
            {/* KPI Widget */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2 flex items-center gap-1">
                <Activity className="h-3 w-3 text-success animate-pulse" /> Live AQI Node
              </div>
              <div className="relative w-32 h-32 flex items-center justify-center mb-2">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                  <motion.circle 
                    initial={{ strokeDasharray: "0 300" }}
                    animate={{ strokeDasharray: "220 300" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="50" cy="50" r="45" fill="none" stroke="hsl(150 70% 40%)" strokeWidth="6" strokeLinecap="round" 
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-4xl data-number font-medium">42</span>
                  <span className="text-[10px] uppercase tracking-wider text-success font-semibold">Good</span>
                </div>
              </div>
              <div className="flex justify-between w-full text-xs text-muted-foreground font-mono mt-2 pt-3 border-t border-white/10">
                <span>PM2.5: <span className="text-foreground">12</span></span>
                <span>PM10: <span className="text-foreground">24</span></span>
              </div>
            </div>

            {/* Met Widget */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">Meteorological Data</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <Thermometer className="h-3 w-3" /> <span className="text-[10px] uppercase font-mono">Temp</span>
                  </div>
                  <div className="text-lg data-number">24.2°C</div>
                </div>
                <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <Wind className="h-3 w-3" /> <span className="text-[10px] uppercase font-mono">Wind</span>
                  </div>
                  <div className="text-lg data-number">14km/h</div>
                </div>
              </div>
            </div>

            {/* Live Telemetry Stream */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 flex-1 flex flex-col min-h-0">
              <div className="flex justify-between items-center mb-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Telemetry Stream</div>
                <div className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse" />
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
                {[1,2,3,4,5].map((item, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-black/20 border border-white/5 flex gap-3 items-start group hover:bg-white/5 transition-colors cursor-pointer">
                    <Crosshair className="h-4 w-4 text-primary shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                    <div>
                      <div className="text-[11px] font-mono text-muted-foreground mb-0.5">LAT 19.07 | LON 72.87</div>
                      <div className="text-xs font-medium text-foreground">Traffic node stabilized.</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 
            RIGHT PANEL: "WHY & WHAT NEXT"
            AI Insights, Forecast, Alerts
          */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
            className="w-[340px] flex flex-col gap-4 pointer-events-auto h-full"
          >
            {/* AI Insight Box */}
            <div className="glass-panel p-5 rounded-2xl border border-accent/20 glow-accent relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px] pointer-events-none" />
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <Cpu className="h-4 w-4 text-accent" />
                <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">Gemini Intelligence</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground relative z-10">
                <strong className="text-foreground font-medium">Analysis:</strong> Minor temperature inversion detected. Surface pollutants will experience a 12% concentration increase by 18:00 hrs.
              </p>
              <div className="mt-3 pt-3 border-t border-accent/10 flex items-center justify-between relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Confidence</span>
                <span className="data-number text-accent text-xs">94.2%</span>
              </div>
            </div>

            {/* Forecast Timeline */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">72H Forecast Projection</div>
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                {['+12h', '+24h', '+48h'].map((time, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-muted-foreground w-8">{time}</span>
                    <div className="flex-1 h-1 bg-black/40 rounded-full overflow-hidden relative">
                      <div className={`absolute top-0 left-0 h-full rounded-full ${i === 0 ? 'w-1/3 bg-success' : i === 1 ? 'w-2/3 bg-warning' : 'w-4/5 bg-danger'}`} />
                    </div>
                    <span className="text-[10px] font-mono w-6 text-right data-number">{i === 0 ? '45' : i === 1 ? '82' : '114'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Alerts */}
            <div className="glass-panel p-4 rounded-2xl border border-danger/30 flex-1 flex flex-col min-h-0 bg-danger/5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="h-4 w-4 text-danger animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-danger font-semibold">Active Advisories</span>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
                <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 cursor-pointer hover:bg-danger/20 transition-colors">
                  <div className="text-[10px] font-mono text-danger mb-1 uppercase tracking-widest">Action Required</div>
                  <div className="text-xs font-medium text-danger-foreground">
                    Issue sensitive group warning for Sector 7 due to incoming particulate plume.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 
          BOTTOM CONTROLS
          Data Layers & Time Scrubbing
        */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
          className="w-full flex justify-center pointer-events-auto mt-4"
        >
          <div className="glass-panel p-1.5 rounded-full border border-white/10 flex items-center gap-2">
            
            <div className="flex items-center px-4 border-r border-white/10">
              <Layers className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Layers</span>
            </div>
            
            <div className="flex gap-1 px-1">
              <button className="px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
                AQI Matrix
              </button>
              <button className="px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all">
                Traffic
              </button>
              <button className="px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all">
                Industrial
              </button>
            </div>

            <div className="flex items-center gap-2 pl-3 pr-2 border-l border-white/10">
              <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
                <Clock className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-mono text-foreground">LIVE</span>
              </div>
              <button className="p-2 rounded-full hover:bg-white/10 text-muted-foreground transition-colors" title="Time Lapse">
                <Play className="h-4 w-4" />
              </button>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  )
}
