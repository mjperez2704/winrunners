"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Calendar,
  Trophy,
  Users,
  Clock,
  Plus,
  MoreHorizontal,
  Play,
  Pause,
  Square,
  Edit,
  Eye,
  Award,
  TrendingUp,
} from "lucide-react"

// Datos de ejemplo
const temporadas = [
  {
    id: 1,
    nombre: "Primavera 2024",
    descripcion: "Temporada de primavera con enfoque en carreras de media distancia",
    fechaInicio: "2024-03-01",
    fechaFin: "2024-05-31",
    estado: "activa",
    participantes: 2847,
    competencias: 12,
    premios: "Trofeos digitales y badges especiales",
    progreso: 67,
    diasRestantes: 45,
  },
  {
    id: 2,
    nombre: "Invierno 2024",
    descripcion: "Temporada invernal con retos de resistencia",
    fechaInicio: "2023-12-01",
    fechaFin: "2024-02-29",
    estado: "finalizada",
    participantes: 3156,
    competencias: 15,
    premios: "Medallas virtuales y descuentos en tienda",
    progreso: 100,
    diasRestantes: 0,
  },
  {
    id: 3,
    nombre: "Verano 2024",
    descripcion: "Temporada de verano con carreras matutinas",
    fechaInicio: "2024-06-01",
    fechaFin: "2024-08-31",
    estado: "programada",
    participantes: 0,
    competencias: 18,
    premios: "Equipamiento deportivo y experiencias",
    progreso: 0,
    diasRestantes: 92,
  },
]

const competenciasActivas = [
  {
    id: 1,
    nombre: "Desafío 100K Mensual",
    tipo: "distancia",
    objetivo: "100 km en el mes",
    participantes: 1247,
    completados: 456,
    fechaLimite: "2024-03-31",
    premio: "Badge Maratonista",
  },
  {
    id: 2,
    nombre: "Velocista Semanal",
    tipo: "tiempo",
    objetivo: "Mejor 5K de la semana",
    participantes: 892,
    completados: 234,
    fechaLimite: "2024-03-17",
    premio: "Trofeo Velocidad",
  },
  {
    id: 3,
    nombre: "Constancia Diaria",
    tipo: "frecuencia",
    objetivo: "Correr 21 días consecutivos",
    participantes: 2156,
    completados: 789,
    fechaLimite: "2024-03-25",
    premio: "Badge Constancia",
  },
]

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "activa":
      return <Badge className="bg-accent/20 text-accent border-accent/30">Activa</Badge>
    case "finalizada":
      return <Badge variant="secondary">Finalizada</Badge>
    case "programada":
      return <Badge className="bg-primary/20 text-primary border-primary/30">Programada</Badge>
    case "pausada":
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Pausada</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

const getTipoBadge = (tipo: string) => {
  switch (tipo) {
    case "distancia":
      return (
        <Badge variant="outline" className="text-chart-1 border-chart-1/30">
          Distancia
        </Badge>
      )
    case "tiempo":
      return (
        <Badge variant="outline" className="text-chart-2 border-chart-2/30">
          Tiempo
        </Badge>
      )
    case "frecuencia":
      return (
        <Badge variant="outline" className="text-chart-3 border-chart-3/30">
          Frecuencia
        </Badge>
      )
    default:
      return <Badge variant="outline">{tipo}</Badge>
  }
}

