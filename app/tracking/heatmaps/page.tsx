"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Map, TrendingUp, MapPin, Clock, Activity, Target, Download, Settings, Eye } from "lucide-react"

// Datos de ejemplo
const zonasPopulares = [
  {
    id: 1,
    nombre: "Parque del Retiro",
    ciudad: "Madrid",
    actividad: 2847,
    intensidad: "muy_alta",
    tipoZona: "parque",
    coordenadas: "40.4152,-3.6844",
    horaPico: "07:00-09:00",
  },
  {
    id: 2,
    nombre: "Paseo Marítimo",
    ciudad: "Valencia",
    actividad: 1923,
    intensidad: "alta",
    tipoZona: "costero",
    coordenadas: "39.4699,-0.3763",
    horaPico: "18:00-20:00",
  },
  {
    id: 3,
    nombre: "Casa de Campo",
    ciudad: "Madrid",
    actividad: 1456,
    intensidad: "alta",
    tipoZona: "natural",
    coordenadas: "40.4000,-3.7500",
    horaPico: "06:00-08:00",
  },
  {
    id: 4,
    nombre: "Parque Güell",
    ciudad: "Barcelona",
    actividad: 1234,
    intensidad: "media",
    tipoZona: "parque",
    coordenadas: "41.4145,2.1527",
    horaPico: "17:00-19:00",
  },
  {
    id: 5,
    nombre: "Río Guadalquivir",
    ciudad: "Sevilla",
    actividad: 892,
    intensidad: "media",
    tipoZona: "ribera",
    coordenadas: "37.3886,-5.9823",
    horaPico: "19:00-21:00",
  },
]

const segmentosKOM = [
  {
    id: 1,
    nombre: "Subida Cerro de los Ángeles",
    distancia: 2.3,
    elevacion: 156,
    record: "7:23",
    recordista: "Carlos Ruiz",
    intentos: 234,
    ciudad: "Madrid",
    dificultad: "alta",
  },
  {
    id: 2,
    nombre: "Sprint Paseo de Gracia",
    distancia: 0.8,
    elevacion: 12,
    record: "2:15",
    recordista: "María González",
    intentos: 567,
    ciudad: "Barcelona",
    dificultad: "media",
  },
  {
    id: 3,
    nombre: "Bajada Puerto de Navacerrada",
    distancia: 4.1,
    elevacion: -234,
    record: "12:45",
    recordista: "Juan Pérez",
    intentos: 123,
    ciudad: "Madrid",
    dificultad: "alta",
  },
  {
    id: 4,
    nombre: "Circuito Ciudad de las Artes",
    distancia: 1.5,
    elevacion: 23,
    record: "4:56",
    recordista: "Ana Martín",
    intentos: 345,
    ciudad: "Valencia",
    dificultad: "baja",
  },
]

const getIntensidadBadge = (intensidad: string) => {
  switch (intensidad) {
    case "muy_alta":
      return <Badge variant="destructive">Muy Alta</Badge>
    case "alta":
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Alta</Badge>
    case "media":
      return <Badge className="bg-primary/20 text-primary border-primary/30">Media</Badge>
    case "baja":
      return <Badge variant="secondary">Baja</Badge>
    default:
      return <Badge variant="outline">{intensidad}</Badge>
  }
}

const getDificultadBadge = (dificultad: string) => {
  switch (dificultad) {
    case "alta":
      return <Badge variant="destructive">Alta</Badge>
    case "media":
      return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Media</Badge>
    case "baja":
      return <Badge className="bg-accent/20 text-accent border-accent/30">Baja</Badge>
    default:
      return <Badge variant="outline">{dificultad}</Badge>
  }
}

