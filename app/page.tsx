'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, LogIn } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    setTimeout(() => {
      if (email && password) {
        // Guardar una bandera simple en localStorage para simular sesión
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('userEmail', email)
        router.push('/dashboard')
      } else {
        setError('Por favor ingresa email y contraseña')
        setLoading(false)
      }
    }, 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-600 via-orange-500 to-yellow-600 p-4">
      <Card className="w-full max-w-md border-gray-800 bg-gray-950/50 backdrop-blur">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-30 w-50 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 p-3">
            <Image
              src="/logo_login_sf4.png"
              alt="WinRunners Logo"
              width={154}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">Panel de Administración</CardTitle>
            <CardDescription className="text-gray-400">
              Ingresa tus credenciales para acceder al panel de WinRunners
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="border-red-900 bg-red-950/50">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@winrunners.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-800 bg-gray-900 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-800 bg-gray-900 text-white placeholder:text-gray-500"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-red-600 hover:to-orange-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4 text-white" />
                  Iniciar Sesión
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
