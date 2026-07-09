import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-slate-100">
      <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-600 mb-6">
        UrbanSense
      </h1>
      <p className="text-xl text-slate-400 mb-8 max-w-2xl text-center">
        AI-Powered Urban Air Intelligence Platform for Smart City Intervention. Move from reactive monitoring to proactive, evidence-based intervention.
      </p>
      <Link href="/login">
        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 rounded-full cursor-pointer">
          Enter Platform
        </Button>
      </Link>
    </div>
  )
}
