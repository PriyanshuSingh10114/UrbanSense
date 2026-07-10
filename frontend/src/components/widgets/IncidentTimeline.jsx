import React from 'react';
import { motion } from 'framer-motion';

export default function IncidentTimeline({ events = [] }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col">
      <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">Event Timeline</h3>
      
      <div className="relative flex-1 pl-4 border-l-2 border-white/10 space-y-6">
        {events.map((event, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            {/* Timeline node */}
            <div className={`absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-background ${
              event.status === 'active' ? 'bg-danger animate-pulse' : 
              event.status === 'resolved' ? 'bg-success' : 'bg-primary'
            }`} />
            
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-muted-foreground">{event.time}</span>
              <span className={`text-[10px] uppercase tracking-widest font-semibold ${
                event.status === 'active' ? 'text-danger' : 
                event.status === 'resolved' ? 'text-success' : 'text-primary'
              }`}>
                {event.tag}
              </span>
            </div>
            
            <p className="text-sm text-foreground">{event.description}</p>
            
            {event.action && (
              <div className="mt-2 text-xs font-mono text-muted-foreground bg-white/5 p-2 rounded border border-white/5 inline-block">
                Action: {event.action}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
