"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Send, TrendingUp, Search, Edit, Trash2, CheckCircle2, Clock } from "lucide-react"

const notificacionesEnviadas = [
  {
    id: 1,
    titulo: "Nueva temporada disponible",
    mensaje: "La temporada Primavera 2024 ya está activa. ¡Participa ahora!",
    tipo: "Temporada",
    destinatarios: 1847,
    enviados: 1847,
    abiertos: 1234,
    clicks: 567,
    fecha: "2024-03-01 10:00",
    estado: "Enviado",
  },
  {
    id: 2,
    titulo: "Nuevo desafío: 100K Marzo",
    mensaje: "Únete al desafío de correr 100 km este mes y gana recompensas",
    tipo: "Desafío",
    destinatarios: 1500,
    enviados: 1500,
    abiertos: 987,
    clicks: 456,
    fecha: "2024-03-05 09:00",
    estado: "Enviado",
  },
  {
    id: 3,
    titulo: "¡Felicidades por tu nuevo récord!",
    mensaje: "Has establecido un nuevo récord personal en 5K. ¡Sigue así!",
    tipo: "Logro",
    destinatarios: 234,
    enviados: 234,
    abiertos: 198,
    clicks: 89,
    fecha: "2024-03-10 14:30",
    estado: "Enviado",
  },
]

const notificacionesProgramadas = [
  {
    id: 4,
    titulo: "Recordatorio: Evento este fin de semana",
    mensaje: "No olvides el evento de running este sábado a las 8 AM",
    tipo: "Evento",
    destinatarios: 456,
    fechaProgramada: "2024-03-20 08:00",
    estado: "Programado",
  },
  {
    id: 5,
    titulo: "Nueva recompensa disponible",
    mensaje: "Canjea tus puntos por descuentos exclusivos en la tienda",
    tipo: "Recompensa",
    destinatarios: 789,
    fechaProgramada: "2024-03-25 10:00",
    estado: "Programado",
  },
]

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "Enviado":
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Enviado</Badge>
    case "Programado":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Programado</Badge>
    case "Borrador":
      return <Badge variant="secondary">Borrador</Badge>
    case "Fallido":
      return <Badge variant="destructive">Fallido</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

const getTipoBadge = (tipo: string) => {
  switch (tipo) {
    case "Temporada":
      return <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30">Temporada</Badge>
    case "Desafío":
      return <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30">Desafío</Badge>
    case "Logro":
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Logro</Badge>
    case "Evento":
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Evento</Badge>
    case "Recompensa":
      return <Badge className="bg-pink-500/20 text-pink-600 border-pink-500/30">Recompensa</Badge>
    default:
      return <Badge variant="outline">{tipo}</Badge>
  }
}

