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
import { Calendar, MapPin, Users, TrendingUp, Search, Plus, Edit, Trash2, Clock, Trophy, Target } from "lucide-react"

const eventosProximos = [
  {
    id: 1,
    nombre: "Carrera 5K Primavera",
    descripcion: "Carrera recreativa de 5 kilómetros en el parque central",
    fecha: "2024-03-25",
    hora: "08:00",
    ubicacion: "Parque Central",
    participantes: 234,
    cupoMaximo: 500,
    tipo: "Carrera",
    distancia: "5K",
    estado: "Inscripciones Abiertas",
  },
  {
    id: 2,
    nombre: "Maratón Ciudad 2024",
    descripcion: "Maratón oficial de 42K por las calles de la ciudad",
    fecha: "2024-04-15",
    hora: "06:00",
    ubicacion: "Centro de la Ciudad",
    participantes: 567,
    cupoMaximo: 1000,
    tipo: "Maratón",
    distancia: "42K",
    estado: "Inscripciones Abiertas",
  },
  {
    id: 3,
    nombre: "Trail Running Montaña",
    descripcion: "Carrera de montaña de 15 kilómetros con desnivel",
    fecha: "2024-04-20",
    hora: "07:00",
    ubicacion: "Reserva Natural",
    participantes: 123,
    cupoMaximo: 300,
    tipo: "Trail",
    distancia: "15K",
    estado: "Inscripciones Abiertas",
  },
]

const eventosCompletados = [
  {
    id: 4,
    nombre: "Carrera Nocturna 10K",
    descripcion: "Carrera nocturna de 10 kilómetros",
    fecha: "2024-02-28",
    participantes: 456,
    completados: 423,
    tipo: "Carrera",
    distancia: "10K",
    estado: "Completado",
  },
  {
    id: 5,
    nombre: "Media Maratón Verano",
    descripcion: "Media maratón de 21 kilómetros",
    fecha: "2024-01-15",
    participantes: 789,
    completados: 734,
    tipo: "Media Maratón",
    distancia: "21K",
    estado: "Completado",
  },
]

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "Inscripciones Abiertas":
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Inscripciones Abiertas</Badge>
    case "Inscripciones Cerradas":
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Inscripciones Cerradas</Badge>
    case "En Curso":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">En Curso</Badge>
    case "Completado":
      return <Badge variant="secondary">Completado</Badge>
    case "Cancelado":
      return <Badge variant="destructive">Cancelado</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

const getTipoBadge = (tipo: string) => {
  switch (tipo) {
    case "Carrera":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Carrera</Badge>
    case "Maratón":
      return <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30">Maratón</Badge>
    case "Media Maratón":
      return <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30">Media Maratón</Badge>
    case "Trail":
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Trail</Badge>
    default:
      return <Badge variant="outline">{tipo}</Badge>
  }
}

