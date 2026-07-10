import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Popup, CircleMarker, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useAppStore, CITIES } from '../store/useAppStore'

// Custom DivIcon for City Nodes
const createCityIcon = (city) => {
  const color = city.severity === 'danger' ? '#ef4444' : city.severity === 'warning' ? '#f59e0b' : '#10b981';
  const shadowClass = city.severity === 'danger' ? 'glow-danger' : city.severity === 'warning' ? 'glow-warning' : 'glow-success';
  
  return L.divIcon({
    className: 'custom-city-marker',
    html: `
      <div class="relative group cursor-pointer">
        <div class="absolute inset-0 rounded-full animate-ping opacity-20" style="background-color: ${color}"></div>
        <div class="relative bg-surface/80 backdrop-blur-md border border-white/10 rounded-xl p-2 flex flex-col items-center shadow-lg transition-transform hover:scale-110">
          <span class="text-[9px] uppercase tracking-widest font-semibold text-muted-foreground whitespace-nowrap">${city.name}</span>
          <span class="text-sm font-mono font-bold" style="color: ${color}">${city.aqi}</span>
        </div>
      </div>
    `,
    iconSize: [80, 50],
    iconAnchor: [40, 25]
  });
};

// Helper to update map view with smooth flyTo animation
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5, easeLinearity: 0.25 });
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent() {
  const { mapCenter, mapZoom, activeLayer, activeIncidentId, focusIncident, selectedCity, selectCity } = useAppStore();

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  // Mock data for the selected city micro-view
  const getMockIncidentsForCity = (cityId) => {
    if (cityId === 'mumbai') {
      return [
        { id: 'm-1', lat: 19.1100, lng: 72.8600, aqi: 284, severity: 'danger', name: 'Sector 4 Factory Plume' },
        { id: 'm-2', lat: 19.0500, lng: 72.9000, aqi: 156, severity: 'warning', name: 'Highway Congestion Zone' },
        { id: 'm-3', lat: 19.0200, lng: 72.8400, aqi: 42, severity: 'success', name: 'Coastal Node Nominal' }
      ];
    } else if (cityId === 'delhi') {
      return [
        { id: 'd-1', lat: 28.6500, lng: 77.2300, aqi: 412, severity: 'danger', name: 'Old Delhi Particulate Cloud' },
        { id: 'd-2', lat: 28.5300, lng: 77.2000, aqi: 210, severity: 'danger', name: 'South Delhi Stubble Smoke' }
      ];
    }
    return []; // other cities don't have mock incidents yet
  };

  const cityIncidents = selectedCity ? getMockIncidentsForCity(selectedCity) : [];

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={mapZoom} 
      className="h-full w-full absolute inset-0 z-0 bg-[#0a0a0a]" 
      zoomControl={false}
    >
      <MapController center={mapCenter} zoom={mapZoom} />
      
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      
      {/* MACRO VIEW: Show National City Nodes */}
      {!selectedCity && Object.values(CITIES).map(city => (
        <Marker
          key={city.id}
          position={[city.lat, city.lng]}
          icon={createCityIcon(city)}
          eventHandlers={{
            click: () => selectCity(city.id)
          }}
        />
      ))}
      
      {/* MICRO VIEW: Show localized incidents/hotspots */}
      {selectedCity && cityIncidents.map(incident => {
        const isFocused = activeIncidentId === incident.id;
        const color = incident.severity === 'danger' ? '#ef4444' : incident.severity === 'warning' ? '#f59e0b' : '#10b981';
        
        if (activeLayer === 'industrial' && incident.severity === 'success') return null;

        return (
          <CircleMarker 
            key={incident.id}
            center={[incident.lat, incident.lng]} 
            pathOptions={{ 
              color: color, 
              fillColor: color, 
              fillOpacity: isFocused ? 0.8 : 0.4,
              weight: isFocused ? 3 : 1
            }} 
            radius={isFocused ? 35 : 20}
            eventHandlers={{
              click: () => focusIncident(incident.id)
            }}
          >
            <Popup className="custom-leaflet-popup">
              <div className="bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 text-foreground min-w-[200px]">
                <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-2">
                  <div className={`font-bold text-xs uppercase tracking-widest ${incident.severity === 'danger' ? 'text-danger' : incident.severity === 'warning' ? 'text-warning' : 'text-success'}`}>
                    {incident.severity === 'danger' ? 'Critical Spike' : incident.severity === 'warning' ? 'Elevated' : 'Nominal'}
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">{incident.id}</span>
                </div>
                <div className="text-sm font-medium mb-1">{incident.name}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Live AQI:</span>
                  <span className={`font-mono font-bold ${incident.severity === 'danger' ? 'text-danger' : incident.severity === 'warning' ? 'text-warning' : 'text-success'}`}>{incident.aqi}</span>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
