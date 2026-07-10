import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map as MapIcon, Layers, Filter, Maximize, Play, Crosshair } from 'lucide-react'
import MapComponent from '@/components/MapComponent'

export default function LiveMap() {
  const [activeLayer, setActiveLayer] = useState('aqi')
  const [showControls, setShowControls] = useState(true)

  const layers = [
    { id: 'aqi', name: 'Air Quality (AQI)' },
    { id: 'pm25', name: 'PM2.5 Heatmap' },
    { id: 'traffic', name: 'Traffic Correlation' },
    { id: 'industrial', name: 'Industrial Zones' }
  ]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background flex flex-col">
      {/* Background Map layer */}
      <div className="absolute inset-0 z-0 pt-16"> {/* Offset for navbar */}
        <MapComponent />
      </div>

      {/* Floating Controls Overlay */}
      <div className="absolute inset-x-0 bottom-8 z-20 pointer-events-none px-4 sm:px-6 lg:px-8 flex justify-center">
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="glass-panel p-2 rounded-full pointer-events-auto flex items-center gap-2 max-w-full overflow-x-auto no-scrollbar"
        >
          <div className="flex items-center px-4 py-2 border-r border-white/10">
            <Layers className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-xs font-semibold uppercase tracking-widest text-foreground">Data Layers</span>
          </div>
          
          <div className="flex gap-1 px-2">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeLayer === layer.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'hover:bg-white/10 text-muted-foreground hover:text-foreground'
                }`}
              >
                {layer.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 pl-2 border-l border-white/10">
            <button className="p-2 rounded-full hover:bg-white/10 text-muted-foreground transition-colors" title="Time Lapse">
              <Play className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 text-muted-foreground transition-colors" title="My Location">
              <Crosshair className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
        
      </div>
    </div>
  )
}
