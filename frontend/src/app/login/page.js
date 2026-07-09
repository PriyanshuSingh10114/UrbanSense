"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = (e) => {
    e.preventDefault()
    // Simulated auth
    router.push('/dashboard')
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-950">
      <Card className="w-full max-w-sm border-slate-800 bg-slate-900 text-slate-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cyan-400">UrbanSense</CardTitle>
          <CardDescription className="text-slate-400">Enter your credentials to access the intelligence platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-slate-800 border-slate-700 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-slate-800 border-slate-700 text-white" />
            </div>
            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">Login to Dashboard</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
