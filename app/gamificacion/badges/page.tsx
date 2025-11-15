"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Award,
  Trophy,
  Star,
  Zap,
  Target,
  Crown,
  Medal,
  Flame,
  TrendingUp,
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"

const badges = [
  {
    id: 1,
    nombre: "Primera Carrera",
    descripcion: "Completa tu primera carrera",
    icono: "Trophy",
    rareza: "Común",
    puntos: 50,
    desbloqueados: 1847,
    categoria: "Inicio",
    color: "blue",
  },
  {
    id: 2,
    nombre: "Maratonista",
    descripcion: "Completa 100 carreras",
    icono: "Medal",
    rareza: "Épico",
    puntos: 500,
    desbloqueados: 234,
    categoria: "Carreras",
    color: "purple",
  },
  {
    id: 3,
    nombre: "Velocista",
    descripcion: "Corre 5K en menos de 20 minutos",
    icono: "Zap",
    rareza: "Raro",
    puntos: 200,
    desbloqueados: 567,
    categoria: "Rendimiento",
    color: "yellow",
  },
  {
    id: 4,
    nombre: "Racha de Fuego",
    descripcion: "Mantén una racha de 30 días",
    icono: "Flame",
    rareza: "Legendario",
    puntos: 1000,
    desbloqueados: 89,
    categoria: "Consistencia",
    color: "orange",
  },
  {
    id: 5,
    nombre: "Explorador",
    descripcion: "Corre en 10 ubicaciones diferentes",
    icono: "Target",
    rareza: "Raro",
    puntos: 300,
    desbloqueados: 445,
    categoria: "Exploración",
    color: "green",
  },
  {
    id: 6,
    nombre: "Campeón",
    descripcion: "Gana una temporada",
    icono: "Crown",
    rareza: "Legendario",
    puntos: 2000,
    desbloqueados: 12,
    categoria: "Competencia",
    color: "gold",
  },
]

const logros = [
  {
    id: 1,
    nombre: "100 Kilómetros",
    descripcion: "Acumula 100 km en total",
    progreso: 87,
    objetivo: 100,
    recompensa: "150 puntos + Badge",
    categoria: "Distancia",
  },
  {
    id: 2,
    nombre: "Corredor Social",
    descripcion: "Consigue 50 seguidores",
    progreso: 42,
    objetivo: 50,
    recompensa: "100 puntos + Badge",
    categoria: "Social",
  },
  {
    id: 3,
    nombre: "Maestro del Ritmo",
    descripcion: "Mantén ritmo constante en 20 carreras",
    progreso: 15,
    objetivo: 20,
    recompensa: "200 puntos + Badge",
    categoria: "Técnica",
  },
  {
    id: 4,
    nombre: "Madrugador",
    descripcion: "Corre antes de las 6 AM, 10 veces",
    progreso: 7,
    objetivo: 10,
    recompensa: "150 puntos + Badge",
    categoria: "Horario",
  },
]

const getRarezaBadge = (rareza: string) => {
  switch (rareza) {
    case "Común":
      return <Badge variant="secondary">Común</Badge>
    case "Raro":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Raro</Badge>
    case "Épico":
      return <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30">Épico</Badge>
    case "Legendario":
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Legendario</Badge>
    default:
      return <Badge variant="outline">{rareza}</Badge>
  }
}

const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Trophy,
    Medal,
    Zap,
    Flame,
    Target,
    Crown,
    Star,
    Award,
  }
  return icons[iconName] || Trophy
}

