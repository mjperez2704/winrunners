"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Users, Activity, CheckCircle2, Trophy } from "lucide-react"

const metricas = [
  { nombre: "Usuarios Conectados", valor: "5,234", cambio: "+15%", icon: Users },
  { nombre: "Actividades Importadas", valor: "12,567", cambio: "+22%", icon: Activity },
  { nombre: "Segmentos Sincronizados", valor: "3,456", cambio: "+10%", icon: Trophy },
]

export default function StravaPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Strava</h1>
            <p className="text-muted-foreground">Integración con Strava API v3</p>
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
              <p className="text-xs text-green-500">{metrica.cambio} vs mes anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configuración de la Integración</CardTitle>
            <CardDescription>Ajusta los parámetros de sincronización con Strava</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Importar Actividades Automáticamente</Label>
                <p className="text-sm text-muted-foreground">Sincronizar nuevas carreras al instante</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Webhooks Activos</Label>
                <p className="text-sm text-muted-foreground">Recibir notificaciones en tiempo real</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Importar Segmentos KOM/QOM</Label>
                <p className="text-sm text-muted-foreground">Sincronizar récords de segmentos</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Importar Fotos</Label>
                <p className="text-sm text-muted-foreground">Sincronizar imágenes de actividades</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Validación Cruzada</Label>
                <p className="text-sm text-muted-foreground">Comparar con datos de GPS interno</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Detección de Kudos</Label>
                <p className="text-sm text-muted-foreground">Importar likes y comentarios</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuración de API</CardTitle>
            <CardDescription>Credenciales de acceso a Strava</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Application ID</Label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 bg-secondary rounded-md text-sm font-mono"
                  value="123456"
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
                  value="a1b2c3d4e5f6••••••••••••"
                  readOnly
                />
                <Button variant="outline" size="sm">
                  Ver
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Webhook Callback URL</Label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 bg-secondary rounded-md text-sm"
                  value="https://api.winrunners.com/webhooks/strava"
                  readOnly
                />
                <Button variant="outline" size="sm">
                  Copiar
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Verify Token</Label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-3 py-2 bg-secondary rounded-md text-sm font-mono"
                  value="WINRUNNERS_VERIFY_TOKEN"
                  readOnly
                />
                <Button variant="outline" size="sm">
                  Copiar
                </Button>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-medium">Rate Limits</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Límite diario</span>
                  <span className="font-medium">1,000 requests</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Límite por 15 min</span>
                  <span className="font-medium">100 requests</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Usado hoy</span>
                  <span className="font-medium text-green-500">234 / 1,000</span>
                </div>
              </div>
            </div>

            <Button className="w-full mt-4">Verificar Conexión</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividades Recientes Importadas</CardTitle>
          <CardDescription>Últimas sincronizaciones desde Strava</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                usuario: "Ana López",
                actividad: "Morning Run",
                distancia: "10.5 km",
                tiempo: "52:34",
                fecha: "Hace 15 min",
              },
              {
                usuario: "Pedro Sánchez",
                actividad: "Evening Jog",
                distancia: "7.2 km",
                tiempo: "38:12",
                fecha: "Hace 32 min",
              },
              {
                usuario: "Laura Martínez",
                actividad: "Long Run Sunday",
                distancia: "21.1 km",
                tiempo: "1:58:45",
                fecha: "Hace 1 hora",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{item.actividad}</p>
                  <p className="text-sm text-muted-foreground">{item.usuario}</p>
                </div>
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">Distancia</p>
                    <p className="font-medium">{item.distancia}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tiempo</p>
                    <p className="font-medium">{item.tiempo}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Sincronizado</p>
                    <p className="font-medium">{item.fecha}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Ver Detalles
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
