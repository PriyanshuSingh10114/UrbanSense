"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, MapPin, Wind } from 'lucide-react'

const activeAlerts = [
  {
    id: 1,
    location: 'Andheri Cement Factory',
    ward: 'Ward B',
    pm25: 185,
    attribution: 'AI High Confidence: Plume matches factory emissions based on 15mph NW wind.',
    status: 'Action Required'
  },
  {
    id: 2,
    location: 'Highway Interchange 4',
    ward: 'Ward D',
    pm25: 110,
    attribution: 'AI Moderate Confidence: Traffic congestion detected at 17:00 correlating with spike.',
    status: 'Monitoring'
  }
]

export default function AlertsPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">Enforcement Intelligence</h1>
      <div className="space-y-4">
        {activeAlerts.map(alert => (
          <Card key={alert.id} className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-bold text-rose-500 flex items-center gap-2">
                  <AlertTriangle size={20} /> Critical Spike: {alert.pm25} PM2.5
                </CardTitle>
                <div className="text-slate-400 flex items-center gap-2 mt-1">
                  <MapPin size={16} /> {alert.location} ({alert.ward})
                </div>
              </div>
              <Button className="bg-rose-600 hover:bg-rose-700 text-white cursor-pointer">Dispatch Officer</Button>
            </CardHeader>
            <CardContent>
              <div className="mt-4 p-4 bg-slate-950 rounded-lg border border-slate-800 flex items-start gap-3">
                <Wind className="text-cyan-400 mt-1 shrink-0" size={20} />
                <div>
                  <div className="font-semibold text-slate-200">Gemini Attribution Agent</div>
                  <div className="text-slate-400 text-sm mt-1">{alert.attribution}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
