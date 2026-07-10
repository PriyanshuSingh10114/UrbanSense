import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layouts
import MainLayout from '@/layouts/MainLayout.jsx'
import DashboardLayout from '@/layouts/DashboardLayout.jsx'
import AICopilot from '@/components/AICopilot.jsx'

// Pages
import LandingPage from '@/pages/LandingPage.jsx'
import PublicDashboard from '@/pages/PublicDashboard.jsx'
import LiveMap from '@/pages/LiveMap.jsx'
import Forecast from '@/pages/Forecast.jsx'
import CitizenAdvisory from '@/pages/CitizenAdvisory.jsx'
import Cities from '@/pages/Cities.jsx'

import GovernmentLogin from '@/pages/GovernmentLogin.jsx'
import GovernmentDashboard from '@/pages/GovernmentDashboard.jsx'
import AdminLogin from '@/pages/AdminLogin.jsx'
import AdminDashboard from '@/pages/AdminDashboard.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Main Navbar & Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<PublicDashboard />} />
          <Route path="/map" element={<LiveMap />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/advisory" element={<CitizenAdvisory />} />
          <Route path="/cities" element={<Cities />} />
          
          {/* Login Routes */}
          <Route path="/government/login" element={<GovernmentLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* Protected Dashboard Routes (Government) */}
        <Route path="/government" element={<DashboardLayout role="government" />}>
          <Route path="dashboard" element={<GovernmentDashboard />} />
        </Route>

        {/* Protected Dashboard Routes (Admin) */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
      <AICopilot />
    </BrowserRouter>
  )
}

export default App
