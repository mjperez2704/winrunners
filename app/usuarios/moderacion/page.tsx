"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  MessageSquare,
  Users,
  Eye,
  Ban,
  Check,
  X,
  Clock,
  Search,
  MoreHorizontal,
  Flag,
  Heart,
  Share,
} from "lucide-react"

// Datos de ejemplo
const reportes = [
  {
    id: 1,
    tipo: "contenido_inapropiado",
    reportadoPor: "Ana Martín",
    usuarioReportado: "Carlos Ruiz",
    fecha: "2024-03-15T10:30:00",
    estado: "pendiente",
    descripcion: "Comentario ofensivo en el feed social",
    contenido: "Este comentario contiene lenguaje inapropiado...",
    prioridad: "alta",
  },
  {
    id: 2,
    tipo: "spam",
    reportadoPor: "Juan Pérez",
    usuarioReportado: "Usuario123",
    fecha: "2024-03-15T09:15:00",
    estado: "en_revision",
    descripcion: "Publicaciones repetitivas promocionando productos",
    contenido: "Múltiples posts idénticos sobre suplementos...",
    prioridad: "media",
  },
  {
    id: 3,
    tipo: "trampa",
    reportadoPor: "Sistema Automático",
    usuarioReportado: "FastRunner",
    fecha: "2024-03-14T18:45:00",
    estado: "resuelto",
    descripcion: "Velocidad imposible detectada en carrera",
    contenido: "Ritmo de 2:30/km mantenido durante 10km",
    prioridad: "alta",
  },
]

const publicacionesSociales = [
  {
    id: 1,
    usuario: "María González",
    avatar: "/runner-woman.png",
    fecha: "2024-03-15T14:30:00",
    contenido: "¡Acabo de completar mi mejor 10K! 39:12 🏃‍♀️💪 #PersonalRecord #Running",
    likes: 24,
    comentarios: 8,
    compartidos: 3,
    estado: "aprobado",
    reportes: 0,
  },
  {
    id: 2,
    usuario: "Juan Pérez",
    avatar: "/runner-man.png",
    fecha: "2024-03-15T12:15:00",
    contenido: "Entrenamiento matutino completado. 8km a ritmo suave por el parque. El clima perfecto para correr 🌤️",
    likes: 15,
    comentarios: 4,
    compartidos: 1,
    estado: "pendiente",
    reportes: 1,
  },
  {
    id: 3,
    usuario: "Carlos Ruiz",
    avatar: "/runner-man-athletic.jpg",
    fecha: "2024-03-15T08:00:00",
    contenido:
      "¿Alguien más piensa que estos tiempos son imposibles? Algunos corredores están claramente haciendo trampa...",
    likes: 3,
    comentarios: 12,
    compartidos: 0,
    estado: "reportado",
    reportes: 3,
  },
]

const amistades = [
  {
    id: 1,
    usuario1: "María González",
    usuario2: "Juan Pérez",
    fecha: "2024-03-10",
    estado: "activa",
    interacciones: 45,
  },
  {
    id: 2,
    usuario1: "Ana Martín",
    usuario2: "Carlos Ruiz",
    fecha: "2024-03-12",
    estado: "bloqueada",
    interacciones: 2,
    razonBloqueo: "Conflicto reportado",
  },
  {
    id: 3,
    usuario1: "Laura Sánchez",
    usuario2: "María González",
    fecha: "2024-03-14",
    estado: "pendiente",
    interacciones: 0,
  },
]

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "pendiente":
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-600/30">
          Pendiente
        </Badge>
      )
    case "en_revision":
      return <Badge className="bg-primary/20 text-primary border-primary/30">En Revisión</Badge>
    case "resuelto":
      return <Badge className="bg-accent/20 text-accent border-accent/30">Resuelto</Badge>
    case "aprobado":
      return <Badge className="bg-accent/20 text-accent border-accent/30">Aprobado</Badge>
    case "reportado":
      return <Badge variant="destructive">Reportado</Badge>
    case "activa":
      return <Badge className="bg-accent/20 text-accent border-accent/30">Activa</Badge>
    case "bloqueada":
      return <Badge variant="destructive">Bloqueada</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

const getPrioridadBadge = (prioridad: string) => {
  switch (prioridad) {
    case "alta":
      return <Badge variant="destructive">Alta</Badge>
    case "media":
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Media</Badge>
    case "baja":
      return <Badge variant="secondary">Baja</Badge>
    default:
      return <Badge variant="outline">{prioridad}</Badge>
  }
}

