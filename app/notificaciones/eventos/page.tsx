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
import { Bell, Send, Calendar, Users, TrendingUp, Plus, Edit, Trash2, Target, Mail, MessageSquare } from 'lucide-react'

const campanasActivas = [
  {
    id: 1,
    nombre: "Recordatorio Carrera 5K Primavera",
    evento: "Carrera 5K Primavera",
    tipo: "Push",
    estado: "Activa",
    enviados: 234,
    abiertos: 178,
    clicks: 89,
    fechaEnvio: "2024-03-20",
    programada: false,
  },
  {
    id: 2,
    nombre: "Últimos Días Inscripción Maratón",
    evento: "Maratón Ciudad 2024",
    tipo: "Email + Push",
    estado: "Programada",
    destinatarios: 567,
    fechaEnvio: "2024-04-10",
    horaEnvio: "09:00",
    programada: true,
  },
  {
    id: 3,
    nombre: "Confirmación Trail Running",
    evento: "Trail Running Montaña",
    tipo: "Email",
    estado: "Activa",
    enviados: 123,
    abiertos: 115,
    clicks: 78,
    fechaEnvio: "2024-03-18",
    programada: false,
  },
]

const campanasCompletadas = [
  {
    id: 4,
    nombre: "Apertura Inscripciones Carrera Nocturna",
    evento: "Carrera Nocturna 10K",
    tipo: "Push + Email",
    enviados: 1250,
    abiertos: 987,
    clicks: 456,
    conversiones: 234,
    fechaEnvio: "2024-02-15",
  },
  {
    id: 5,
    nombre: "Recordatorio Final Media Maratón",
    evento: "Media Maratón Verano",
    tipo: "Push",
    enviados: 789,
    abiertos: 654,
    clicks: 432,
    conversiones: 321,
    fechaEnvio: "2024-01-10",
  },
]

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "Activa":
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Activa</Badge>
    case "Programada":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Programada</Badge>
    case "Pausada":
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Pausada</Badge>
    case "Completada":
      return <Badge variant="secondary">Completada</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

const getTipoBadge = (tipo: string) => {
  if (tipo.includes("+")) {
    return <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30">{tipo}</Badge>
  }
  switch (tipo) {
    case "Push":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Push</Badge>
    case "Email":
      return <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30">Email</Badge>
    case "SMS":
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">SMS</Badge>
    default:
      return <Badge variant="outline">{tipo}</Badge>
  }
}

