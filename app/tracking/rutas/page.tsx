"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  MoreHorizontal,
  MapPin,
  Clock,
  Activity,
  TrendingUp,
  AlertTriangle,
  Eye,
  Download,
  Map,
  Route,
  Navigation,
} from "lucide-react"

// Datos de ejemplo
const rutas = [
  {
    id: 1,
    nombre: "Ruta Parque Central",
    corredor: "María González",
    avatar: "/runner-woman.png",
    fecha: "2024-03-15T07:30:00",
    distancia: 10.2,
    tiempo: "39:12",
    ritmo: "3:51",
    elevacion: 145,
    calorias: 456,
    ubicacion: "Madrid, España",
    estado: "completada",
    precision: 98.5,
    alertas: 0,
    coordenadas: "40.4168,-3.7038",
  },
  {
    id: 2,
    nombre: "Entrenamiento Matutino",
    corredor: "Juan Pérez",
    avatar: "/runner-man.png",
    fecha: "2024-03-15T06:45:00",
    distancia: 8.5,
    tiempo: "34:20",
    ritmo: "4:02",
    elevacion: 89,
    calorias: 378,
    ubicacion: "Barcelona, España",
    estado: "completada",
    precision: 96.2,
    alertas: 1,
    coordenadas: "41.3851,2.1734",
  },
  {
    id: 3,
    nombre: "Carrera Nocturna",
    corredor: "Carlos Ruiz",
    avatar: "/runner-man-athletic.jpg",
    fecha: "2024-03-14T20:15:00",
    distancia: 15.8,
    tiempo: "58:45",
    ritmo: "3:43",
    elevacion: 234,
    calorias: 712,
    ubicacion: "Sevilla, España",
    estado: "sospechosa",
    precision: 89.3,
    alertas: 3,
    coordenadas: "37.3886,-5.9823",
  },
  {
    id: 4,
    nombre: "Ruta Costera",
    corredor: "Ana Martín",
    avatar: "/runner-woman-young.jpg",
    fecha: "2024-03-14T17:00:00",
    distancia: 6.2,
    tiempo: "28:30",
    ritmo: "4:36",
    elevacion: 45,
    calorias: 289,
    ubicacion: "Valencia, España",
    estado: "completada",
    precision: 97.8,
    alertas: 0,
    coordenadas: "39.4699,-0.3763",
  },
]

const alertasAntiTrampa = [
  {
    id: 1,
    tipo: "velocidad_imposible",
    corredor: "Carlos Ruiz",
    ruta: "Carrera Nocturna",
    fecha: "2024-03-14T20:15:00",
    descripcion: "Ritmo de 2:30/km mantenido durante 5km",
    severidad: "alta",
    estado: "pendiente",
  },
  {
    id: 2,
    tipo: "salto_gps",
    corredor: "Usuario123",
    ruta: "Entrenamiento Rápido",
    fecha: "2024-03-14T18:30:00",
    descripcion: "Salto de ubicación de 2km en 10 segundos",
    severidad: "alta",
    estado: "confirmada",
  },
  {
    id: 3,
    tipo: "altitud_inconsistente",
    corredor: "FastRunner",
    ruta: "Subida Montaña",
    fecha: "2024-03-13T16:45:00",
    descripcion: "Cambios de altitud no coherentes con el terreno",
    severidad: "media",
    estado: "investigando",
  },
]

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "completada":
      return <Badge className="bg-accent/20 text-accent border-accent/30">Completada</Badge>
    case "sospechosa":
      return <Badge variant="destructive">Sospechosa</Badge>
    case "en_progreso":
      return <Badge className="bg-primary/20 text-primary border-primary/30">En Progreso</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

const getSeveridadBadge = (severidad: string) => {
  switch (severidad) {
    case "alta":
      return <Badge variant="destructive">Alta</Badge>
    case "media":
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Media</Badge>
    case "baja":
      return <Badge variant="secondary">Baja</Badge>
    default:
      return <Badge variant="outline">{severidad}</Badge>
  }
}

