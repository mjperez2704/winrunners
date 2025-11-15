"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift, Star, TrendingUp, Users, Search, Plus, Edit, Trash2, Package, Percent, Ticket } from "lucide-react"

const recompensas = [
  {
    id: 1,
    nombre: "Descuento 20% Tienda",
    descripcion: "20% de descuento en productos de la tienda oficial",
    tipo: "Descuento",
    costo: 500,
    stock: 100,
    canjeados: 45,
    categoria: "Tienda",
    validez: "30 días",
  },
  {
    id: 2,
    nombre: "Membresía Premium 1 Mes",
    descripcion: "Acceso a funciones premium durante 1 mes",
    tipo: "Premium",
    costo: 1000,
    stock: 50,
    canjeados: 23,
    categoria: "Membresía",
    validez: "30 días",
  },
  {
    id: 3,
    nombre: "Entrada Evento Especial",
    descripcion: "Entrada gratuita a evento de running",
    tipo: "Evento",
    costo: 2000,
    stock: 20,
    canjeados: 8,
    categoria: "Eventos",
    validez: "Hasta el evento",
  },
  {
    id: 4,
    nombre: "Kit de Corredor",
    descripcion: "Kit con productos esenciales para corredores",
    tipo: "Producto",
    costo: 1500,
    stock: 30,
    canjeados: 12,
    categoria: "Productos",
    validez: "60 días",
  },
  {
    id: 5,
    nombre: "Análisis Personalizado",
    descripcion: "Análisis detallado de tu rendimiento por experto",
    tipo: "Servicio",
    costo: 3000,
    stock: 10,
    canjeados: 4,
    categoria: "Servicios",
    validez: "90 días",
  },
]

const canjes = [
  {
    id: 1,
    usuario: "María González",
    recompensa: "Descuento 20% Tienda",
    puntos: 500,
    fecha: "2024-03-15",
    estado: "Canjeado",
  },
  {
    id: 2,
    usuario: "Carlos Ruiz",
    recompensa: "Membresía Premium 1 Mes",
    puntos: 1000,
    fecha: "2024-03-14",
    estado: "Canjeado",
  },
  {
    id: 3,
    usuario: "Juan Pérez",
    recompensa: "Kit de Corredor",
    puntos: 1500,
    fecha: "2024-03-13",
    estado: "Pendiente",
  },
  {
    id: 4,
    usuario: "Ana Martín",
    recompensa: "Entrada Evento Especial",
    puntos: 2000,
    fecha: "2024-03-12",
    estado: "Entregado",
  },
]

const getTipoBadge = (tipo: string) => {
  switch (tipo) {
    case "Descuento":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Descuento</Badge>
    case "Premium":
      return <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30">Premium</Badge>
    case "Evento":
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Evento</Badge>
    case "Producto":
      return <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30">Producto</Badge>
    case "Servicio":
      return <Badge className="bg-pink-500/20 text-pink-600 border-pink-500/30">Servicio</Badge>
    default:
      return <Badge variant="outline">{tipo}</Badge>
  }
}

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case "Canjeado":
      return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Canjeado</Badge>
    case "Pendiente":
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Pendiente</Badge>
    case "Entregado":
      return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Entregado</Badge>
    case "Cancelado":
      return <Badge variant="secondary">Cancelado</Badge>
    default:
      return <Badge variant="outline">{estado}</Badge>
  }
}

const getTipoIcon = (tipo: string) => {
  switch (tipo) {
    case "Descuento":
      return Percent
    case "Premium":
      return Star
    case "Evento":
      return Ticket
    case "Producto":
      return Package
    case "Servicio":
      return Gift
    default:
      return Gift
  }
}

