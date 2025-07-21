'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { setClientInSession } from '@/lib/auth'

const translations = {
  en: {
    username: 'Username',
    password: 'Password',
    enter: 'Enter',
    error: 'Invalid credentials'
  },
  pt: {
    username: 'Usuário',
    password: 'Senha',
    enter: 'Entrar',
    error: 'Credenciais inválidas'
  }
}

export default function LoginPage() {
  const [lang, setLang] = useState<'en' | 'pt'>('pt')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { toast } = useToast()
  const t = translations[lang]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      if (response.ok) {
        const client = await response.json()
        // Store client info in session
        setClientInSession(client)
        router.push('/dashboard')
      } else {
        toast({
          variant: "destructive",
          title: t.error
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      toast({
        variant: "destructive",
        title: t.error
      })
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button 
          variant={lang === 'pt' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setLang('pt')}
        >
          PT
        </Button>
        <Button 
          variant={lang === 'en' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setLang('en')}
        >
          EN
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <div className="relative w-[700px] h-[209px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dieselbot_logo-Fq4H5YCgpHv1WN2TNH2Wan2l0eRUqJ.png"
                alt="DieselBot"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-6 rounded-lg backdrop-blur-sm">
            <div className="space-y-2">
              <label className="text-zinc-400 text-sm">
                {t.username}
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black/50 border-zinc-800 text-white h-12"
                placeholder={t.username}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-zinc-400 text-sm">
                {t.password}
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-zinc-800 text-white h-12"
                placeholder={t.password}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-12"
            >
              {t.enter}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

