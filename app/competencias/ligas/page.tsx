"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, TrendingUp, Users, Search, Crown, Star, Zap } from "lucide-react"

// Datos de ejemplo
const clasificacionGeneral = [
  {
    posicion: 1,
    usuario: "María González",
    avatar: "/runner-woman.png",
    puntos: 2847,
    kmTotales: 456.2,
    carrerasCompletadas: 45,
    mejor5k: "18:45",
    mejor10k: "39:12",
    badges: 12,
    racha: 15,
    nivel: "Avanzado",
  },
  {
    posicion: 2,
    usuario: "Carlos Ruiz",
    avatar: "/runner-man-athletic.jpg",
    puntos: 2634,
    kmTotales: 523.8,
    carrerasCompletadas: 52,
    mejor5k: "17:23",
    mejor10k: "36:45",
    badges: 15,
    racha: 23,
    nivel: "Avanzado",
  },
  {
    posicion: 3,
    usuario: "Juan Pérez",
    avatar: "/runner-man.png",
    puntos: 2456,
    kmTotales: 389.4,
    carrerasCompletadas: 38,
    mejor5k: "19:30",
    mejor10k: "41:15",
    badges: 9,
    racha: 8,
    nivel: "Intermedio",
  },
  {
    posicion: 4,
    usuario: "Ana Martín",
    avatar: "/runner-woman-young.jpg",
    puntos: 2234,
    kmTotales: 298.7,
    carrerasCompletadas: 29,
    mejor5k: "22:15",
    mejor10k: "47:30",
    badges: 7,
    racha: 12,
    nivel: "Intermedio",
  },
  {
    posicion: 5,
    usuario: "Laura Sánchez",
    avatar: "/runner-woman-professional.jpg",
    puntos: 2156,
    kmTotales: 345.6,
    carrerasCompletadas: 34,
    mejor5k: "20:45",
    mejor10k: "43:20",
    badges: 8,
    racha: 6,
    nivel: "Intermedio",
  },
]

const ligas = [
  {
    id: 1,
    nombre: "Liga Élite",
    descripcion: "Los mejores corredores de la temporada",
    participantes: 50,
    requisitos: "Top 50 en puntuación general",
    premio: "Trofeo Dorado + Equipamiento Premium",
    color: "gold",
    icono: Crown,
  },
  {
    id: 2,
    nombre: "Liga Diamante",
    descripcion: "Corredores de alto rendimiento",
    participantes: 150,
    requisitos: "Top 200 en puntuación general",
    premio: "Trofeo Plateado + Descuentos Exclusivos",
    color: "silver",
    icono: Star,
  },
  {
    id: 3,
    nombre: "Liga Oro",
    descripcion: "Corredores experimentados",
    participantes: 500,
    requisitos: "Más de 1000 puntos",
    premio: "Badge Especial + Beneficios",
    color: "bronze",
    icono: Medal,
  },
  {
    id: 4,
    nombre: "Liga Plata",
    descripcion: "Corredores en desarrollo",
    participantes: 1200,
    requisitos: "Más de 500 puntos",
    premio: "Badge de Liga + Reconocimiento",
    color: "gray",
    icono: Award,
  },
]

const categorias = [
  {
    nombre: "KM Totales",
    lider: "Carlos Ruiz",
    valor: "523.8 km",
    avatar: "/runner-man-athletic.jpg",
    tendencia: "+15.2%",
  },
  {
    nombre: "Carreras Completadas",
    lider: "Carlos Ruiz",
    valor: "52 carreras",
    avatar: "/runner-man-athletic.jpg",
    tendencia: "+8.7%",
  },
  {
    nombre: "Mejor 5K",
    lider: "Carlos Ruiz",
    valor: "17:23",
    avatar: "/runner-man-athletic.jpg",
    tendencia: "-0:45",
  },
  {
    nombre: "Mejor 10K",
    lider: "Carlos Ruiz",
    valor: "36:45",
    avatar: "/runner-man-athletic.jpg",
    tendencia: "-1:20",
  },
  {
    nombre: "Mayor Racha",
    lider: "Carlos Ruiz",
    valor: "23 días",
    avatar: "/runner-man-athletic.jpg",
    tendencia: "+5 días",
  },
  {
    nombre: "Más Badges",
    lider: "Carlos Ruiz",
    valor: "15 badges",
    avatar: "/runner-man-athletic.jpg",
    tendencia: "+3",
  },
]

const getPosicionBadge = (posicion: number) => {
  if (posicion === 1) {
    return (
      <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30 gap-1">
        <Crown className="h-3 w-3" />
        1°
      </Badge>
    )
  } else if (posicion === 2) {
    return (
      <Badge className="bg-gray-400/20 text-gray-600 border-gray-400/30 gap-1">
        <Medal className="h-3 w-3" />
        2°
      </Badge>
    )
  } else if (posicion === 3) {
    return (
      <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30 gap-1">
        <Award className="h-3 w-3" />
        3°
      </Badge>
    )
  } else {
    return <Badge variant="outline">{posicion}°</Badge>
  }
}

const getNivelBadge = (nivel: string) => {
  switch (nivel) {
    case "Avanzado":
      return <Badge className="bg-accent/20 text-accent border-accent/30">Avanzado</Badge>
    case "Intermedio":
      return <Badge className="bg-primary/20 text-primary border-primary/30">Intermedio</Badge>
    case "Principiante":
      return <Badge variant="secondary">Principiante</Badge>
    default:
      return <Badge variant="outline">{nivel}</Badge>
  }
}