export default function ModeracionPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEstado, setSelectedEstado] = useState("todos")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Moderación Social</h1>
        <p className="text-muted-foreground text-pretty">
          Gestiona reportes, contenido social y relaciones entre usuarios
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reportes Pendientes</CardTitle>
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
            <CardTitle className="text-sm font-medium">Publicaciones Hoy</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Nuevas Amistades</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Moderación</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">Contenido aprobado</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reportes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reportes">Reportes</TabsTrigger>
          <TabsTrigger value="contenido">Contenido Social</TabsTrigger>
          <TabsTrigger value="amistades">Gestión de Amistades</TabsTrigger>
        </TabsList>

        <TabsContent value="reportes" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar reportes..."
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
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="en_revision">En Revisión</SelectItem>
                    <SelectItem value="resuelto">Resuelto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reportes Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Reportes</CardTitle>
              <CardDescription>Gestiona los reportes de la comunidad</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reporte</TableHead>
                    <TableHead>Usuario Reportado</TableHead>
                    <TableHead>Reportado Por</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportes.map((reporte) => (
                    <TableRow key={reporte.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{reporte.descripcion}</div>
                          <div className="text-sm text-muted-foreground">{reporte.tipo.replace("_", " ")}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{reporte.usuarioReportado}</div>
                      </TableCell>
                      <TableCell>{reporte.reportadoPor}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-3 w-3" />
                          {new Date(reporte.fecha).toLocaleDateString("es-ES")}
                        </div>
                      </TableCell>
                      <TableCell>{getPrioridadBadge(reporte.prioridad)}</TableCell>
                      <TableCell>{getEstadoBadge(reporte.estado)}</TableCell>
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
                              <Check className="mr-2 h-4 w-4" />
                              Aprobar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Ban className="mr-2 h-4 w-4" />
                              Rechazar
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
        </TabsContent>

        <TabsContent value="contenido" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feed Social</CardTitle>
              <CardDescription>Modera las publicaciones de la comunidad</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {publicacionesSociales.map((publicacion) => (
                <Card key={publicacion.id} className="border-l-4 border-l-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={publicacion.avatar || "/placeholder.svg"} alt={publicacion.usuario} />
                        <AvatarFallback>
                          {publicacion.usuario
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{publicacion.usuario}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(publicacion.fecha).toLocaleString("es-ES")}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getEstadoBadge(publicacion.estado)}
                            {publicacion.reportes > 0 && (
                              <Badge variant="destructive" className="gap-1">
                                <Flag className="h-3 w-3" />
                                {publicacion.reportes}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-sm">{publicacion.contenido}</p>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {publicacion.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {publicacion.comentarios}
                          </div>
                          <div className="flex items-center gap-1">
                            <Share className="h-4 w-4" />
                            {publicacion.compartidos}
                          </div>
                        </div>

                        {publicacion.estado === "pendiente" || publicacion.estado === "reportado" ? (
                          <div className="flex gap-2">
                            <Button size="sm" className="gap-2">
                              <Check className="h-4 w-4" />
                              Aprobar
                            </Button>
                            <Button size="sm" variant="destructive" className="gap-2">
                              <X className="h-4 w-4" />
                              Rechazar
                            </Button>
                            <Button size="sm" variant="outline">
                              Ver Reportes
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amistades" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Amistades</CardTitle>
              <CardDescription>Supervisa las conexiones entre usuarios</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario 1</TableHead>
                    <TableHead>Usuario 2</TableHead>
                    <TableHead>Fecha Conexión</TableHead>
                    <TableHead>Interacciones</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amistades.map((amistad) => (
                    <TableRow key={amistad.id}>
                      <TableCell className="font-medium">{amistad.usuario1}</TableCell>
                      <TableCell className="font-medium">{amistad.usuario2}</TableCell>
                      <TableCell>{new Date(amistad.fecha).toLocaleDateString("es-ES")}</TableCell>
                      <TableCell>{amistad.interacciones}</TableCell>
                      <TableCell>{getEstadoBadge(amistad.estado)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem>Ver historial</DropdownMenuItem>
                            {amistad.estado === "bloqueada" ? (
                              <DropdownMenuItem>
                                <Check className="mr-2 h-4 w-4" />
                                Desbloquear
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-destructive">
                                <Ban className="mr-2 h-4 w-4" />
                                Bloquear
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
      </Tabs>
    </div>
  )
}