export default function RecompensasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTipo, setSelectedTipo] = useState("todos")

  const filteredRecompensas = recompensas.filter(
    (recompensa) =>
      recompensa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTipo === "todos" || recompensa.tipo === selectedTipo),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Recompensas</h1>
        <p className="text-muted-foreground text-pretty">
          Gestiona el catálogo de recompensas y el sistema de canje de puntos
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recompensas Activas</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Disponibles para canje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canjes Totales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Canjeados</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87,500</div>
            <p className="text-xs text-muted-foreground">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">Con puntos suficientes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="catalogo" className="space-y-6">
        <TabsList>
          <TabsTrigger value="catalogo">Catálogo</TabsTrigger>
          <TabsTrigger value="canjes">Historial de Canjes</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="catalogo" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar recompensa..."
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
                    <SelectItem value="Descuento">Descuento</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Evento">Evento</SelectItem>
                    <SelectItem value="Producto">Producto</SelectItem>
                    <SelectItem value="Servicio">Servicio</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Recompensa
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recompensas Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecompensas.map((recompensa) => {
              const IconComponent = getTipoIcon(recompensa.tipo)
              return (
                <Card key={recompensa.id} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                    <IconComponent className="w-full h-full" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{recompensa.nombre}</CardTitle>
                          <CardDescription className="text-xs">{recompensa.categoria}</CardDescription>
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
                    <p className="text-sm text-muted-foreground">{recompensa.descripcion}</p>
                    <div className="flex items-center justify-between">
                      {getTipoBadge(recompensa.tipo)}
                      <div className="text-sm font-medium text-primary">{recompensa.costo} pts</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Stock</span>
                        <span className="font-medium">
                          {recompensa.stock - recompensa.canjeados} / {recompensa.stock}
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${((recompensa.stock - recompensa.canjeados) / recompensa.stock) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t text-sm">
                      <div className="text-muted-foreground">Validez: {recompensa.validez}</div>
                      <div className="font-medium">{recompensa.canjeados} canjeados</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="canjes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Canjes</CardTitle>
              <CardDescription>Registro de todos los canjes realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {canjes.map((canje) => (
                  <div key={canje.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Gift className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{canje.usuario}</div>
                        <div className="text-sm text-muted-foreground">{canje.recompensa}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{canje.puntos} pts</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(canje.fecha).toLocaleDateString()}
                        </div>
                      </div>
                      {getEstadoBadge(canje.estado)}
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recompensas Más Populares</CardTitle>
                <CardDescription>Por número de canjes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recompensas
                    .sort((a, b) => b.canjeados - a.canjeados)
                    .map((recompensa, index) => {
                      const IconComponent = getTipoIcon(recompensa.tipo)
                      return (
                        <div key={recompensa.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-bold text-muted-foreground w-6">{index + 1}</div>
                            <div className="p-2 rounded-lg bg-primary/10">
                              <IconComponent className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{recompensa.nombre}</div>
                              <div className="text-xs text-muted-foreground">{recompensa.tipo}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{recompensa.canjeados}</div>
                            <div className="text-xs text-muted-foreground">canjes</div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por Tipo</CardTitle>
                <CardDescription>Canjes por tipo de recompensa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Descuento</span>
                    </div>
                    <span className="font-bold">45</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Premium</span>
                    </div>
                    <span className="font-bold">23</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">Producto</span>
                    </div>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Ticket className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Evento</span>
                    </div>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Gift className="h-4 w-4 text-pink-500" />
                      <span className="text-sm font-medium">Servicio</span>
                    </div>
                    <span className="font-bold">4</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Puntos Canjeados por Mes</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { mes: "Marzo 2024", puntos: 87500 },
                    { mes: "Febrero 2024", puntos: 76200 },
                    { mes: "Enero 2024", puntos: 92300 },
                    { mes: "Diciembre 2023", puntos: 105400 },
                    { mes: "Noviembre 2023", puntos: 68900 },
                    { mes: "Octubre 2023", puntos: 71200 },
                  ].map((item) => (
                    <div key={item.mes} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm font-medium">{item.mes}</span>
                      <span className="font-bold text-primary">{item.puntos.toLocaleString()} pts</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas Generales</CardTitle>
                <CardDescription>Resumen del sistema de recompensas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Total Recompensas</span>
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Canjes Totales</span>
                    <span className="font-bold">92</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Puntos Totales Canjeados</span>
                    <span className="font-bold">87,500</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm font-medium">Promedio por Canje</span>
                    <span className="font-bold text-primary">951 pts</span>
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
