"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, Calendar, Users, Search, Plus, Edit, Trash2, Play, Pause, CheckCircle2 } from "lucide-react"

const desafiosActivos = [
  {
    id: 1,
    nombre: "Desafío 100K Marzo",
    descripcion: "Corre 100 kilómetros durante el mes de marzo",
    tipo: "Distancia",
    duracion: "30 días",
    participantes: 456,
    completados: 123,
    objetivo: "100 km",
    recompensa: "Badge Especial + 500 puntos",
    fechaInicio: "2024-03-01",
    fechaFin: "2024-03-31",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Racha de 7 Días",
    descripcion: "Corre al menos 3 km durante 7 días consecutivos",
    tipo: "Consistencia",
    duracion: "7 días",
    participantes: 789,
    completados: 234,
    objetivo: "7 días consecutivos",
    recompensa: "Badge de Racha + 300 puntos",
    fechaInicio: "2024-03-15",
    fechaFin: "2024-03-22",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Velocista del Mes",
    descripcion: "Mejora tu tiempo de 5K en al menos 30 segundos",
    tipo: "Velocidad",
    duracion: "30 días",
    participantes: 234,
    completados: 67,
    objetivo: "Mejorar 30s en 5K",
    recompensa: "Badge Velocista + 400 puntos",
    fechaInicio: "2024-03-01",
    fechaFin: "2024-03-31",
    estado: "Activo",
  },
]

const desafiosProgramados = [
  {
    id: 4,
    nombre: "Maratón Virtual Abril",
    descripcion: "Completa 42.195 km en cualquier momento del mes",
    tipo: "Distancia",
    duracion: "30 días",
    objetivo: "42.195 km",
    recompensa: "Medalla Virtual + 1000 puntos",
    fechaInicio: "2024-04-01",
    fechaFin: "2024-04-30",
    estado: "Programado",
  },
  {
    id: 5,
    nombre: "Desafío Nocturno",
    descripcion: "Corre 50 km entre las 8 PM y 6 AM",
    tipo: "Especial",
    duracion: "30 días",
    objetivo: "50 km nocturnos",
    recompensa: "Badge Nocturno + 600 puntos",
    fechaInicio: "2024-04-15",
    fechaFin: "2024-05-15",
    estado: "Programado",
  },
]

const desafiosCompletados = [
  {
    id: 6,
    nombre: "Desafío 50K Febrero",
    descripcion: "Corre 50 kilómetros durante el mes de febrero",
    tipo: "Distancia",
    participantes: 567,
    completados: 345,
    tasaCompletado: 60.8,
    fechaInicio: "2024-02-01",
    fechaFin: "2024-02-29",
    estado: "Completado",
  },
  {
    id: 7,
    nombre: "Año Nuevo, Nuevo Ritmo",
    descripcion: "Corre 30 km en enero",
    tipo: "Distancia",
    participantes: 892,
    completados: 678,
    tasaCompletado: 76.0,
    fechaInicio: "2024-01-01",
    fechaFin: "2024-01-31",
    estado: "Completado",
  },
]

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "Activo":
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Activo</Badge>
    case "Programado":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Programado</Badge>
    case "Completado":
      return <Badge variant="secondary">Completado</Badge>
    case "Pausado":
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Pausado</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

