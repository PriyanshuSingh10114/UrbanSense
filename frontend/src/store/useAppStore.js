import { create } from 'zustand';

export const CITIES = {
  'delhi': { id: 'delhi', name: 'New Delhi', lat: 28.6139, lng: 77.2090, aqi: 312, severity: 'danger' },
  'mumbai': { id: 'mumbai', name: 'Mumbai', lat: 19.0760, lng: 72.8777, aqi: 156, severity: 'warning' },
  'bangalore': { id: 'bangalore', name: 'Bangalore', lat: 12.9716, lng: 77.5946, aqi: 84, severity: 'success' },
  'chennai': { id: 'chennai', name: 'Chennai', lat: 13.0827, lng: 80.2707, aqi: 92, severity: 'success' },
  'kolkata': { id: 'kolkata', name: 'Kolkata', lat: 22.5726, lng: 88.3639, aqi: 215, severity: 'danger' }
};

const INDIA_CENTER = [20.5937, 78.9629];
const INDIA_ZOOM = 5;

/**
 * Global application state tailored for the Operational Intelligence Platform.
 * Centralizes context for the Map, Active Incidents, and Auth.
 */
export const useAppStore = create((set) => ({
  // Authentication & Role
  user: null, 
  token: localStorage.getItem('urban_auth_token') || null,
  isAuthenticated: !!localStorage.getItem('urban_auth_token'),
  login: (userData, token) => {
    localStorage.setItem('urban_auth_token', token);
    set({ user: userData, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('urban_auth_token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  // Map & Geospatial Context (Macro vs Micro)
  mapCenter: INDIA_CENTER,
  mapZoom: INDIA_ZOOM,
  selectedCity: null,
  activeLayer: 'aqi', // 'aqi', 'pm25', 'traffic', 'industrial'
  hoveredDistrict: null,
  
  selectCity: (cityId) => {
    const city = CITIES[cityId];
    if (city) {
      set({ 
        selectedCity: cityId, 
        mapCenter: [city.lat, city.lng], 
        mapZoom: 12,
        activeIncidentId: null // clear incident focus on new city
      });
    }
  },

  clearCitySelection: () => set({ 
    selectedCity: null, 
    mapCenter: INDIA_CENTER, 
    mapZoom: INDIA_ZOOM,
    activeIncidentId: null
  }),

  setMapState: (center, zoom) => set({ mapCenter: center, mapZoom: zoom }),
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  setHoveredDistrict: (districtId) => set({ hoveredDistrict: districtId }),

  // Operational Workflows & Incidents
  activeIncidentId: null,
  focusIncident: (id) => set({ activeIncidentId: id }),
  clearIncidentFocus: () => set({ activeIncidentId: null }),
  
  // Time Scrubbing / Prediction Context
  timeScrubValue: 0, // 0 = Live, >0 = Future hours (+1, +12, etc.)
  setTimeScrubValue: (val) => set({ timeScrubValue: val }),
}));