export default function HeatmapsPage() {
  const [selectedCiudad, setSelectedCiudad] = useState("todas")
  const [selectedTipoZona, setSelectedTipoZona] = useState("todos")
  const [intensidadMinima, setIntensidadMinima] = useState([0])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Heatmaps y Segmentos</h1>
          <p className="text-muted-foreground text-pretty">
            Visualiza las zonas más populares y los segmentos tipo KOM de la comunidad
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Configurar
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zonas Activas</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">En toda España</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Segmentos KOM</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+23</span> este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actividad Total</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89,234</div>
            <p className="text-xs text-muted-foreground">Carreras esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zona Más Popular</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Retiro</div>
            <p className="text-xs text-muted-foreground">2,847 carreras</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="heatmap" className="space-y-6">
        <TabsList>
          <TabsTrigger value="heatmap">Mapa de Calor</TabsTrigger>
          <TabsTrigger value="zonas">Zonas Populares</TabsTrigger>
          <TabsTrigger value="segmentos">Segmentos KOM</TabsTrigger>
          <TabsTrigger value="analisis">Análisis Temporal</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="space-y-6">
          {/* Controles del Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Controles de Visualización</CardTitle>
              <CardDescription>Personaliza la vista del mapa de calor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label>Ciudad</Label>
                  <Select value={selectedCiudad} onValueChange={setSelectedCiudad}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las ciudades</SelectItem>
                      <SelectItem value="madrid">Madrid</SelectItem>
                      <SelectItem value="barcelona">Barcelona</SelectItem>
                      <SelectItem value="valencia">Valencia</SelectItem>
                      <SelectItem value="sevilla">Sevilla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Zona</Label>
                  <Select value={selectedTipoZona} onValueChange={setSelectedTipoZona}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de zona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los tipos</SelectItem>
                      <SelectItem value="parque">Parques</SelectItem>
                      <SelectItem value="costero">Zonas Costeras</SelectItem>
                      <SelectItem value="natural">Espacios Naturales</SelectItem>
                      <SelectItem value="urbano">Zonas Urbanas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Período</Label>
                  <Select defaultValue="7dias">
                    <SelectTrigger>
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Últimas 24h</SelectItem>
                      <SelectItem value="7dias">Últimos 7 días</SelectItem>
                      <SelectItem value="30dias">Últimos 30 días</SelectItem>
                      <SelectItem value="3meses">Últimos 3 meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Intensidad Mínima: {intensidadMinima[0]}%</Label>
                  <Slider
                    value={intensidadMinima}
                    onValueChange={setIntensidadMinima}
                    max={100}
                    step={10}
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mapa de Calor */}
          <Card>
            <CardHeader>
              <CardTitle>Mapa de Calor Global</CardTitle>
              <CardDescription>Densidad de actividad por zonas geográficas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center space-y-2">
                  <Map className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">Heatmap Interactivo</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Aquí se mostraría un mapa de calor interactivo con gradientes de color indicando la densidad de
                    actividad de corredores en diferentes zonas geográficas.
                  </p>
                  <div className="flex gap-2 justify-center pt-4">
                    <Button variant="outline" size="sm">
                      Vista Satélite
                    </Button>
                    <Button variant="outline" size="sm">
                      Vista Terreno
                    </Button>
                    <Button variant="outline" size="sm">
                      Modo 3D
                    </Button>
                  </div>
                </div>
              </div>

              {/* Leyenda del Heatmap */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Intensidad:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-200 rounded" />
                    <span className="text-xs">Baja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded" />
                    <span className="text-xs">Media</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    <span className="text-xs">Alta</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Datos actualizados hace 5 minutos</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zonas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zonas Más Populares</CardTitle>
              <CardDescription>Ranking de ubicaciones con mayor actividad de corredores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {zonasPopulares.map((zona, index) => (
                  <div key={zona.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{zona.nombre}</h4>
                        {getIntensidadBadge(zona.intensidad)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {zona.ciudad}
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          {zona.actividad.toLocaleString()} carreras
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Pico: {zona.horaPico}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Eye className="h-4 w-4" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Map className="h-4 w-4" />
                        Mapa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segmentos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Segmentos KOM (King of the Mountain)</CardTitle>
              <CardDescription>Segmentos competitivos con records y clasificaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segmentosKOM.map((segmento) => (
                  <div key={segmento.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{segmento.nombre}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {segmento.ciudad}
                          </div>
                          <span>{segmento.distancia} km</span>
                          <span>
                            {segmento.elevacion > 0 ? "+" : ""}
                            {segmento.elevacion}m
                          </span>
                        </div>
                      </div>
                      {getDificultadBadge(segmento.dificultad)}
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="bg-accent/10 rounded-lg p-3">
                        <div className="text-sm text-muted-foreground">Record Actual</div>
                        <div className="text-xl font-bold text-accent">{segmento.record}</div>
                        <div className="text-sm text-muted-foreground">por {segmento.recordista}</div>
                      </div>

                      <div className="bg-primary/10 rounded-lg p-3">
                        <div className="text-sm text-muted-foreground">Intentos Totales</div>
                        <div className="text-xl font-bold text-primary">{segmento.intentos}</div>
                        <div className="text-sm text-muted-foreground">esta semana</div>
                      </div>

                      <div className="bg-muted rounded-lg p-3">
                        <div className="text-sm text-muted-foreground">Ritmo Promedio</div>
                        <div className="text-xl font-bold">
                          {Math.floor(
                            ((segmento.distancia * 1000) /
                              (Number.parseInt(segmento.record.split(":")[0]) * 60 +
                                Number.parseInt(segmento.record.split(":")[1]))) *
                              60,
                          )}
                          :
                          {Math.floor(
                            ((((segmento.distancia * 1000) /
                              (Number.parseInt(segmento.record.split(":")[0]) * 60 +
                                Number.parseInt(segmento.record.split(":")[1]))) *
                              60) %
                              1) *
                              60,
                          )
                            .toString()
                            .padStart(2, "0")}
                          /km
                        </div>
                        <div className="text-sm text-muted-foreground">del record</div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Eye className="h-4 w-4" />
                        Ver Clasificación
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Map className="h-4 w-4" />
                        Ver Ruta
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <TrendingUp className="h-4 w-4" />
                        Estadísticas
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analisis" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Análisis Temporal</CardTitle>
                <CardDescription>Patrones de actividad por horarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Madrugada (00-06)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="w-[8%] bg-primary h-2 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mañana (06-12)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="w-[45%] bg-accent h-2 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tarde (12-18)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="w-[22%] bg-chart-3 h-2 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Noche (18-24)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="w-[25%] bg-chart-4 h-2 rounded-full" />
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendencias Semanales</CardTitle>
                <CardDescription>Actividad por días de la semana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((dia, index) => {
                    const porcentajes = [12, 15, 14, 16, 13, 18, 12]
                    return (
                      <div key={dia} className="flex justify-between items-center">
                        <span className="text-sm">{dia}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${porcentajes[index] * 5}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{porcentajes[index]}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Insights y Recomendaciones</CardTitle>
              <CardDescription>Análisis automático de patrones detectados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold text-accent">Oportunidades Detectadas</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                      <span>
                        El Parque del Retiro podría beneficiarse de eventos matutinos adicionales debido a su alta
                        actividad.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                      <span>
                        Las zonas costeras muestran picos de actividad vespertinos, ideales para eventos de atardecer.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                      <span>Los segmentos de montaña tienen baja participación, considerar incentivos especiales.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Alertas de Rendimiento</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                      <span>Disminución del 5% en actividad nocturna en las últimas 2 semanas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                      <span>Algunos segmentos KOM no han tenido intentos en los últimos 7 días.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-2" />
                      <span>Concentración excesiva de actividad en Madrid - diversificar promoción.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
