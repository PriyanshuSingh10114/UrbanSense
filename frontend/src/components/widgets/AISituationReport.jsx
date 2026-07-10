import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function AISituationReport({ 
  title = "AI Situation Report", 
  reasoning, 
  confidence, 
  prediction, 
  impact,
  status = "warning" // 'success', 'warning', 'danger'
}) {
  const statusColors = {
    success: 'text-success border-success/20 glow-success',
    warning: 'text-warning border-warning/20 glow-warning',
    danger: 'text-danger border-danger/30 glow-danger bg-danger/5'
  };

  const statusIcons = {
    success: CheckCircle2,
    warning: AlertTriangle,
    danger: AlertTriangle
  };

  const Icon = statusIcons[status] || Cpu;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-panel p-5 rounded-2xl border relative overflow-hidden ${statusColors[status]}`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] pointer-events-none opacity-20 ${status === 'danger' ? 'bg-danger' : status === 'warning' ? 'bg-warning' : 'bg-success'}`} />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <Cpu className={`h-4 w-4 ${status === 'danger' ? 'text-danger' : 'text-accent'}`} />
          <span className="text-[10px] uppercase tracking-widest font-semibold text-foreground">Gemini Analysis</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Confidence</span>
          <div className="flex items-center gap-1">
            <span className={`text-xs font-mono font-medium ${confidence > 90 ? 'text-success' : 'text-warning'}`}>{confidence}%</span>
            <div className="h-1.5 w-16 bg-black/40 rounded-full overflow-hidden">
              <div className={`h-full ${confidence > 90 ? 'bg-success' : 'bg-warning'}`} style={{ width: `${confidence}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Reasoning:</strong> {reasoning}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Prediction</span>
            <p className="text-xs text-foreground font-medium">{prediction}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Impact</span>
            <p className="text-xs text-foreground font-medium">{impact}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