export default function EventosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Eventos</h1>
        <p className="text-muted-foreground text-pretty">
          Gestiona eventos de running, carreras y competencias organizadas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Próximos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Con inscripciones abiertas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participantes Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">924</div>
            <p className="text-xs text-muted-foreground">En eventos próximos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Completado</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92.8%</div>
            <p className="text-xs text-muted-foreground">Promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Realizados</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Este año</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="proximos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="proximos">Próximos Eventos</TabsTrigger>
          <TabsTrigger value="completados">Completados</TabsTrigger>
          <TabsTrigger value="nuevo">Nuevo Evento</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="proximos" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar evento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nuevo Evento
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {eventosProximos.map((evento) => (
              <Card key={evento.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{evento.nombre}</CardTitle>
                        {getEstadoBadge(evento.estado)}
                        {getTipoBadge(evento.tipo)}
                      </div>
                      <CardDescription>{evento.descripcion}</CardDescription>
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
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Fecha</div>
                        <div className="font-medium">{new Date(evento.fecha).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Hora</div>
                        <div className="font-medium">{evento.hora}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Ubicación</div>
                        <div className="font-medium">{evento.ubicacion}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Distancia</div>
                        <div className="font-medium">{evento.distancia}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Participantes</span>
                      <span className="font-medium">
                        {evento.participantes} / {evento.cupoMaximo}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(evento.participantes / evento.cupoMaximo) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm">
                      Ver Participantes
                    </Button>
                    <Button size="sm">Gestionar Evento</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completados" className="space-y-6">
          <div className="grid gap-4">
            {eventosCompletados.map((evento) => (
              <Card key={evento.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{evento.nombre}</CardTitle>
                        {getEstadoBadge(evento.estado)}
                        {getTipoBadge(evento.tipo)}
                      </div>
                      <CardDescription>{evento.descripcion}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Fecha</div>
                      <div className="font-medium">{new Date(evento.fecha).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Participantes</div>
                      <div className="font-medium">{evento.participantes}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Completados</div>
                      <div className="font-medium text-primary">{evento.completados}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Tasa de Completado</div>
                      <div className="font-medium text-accent">
                        {((evento.completados / evento.participantes) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                    <Button variant="outline" size="sm">
                      Ver Resultados
                    </Button>
                    <Button variant="outline" size="sm">
                      Descargar Reporte
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="nuevo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crear Nuevo Evento</CardTitle>
              <CardDescription>Configura un nuevo evento de running para los usuarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre-evento">Nombre del Evento</Label>
                  <Input id="nombre-evento" placeholder="Ej: Carrera 5K Primavera" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion-evento">Descripción</Label>
                  <Textarea id="descripcion-evento" placeholder="Describe el evento..." rows={3} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tipo-evento">Tipo de Evento</Label>
                    <Select defaultValue="carrera">
                      <SelectTrigger id="tipo-evento">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carrera">Carrera</SelectItem>
                        <SelectItem value="maraton">Maratón</SelectItem>
                        <SelectItem value="media-maraton">Media Maratón</SelectItem>
                        <SelectItem value="trail">Trail Running</SelectItem>
                        <SelectItem value="ultra">Ultra Maratón</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="distancia-evento">Distancia</Label>
                    <Select defaultValue="5k">
                      <SelectTrigger id="distancia-evento">
                        <SelectValue placeholder="Selecciona distancia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5k">5K</SelectItem>
                        <SelectItem value="10k">10K</SelectItem>
                        <SelectItem value="15k">15K</SelectItem>
                        <SelectItem value="21k">21K (Media Maratón)</SelectItem>
                        <SelectItem value="42k">42K (Maratón)</SelectItem>
                        <SelectItem value="personalizado">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fecha-evento">Fecha</Label>
                    <Input id="fecha-evento" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hora-evento">Hora de Inicio</Label>
                    <Input id="hora-evento" type="time" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ubicacion-evento">Ubicación</Label>
                    <Input id="ubicacion-evento" placeholder="Ej: Parque Central" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cupo-evento">Cupo Máximo</Label>
                    <Input id="cupo-evento" type="number" placeholder="500" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="costo-evento">Cuota de Inscripción (€)</Label>
                    <Input id="costo-evento" type="number" placeholder="0" />
                    <p className="text-xs text-muted-foreground">Dejar en 0 para evento gratuito</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premios-evento">Premios y Recompensas</Label>
                    <Textarea id="premios-evento" placeholder="Describe los premios..." rows={3} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reglas-evento">Reglas y Requisitos</Label>
                  <Textarea id="reglas-evento" placeholder="Describe las reglas..." rows={3} />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline">Guardar como Borrador</Button>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Crear Evento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Eventos Más Populares</CardTitle>
                <CardDescription>Por número de participantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...eventosProximos, ...eventosCompletados]
                    .sort((a, b) => b.participantes - a.participantes)
                    .slice(0, 5)
                    .map((evento, index) => (
                      <div key={evento.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-bold text-muted-foreground w-6">{index + 1}</div>
                          <div>
                            <div className="font-medium text-sm">{evento.nombre}</div>
                            <div className="text-xs text-muted-foreground">{evento.tipo}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{evento.participantes}</div>
                          <div className="text-xs text-muted-foreground">participantes</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por Tipo</CardTitle>
                <CardDescription>Cantidad de eventos por tipo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Carrera</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Maratón</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Media Maratón</span>
                    <span className="font-bold">2</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Trail</span>
                    <span className="font-bold">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Participación por Mes</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { mes: "Marzo 2024", participantes: 924 },
                    { mes: "Febrero 2024", participantes: 456 },
                    { mes: "Enero 2024", participantes: 789 },
                    { mes: "Diciembre 2023", participantes: 1234 },
                    { mes: "Noviembre 2023", participantes: 567 },
                    { mes: "Octubre 2023", participantes: 892 },
                  ].map((item) => (
                    <div key={item.mes} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">{item.mes}</span>
                      <span className="font-bold text-primary">{item.participantes.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas Generales</CardTitle>
                <CardDescription>Resumen del sistema de eventos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Total Eventos</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Participantes Totales</span>
                    <span className="font-bold">4,862</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Tasa Completado Promedio</span>
                    <span className="font-bold text-primary">92.8%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Promedio Participantes</span>
                    <span className="font-bold">405</span>
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