export default function DesafiosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTipo, setSelectedTipo] = useState("todos")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Desafíos</h1>
        <p className="text-muted-foreground text-pretty">
          Gestiona desafíos individuales y grupales para mantener a los corredores motivados
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desafíos Activos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">En curso actualmente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participantes Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,479</div>
            <p className="text-xs text-muted-foreground">En desafíos activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Completado</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.7%</div>
            <p className="text-xs text-muted-foreground">Promedio actual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos Desafíos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Programados</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activos">Activos</TabsTrigger>
          <TabsTrigger value="programados">Programados</TabsTrigger>
          <TabsTrigger value="completados">Completados</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="activos" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar desafío..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los tipos</SelectItem>
                    <SelectItem value="Distancia">Distancia</SelectItem>
                    <SelectItem value="Consistencia">Consistencia</SelectItem>
                    <SelectItem value="Velocidad">Velocidad</SelectItem>
                    <SelectItem value="Especial">Especial</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nuevo Desafío
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Desafíos Activos */}
          <div className="grid gap-4">
            {desafiosActivos.map((desafio) => (
              <Card key={desafio.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{desafio.nombre}</CardTitle>
                        {getEstadoBadge(desafio.estado)}
                      </div>
                      <CardDescription>{desafio.descripcion}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Pause className="h-4 w-4" />
                      </Button>
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
                    <div>
                      <div className="text-sm text-muted-foreground">Tipo</div>
                      <div className="font-medium">{desafio.tipo}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Duración</div>
                      <div className="font-medium">{desafio.duracion}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Objetivo</div>
                      <div className="font-medium">{desafio.objetivo}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Recompensa</div>
                      <div className="font-medium text-sm">{desafio.recompensa}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progreso de Participantes</span>
                      <span className="font-medium">
                        {desafio.completados} / {desafio.participantes} completados
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(desafio.completados / desafio.participantes) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t text-sm">
                    <div className="text-muted-foreground">
                      {new Date(desafio.fechaInicio).toLocaleDateString()} -{" "}
                      {new Date(desafio.fechaFin).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{desafio.participantes} participantes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="programados" className="space-y-6">
          <div className="flex justify-end">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Programar Desafío
            </Button>
          </div>

          <div className="grid gap-4">
            {desafiosProgramados.map((desafio) => (
              <Card key={desafio.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{desafio.nombre}</CardTitle>
                        {getEstadoBadge(desafio.estado)}
                      </div>
                      <CardDescription>{desafio.descripcion}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
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
                      <div className="text-sm text-muted-foreground">Tipo</div>
                      <div className="font-medium">{desafio.tipo}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Duración</div>
                      <div className="font-medium">{desafio.duracion}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Objetivo</div>
                      <div className="font-medium">{desafio.objetivo}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Recompensa</div>
                      <div className="font-medium text-sm">{desafio.recompensa}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t text-sm mt-4">
                    <div className="text-muted-foreground">
                      Inicia: {new Date(desafio.fechaInicio).toLocaleDateString()}
                    </div>
                    <div className="text-muted-foreground">
                      Finaliza: {new Date(desafio.fechaFin).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completados" className="space-y-6">
          <div className="grid gap-4">
            {desafiosCompletados.map((desafio) => (
              <Card key={desafio.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle>{desafio.nombre}</CardTitle>
                        {getEstadoBadge(desafio.estado)}
                      </div>
                      <CardDescription>{desafio.descripcion}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Tipo</div>
                      <div className="font-medium">{desafio.tipo}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Participantes</div>
                      <div className="font-medium">{desafio.participantes}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Completados</div>
                      <div className="font-medium">{desafio.completados}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Tasa de Éxito</div>
                      <div className="font-medium text-primary">{desafio.tasaCompletado}%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t text-sm mt-4">
                    <div className="text-muted-foreground">
                      {new Date(desafio.fechaInicio).toLocaleDateString()} -{" "}
                      {new Date(desafio.fechaFin).toLocaleDateString()}
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalles
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
                <CardTitle>Desafíos Más Populares</CardTitle>
                <CardDescription>Por número de participantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...desafiosActivos, ...desafiosCompletados]
                    .sort((a, b) => b.participantes - a.participantes)
                    .slice(0, 5)
                    .map((desafio, index) => (
                      <div key={desafio.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-bold text-muted-foreground w-6">{index + 1}</div>
                          <div>
                            <div className="font-medium text-sm">{desafio.nombre}</div>
                            <div className="text-xs text-muted-foreground">{desafio.tipo}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{desafio.participantes}</div>
                          <div className="text-xs text-muted-foreground">participantes</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mayor Tasa de Completado</CardTitle>
                <CardDescription>Desafíos con mejor rendimiento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {desafiosCompletados
                    .sort((a, b) => b.tasaCompletado - a.tasaCompletado)
                    .map((desafio, index) => (
                      <div key={desafio.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-lg font-bold text-muted-foreground w-6">{index + 1}</div>
                          <div>
                            <div className="font-medium text-sm">{desafio.nombre}</div>
                            <div className="text-xs text-muted-foreground">
                              {desafio.completados} / {desafio.participantes}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary">{desafio.tasaCompletado}%</div>
                          <div className="text-xs text-muted-foreground">completado</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por Tipo</CardTitle>
                <CardDescription>Cantidad de desafíos por tipo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Distancia</span>
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Consistencia</span>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Velocidad</span>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Especial</span>
                    <span className="font-bold">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas Generales</CardTitle>
                <CardDescription>Resumen de todos los desafíos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Total Desafíos Creados</span>
                    <span className="font-bold">7</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Participaciones Totales</span>
                    <span className="font-bold">3,938</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Completados Totales</span>
                    <span className="font-bold">1,447</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Tasa Promedio</span>
                    <span className="font-bold text-primary">36.7%</span>
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
