"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react"

const metricas = [
  { nombre: "Carreras Analizadas Hoy", valor: "1,234", cambio: "+12%", icon: Shield },
  { nombre: "Casos Sospechosos", valor: "23", cambio: "-5%", icon: AlertTriangle },
  { nombre: "Validaciones Exitosas", valor: "98.2%", cambio: "+0.3%", icon: CheckCircle2 },
]

const casosSospechosos = [
  { usuario: "Usuario #4521", motivo: "Velocidad anormal detectada", nivel: "Alto", fecha: "Hace 5 min" },
  { usuario: "Usuario #3892", motivo: "Patrón GPS irregular", nivel: "Medio", fecha: "Hace 12 min" },
  { usuario: "Usuario #7123", motivo: "Duplicado de actividad", nivel: "Bajo", fecha: "Hace 25 min" },
]

export default function ValidacionesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Validaciones Anti-Trampa</h1>
          <p className="text-muted-foreground">Sistema de detección de actividades fraudulentas</p>
        </div>
        <Badge variant="outline" className="text-green-500 border-green-500">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Sistema Activo
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
            <CardTitle>Configuración de Validaciones</CardTitle>
            <CardDescription>Ajusta los parámetros de detección</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Validación de Velocidad</Label>
                <p className="text-sm text-muted-foreground">Detectar velocidades imposibles</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Velocidad Máxima Permitida (km/h)</Label>
              <Select defaultValue="25">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20 km/h</SelectItem>
                  <SelectItem value="25">25 km/h (recomendado)</SelectItem>
                  <SelectItem value="30">30 km/h</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Validación de Precisión GPS</Label>
                <p className="text-sm text-muted-foreground">Verificar calidad de señal GPS</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-2">
              <Label>Precisión Mínima Requerida (m)</Label>
              <Select defaultValue="10">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 metros</SelectItem>
                  <SelectItem value="10">10 metros (recomendado)</SelectItem>
                  <SelectItem value="20">20 metros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Detección de Trayectos en Vehículo</Label>
                <p className="text-sm text-muted-foreground">Identificar patrones de movimiento en auto/bus</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Verificación de Teletransporte</Label>
                <p className="text-sm text-muted-foreground">Detectar saltos imposibles en ubicación</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Análisis de Duplicados</Label>
                <p className="text-sm text-muted-foreground">Evitar registrar la misma carrera múltiples veces</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Validación de Elevación</Label>
                <p className="text-sm text-muted-foreground">Verificar coherencia de datos de altitud</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Automáticas</CardTitle>
            <CardDescription>Respuestas del sistema ante detecciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Acción para Nivel Alto</Label>
              <Select defaultValue="invalidar">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invalidar">Invalidar carrera automáticamente</SelectItem>
                  <SelectItem value="revisar">Marcar para revisión manual</SelectItem>
                  <SelectItem value="notificar">Solo notificar al admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Acción para Nivel Medio</Label>
              <Select defaultValue="revisar">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invalidar">Invalidar carrera automáticamente</SelectItem>
                  <SelectItem value="revisar">Marcar para revisión manual</SelectItem>
                  <SelectItem value="notificar">Solo notificar al admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Acción para Nivel Bajo</Label>
              <Select defaultValue="notificar">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invalidar">Invalidar carrera automáticamente</SelectItem>
                  <SelectItem value="revisar">Marcar para revisión manual</SelectItem>
                  <SelectItem value="notificar">Solo notificar al admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificar al Usuario</Label>
                <p className="text-sm text-muted-foreground">Informar sobre carreras invalidadas</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Suspensión Automática</Label>
                <p className="text-sm text-muted-foreground">Suspender usuarios con múltiples infracciones</p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label>Infracciones para Suspensión</Label>
              <Select defaultValue="3">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 infracción</SelectItem>
                  <SelectItem value="3">3 infracciones</SelectItem>
                  <SelectItem value="5">5 infracciones</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-medium">Estadísticas de Detección</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Velocidad anormal</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">GPS irregular</span>
                  <span className="font-medium">28%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duplicados</span>
                  <span className="font-medium">18%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Otros</span>
                  <span className="font-medium">9%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Casos Sospechosos Recientes</CardTitle>
          <CardDescription>Actividades que requieren atención</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {casosSospechosos.map((caso, i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{caso.usuario}</p>
                  <p className="text-sm text-muted-foreground">{caso.motivo}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Detectado</p>
                    <p className="text-sm font-medium">{caso.fecha}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      caso.nivel === "Alto"
                        ? "text-red-500 border-red-500"
                        : caso.nivel === "Medio"
                          ? "text-yellow-500 border-yellow-500"
                          : "text-blue-500 border-blue-500"
                    }
                  >
                    {caso.nivel}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Revisar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reglas de Validación Personalizadas</CardTitle>
          <CardDescription>Crea tus propias reglas de detección</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button>Agregar Nueva Regla</Button>
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Velocidad promedio &gt; 22 km/h en carreras &gt; 10km</p>
                  <p className="text-sm text-muted-foreground">Acción: Marcar para revisión</p>
                </div>
                <div className="flex gap-2">
                  <Switch defaultChecked />
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Precisión GPS &lt; 15m durante más del 30% de la carrera</p>
                  <p className="text-sm text-muted-foreground">Acción: Invalidar automáticamente</p>
                </div>
                <div className="flex gap-2">
                  <Switch defaultChecked />
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
