"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Server, Database, Cpu, HardDrive, Activity, RefreshCw, Download } from "lucide-react"

export default function SistemaPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Parámetros del Sistema</h1>
          <p className="text-muted-foreground">Monitoreo y estado del servidor</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualizar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Descargar Logs
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado del Servidor</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-green-500 border-green-500">
              Operativo
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">Uptime: 45 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uso de CPU</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <Progress value={42} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uso de Memoria</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.2 GB</div>
            <p className="text-xs text-muted-foreground">de 16 GB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Espacio en Disco</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245 GB</div>
            <p className="text-xs text-muted-foreground">de 500 GB</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Estado de la Base de Datos
            </CardTitle>
            <CardDescription>Supabase PostgreSQL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Estado</span>
              <Badge variant="outline" className="text-green-500 border-green-500">
                Conectado
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Conexiones Activas</span>
              <span className="font-medium">23 / 100</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tamaño de DB</span>
              <span className="font-medium">3.2 GB</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Tablas</span>
              <span className="font-medium">45</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Registros Totales</span>
              <span className="font-medium">2.4M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Último Backup</span>
              <span className="font-medium">Hace 2 horas</span>
            </div>
            <div className="pt-4 flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                Crear Backup
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Optimizar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Servicios del Sistema</CardTitle>
            <CardDescription>Estado de los servicios principales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { nombre: "API REST", estado: "Operativo", latencia: "45ms" },
              { nombre: "WebSocket", estado: "Operativo", latencia: "12ms" },
              { nombre: "Worker de Tareas", estado: "Operativo", latencia: "-" },
              { nombre: "Sistema de Cache", estado: "Operativo", latencia: "2ms" },
              { nombre: "Storage (Blobs)", estado: "Operativo", latencia: "89ms" },
              { nombre: "Email Service", estado: "Operativo", latencia: "234ms" },
            ].map((servicio) => (
              <div key={servicio.nombre} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{servicio.nombre}</p>
                  <p className="text-sm text-muted-foreground">Latencia: {servicio.latencia}</p>
                </div>
                <Badge variant="outline" className="text-green-500 border-green-500">
                  {servicio.estado}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información del Sistema</CardTitle>
          <CardDescription>Detalles técnicos del servidor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Sistema Operativo</h4>
              <p className="text-sm">Ubuntu 22.04 LTS</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Versión de Node.js</h4>
              <p className="text-sm">v20.11.0</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Versión de Next.js</h4>
              <p className="text-sm">16.0.0</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">IP del Servidor</h4>
              <p className="text-sm">192.168.1.100</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Puerto</h4>
              <p className="text-sm">3000</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Entorno</h4>
              <Badge>Production</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logs del Sistema</CardTitle>
          <CardDescription>Últimos eventos registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 font-mono text-sm">
            {[
              { nivel: "INFO", mensaje: "[2024-04-15 14:32:45] Usuario #3456 inició sesión", color: "text-blue-500" },
              {
                nivel: "INFO",
                mensaje: "[2024-04-15 14:31:12] Backup automático completado exitosamente",
                color: "text-green-500",
              },
              { nivel: "WARN", mensaje: "[2024-04-15 14:28:33] Uso de CPU alcanzó el 85%", color: "text-yellow-500" },
              {
                nivel: "INFO",
                mensaje: "[2024-04-15 14:25:01] Sincronización con Strava completada",
                color: "text-blue-500",
              },
              {
                nivel: "ERROR",
                mensaje: "[2024-04-15 14:20:15] Fallo en envío de email a usuario #7891",
                color: "text-red-500",
              },
            ].map((log, i) => (
              <div key={i} className="p-2 bg-muted rounded">
                <span className={log.color}>[{log.nivel}]</span> {log.mensaje}
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            Ver Todos los Logs
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