export default function TemporadasPage() {
  const [selectedTemporada, setSelectedTemporada] = useState("todas")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Gestión de Temporadas</h1>
          <p className="text-muted-foreground text-pretty">
            Administra las temporadas competitivas y sus respectivas competencias
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Temporada
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Temporada</DialogTitle>
              <DialogDescription>Define los parámetros de la nueva temporada competitiva</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input id="nombre" placeholder="ej: Otoño 2024" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descripcion" className="text-right">
                  Descripción
                </Label>
                <Textarea id="descripcion" placeholder="Descripción de la temporada..." className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fechaInicio" className="text-right">
                  Fecha Inicio
                </Label>
                <div className="col-span-3">
                  <DatePicker />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fechaFin" className="text-right">
                  Fecha Fin
                </Label>
                <div className="col-span-3">
                  <DatePicker />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="premios" className="text-right">
                  Premios
                </Label>
                <Input id="premios" placeholder="Descripción de premios..." className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Crear Temporada</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temporadas Activas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Primavera 2024 en curso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participantes Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+234</span> desde el inicio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competencias Activas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">En temporada actual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Días Restantes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Para finalizar temporada</p>
          </CardContent>
        </Card>
      </div>

      {/* Temporadas Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Temporadas</CardTitle>
          <CardDescription>Gestiona todas las temporadas competitivas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Temporada</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead>Competencias</TableHead>
                <TableHead>Progreso</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {temporadas.map((temporada) => (
                <TableRow key={temporada.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{temporada.nombre}</div>
                      <div className="text-sm text-muted-foreground">{temporada.descripcion}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(temporada.fechaInicio).toLocaleDateString("es-ES")}</div>
                      <div className="text-muted-foreground">
                        hasta {new Date(temporada.fechaFin).toLocaleDateString("es-ES")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{temporada.participantes.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{temporada.competencias}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{temporada.progreso}%</span>
                        {temporada.diasRestantes > 0 && (
                          <span className="text-muted-foreground">{temporada.diasRestantes} días</span>
                        )}
                      </div>
                      <Progress value={temporada.progreso} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>{getEstadoBadge(temporada.estado)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {temporada.estado === "activa" ? (
                          <DropdownMenuItem>
                            <Pause className="mr-2 h-4 w-4" />
                            Pausar
                          </DropdownMenuItem>
                        ) : temporada.estado === "programada" ? (
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Iniciar
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Square className="mr-2 h-4 w-4" />
                          Finalizar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Competencias Activas */}
      <Card>
        <CardHeader>
          <CardTitle>Competencias de la Temporada Actual</CardTitle>
          <CardDescription>Competencias activas en Primavera 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {competenciasActivas.map((competencia) => (
              <Card key={competencia.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{competencia.nombre}</CardTitle>
                    {getTipoBadge(competencia.tipo)}
                  </div>
                  <CardDescription>{competencia.objetivo}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span>
                      {competencia.completados}/{competencia.participantes}
                    </span>
                  </div>
                  <Progress value={(competencia.completados / competencia.participantes) * 100} className="h-2" />

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Hasta {new Date(competencia.fechaLimite).toLocaleDateString("es-ES")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      <span>{competencia.premio}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Ver Ranking
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de Rendimiento */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento de Temporadas</CardTitle>
            <CardDescription>Comparativa de participación y engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Primavera 2024</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div className="w-[90%] bg-accent h-2 rounded-full" />
                  </div>
                  <span className="text-sm font-medium">90%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Invierno 2024</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div className="w-[85%] bg-primary h-2 rounded-full" />
                  </div>
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Otoño 2023</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div className="w-[78%] bg-chart-3 h-2 rounded-full" />
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Verano 2023</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div className="w-[72%] bg-chart-4 h-2 rounded-full" />
                  </div>
                  <span className="text-sm font-medium">72%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Métricas Clave</CardTitle>
            <CardDescription>Indicadores de éxito de la temporada actual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">89.2%</div>
                <div className="text-sm text-muted-foreground">Tasa de Finalización</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.2</div>
                <div className="text-sm text-muted-foreground">Competencias/Usuario</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Engagement Semanal</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-accent" />
                  <span className="text-sm text-accent">+12.5%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Retención de Usuarios</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-accent" />
                  <span className="text-sm text-accent">+8.7%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Nuevos Participantes</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-accent" />
                  <span className="text-sm text-accent">+15.3%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
