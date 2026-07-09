"use client"
import dynamic from 'next/dynamic'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

// Dynamically import the map component with SSR disabled
const MapComponent = dynamic(
  () => import('@/components/MapComponent'),
  { 
    ssr: false, 
    loading: () => (
      <div className="flex h-[600px] w-full items-center justify-center bg-slate-900 rounded-lg border border-slate-800">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
      </div>
    )
  }
)

export default function MapPage() {
  return (
    <div className="p-8 h-full flex flex-col space-y-4">
      <h1 className="text-3xl font-bold text-slate-100">Live Geospatial Map</h1>
      <Card className="flex-1 p-2 bg-slate-900 border-slate-800 min-h-[600px] overflow-hidden rounded-xl relative">
        <MapComponent />
      </Card>
    </div>
  )
}
