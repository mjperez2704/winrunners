"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Users, Activity, TrendingUp, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const metricas = [
  { nombre: "Usuarios Conectados", valor: "2,789", cambio: "+8%", icon: Users },
  { nombre: "Sincronizaciones Hoy", valor: "6,123", cambio: "+3%", icon: Activity },
  { nombre: "Datos Importados", valor: "38.7K", cambio: "+15%", icon: TrendingUp },
]

export default function GoogleFitPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border">
            <Image src="/google-fit-logo.jpg" alt="Google Fit" width={40} height={40} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Google Fit</h1>
            <p className="text-muted-foreground">Integración con Google Fit API</p>
          </div>
        </div>
        <Badge variant="outline" className="text-green-500 border-green-500">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Conectado
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metricas.map((metrica) => (
          <Card key={metrica.nombre}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metrica.nombre}</CardTitle>
              <metrica.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrica.valor}</div>
              <p className="text-xs text-green-500">{metrica.cambio} vs ayer</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de la Integración</CardTitle>
            <CardDescription>Ajusta los parámetros de sincronización</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sincronización Automática</Label>
                <p className="text-sm text-muted-foreground">Importar datos cada 15 minutos</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>OAuth 2.0 Activo</Label>
                <p className="text-sm text-muted-foreground">Autenticación con Google</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Importar Actividades</Label>
                <p className="text-sm text-muted-foreground">Carreras y entrenamientos</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Importar Datos de Ubicación</Label>
                <p className="text-sm text-muted-foreground">Rutas GPS de las carreras</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Detección de Duplicados</Label>
                <p className="text-sm text-muted-foreground">Evitar importar datos repetidos</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credenciales de API</CardTitle>
            <CardDescription>Configuración de acceso a Google Fit</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Client ID</Label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 bg-secondary rounded-md text-sm font-mono"
                  value="123456789-abc123.apps.googleusercontent.com"
                  readOnly
                />
                <Button variant="outline" size="sm">
                  Copiar
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Client Secret</Label>
              <div className="flex gap-2">
                <input
                  type="password"
                  className="flex-1 px-3 py-2 bg-secondary rounded-md text-sm font-mono"
                  value="GOCSPX-••••••••••••••••"
                  readOnly
                />
                <Button variant="outline" size="sm">
                  Ver
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Redirect URI</Label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 bg-secondary rounded-md text-sm"
                  value="https://winrunners.com/oauth/callback"
                  readOnly
                />
                <Button variant="outline" size="sm">
                  Copiar
                </Button>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-medium">Permisos Solicitados</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">fitness.activity.read</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">fitness.location.read</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">fitness.body.read</span>
                </div>
              </div>
            </div>

            <Button className="w-full mt-4">Regenerar Credenciales</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estadísticas de Sincronización</CardTitle>
          <CardDescription>Rendimiento de la integración en las últimas 24 horas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total de Solicitudes</p>
              <p className="text-2xl font-bold">12,456</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Exitosas</p>
              <p className="text-2xl font-bold text-green-500">12,123</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Fallidas</p>
              <p className="text-2xl font-bold text-red-500">333</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Tasa de Éxito</p>
              <p className="text-2xl font-bold">97.3%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
