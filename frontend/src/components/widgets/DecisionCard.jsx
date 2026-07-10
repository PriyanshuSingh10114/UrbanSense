import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function DecisionCard({ 
  title, 
  description, 
  recommendedAction, 
  onAccept, 
  onReject,
  severity = 'warning' 
}) {
  return (
    <div className={`glass-panel p-5 rounded-2xl border flex flex-col ${
      severity === 'danger' ? 'border-danger/30 bg-danger/5' : 
      severity === 'warning' ? 'border-warning/20 bg-warning/5' : 
      'border-primary/20 bg-primary/5'
    }`}>
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className={`h-5 w-5 shrink-0 mt-0.5 ${
          severity === 'danger' ? 'text-danger' : 
          severity === 'warning' ? 'text-warning' : 'text-primary'
        }`} />
        <div>
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
      
      <div className="mt-auto bg-black/40 p-3 rounded-xl border border-white/5">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Recommended Action</span>
        <p className="text-sm text-foreground font-medium mb-3">{recommendedAction}</p>
        
        <div className="flex gap-2">
          <button 
            onClick={onAccept}
            className="flex-1 bg-white/10 hover:bg-success/20 text-foreground hover:text-success border border-white/10 hover:border-success/30 px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="h-4 w-4" /> Execute
          </button>
          <button 
            onClick={onReject}
            className="flex-1 bg-white/5 hover:bg-danger/20 text-muted-foreground hover:text-danger border border-transparent hover:border-danger/30 px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2"
          >
            <XCircle className="h-4 w-4" /> Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
