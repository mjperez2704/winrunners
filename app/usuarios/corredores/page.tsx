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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, UserPlus, Mail, Phone, MapPin, Calendar, Activity } from "lucide-react"

// Datos de ejemplo
const corredores = [
  {
    id: 1,
    nombre: "María González",
    email: "maria.gonzalez@email.com",
    telefono: "+34 666 123 456",
    ciudad: "Madrid",
    fechaRegistro: "2024-01-15",
    estado: "activo",
    nivel: "avanzado",
    totalKm: 1247,
    carreras: 45,
    avatar: "/runner-woman.png",
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    email: "juan.perez@email.com",
    telefono: "+34 677 234 567",
    ciudad: "Barcelona",
    fechaRegistro: "2024-02-03",
    estado: "activo",
    nivel: "intermedio",
    totalKm: 892,
    carreras: 32,
    avatar: "/runner-man.png",
  },
  {
    id: 3,
    nombre: "Ana Martín",
    email: "ana.martin@email.com",
    telefono: "+34 688 345 678",
    ciudad: "Valencia",
    fechaRegistro: "2024-01-28",
    estado: "suspendido",
    nivel: "principiante",
    totalKm: 234,
    carreras: 8,
    avatar: "/runner-woman-young.jpg",
  },
  {
    id: 4,
    nombre: "Carlos Ruiz",
    email: "carlos.ruiz@email.com",
    telefono: "+34 699 456 789",
    ciudad: "Sevilla",
    fechaRegistro: "2023-12-10",
    estado: "activo",
    nivel: "avanzado",
    totalKm: 2156,
    carreras: 78,
    avatar: "/runner-man-athletic.jpg",
  },
  {
    id: 5,
    nombre: "Laura Sánchez",
    email: "laura.sanchez@email.com",
    telefono: "+34 611 567 890",
    ciudad: "Bilbao",
    fechaRegistro: "2024-03-05",
    estado: "inactivo",
    nivel: "intermedio",
    totalKm: 567,
    carreras: 19,
    avatar: "/runner-woman-professional.jpg",
  },
]

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "activo":
      return <Badge className="bg-accent/20 text-accent border-accent/30">Activo</Badge>
    case "inactivo":
      return <Badge variant="secondary">Inactivo</Badge>
    case "suspendido":
      return <Badge variant="destructive">Suspendido</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

const getNivelBadge = (nivel: string) => {
  switch (nivel) {
    case "principiante":
      return (
        <Badge variant="outline" className="text-chart-3 border-chart-3/30">
          Principiante
        </Badge>
      )
    case "intermedio":
      return (
        <Badge variant="outline" className="text-primary border-primary/30">
          Intermedio
        </Badge>
      )
    case "avanzado":
      return (
        <Badge variant="outline" className="text-chart-4 border-chart-4/30">
          Avanzado
        </Badge>
      )
    default:
      return <Badge variant="outline">{nivel}</Badge>
  }
}

export default function CorredoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEstado, setSelectedEstado] = useState("todos")
  const [selectedNivel, setSelectedNivel] = useState("todos")

  const filteredCorredores = corredores.filter((corredor) => {
    const matchesSearch =
      corredor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      corredor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      corredor.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = selectedEstado === "todos" || corredor.estado === selectedEstado
    const matchesNivel = selectedNivel === "todos" || corredor.nivel === selectedNivel

    return matchesSearch && matchesEstado && matchesNivel
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Gestión de Corredores</h1>
          <p className="text-muted-foreground text-pretty">
            Administra los perfiles y datos de todos los corredores registrados
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Nuevo Corredor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Corredor</DialogTitle>
              <DialogDescription>Completa la información básica del nuevo corredor</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input id="nombre" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefono" className="text-right">
                  Teléfono
                </Label>
                <Input id="telefono" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ciudad" className="text-right">
                  Ciudad
                </Label>
                <Input id="ciudad" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nivel" className="text-right">
                  Nivel
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="principiante">Principiante</SelectItem>
                    <SelectItem value="intermedio">Intermedio</SelectItem>
                    <SelectItem value="avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Crear Corredor</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Corredores</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+247</span> este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <div className="w-2 h-2 bg-accent rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11,234</div>
            <p className="text-xs text-muted-foreground">87.4% del total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nuevos Hoy</CardTitle>
            <div className="w-2 h-2 bg-primary rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+12%</span> vs ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspendidos</CardTitle>
            <div className="w-2 h-2 bg-destructive rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">0.18% del total</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros y Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, email o ciudad..."
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
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
                <SelectItem value="suspendido">Suspendido</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedNivel} onValueChange={setSelectedNivel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los niveles</SelectItem>
                <SelectItem value="principiante">Principiante</SelectItem>
                <SelectItem value="intermedio">Intermedio</SelectItem>
                <SelectItem value="avanzado">Avanzado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Corredores Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Corredores</CardTitle>
          <CardDescription>{filteredCorredores.length} corredores encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Corredor</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Nivel</TableHead>
                <TableHead>Estadísticas</TableHead>
                <TableHead>Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCorredores.map((corredor) => (
                <TableRow key={corredor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={corredor.avatar || "/placeholder.svg"} alt={corredor.nombre} />
                        <AvatarFallback>
                          {corredor.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{corredor.nombre}</div>
                        <div className="text-sm text-muted-foreground">ID: {corredor.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        {corredor.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {corredor.telefono}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {corredor.ciudad}
                    </div>
                  </TableCell>
                  <TableCell>{getEstadoBadge(corredor.estado)}</TableCell>
                  <TableCell>{getNivelBadge(corredor.nivel)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{corredor.totalKm.toLocaleString()} km</div>
                      <div className="text-xs text-muted-foreground">{corredor.carreras} carreras</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(corredor.fechaRegistro).toLocaleDateString("es-ES")}
                    </div>
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
                        <DropdownMenuItem>Ver perfil completo</DropdownMenuItem>
                        <DropdownMenuItem>Editar información</DropdownMenuItem>
                        <DropdownMenuItem>Ver historial</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Enviar mensaje</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Suspender cuenta</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