export default function LigasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLiga, setSelectedLiga] = useState("todas")
  const [selectedCategoria, setSelectedCategoria] = useState("general")

  const filteredClasificacion = clasificacionGeneral.filter((usuario) =>
    usuario.usuario.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Ligas y Clasificaciones</h1>
        <p className="text-muted-foreground text-pretty">
          Gestiona las clasificaciones por categorías y el sistema de ligas competitivas
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participantes Totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,900</div>
            <p className="text-xs text-muted-foreground">En todas las ligas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Liga Élite</CardTitle>
            <Crown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs text-muted-foreground">Corredores élite</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntuación Líder</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">María González</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitividad</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">Participación activa</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clasificacion" className="space-y-6">
        <TabsList>
          <TabsTrigger value="clasificacion">Clasificación General</TabsTrigger>
          <TabsTrigger value="ligas">Sistema de Ligas</TabsTrigger>
          <TabsTrigger value="categorias">Por Categorías</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="clasificacion" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar corredor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedLiga} onValueChange={setSelectedLiga}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Liga" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las ligas</SelectItem>
                    <SelectItem value="elite">Liga Élite</SelectItem>
                    <SelectItem value="diamante">Liga Diamante</SelectItem>
                    <SelectItem value="oro">Liga Oro</SelectItem>
                    <SelectItem value="plata">Liga Plata</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Puntuación General</SelectItem>
                    <SelectItem value="km">KM Totales</SelectItem>
                    <SelectItem value="carreras">Carreras Completadas</SelectItem>
                    <SelectItem value="5k">Mejor 5K</SelectItem>
                    <SelectItem value="10k">Mejor 10K</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Clasificación Table */}
          <Card>
            <CardHeader>
              <CardTitle>Clasificación General - Primavera 2024</CardTitle>
              <CardDescription>Ranking basado en puntuación total de la temporada</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Posición</TableHead>
                    <TableHead>Corredor</TableHead>
                    <TableHead>Puntos</TableHead>
                    <TableHead>KM Totales</TableHead>
                    <TableHead>Carreras</TableHead>
                    <TableHead>Mejor 5K</TableHead>
                    <TableHead>Mejor 10K</TableHead>
                    <TableHead>Racha</TableHead>
                    <TableHead>Nivel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClasificacion.map((corredor) => (
                    <TableRow key={corredor.posicion}>
                      <TableCell>{getPosicionBadge(corredor.posicion)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={corredor.avatar || "/placeholder.svg"} alt={corredor.usuario} />
                            <AvatarFallback>
                              {corredor.usuario
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{corredor.usuario}</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Award className="h-3 w-3" />
                              {corredor.badges} badges
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-primary">{corredor.puntos.toLocaleString()}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{corredor.kmTotales} km</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{corredor.carrerasCompletadas}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-accent">{corredor.mejor5k}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-accent">{corredor.mejor10k}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-yellow-500" />
                          <span className="font-medium">{corredor.racha}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getNivelBadge(corredor.nivel)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ligas" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {ligas.map((liga) => {
              const IconComponent = liga.icono
              return (
                <Card key={liga.id} className="relative overflow-hidden">
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 opacity-10 ${
                      liga.color === "gold"
                        ? "text-yellow-500"
                        : liga.color === "silver"
                          ? "text-gray-400"
                          : liga.color === "bronze"
                            ? "text-orange-500"
                            : "text-gray-500"
                    }`}
                  >
                    <IconComponent className="w-full h-full" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          liga.color === "gold"
                            ? "bg-yellow-500/20"
                            : liga.color === "silver"
                              ? "bg-gray-400/20"
                              : liga.color === "bronze"
                                ? "bg-orange-500/20"
                                : "bg-gray-500/20"
                        }`}
                      >
                        {liga.nombre}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="text-sm font-medium">{liga.descripcion}</div>
                        <div className="text-xs text-muted-foreground">{liga.participantes} participantes</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium">Requisitos:</div>
                    <div className="text-xs text-muted-foreground">{liga.requisitos}</div>
                    <div className="text-sm font-medium mt-4">Premio:</div>
                    <div className="text-xs text-muted-foreground">{liga.premio}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="categorias" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {categorias.map((categoria) => (
              <Card key={categoria.nombre} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10 text-accent">
                  <Zap className="w-full h-full" />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/20 text-accent">{categoria.nombre}</div>
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium">Líder:</div>
                      <div className="text-xs text-muted-foreground">{categoria.lider}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-medium">Valor:</div>
                  <div className="text-xs text-muted-foreground">{categoria.valor}</div>
                  <div className="text-sm font-medium mt-4">Tendencia:</div>
                  <div className="text-xs text-muted-foreground">{categoria.tendencia}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-6">
          {/* Estadísticas Section */}
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas Generales</CardTitle>
              <CardDescription>Resumen de la temporada</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-accent/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">Puntuación Máxima</p>
                </div>
                <div className="bg-primary/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold">523.8 km</div>
                  <p className="text-xs text-muted-foreground">KM Totales Máximos</p>
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold">52</div>
                  <p className="text-xs text-muted-foreground">Carreras Completadas Máximas</p>
                </div>
                <div className="bg-destructive/20 p-4 rounded-lg">
                  <div className="text-2xl font-bold">15 días</div>
                  <p className="text-xs text-muted-foreground">Mayor Racha</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