export default function PushPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Notificaciones Push</h1>
        <p className="text-muted-foreground text-pretty">
          Gestiona y envía notificaciones push a los usuarios de la aplicación móvil
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notificaciones Enviadas</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,581</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Apertura</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67.5%</div>
            <p className="text-xs text-muted-foreground">Promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Click</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31.2%</div>
            <p className="text-xs text-muted-foreground">Promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programadas</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Pendientes de envío</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="nueva" className="space-y-6">
        <TabsList>
          <TabsTrigger value="nueva">Nueva Notificación</TabsTrigger>
          <TabsTrigger value="enviadas">Enviadas</TabsTrigger>
          <TabsTrigger value="programadas">Programadas</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="nueva" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crear Nueva Notificación</CardTitle>
              <CardDescription>Envía una notificación push a los usuarios de la aplicación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input id="titulo" placeholder="Ej: Nueva temporada disponible" />
                  <p className="text-xs text-muted-foreground">Máximo 50 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea id="mensaje" placeholder="Escribe el mensaje de la notificación..." rows={4} />
                  <p className="text-xs text-muted-foreground">Máximo 150 caracteres</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Notificación</Label>
                    <Select defaultValue="general">
                      <SelectTrigger id="tipo">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="temporada">Temporada</SelectItem>
                        <SelectItem value="desafio">Desafío</SelectItem>
                        <SelectItem value="logro">Logro</SelectItem>
                        <SelectItem value="evento">Evento</SelectItem>
                        <SelectItem value="recompensa">Recompensa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destinatarios">Destinatarios</Label>
                    <Select defaultValue="todos">
                      <SelectTrigger id="destinatarios">
                        <SelectValue placeholder="Selecciona destinatarios" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos los usuarios (1,900)</SelectItem>
                        <SelectItem value="activos">Usuarios activos (1,234)</SelectItem>
                        <SelectItem value="elite">Liga Élite (50)</SelectItem>
                        <SelectItem value="diamante">Liga Diamante (150)</SelectItem>
                        <SelectItem value="inactivos">Usuarios inactivos (234)</SelectItem>
                        <SelectItem value="personalizado">Personalizado...</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accion">Acción al Tocar (Opcional)</Label>
                  <Select defaultValue="ninguna">
                    <SelectTrigger id="accion">
                      <SelectValue placeholder="Selecciona una acción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ninguna">Ninguna</SelectItem>
                      <SelectItem value="home">Abrir Home</SelectItem>
                      <SelectItem value="temporada">Abrir Temporada</SelectItem>
                      <SelectItem value="desafios">Abrir Desafíos</SelectItem>
                      <SelectItem value="eventos">Abrir Eventos</SelectItem>
                      <SelectItem value="recompensas">Abrir Recompensas</SelectItem>
                      <SelectItem value="perfil">Abrir Perfil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Programar Envío</Label>
                      <p className="text-sm text-muted-foreground">Enviar en una fecha y hora específica</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fecha">Fecha</Label>
                      <Input id="fecha" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hora">Hora</Label>
                      <Input id="hora" type="time" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Opciones Avanzadas</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sonido</Label>
                      <p className="text-sm text-muted-foreground">Reproducir sonido al recibir</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Vibración</Label>
                      <p className="text-sm text-muted-foreground">Vibrar al recibir</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Badge en Icono</Label>
                      <p className="text-sm text-muted-foreground">Mostrar contador en el icono de la app</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prioridad">Prioridad</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger id="prioridad">
                        <SelectValue placeholder="Selecciona prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baja">Baja</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Guardar como Borrador</Button>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Enviar Notificación
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enviadas" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar notificación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {notificacionesEnviadas.map((notif) => (
              <Card key={notif.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{notif.titulo}</CardTitle>
                        {getEstadoBadge(notif.estado)}
                        {getTipoBadge(notif.tipo)}
                      </div>
                      <CardDescription>{notif.mensaje}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Destinatarios</div>
                      <div className="font-medium">{notif.destinatarios.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Enviados</div>
                      <div className="font-medium">{notif.enviados.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Abiertos</div>
                      <div className="font-medium text-primary">
                        {notif.abiertos.toLocaleString()} ({((notif.abiertos / notif.enviados) * 100).toFixed(1)}%)
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Clicks</div>
                      <div className="font-medium text-accent">
                        {notif.clicks.toLocaleString()} ({((notif.clicks / notif.enviados) * 100).toFixed(1)}%)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t text-sm mt-4">
                    <div className="text-muted-foreground">Enviado: {notif.fecha}</div>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programadas" className="space-y-6">
          <div className="grid gap-4">
            {notificacionesProgramadas.map((notif) => (
              <Card key={notif.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base">{notif.titulo}</CardTitle>
                        {getEstadoBadge(notif.estado)}
                        {getTipoBadge(notif.tipo)}
                      </div>
                      <CardDescription>{notif.mensaje}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="text-sm text-muted-foreground">Destinatarios</div>
                      <div className="font-medium">{notif.destinatarios.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Fecha Programada</div>
                      <div className="font-medium text-primary">{notif.fechaProgramada}</div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                    <Button variant="outline" size="sm">
                      Cancelar
                    </Button>
                    <Button size="sm" className="gap-2">
                      <Send className="h-4 w-4" />
                      Enviar Ahora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Tipo</CardTitle>
                <CardDescription>Tasa de apertura por tipo de notificación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { tipo: "Logro", apertura: 84.6, clicks: 45.2 },
                    { tipo: "Temporada", apertura: 66.8, clicks: 30.7 },
                    { tipo: "Desafío", apertura: 65.8, clicks: 30.4 },
                    { tipo: "Evento", apertura: 72.3, clicks: 38.9 },
                    { tipo: "Recompensa", apertura: 78.5, clicks: 42.1 },
                  ].map((item) => (
                    <div key={item.tipo} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.tipo}</span>
                        <span className="text-muted-foreground">
                          {item.apertura}% apertura / {item.clicks}% clicks
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${item.apertura}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mejor Horario de Envío</CardTitle>
                <CardDescription>Tasa de apertura por hora del día</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { hora: "08:00 - 10:00", apertura: 78.5 },
                    { hora: "10:00 - 12:00", apertura: 72.3 },
                    { hora: "12:00 - 14:00", apertura: 65.8 },
                    { hora: "14:00 - 16:00", apertura: 58.2 },
                    { hora: "16:00 - 18:00", apertura: 62.4 },
                    { hora: "18:00 - 20:00", apertura: 75.6 },
                    { hora: "20:00 - 22:00", apertura: 68.9 },
                  ].map((item) => (
                    <div key={item.hora} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">{item.hora}</span>
                      <span className="font-bold text-primary">{item.apertura}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notificaciones por Mes</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { mes: "Marzo 2024", enviadas: 3581, apertura: 67.5 },
                    { mes: "Febrero 2024", enviadas: 3234, apertura: 65.2 },
                    { mes: "Enero 2024", enviadas: 4123, apertura: 71.8 },
                    { mes: "Diciembre 2023", enviadas: 5234, apertura: 69.4 },
                    { mes: "Noviembre 2023", enviadas: 2987, apertura: 63.7 },
                    { mes: "Octubre 2023", enviadas: 3456, apertura: 66.9 },
                  ].map((item) => (
                    <div key={item.mes} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">{item.mes}</div>
                        <div className="text-xs text-muted-foreground">{item.enviadas.toLocaleString()} enviadas</div>
                      </div>
                      <span className="font-bold text-primary">{item.apertura}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas Generales</CardTitle>
                <CardDescription>Resumen del sistema de notificaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Total Enviadas</span>
                    <span className="font-bold">22,615</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Tasa Apertura Promedio</span>
                    <span className="font-bold text-primary">67.5%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Tasa Click Promedio</span>
                    <span className="font-bold text-accent">31.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Usuarios Suscritos</span>
                    <span className="font-bold">1,847</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
