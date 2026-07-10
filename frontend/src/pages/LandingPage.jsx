import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Wind, Thermometer, Layers, Play, Clock, Target, ArrowLeft, Globe, AlertTriangle } from 'lucide-react';
import MapComponent from '@/components/MapComponent';
import AISituationReport from '@/components/widgets/AISituationReport';
import RootCausePanel from '@/components/widgets/RootCausePanel';
import IncidentTimeline from '@/components/widgets/IncidentTimeline';
import { useAppStore, CITIES } from '@/store/useAppStore';

export default function LandingPage() {
  const { activeLayer, setActiveLayer, activeIncidentId, focusIncident, clearIncidentFocus, selectedCity, clearCitySelection, selectCity } = useAppStore();

  useEffect(() => {
    return () => {
      clearIncidentFocus();
    };
  }, [clearIncidentFocus, selectedCity]);

  const isIncidentFocused = !!activeIncidentId;
  const currentCity = selectedCity ? CITIES[selectedCity] : null;

  // Mock Micro Data
  const mockTimelineEvents = [
    { time: '14:00Z', tag: 'DETECTION', description: 'Sensor cluster detected anomalous PM2.5 spike.', status: 'resolved' },
    { time: '14:08Z', tag: 'PREDICTION', description: 'Plume projected to intersect residential zone.', status: 'active' }
  ];

  const mockRootCauses = [
    { name: 'Industrial Emissions', correlation: 0.82, description: 'Direct wind vector alignment.' },
    { name: 'Traffic Congestion', correlation: 0.35, description: 'Minor contribution to baseline.' }
  ];

  return (
    <div className="absolute inset-0 w-full h-full bg-background overflow-hidden selection:bg-primary/30 text-foreground font-sans">
      
      {/* MAP LAYER */}
      <MapComponent />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] z-10" />

      {/* MISSION CONTROL UI */}
      <div className="absolute inset-0 z-20 pointer-events-none p-4 pt-20 pb-6 flex flex-col justify-between h-full">
        
        {/* Navigation / Context Header */}
        <div className="max-w-[1800px] mx-auto w-full mb-4 pointer-events-auto">
          <AnimatePresence mode="popLayout">
            {selectedCity && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={clearCitySelection}
                className="flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-colors border border-white/10"
              >
                <ArrowLeft className="h-4 w-4" /> Return to National View
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-start h-full gap-4 max-w-[1800px] mx-auto w-full">
          
          {/* LEFT PANEL */}
          <motion.div 
            key={selectedCity || 'macro-left'}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[320px] flex flex-col gap-4 pointer-events-auto h-full"
          >
            {selectedCity ? (
              // MICRO VIEW (City Specific)
              <>
                <div className="glass-panel p-5 rounded-2xl border border-white/10 text-center relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-full h-2 ${currentCity?.severity === 'danger' ? 'bg-danger' : currentCity?.severity === 'warning' ? 'bg-warning' : 'bg-success'}`} />
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">City Intelligence Node</div>
                  <h2 className="text-2xl font-bold tracking-tight">{currentCity?.name}</h2>
                  
                  <div className="relative w-32 h-32 flex items-center justify-center mb-2 mt-4 mx-auto">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                      <motion.circle 
                        initial={{ strokeDasharray: "0 300" }}
                        animate={{ strokeDasharray: isIncidentFocused ? "260 300" : "220 300" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="50" cy="50" r="45" fill="none" 
                        stroke={isIncidentFocused ? "hsl(0 80% 60%)" : currentCity?.severity === 'danger' ? "hsl(0 80% 60%)" : "hsl(150 70% 40%)"} 
                        strokeWidth="6" strokeLinecap="round" 
                      />
                    </svg>
                    <div className="flex flex-col items-center">
                      <span className="text-4xl data-number font-medium">{isIncidentFocused ? '284' : currentCity?.aqi}</span>
                      <span className={`text-[10px] uppercase tracking-wider font-semibold ${isIncidentFocused || currentCity?.severity === 'danger' ? 'text-danger' : 'text-success'}`}>
                        {isIncidentFocused || currentCity?.severity === 'danger' ? 'Critical' : 'Nominal'}
                      </span>
                    </div>
                  </div>
                </div>

                <AISituationReport 
                  title={isIncidentFocused ? "Anomalous Spike Detected" : `${currentCity?.name} Baseline`}
                  reasoning={isIncidentFocused 
                    ? "Current wind vector aligns directly with industrial zone."
                    : "Atmospheric conditions remain stable with minor inversion."
                  }
                  confidence={isIncidentFocused ? 94 : 88}
                  prediction={isIncidentFocused ? "Plume intersection expected in 45m." : "Nominal AQI for next 12 hrs."}
                  impact={isIncidentFocused ? "High risk for sensitive groups." : "No health impacts."}
                  status={isIncidentFocused || currentCity?.severity === 'danger' ? "danger" : "success"}
                />

                <div className="glass-panel p-4 rounded-2xl border border-white/10">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                        <Thermometer className="h-3 w-3" /> <span className="text-[10px] uppercase font-mono">Temp</span>
                      </div>
                      <div className="text-lg data-number">28.4°C</div>
                    </div>
                    <div className="bg-black/20 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                        <Wind className="h-3 w-3" /> <span className="text-[10px] uppercase font-mono">Wind</span>
                      </div>
                      <div className="text-lg data-number">8km/h SW</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // MACRO VIEW (National)
              <>
                <div className="glass-panel p-6 rounded-2xl border border-white/10 glow-primary">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg text-foreground">National Overview</h3>
                  </div>
                  <div className="text-xs text-muted-foreground mb-6">
                    Live telemetry across 5 major intelligence nodes.
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Avg National AQI</div>
                      <div className="text-3xl font-mono text-warning font-semibold">168</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Active Alerts</div>
                      <div className="text-3xl font-mono text-danger font-semibold">03</div>
                    </div>
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white/10 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-4 w-4 text-danger" />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Highest Risk Nodes</span>
                  </div>
                  <div className="space-y-3 overflow-y-auto no-scrollbar">
                    {Object.values(CITIES).sort((a, b) => b.aqi - a.aqi).map(city => (
                      <div key={city.id} onClick={() => selectCity(city.id)} className={`p-3 rounded-xl border cursor-pointer transition-colors flex justify-between items-center ${city.severity === 'danger' ? 'bg-danger/10 border-danger/20 hover:bg-danger/20' : city.severity === 'warning' ? 'bg-warning/10 border-warning/20 hover:bg-warning/20' : 'bg-success/5 border-success/10 hover:bg-success/10'}`}>
                        <div>
                          <div className="text-xs font-medium text-foreground">{city.name}</div>
                        </div>
                        <div className={`font-mono text-lg font-bold ${city.severity === 'danger' ? 'text-danger' : city.severity === 'warning' ? 'text-warning' : 'text-success'}`}>{city.aqi}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* RIGHT PANEL */}
          <motion.div 
            key={selectedCity || 'macro-right'}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
            className="w-[340px] flex flex-col gap-4 pointer-events-auto h-full"
          >
            {selectedCity ? (
              isIncidentFocused ? (
                <>
                  <RootCausePanel factors={mockRootCauses} />
                  <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
                    <IncidentTimeline events={mockTimelineEvents} />
                  </div>
                </>
              ) : (
                <div className="glass-panel p-5 rounded-2xl border border-white/10 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Active Monitoring Zones</span>
                  </div>
                  
                  <div className="space-y-3 overflow-y-auto no-scrollbar">
                    <div onClick={() => focusIncident('inc-1')} className="p-3 rounded-xl bg-danger/10 border border-danger/20 cursor-pointer hover:bg-danger/20 transition-colors flex justify-between items-center">
                      <div>
                        <div className="text-[10px] font-mono text-danger mb-1 uppercase tracking-widest">Sector 4</div>
                        <div className="text-xs font-medium text-danger-foreground">Critical Anomaly Detected</div>
                      </div>
                      <div className="text-danger data-number text-lg">284</div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="glass-panel p-5 rounded-2xl border border-white/10 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="h-4 w-4 text-primary" />
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Quick Compare</span>
                </div>
                <div className="text-xs text-muted-foreground mb-4">Select nodes on the map to enter their operational view, or observe the national telemetry gradient.</div>
                
                {/* AI National Summary */}
                <AISituationReport 
                  title="National Grid Status"
                  reasoning="Northern corridor experiencing high particulate retention due to seasonal wind stagnation. Southern coastal nodes nominal."
                  confidence={92}
                  prediction="Stagnation expected to persist for 48 hours."
                  impact="Elevated health risks in NCR region."
                  status="warning"
                />
              </div>
            )}
          </motion.div>
        </div>

        {/* BOTTOM CONTROLS */}
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
              {['aqi', 'traffic', 'industrial'].map(layer => (
                <button 
                  key={layer}
                  onClick={() => setActiveLayer(layer)}
                  className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-widest font-semibold transition-all ${
                    activeLayer === layer 
                      ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                      : 'text-muted-foreground hover:bg-white/10 hover:text-foreground'
                  }`}
                >
                  {layer}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
