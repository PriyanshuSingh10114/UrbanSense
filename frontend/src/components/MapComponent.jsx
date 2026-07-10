
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'

export default function MapComponent() {
  // Mumbai coordinates
  const position = [19.0760, 72.8777]

  useEffect(() => {
    // Fix leafet icon issue in Next.js/Webpack
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, [])

  return (
    <MapContainer center={position} zoom={11} className="h-full w-full rounded-lg min-h-[600px]" style={{ background: '#0a0a0a' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      {/* Example Hotspot */}
      <CircleMarker 
        center={[19.1100, 72.8600]} 
        pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.5 }} 
        radius={20}
      >
        <Popup className="bg-slate-900 border-slate-800 text-slate-900">
          <div className="font-bold text-rose-600">Critical AQI Spike</div>
          <div className="text-slate-700">Andheri Cement Factory</div>
        </Popup>
      </CircleMarker>
    </MapContainer>
  )
}
