"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Target, Trophy, Award, Clock, Zap, Search, Plus, Edit } from "lucide-react"

// Datos de ejemplo
const perfiles = [
  {
    id: 1,
    nombre: "María González",
    avatar: "/runner-woman.png",
    nivel: "Avanzado",
    objetivoSemanal: 50,
    progreso: 38,
    objetivoMensual: 200,
    progresoMensual: 156,
    mejorTiempo5k: "18:45",
    mejorTiempo10k: "39:12",
    badges: ["Maratonista", "Velocista", "Constante"],
    racha: 15,
    ultimaActividad: "2024-03-15",
  },
  {
    id: 2,
    nombre: "Juan Pérez",
    avatar: "/runner-man.png",
    nivel: "Intermedio",
    objetivoSemanal: 30,
    progreso: 25,
    objetivoMensual: 120,
    progresoMensual: 89,
    mejorTiempo5k: "22:30",
    mejorTiempo10k: "47:15",
    badges: ["Explorador", "Matutino"],
    racha: 8,
    ultimaActividad: "2024-03-14",
  },
  {
    id: 3,
    nombre: "Ana Martín",
    avatar: "/runner-woman-young.jpg",
    nivel: "Principiante",
    objetivoSemanal: 15,
    progreso: 12,
    objetivoMensual: 60,
    progresoMensual: 34,
    mejorTiempo5k: "28:15",
    mejorTiempo10k: "58:30",
    badges: ["Novato", "Determinado"],
    racha: 3,
    ultimaActividad: "2024-03-13",
  },
]

const objetivosComunes = [
  { nombre: "5K en menos de 25 min", categoria: "Tiempo", dificultad: "Intermedio" },
  { nombre: "10K en menos de 50 min", categoria: "Tiempo", dificultad: "Intermedio" },
  { nombre: "Correr 100km al mes", categoria: "Distancia", dificultad: "Avanzado" },
  { nombre: "Mantener racha de 30 días", categoria: "Consistencia", dificultad: "Intermedio" },
  { nombre: "Completar primer maratón", categoria: "Distancia", dificultad: "Avanzado" },
  { nombre: "Correr 3 veces por semana", categoria: "Frecuencia", dificultad: "Principiante" },
]

export default function PerfilesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNivel, setSelectedNivel] = useState("todos")

  const filteredPerfiles = perfiles.filter((perfil) => {
    const matchesSearch = perfil.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesNivel = selectedNivel === "todos" || perfil.nivel.toLowerCase() === selectedNivel
    return matchesSearch && matchesNivel
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Perfiles y Objetivos</h1>
          <p className="text-muted-foreground text-pretty">
            Gestiona los objetivos personales y el progreso de los corredores
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Crear Objetivo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Objetivo</DialogTitle>
              <DialogDescription>Define un objetivo personalizado para un corredor</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="corredor" className="text-right">
                  Corredor
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar corredor" />
                  </SelectTrigger>
                  <SelectContent>
                    {perfiles.map((perfil) => (
                      <SelectItem key={perfil.id} value={perfil.id.toString()}>
                        {perfil.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tipo" className="text-right">
                  Tipo
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Tipo de objetivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distancia">Distancia</SelectItem>
                    <SelectItem value="tiempo">Tiempo</SelectItem>
                    <SelectItem value="frecuencia">Frecuencia</SelectItem>
                    <SelectItem value="consistencia">Consistencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="objetivo" className="text-right">
                  Objetivo
                </Label>
                <Input id="objetivo" placeholder="ej: 50km semanales" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plazo" className="text-right">
                  Plazo
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar plazo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="mensual">Mensual</SelectItem>
                    <SelectItem value="trimestral">Trimestral</SelectItem>
                    <SelectItem value="anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Crear Objetivo</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Objetivos Activos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+89</span> esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">71.5% tasa de éxito</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Otorgados</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+45</span> hoy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Racha Promedio</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.3</div>
            <p className="text-xs text-muted-foreground">días consecutivos</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="perfiles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="perfiles">Perfiles de Usuario</TabsTrigger>
          <TabsTrigger value="objetivos">Objetivos Comunes</TabsTrigger>
          <TabsTrigger value="badges">Sistema de Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="perfiles" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
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

          {/* Perfiles Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPerfiles.map((perfil) => (
              <Card key={perfil.id} className="relative">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={perfil.avatar || "/placeholder.svg"} alt={perfil.nombre} />
                      <AvatarFallback>
                        {perfil.nombre
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{perfil.nombre}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {perfil.nivel}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Objetivos Semanales */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Objetivo Semanal</span>
                      <span>
                        {perfil.progreso}/{perfil.objetivoSemanal} km
                      </span>
                    </div>
                    <Progress value={(perfil.progreso / perfil.objetivoSemanal) * 100} className="h-2" />
                  </div>

                  {/* Objetivos Mensuales */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Objetivo Mensual</span>
                      <span>
                        {perfil.progresoMensual}/{perfil.objetivoMensual} km
                      </span>
                    </div>
                    <Progress value={(perfil.progresoMensual / perfil.objetivoMensual) * 100} className="h-2" />
                  </div>

                  {/* Mejores Tiempos */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Mejor 5K</div>
                      <div className="font-semibold text-primary">{perfil.mejorTiempo5k}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Mejor 10K</div>
                      <div className="font-semibold text-primary">{perfil.mejorTiempo10k}</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Badges Obtenidos</div>
                    <div className="flex flex-wrap gap-1">
                      {perfil.badges.map((badge, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Racha */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-accent" />
                      <span className="text-sm">Racha actual</span>
                    </div>
                    <Badge className="bg-accent/20 text-accent border-accent/30">{perfil.racha} días</Badge>
                  </div>

                  {/* Última Actividad */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Última actividad: {new Date(perfil.ultimaActividad).toLocaleDateString("es-ES")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="objetivos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Objetivos Predefinidos</CardTitle>
              <CardDescription>Objetivos comunes que puedes asignar rápidamente a los corredores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {objetivosComunes.map((objetivo, index) => (
                  <Card key={index} className="border-dashed">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{objetivo.nombre}</h4>
                          <Badge variant="outline" className="text-xs">
                            {objetivo.dificultad}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{objetivo.categoria}</span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Asignar a Corredor
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Badges</CardTitle>
              <CardDescription>Gestiona los badges y logros disponibles para los corredores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { nombre: "Maratonista", descripcion: "Completar un maratón", icono: "🏃‍♂️", otorgados: 234 },
                  { nombre: "Velocista", descripcion: "5K en menos de 20 min", icono: "⚡", otorgados: 156 },
                  { nombre: "Constante", descripcion: "30 días consecutivos", icono: "🔥", otorgados: 892 },
                  { nombre: "Explorador", descripcion: "Correr en 10 ciudades", icono: "🗺️", otorgados: 67 },
                  { nombre: "Matutino", descripcion: "50 carreras antes de las 7am", icono: "🌅", otorgados: 123 },
                  { nombre: "Nocturno", descripcion: "25 carreras después de las 9pm", icono: "🌙", otorgados: 89 },
                  { nombre: "Determinado", descripcion: "Completar primer objetivo", icono: "🎯", otorgados: 1247 },
                  { nombre: "Novato", descripcion: "Primera carrera registrada", icono: "🌟", otorgados: 2156 },
                ].map((badge, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl mb-2">{badge.icono}</div>
                      <h4 className="font-semibold">{badge.nombre}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{badge.descripcion}</p>
                      <Badge variant="secondary">{badge.otorgados} otorgados</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
