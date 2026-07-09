"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const wardData = [
  { name: 'Ward A', PM25: 65, NO2: 40 },
  { name: 'Ward B', PM25: 120, NO2: 85 },
  { name: 'Ward C', PM25: 45, NO2: 30 },
  { name: 'Ward D', PM25: 90, NO2: 60 },
]

export default function AnalyticsPage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">Geospatial Analytics</h1>
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100">Ward Comparison (Pollutant Breakdown)</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={wardData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }} />
              <Legend />
              <Bar dataKey="PM25" fill="#06b6d4" />
              <Bar dataKey="NO2" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