export default function RutasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEstado, setSelectedEstado] = useState("todos")
  const [selectedUbicacion, setSelectedUbicacion] = useState("todas")
  const [showMapDialog, setShowMapDialog] = useState(false)
  const [showMetricsDialog, setShowMetricsDialog] = useState(false)
  const [showInvestigateDialog, setShowInvestigateDialog] = useState(false)
  const [selectedRuta, setSelectedRuta] = useState<any>(null)
  const { toast } = useToast()

  const filteredRutas = rutas.filter((ruta) => {
    const matchesSearch =
      ruta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ruta.corredor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ruta.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = selectedEstado === "todos" || ruta.estado === selectedEstado
    const matchesUbicacion = selectedUbicacion === "todas" || ruta.ubicacion.includes(selectedUbicacion)

    return matchesSearch && matchesEstado && matchesUbicacion
  })

  const handleVerEnMapa = (ruta: any) => {
    setSelectedRuta(ruta)
    setShowMapDialog(true)
    console.log("[v0] Abriendo mapa para ruta:", ruta.id)
  }

  const handleVerMetricas = (ruta: any) => {
    setSelectedRuta(ruta)
    setShowMetricsDialog(true)
    console.log("[v0] Mostrando métricas para ruta:", ruta.id)
  }

  const handleExportarGPX = (ruta: any) => {
    console.log("[v0] Exportando GPX para ruta:", ruta.id)

    // Crear contenido GPX simulado
    const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="WinRunners">
  <metadata>
    <name>${ruta.nombre}</name>
    <time>${ruta.fecha}</time>
  </metadata>
  <trk>
    <name>${ruta.nombre}</name>
    <desc>Ruta de ${ruta.corredor} - ${ruta.distancia}km</desc>
    <trkseg>
      <!-- Puntos GPS aquí -->
    </trkseg>
  </trk>
</gpx>`

    // Crear y descargar el archivo
    const blob = new Blob([gpxContent], { type: "application/gpx+xml" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${ruta.nombre.replace(/\s+/g, "_")}_${ruta.id}.gpx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    toast({
      title: "GPX Exportado",
      description: `El archivo GPX de "${ruta.nombre}" ha sido descargado.`,
    })
  }

  const handleInvestigar = (ruta: any) => {
    setSelectedRuta(ruta)
    setShowInvestigateDialog(true)
    console.log("[v0] Iniciando investigación para ruta:", ruta.id)
  }

  const confirmarInvestigacion = (accion: string) => {
    console.log("[v0] Investigación confirmada:", accion, "para ruta:", selectedRuta?.id)

    toast({
      title: accion === "suspender" ? "Usuario Suspendido" : "Ruta Marcada",
      description:
        accion === "suspender"
          ? `${selectedRuta?.corredor} ha sido suspendido temporalmente.`
          : `La ruta "${selectedRuta?.nombre}" ha sido marcada como ${accion}.`,
      variant: accion === "suspender" ? "destructive" : "default",
    })

    setShowInvestigateDialog(false)
    setSelectedRuta(null)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Rutas y Mapas</h1>
        <p className="text-muted-foreground text-pretty">
          Monitorea las rutas de los corredores y detecta actividades sospechosas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rutas Hoy</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+12%</span> vs ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Precisión GPS</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
            <p className="text-xs text-muted-foreground">Promedio general</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive">+5</span> desde ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KM Totales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rutas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="rutas">Historial de Rutas</TabsTrigger>
          <TabsTrigger value="alertas">Alertas Anti-Trampa</TabsTrigger>
          <TabsTrigger value="mapa">Vista de Mapa</TabsTrigger>
        </TabsList>

        <TabsContent value="rutas" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, corredor o ubicación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedEstado} onValueChange={setSelectedEstado}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="completada">Completada</SelectItem>
                    <SelectItem value="sospechosa">Sospechosa</SelectItem>
                    <SelectItem value="en_progreso">En Progreso</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedUbicacion} onValueChange={setSelectedUbicacion}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las ciudades</SelectItem>
                    <SelectItem value="Madrid">Madrid</SelectItem>
                    <SelectItem value="Barcelona">Barcelona</SelectItem>
                    <SelectItem value="Valencia">Valencia</SelectItem>
                    <SelectItem value="Sevilla">Sevilla</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Rutas Table */}
          <Card>
            <CardHeader>
              <CardTitle>Historial de Rutas</CardTitle>
              <CardDescription>{filteredRutas.length} rutas encontradas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Corredor</TableHead>
                    <TableHead>Ruta</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Distancia</TableHead>
                    <TableHead>Tiempo</TableHead>
                    <TableHead>Ritmo</TableHead>
                    <TableHead>Precisión</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRutas.map((ruta) => (
                    <TableRow key={ruta.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ruta.avatar || "/placeholder.svg"} alt={ruta.corredor} />
                            <AvatarFallback>
                              {ruta.corredor
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{ruta.corredor}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {ruta.ubicacion}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{ruta.nombre}</div>
                          {ruta.alertas > 0 && (
                            <div className="flex items-center gap-1 text-xs text-destructive">
                              <AlertTriangle className="h-3 w-3" />
                              {ruta.alertas} alerta{ruta.alertas > 1 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-3 w-3" />
                          {new Date(ruta.fecha).toLocaleDateString("es-ES")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{ruta.distancia} km</div>
                        <div className="text-xs text-muted-foreground">{ruta.elevacion}m elevación</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{ruta.tiempo}</div>
                        <div className="text-xs text-muted-foreground">{ruta.calorias} cal</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{ruta.ritmo}/km</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              ruta.precision >= 95
                                ? "bg-accent"
                                : ruta.precision >= 90
                                  ? "bg-yellow-500"
                                  : "bg-destructive"
                            }`}
                          />
                          <span className="text-sm">{ruta.precision}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getEstadoBadge(ruta.estado)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleVerEnMapa(ruta)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver en mapa
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleVerMetricas(ruta)}>
                              <Activity className="mr-2 h-4 w-4" />
                              Ver métricas
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExportarGPX(ruta)}>
                              <Download className="mr-2 h-4 w-4" />
                              Exportar GPX
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {ruta.estado === "sospechosa" && (
                              <DropdownMenuItem className="text-destructive" onClick={() => handleInvestigar(ruta)}>
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Investigar
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alertas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sistema Anti-Trampa</CardTitle>
              <CardDescription>Alertas automáticas de actividades sospechosas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Alerta</TableHead>
                    <TableHead>Corredor</TableHead>
                    <TableHead>Ruta</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Severidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertasAntiTrampa.map((alerta) => (
                    <TableRow key={alerta.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{alerta.tipo.replace("_", " ")}</div>
                          <div className="text-sm text-muted-foreground">{alerta.descripcion}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{alerta.corredor}</TableCell>
                      <TableCell>{alerta.ruta}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-3 w-3" />
                          {new Date(alerta.fecha).toLocaleDateString("es-ES")}
                        </div>
                      </TableCell>
                      <TableCell>{getSeveridadBadge(alerta.severidad)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            alerta.estado === "confirmada"
                              ? "destructive"
                              : alerta.estado === "pendiente"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {alerta.estado}
                        </Badge>
                      </TableCell>
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
                              <Map className="mr-2 h-4 w-4" />
                              Ver en mapa
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Marcar como falso positivo</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Confirmar trampa</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapa" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vista de Mapa Global</CardTitle>
              <CardDescription>Visualización geográfica de todas las rutas activas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center space-y-2">
                  <Map className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">Mapa Interactivo</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Aquí se mostraría un mapa interactivo con Google Maps o Mapbox mostrando todas las rutas,
                    ubicaciones de corredores en tiempo real y alertas geográficas.
                  </p>
                  <div className="flex gap-2 justify-center pt-4">
                    <Button variant="outline" size="sm">
                      Ver Rutas Activas
                    </Button>
                    <Button variant="outline" size="sm">
                      Filtrar por Zona
                    </Button>
                    <Button variant="outline" size="sm">
                      Heatmap
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Controls */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Controles de Vista</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mostrar rutas activas</span>
                  <Button variant="outline" size="sm">
                    ON
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alertas en tiempo real</span>
                  <Button variant="outline" size="sm">
                    ON
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Heatmap de densidad</span>
                  <Button variant="outline" size="sm">
                    OFF
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estadísticas Geográficas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Madrid</span>
                  <span className="font-medium">2,847 rutas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Barcelona</span>
                  <span className="font-medium">1,923 rutas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Valencia</span>
                  <span className="font-medium">1,456 rutas</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sevilla</span>
                  <span className="font-medium">1,234 rutas</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Zonas Populares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Parque del Retiro</span>
                  <Badge variant="secondary">Hot</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Paseo Marítimo</span>
                  <Badge variant="secondary">Hot</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Casa de Campo</span>
                  <Badge variant="outline">Popular</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Parque Güell</span>
                  <Badge variant="outline">Popular</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Mapa de Ruta: {selectedRuta?.nombre}</DialogTitle>
            <DialogDescription>Visualización completa de la ruta de {selectedRuta?.corredor}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Mapa */}
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center space-y-2">
                <Map className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Mapa interactivo mostrando la ruta completa con coordenadas: {selectedRuta?.coordenadas}
                </p>
              </div>
            </div>

            {/* Detalles de la ruta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Distancia</p>
                <p className="text-lg font-bold">{selectedRuta?.distancia} km</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Elevación</p>
                <p className="text-lg font-bold">{selectedRuta?.elevacion}m</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Precisión GPS</p>
                <p className="text-lg font-bold">{selectedRuta?.precision}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Coordenadas</p>
                <p className="text-sm font-mono">{selectedRuta?.coordenadas}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMapDialog(false)}>
              Cerrar
            </Button>
            <Button onClick={() => handleExportarGPX(selectedRuta)}>
              <Download className="mr-2 h-4 w-4" />
              Exportar GPX
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showMetricsDialog} onOpenChange={setShowMetricsDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Métricas Detalladas: {selectedRuta?.nombre}</DialogTitle>
            <DialogDescription>Análisis completo del rendimiento de {selectedRuta?.corredor}</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Métricas principales */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Tiempo Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{selectedRuta?.tiempo}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Ritmo Promedio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{selectedRuta?.ritmo}/km</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Calorías</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{selectedRuta?.calorias}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Distancia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{selectedRuta?.distancia} km</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Elevación</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{selectedRuta?.elevacion}m</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Precisión GPS</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{selectedRuta?.precision}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Estado y alertas */}
            <div className="space-y-2">
              <h4 className="font-semibold">Estado de la Ruta</h4>
              <div className="flex items-center gap-4">
                {getEstadoBadge(selectedRuta?.estado)}
                {selectedRuta?.alertas > 0 && (
                  <Badge variant="destructive">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    {selectedRuta.alertas} alerta{selectedRuta.alertas > 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
            </div>

            {/* Información adicional */}
            <div className="space-y-2">
              <h4 className="font-semibold">Información Adicional</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha:</span>
                  <span className="font-medium">{new Date(selectedRuta?.fecha || "").toLocaleString("es-ES")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ubicación:</span>
                  <span className="font-medium">{selectedRuta?.ubicacion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Coordenadas:</span>
                  <span className="font-mono text-xs">{selectedRuta?.coordenadas}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMetricsDialog(false)}>
              Cerrar
            </Button>
            <Button
              onClick={() => {
                setShowMetricsDialog(false)
                handleVerEnMapa(selectedRuta)
              }}
            >
              <Map className="mr-2 h-4 w-4" />
              Ver en Mapa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showInvestigateDialog} onOpenChange={setShowInvestigateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Investigar Ruta Sospechosa
            </DialogTitle>
            <DialogDescription>
              Ruta "{selectedRuta?.nombre}" de {selectedRuta?.corredor}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-destructive/10 p-4 space-y-2">
              <h4 className="font-semibold text-sm">Alertas Detectadas</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-destructive" />
                  {selectedRuta?.alertas || 0} alerta{selectedRuta?.alertas > 1 ? "s" : ""} de sistema anti-trampa
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-yellow-500" />
                  Precisión GPS: {selectedRuta?.precision}%
                </li>
                {selectedRuta?.ritmo && Number.parseFloat(selectedRuta.ritmo) < 3 && (
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3 text-destructive" />
                    Ritmo inusualmente rápido: {selectedRuta.ritmo}/km
                  </li>
                )}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Acciones Disponibles</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => confirmarInvestigacion("revisar")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Marcar para revisión manual
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => confirmarInvestigacion("invalidar")}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Invalidar ruta (no contará para puntos)
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={() => confirmarInvestigacion("suspender")}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Suspender usuario temporalmente
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowInvestigateDialog(false)
                setSelectedRuta(null)
              }}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
