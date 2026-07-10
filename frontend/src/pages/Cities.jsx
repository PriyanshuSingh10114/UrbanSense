import React from 'react'
import { motion } from 'framer-motion'
import { Building2, ArrowRight } from 'lucide-react'

export default function Cities() {
  const cities = [
    { name: 'Mumbai', aqi: 42, status: 'Good', trend: -2 },
    { name: 'Delhi', aqi: 156, status: 'Poor', trend: +14 },
    { name: 'Bangalore', aqi: 68, status: 'Moderate', trend: -5 },
    { name: 'Chennai', aqi: 82, status: 'Moderate', trend: +3 },
  ]

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-muted-foreground text-xs font-semibold uppercase tracking-widest mb-4 border border-white/10">
            <Building2 className="h-4 w-4" /> Global Network
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Urban Centers</h1>
          <p className="text-muted-foreground text-lg font-light max-w-2xl">
            Compare environmental performance and AI-driven insights across connected smart cities.
          </p>
        </motion.div>

        <div className="glass-panel rounded-[2rem] border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted-foreground font-semibold">City Name</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted-foreground font-semibold">Live AQI</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted-foreground font-semibold">Status</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted-foreground font-semibold">Trend (24h)</th>
                  <th className="px-8 py-5 text-xs uppercase tracking-widest text-muted-foreground font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cities.map((city, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={city.name} 
                    className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  >
                    <td className="px-8 py-6 font-medium text-foreground">{city.name}</td>
                    <td className="px-8 py-6 data-number text-lg">{city.aqi}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        city.aqi < 50 ? 'bg-success/10 text-success' :
                        city.aqi < 100 ? 'bg-warning/10 text-warning' :
                        'bg-danger/10 text-danger'
                      }`}>
                        {city.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 data-number text-sm">
                      <span className={city.trend > 0 ? 'text-danger' : 'text-success'}>
                        {city.trend > 0 ? '+' : ''}{city.trend}%
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="inline-flex items-center text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                        View Data <ArrowRight className="ml-2 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