export default function CampanasEventosPage() {
  const [selectedEvento, setSelectedEvento] = useState("")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Campañas de Notificación - Eventos</h1>
        <p className="text-muted-foreground text-pretty">
          Administra las estrategias de notificación y difusión para eventos deportivos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campañas Activas</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 programadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notificaciones Enviadas</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,396</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Apertura</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76.4%</div>
            <p className="text-xs text-muted-foreground">Promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversiones</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38.2%</div>
            <p className="text-xs text-muted-foreground">Click a inscripción</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activas">Campañas Activas</TabsTrigger>
          <TabsTrigger value="completadas">Completadas</TabsTrigger>
          <TabsTrigger value="nueva">Nueva Campaña</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="activas" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-end">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Campaña
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {campanasActivas.map((campana) => (
              <Card key={campana.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{campana.nombre}</CardTitle>
                        {getEstadoBadge(campana.estado)}
                        {getTipoBadge(campana.tipo)}
                      </div>
                      <CardDescription>Evento: {campana.evento}</CardDescription>
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
                <CardContent className="space-y-4">
                  {!campana.programada ? (
                    <div className="grid gap-4 md:grid-cols-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Enviados</div>
                        <div className="text-2xl font-bold">{campana.enviados}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Abiertos</div>
                        <div className="text-2xl font-bold text-primary">{campana.abiertos}</div>
                        <div className="text-xs text-muted-foreground">
                          {((campana.abiertos! / campana.enviados!) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Clicks</div>
                        <div className="text-2xl font-bold text-accent">{campana.clicks}</div>
                        <div className="text-xs text-muted-foreground">
                          {((campana.clicks! / campana.enviados!) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Fecha de Envío</div>
                        <div className="font-medium">{new Date(campana.fechaEnvio).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <div className="text-sm text-muted-foreground">Destinatarios</div>
                        <div className="text-2xl font-bold">{campana.destinatarios}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Fecha Programada</div>
                        <div className="font-medium">{new Date(campana.fechaEnvio).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Hora Programada</div>
                        <div className="font-medium">{campana.horaEnvio}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2 border-t">
                    {campana.programada ? (
                      <>
                        <Button variant="outline" size="sm">
                          Editar Programación
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancelar Envío
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                        <Button size="sm">Ver Reporte</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completadas" className="space-y-6">
          <div className="grid gap-4">
            {campanasCompletadas.map((campana) => (
              <Card key={campana.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{campana.nombre}</CardTitle>
                        {getTipoBadge(campana.tipo)}
                      </div>
                      <CardDescription>Evento: {campana.evento}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-5">
                    <div>
                      <div className="text-sm text-muted-foreground">Enviados</div>
                      <div className="text-xl font-bold">{campana.enviados}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Abiertos</div>
                      <div className="text-xl font-bold text-primary">{campana.abiertos}</div>
                      <div className="text-xs text-muted-foreground">
                        {((campana.abiertos / campana.enviados) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Clicks</div>
                      <div className="text-xl font-bold text-accent">{campana.clicks}</div>
                      <div className="text-xs text-muted-foreground">
                        {((campana.clicks / campana.enviados) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Conversiones</div>
                      <div className="text-xl font-bold text-green-600">{campana.conversiones}</div>
                      <div className="text-xs text-muted-foreground">
                        {((campana.conversiones / campana.clicks) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Fecha</div>
                      <div className="font-medium">{new Date(campana.fechaEnvio).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                    <Button variant="outline" size="sm">
                      Ver Reporte Completo
                    </Button>
                    <Button variant="outline" size="sm">
                      Duplicar Campaña
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nueva" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crear Nueva Campaña de Notificación</CardTitle>
              <CardDescription>Configura una campaña de difusión para un evento deportivo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre-campana">Nombre de la Campaña</Label>
                  <Input id="nombre-campana" placeholder="Ej: Recordatorio Carrera 5K" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="evento-campana">Evento Asociado</Label>
                  <Select value={selectedEvento} onValueChange={setSelectedEvento}>
                    <SelectTrigger id="evento-campana">
                      <SelectValue placeholder="Selecciona un evento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="evento1">Carrera 5K Primavera</SelectItem>
                      <SelectItem value="evento2">Maratón Ciudad 2024</SelectItem>
                      <SelectItem value="evento3">Trail Running Montaña</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Canales de Notificación</Label>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-primary" />
                            <Label htmlFor="canal-push" className="cursor-pointer">
                              Push
                            </Label>
                          </div>
                          <Switch id="canal-push" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-primary" />
                            <Label htmlFor="canal-email" className="cursor-pointer">
                              Email
                            </Label>
                          </div>
                          <Switch id="canal-email" />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-primary" />
                            <Label htmlFor="canal-sms" className="cursor-pointer">
                              SMS
                            </Label>
                          </div>
                          <Switch id="canal-sms" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="segmento">Segmento de Audiencia</Label>
                  <Select defaultValue="inscritos">
                    <SelectTrigger id="segmento">
                      <SelectValue placeholder="Selecciona audiencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los usuarios</SelectItem>
                      <SelectItem value="inscritos">Usuarios inscritos al evento</SelectItem>
                      <SelectItem value="interesados">Usuarios que mostraron interés</SelectItem>
                      <SelectItem value="premium">Solo usuarios premium</SelectItem>
                      <SelectItem value="localizado">Por ubicación geográfica</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="asunto">Asunto / Título</Label>
                  <Input id="asunto" placeholder="Ej: ¡Solo quedan 3 días para la Carrera 5K!" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    placeholder="Escribe el contenido de la notificación..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cta">Call to Action (CTA)</Label>
                  <Input id="cta" placeholder="Ej: Ver detalles del evento" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tipo-envio">Tipo de Envío</Label>
                    <Select defaultValue="inmediato">
                      <SelectTrigger id="tipo-envio">
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inmediato">Envío inmediato</SelectItem>
                        <SelectItem value="programado">Programar envío</SelectItem>
                        <SelectItem value="automatico">Automático (basado en reglas)</SelectItem>
                      </SelectContent>
                    </Select>
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
                        <SelectItem value="urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fecha-programada">Fecha de Envío</Label>
                    <Input id="fecha-programada" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hora-programada">Hora de Envío</Label>
                    <Input id="hora-programada" type="time" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="test-mode">Modo de Prueba</Label>
                      <p className="text-xs text-muted-foreground">Enviar solo a cuentas de prueba</p>
                    </div>
                    <Switch id="test-mode" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Guardar como Borrador</Button>
                <Button variant="outline" className="gap-2">
                  <Send className="h-4 w-4" />
                  Vista Previa
                </Button>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Crear Campaña
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Canal</CardTitle>
                <CardDescription>Tasa de apertura por tipo de notificación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Push Notifications</span>
                      <span className="font-medium">82.3%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: "82.3%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Email</span>
                      <span className="font-medium">68.7%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500" style={{ width: "68.7%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>SMS</span>
                      <span className="font-medium">91.2%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "91.2%" }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Multicanal</span>
                      <span className="font-medium">94.5%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: "94.5%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mejores Horarios de Envío</CardTitle>
                <CardDescription>Tasa de apertura por franja horaria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { horario: "08:00 - 10:00", tasa: 87.3 },
                    { horario: "10:00 - 12:00", tasa: 76.8 },
                    { horario: "12:00 - 14:00", tasa: 62.4 },
                    { horario: "14:00 - 16:00", tasa: 71.9 },
                    { horario: "18:00 - 20:00", tasa: 89.2 },
                    { horario: "20:00 - 22:00", tasa: 78.5 },
                  ].map((item) => (
                    <div key={item.horario} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">{item.horario}</span>
                      <span className="font-bold text-primary">{item.tasa}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversión por Tipo de Campaña</CardTitle>
                <CardDescription>Click a inscripción en eventos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Recordatorio 1 semana antes</span>
                    <span className="font-bold">45.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Recordatorio 3 días antes</span>
                    <span className="font-bold">38.7%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Últimas horas de inscripción</span>
                    <span className="font-bold">52.1%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Confirmación de evento</span>
                    <span className="font-bold">28.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas Generales</CardTitle>
                <CardDescription>Resumen del último mes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Total Campañas</span>
                    <span className="font-bold">18</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Notificaciones Enviadas</span>
                    <span className="font-bold">12,456</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Tasa Apertura Promedio</span>
                    <span className="font-bold text-primary">76.4%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Tasa Conversión</span>
                    <span className="font-bold text-green-600">38.2%</span>
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
