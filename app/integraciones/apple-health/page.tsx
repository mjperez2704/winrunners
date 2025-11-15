"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Apple, Users, Activity, TrendingUp, CheckCircle2, XCircle } from "lucide-react"

const metricas = [
  { nombre: "Usuarios Conectados", valor: "3,456", cambio: "+12%", icon: Users },
  { nombre: "Sincronizaciones Hoy", valor: "8,234", cambio: "+5%", icon: Activity },
  { nombre: "Datos Importados", valor: "45.2K", cambio: "+18%", icon: TrendingUp },
]

const usuariosRecientes = [
  { nombre: "Carlos M.", email: "carlos@email.com", estado: "Activa", ultimaSync: "Hace 5 min" },
  { nombre: "María G.", email: "maria@email.com", estado: "Activa", ultimaSync: "Hace 12 min" },
  { nombre: "Juan P.", email: "juan@email.com", estado: "Error", ultimaSync: "Hace 2 horas" },
]

export default function AppleHealthPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Apple className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Apple Health</h1>
            <p className="text-muted-foreground">Integración con HealthKit de iOS</p>
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
                <Label>Validación de Datos</Label>
                <p className="text-sm text-muted-foreground">Verificar integridad de los datos</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificaciones de Error</Label>
                <p className="text-sm text-muted-foreground">Alertar cuando falle la sincronización</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Importar Frecuencia Cardíaca</Label>
                <p className="text-sm text-muted-foreground">Datos de FC durante las carreras</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Importar Pasos Diarios</Label>
                <p className="text-sm text-muted-foreground">Actividad general del usuario</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Importar Calorías Quemadas</Label>
                <p className="text-sm text-muted-foreground">Gasto energético de las actividades</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de la API</CardTitle>
            <CardDescription>Monitoreo de la conexión con Apple Health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Estado del Servicio</span>
                <Badge variant="outline" className="text-green-500 border-green-500">
                  Operativo
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Última Verificación</span>
                <span className="text-sm text-muted-foreground">Hace 2 minutos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tasa de Éxito</span>
                <span className="text-sm font-medium">99.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Tiempo de Respuesta</span>
                <span className="text-sm font-medium">145ms</span>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-medium">Métricas Disponibles</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Distancia recorrida</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Duración de actividad</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Frecuencia cardíaca</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Calorías quemadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Pasos totales</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Elevación ganada</span>
                </div>
              </div>
            </div>

            <Button className="w-full mt-4">Probar Conexión</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuarios Conectados Recientemente</CardTitle>
          <CardDescription>Actividad reciente de sincronización</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {usuariosRecientes.map((usuario) => (
              <div key={usuario.email} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{usuario.nombre}</p>
                  <p className="text-sm text-muted-foreground">{usuario.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Última sincronización</p>
                    <p className="text-sm font-medium">{usuario.ultimaSync}</p>
                  </div>
                  {usuario.estado === "Activa" ? (
                    <Badge variant="outline" className="text-green-500 border-green-500">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      {usuario.estado}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-500 border-red-500">
                      <XCircle className="mr-1 h-3 w-3" />
                      {usuario.estado}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
