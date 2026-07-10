import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, Users, Settings, Target } from 'lucide-react';
import DecisionCard from '@/components/widgets/DecisionCard';
import IncidentTimeline from '@/components/widgets/IncidentTimeline';
import AISituationReport from '@/components/widgets/AISituationReport';

// Stagger animation
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function GovernmentDashboard() {
  const [activeWorkflow, setActiveWorkflow] = useState(true);

  // Mock data for workflow demonstration
  const mockTimeline = [
    { time: '14:00Z', tag: 'ANOMALY', description: 'AI detected PM2.5 baseline deviation (+45%).', status: 'resolved' },
    { time: '14:02Z', tag: 'CORRELATION', description: 'Linked to Factory X emission schedules.', status: 'resolved' },
    { time: '14:10Z', tag: 'WARNING', description: 'Threshold exceeded. Awaiting government intervention.', status: 'active' },
  ];

  const handleActionAccept = () => {
    alert("Action Executed: Inspector Assigned to Factory X.");
    setActiveWorkflow(false);
  };

  const handleActionReject = () => {
    alert("Action Dismissed.");
    setActiveWorkflow(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Operational Command Center</h2>
          <p className="text-sm text-muted-foreground mt-1">Live incident resolution and resource deployment.</p>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Active Units</h3>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div className="text-4xl data-number font-medium text-foreground">24</div>
          <p className="text-[11px] font-mono text-primary mt-2">FIELD_INSPECTORS</p>
        </motion.div>
        
        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-danger/10 rounded-full blur-[40px]" />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Critical Vectors</h3>
            <AlertTriangle className="h-4 w-4 text-danger animate-pulse" />
          </div>
          <div className="text-4xl data-number font-medium text-foreground">{activeWorkflow ? '01' : '00'}</div>
          <p className="text-[11px] font-mono text-danger mt-2">REQUIRES_INTERVENTION</p>
        </motion.div>

        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Advisories Issued</h3>
            <Activity className="h-4 w-4 text-warning" />
          </div>
          <div className="text-4xl data-number font-medium text-foreground">12</div>
          <p className="text-[11px] font-mono text-warning mt-2">LAST_24_HOURS</p>
        </motion.div>
        
        <motion.div variants={item} className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Network Status</h3>
            <Settings className="h-4 w-4 text-success" />
          </div>
          <div className="text-4xl data-number font-medium text-foreground">100%</div>
          <p className="text-[11px] font-mono text-success mt-2">SENSORS_ONLINE</p>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Incident Workflow Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-danger" />
            <h3 className="font-semibold text-lg">Active Incident Workflows</h3>
          </div>

          <AnimatePresence mode="popLayout">
            {activeWorkflow ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, height: 0 }}
                className="space-y-6"
              >
                {/* AI Analysis of the Incident */}
                <AISituationReport 
                  title="Sector 4 Industrial Anomaly"
                  reasoning="Sudden spike in PM2.5 correlates precisely with Factory X's unauthorized secondary smokestack emissions."
                  confidence={97}
                  prediction="Emissions will drift into residential zones within 45 minutes given current wind velocity."
                  impact="High respiratory risk for 4,200 residents."
                  status="danger"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <IncidentTimeline events={mockTimeline} />
                  
                  {/* Actionable Prompt */}
                  <DecisionCard 
                    title="Intervention Required"
                    description="AI recommends immediate on-site inspection and public health advisory."
                    recommendedAction="Dispatch Field Unit Alpha to Factory X & Issue Tier 2 Advisory."
                    onAccept={handleActionAccept}
                    onReject={handleActionReject}
                    severity="danger"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center"
              >
                <Activity className="h-12 w-12 text-success/50 mb-4" />
                <h3 className="text-xl font-medium text-foreground">No Active Incidents</h3>
                <p className="text-muted-foreground mt-2">All metropolitan sectors are operating within nominal environmental parameters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Side Panel: Resource Overview */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6 border border-white/5 h-[600px] flex flex-col"
        >
          <h3 className="font-semibold text-lg mb-6">Resource Deployment</h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 no-scrollbar">
            {['Unit Alpha', 'Unit Bravo', 'Unit Charlie', 'Unit Delta'].map((unit, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{unit}</span>
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded ${i === 0 && activeWorkflow ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'}`}>
                    {i === 0 && activeWorkflow ? 'STANDBY' : 'PATROL'}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Sector {i + 1}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