export default function BadgesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategoria, setSelectedCategoria] = useState("todas")
  const [selectedRareza, setSelectedRareza] = useState("todas")

  const filteredBadges = badges.filter(
    (badge) =>
      badge.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategoria === "todas" || badge.categoria === selectedCategoria) &&
      (selectedRareza === "todas" || badge.rareza === selectedRareza),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Badges y Logros</h1>
        <p className="text-muted-foreground text-pretty">
          Gestiona el sistema de badges, logros y recompensas para motivar a los corredores
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Badges</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Badges disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Desbloqueados</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,194</div>
            <p className="text-xs text-muted-foreground">Total de desbloqueos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Logros Activos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">En progreso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Completado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67.8%</div>
            <p className="text-xs text-muted-foreground">Promedio de usuarios</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="badges" className="space-y-6">
        <TabsList>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="logros">Logros</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar badge..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las categorías</SelectItem>
                    <SelectItem value="Inicio">Inicio</SelectItem>
                    <SelectItem value="Carreras">Carreras</SelectItem>
                    <SelectItem value="Rendimiento">Rendimiento</SelectItem>
                    <SelectItem value="Consistencia">Consistencia</SelectItem>
                    <SelectItem value="Exploración">Exploración</SelectItem>
                    <SelectItem value="Competencia">Competencia</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedRareza} onValueChange={setSelectedRareza}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Rareza" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las rarezas</SelectItem>
                    <SelectItem value="Común">Común</SelectItem>
                    <SelectItem value="Raro">Raro</SelectItem>
                    <SelectItem value="Épico">Épico</SelectItem>
                    <SelectItem value="Legendario">Legendario</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nuevo Badge
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Badges Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBadges.map((badge) => {
              const IconComponent = getIconComponent(badge.icono)
              return (
                <Card key={badge.id} className="relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-20 h-20 opacity-5`}>
                    <IconComponent className="w-full h-full" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-lg ${
                            badge.color === "blue"
                              ? "bg-blue-500/20"
                              : badge.color === "purple"
                                ? "bg-purple-500/20"
                                : badge.color === "yellow"
                                  ? "bg-yellow-500/20"
                                  : badge.color === "orange"
                                    ? "bg-orange-500/20"
                                    : badge.color === "green"
                                      ? "bg-green-500/20"
                                      : badge.color === "gold"
                                        ? "bg-yellow-500/20"
                                        : "bg-primary/20"
                          }`}
                        >
                          <IconComponent
                            className={`h-6 w-6 ${
                              badge.color === "blue"
                                ? "text-blue-500"
                                : badge.color === "purple"
                                  ? "text-purple-500"
                                  : badge.color === "yellow"
                                    ? "text-yellow-500"
                                    : badge.color === "orange"
                                      ? "text-orange-500"
                                      : badge.color === "green"
                                        ? "text-green-500"
                                        : badge.color === "gold"
                                          ? "text-yellow-500"
                                          : "text-primary"
                            }`}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{badge.nombre}</CardTitle>
                          <CardDescription className="text-xs">{badge.categoria}</CardDescription>
                        </div>
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
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{badge.descripcion}</p>
                    <div className="flex items-center justify-between">
                      {getRarezaBadge(badge.rareza)}
                      <div className="text-sm font-medium text-primary">{badge.puntos} pts</div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {badge.desbloqueados.toLocaleString()} usuarios
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {((badge.desbloqueados / 1900) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="logros" className="space-y-6">
          <div className="flex justify-end">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Logro
            </Button>
          </div>

          <div className="grid gap-4">
            {logros.map((logro) => (
              <Card key={logro.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{logro.nombre}</CardTitle>
                      <CardDescription>{logro.descripcion}</CardDescription>
                    </div>
                    <Badge variant="outline">{logro.categoria}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">
                        {logro.progreso} / {logro.objetivo}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(logro.progreso / logro.objetivo) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="text-sm text-muted-foreground">Recompensa: {logro.recompensa}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
                <CardTitle>Badges Más Populares</CardTitle>
                <CardDescription>Top 5 badges más desbloqueados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {badges
                    .sort((a, b) => b.desbloqueados - a.desbloqueados)
                    .slice(0, 5)
                    .map((badge, index) => {
                      const IconComponent = getIconComponent(badge.icono)
                      return (
                        <div key={badge.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-bold text-muted-foreground w-6">{index + 1}</div>
                            <div className="p-2 rounded-lg bg-primary/10">
                              <IconComponent className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{badge.nombre}</div>
                              <div className="text-xs text-muted-foreground">{badge.categoria}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{badge.desbloqueados.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              {((badge.desbloqueados / 1900) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges Más Raros</CardTitle>
                <CardDescription>Top 5 badges menos desbloqueados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {badges
                    .sort((a, b) => a.desbloqueados - b.desbloqueados)
                    .slice(0, 5)
                    .map((badge, index) => {
                      const IconComponent = getIconComponent(badge.icono)
                      return (
                        <div key={badge.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-bold text-muted-foreground w-6">{index + 1}</div>
                            <div className="p-2 rounded-lg bg-yellow-500/10">
                              <IconComponent className="h-4 w-4 text-yellow-500" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{badge.nombre}</div>
                              <div className="text-xs text-muted-foreground">{badge.categoria}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{badge.desbloqueados.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              {((badge.desbloqueados / 1900) * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por Rareza</CardTitle>
                <CardDescription>Cantidad de badges por nivel de rareza</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-400" />
                      <span className="text-sm font-medium">Común</span>
                    </div>
                    <span className="font-bold">18</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium">Raro</span>
                    </div>
                    <span className="font-bold">15</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500" />
                      <span className="text-sm font-medium">Épico</span>
                    </div>
                    <span className="font-bold">10</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-sm font-medium">Legendario</span>
                    </div>
                    <span className="font-bold">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por Categoría</CardTitle>
                <CardDescription>Cantidad de badges por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Inicio</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Carreras</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Rendimiento</span>
                    <span className="font-bold">10</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Consistencia</span>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Exploración</span>
                    <span className="font-bold">7</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Competencia</span>
                    <span className="font-bold">6</span>
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
