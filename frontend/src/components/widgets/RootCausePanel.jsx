import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

export default function RootCausePanel({ factors = [] }) {
  if (!factors || factors.length === 0) return null;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Root Cause Analysis</h3>
        <Layers className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {factors.map((factor, i) => (
          <div key={i} className="bg-black/20 p-3 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-foreground">{factor.name}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded text-white ${
                factor.correlation > 0.7 ? 'bg-danger/80' : 
                factor.correlation > 0.4 ? 'bg-warning/80' : 'bg-success/80'
              }`}>
                {(factor.correlation * 100).toFixed(0)}% CORR
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2">{factor.description}</p>
            
            <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${factor.correlation * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full ${
                  factor.correlation > 0.7 ? 'bg-danger' : 
                  factor.correlation > 0.4 ? 'bg-warning' : 'bg-success'
                }`} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
