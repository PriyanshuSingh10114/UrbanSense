import Link from 'next/link'
import { Activity, Map, LayoutDashboard, LogOut } from 'lucide-react'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">UrbanSense</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
            <LayoutDashboard size={20} className="text-cyan-400" />
            Overview
          </Link>
          <Link href="/dashboard/map" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors">
            <Map size={20} className="text-indigo-400" />
            Live Map
          </Link>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 transition-colors opacity-50 cursor-not-allowed">
            <Activity size={20} className="text-rose-400" />
            Alerts (Coming Soon)
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link href="/login" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <LogOut size={20} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
