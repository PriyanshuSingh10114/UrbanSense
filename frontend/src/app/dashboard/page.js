"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Wind, AlertTriangle, Factory } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockData = [
  { time: '00:00', aqi: 110 }, { time: '04:00', aqi: 95 },
  { time: '08:00', aqi: 150 }, { time: '12:00', aqi: 120 },
  { time: '16:00', aqi: 130 }, { time: '20:00', aqi: 180 },
]

export default function DashboardOverview() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-slate-100">City Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Current AQI</CardTitle>
            <Wind className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent><div className="text-3xl font-bold text-slate-100">142</div></CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-rose-400" />
          </CardHeader>
          <CardContent><div className="text-3xl font-bold text-slate-100">3</div></CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Tracked Sources</CardTitle>
            <Factory className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent><div className="text-3xl font-bold text-slate-100">128</div></CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">System Status</CardTitle>
            <Activity className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent><div className="text-3xl font-bold text-emerald-400">Healthy</div></CardContent>
        </Card>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">24-Hour AQI Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }} />
              <Line type="monotone" dataKey="aqi" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
