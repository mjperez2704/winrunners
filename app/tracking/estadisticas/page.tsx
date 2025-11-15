"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Activity, Clock, TrendingUp, Zap, Download } from "lucide-react"

// Datos de ejemplo para gráficas
const datosDistanciaSemanal = [
  { dia: "Lun", km: 2847 },
  { dia: "Mar", km: 3156 },
  { dia: "Mié", km: 2934 },
  { dia: "Jue", km: 3421 },
  { dia: "Vie", km: 2789 },
  { dia: "Sáb", km: 4567 },
  { dia: "Dom", km: 3892 },
]

const datosRitmoPromedio = [
  { mes: "Ene", ritmo: 4.2 },
  { mes: "Feb", ritmo: 4.1 },
  { mes: "Mar", ritmo: 4.0 },
  { mes: "Abr", ritmo: 3.9 },
  { mes: "May", ritmo: 3.8 },
  { mes: "Jun", ritmo: 3.9 },
]

const datosDistribucionDistancias = [
  { rango: "0-5km", cantidad: 3247, color: "#3b82f6" },
  { rango: "5-10km", cantidad: 2156, color: "#10b981" },
  { rango: "10-15km", cantidad: 1234, color: "#f59e0b" },
  { rango: "15-20km", cantidad: 567, color: "#ef4444" },
  { rango: "20km+", cantidad: 234, color: "#8b5cf6" },
]

const datosActividad24h = [
  { hora: "00", carreras: 12 },
  { hora: "01", carreras: 8 },
  { hora: "02", carreras: 5 },
  { hora: "03", carreras: 3 },
  { hora: "04", carreras: 7 },
  { hora: "05", carreras: 45 },
  { hora: "06", carreras: 234 },
  { hora: "07", carreras: 456 },
  { hora: "08", carreras: 345 },
  { hora: "09", carreras: 234 },
  { hora: "10", carreras: 123 },
  { hora: "11", carreras: 89 },
  { hora: "12", carreras: 67 },
  { hora: "13", carreras: 78 },
  { hora: "14", carreras: 89 },
  { hora: "15", carreras: 123 },
  { hora: "16", carreras: 156 },
  { hora: "17", carreras: 234 },
  { hora: "18", carreras: 345 },
  { hora: "19", carreras: 456 },
  { hora: "20", carreras: 234 },
  { hora: "21", carreras: 123 },
  { hora: "22", carreras: 67 },
  { hora: "23", carreras: 34 },
]

export default function EstadisticasPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Estadísticas y Métricas</h1>
          <p className="text-muted-foreground text-pretty">
            Análisis detallado del rendimiento y actividad de los corredores
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7dias">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24h</SelectItem>
              <SelectItem value="7dias">Últimos 7 días</SelectItem>
              <SelectItem value="30dias">Últimos 30 días</SelectItem>
              <SelectItem value="3meses">Últimos 3 meses</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distancia Total</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23,456 km</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+15.2%</span> vs semana anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847h</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+8.7%</span> vs semana anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ritmo Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4:12/km</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">-0:05</span> mejora vs semana anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calorías Quemadas</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+12.3%</span> vs semana anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">Vista General</TabsTrigger>
          <TabsTrigger value="rendimiento">Rendimiento</TabsTrigger>
          <TabsTrigger value="actividad">Patrones de Actividad</TabsTrigger>
          <TabsTrigger value="comparativas">Comparativas</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Distancia Semanal */}
            <Card>
              <CardHeader>
                <CardTitle>Distancia por Día</CardTitle>
                <CardDescription>Kilómetros totales recorridos esta semana</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={datosDistanciaSemanal}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="dia" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="km" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribución de Distancias */}
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Distancia</CardTitle>
                <CardDescription>Carreras agrupadas por rango de distancia</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={datosDistribucionDistancias}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="cantidad"
                    >
                      {datosDistribucionDistancias.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {datosDistribucionDistancias.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.rango}</span>
                      <span className="text-muted-foreground">({item.cantidad})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actividad 24h */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad por Hora</CardTitle>
              <CardDescription>Distribución de carreras a lo largo del día</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={datosActividad24h}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="hora" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="carreras"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent))"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rendimiento" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Evolución del Ritmo */}
            <Card>
              <CardHeader>
                <CardTitle>Evolución del Ritmo</CardTitle>
                <CardDescription>Ritmo promedio mensual de la comunidad</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={datosRitmoPromedio}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="mes" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ritmo"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Métricas de Rendimiento */}
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Rendimiento</CardTitle>
                <CardDescription>Indicadores clave de la comunidad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mejora de Ritmo Promedio</span>
                    <span className="font-medium text-accent">+8.2%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Consistencia de Entrenamientos</span>
                    <span className="font-medium text-primary">94.5%</span>
                  </div>
                  <Progress value={94.5} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cumplimiento de Objetivos</span>
                    <span className="font-medium text-chart-4">76.3%</span>
                  </div>
                  <Progress value={76.3} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Retención de Usuarios</span>
                    <span className="font-medium text-accent">89.1%</span>
                  </div>
                  <Progress value={89.1} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Records y Logros */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Records Semanales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mejor 5K</span>
                  <Badge className="bg-accent/20 text-accent border-accent/30">15:23</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mejor 10K</span>
                  <Badge className="bg-accent/20 text-accent border-accent/30">31:45</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mejor Maratón</span>
                  <Badge className="bg-accent/20 text-accent border-accent/30">2:18:34</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mayor Distancia</span>
                  <Badge className="bg-accent/20 text-accent border-accent/30">87.2 km</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Estadísticas Avanzadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">VO2 Max Promedio</span>
                  <span className="font-medium">52.3 ml/kg/min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">FC Promedio</span>
                  <span className="font-medium">145 bpm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cadencia Promedio</span>
                  <span className="font-medium">178 spm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Elevación Total</span>
                  <span className="font-medium">234,567 m</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tendencias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Velocidad Promedio</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <span className="text-sm text-accent">+2.1%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Distancia Semanal</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <span className="text-sm text-accent">+15.3%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tiempo de Actividad</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <span className="text-sm text-accent">+8.7%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Usuarios Activos</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <span className="text-sm text-accent">+12.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="actividad" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Patrones de Uso</CardTitle>
                <CardDescription>Análisis de comportamiento de los usuarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Usuarios Matutinos (5-9 AM)</span>
                    <span className="font-medium">42.3%</span>
                  </div>
                  <Progress value={42.3} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Usuarios Vespertinos (17-21 PM)</span>
                    <span className="font-medium">35.7%</span>
                  </div>
                  <Progress value={35.7} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Usuarios Nocturnos (21-24 PM)</span>
                    <span className="font-medium">15.2%</span>
                  </div>
                  <Progress value={15.2} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Otros Horarios</span>
                    <span className="font-medium">6.8%</span>
                  </div>
                  <Progress value={6.8} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frecuencia de Entrenamientos</CardTitle>
                <CardDescription>Distribución semanal de actividad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">3.2</div>
                    <div className="text-sm text-muted-foreground">Carreras/semana promedio</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">67%</div>
                    <div className="text-sm text-muted-foreground">Usuarios regulares</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">1-2 veces/semana</span>
                    <Badge variant="secondary">23%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">3-4 veces/semana</span>
                    <Badge className="bg-primary/20 text-primary border-primary/30">44%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">5+ veces/semana</span>
                    <Badge className="bg-accent/20 text-accent border-accent/30">33%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparativas" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Por Nivel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Principiante</span>
                  <div className="text-right">
                    <div className="font-medium">5:30/km</div>
                    <div className="text-xs text-muted-foreground">2,847 usuarios</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Intermedio</span>
                  <div className="text-right">
                    <div className="font-medium">4:15/km</div>
                    <div className="text-xs text-muted-foreground">4,523 usuarios</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avanzado</span>
                  <div className="text-right">
                    <div className="font-medium">3:45/km</div>
                    <div className="text-xs text-muted-foreground">1,234 usuarios</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Por Edad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">18-25 años</span>
                  <div className="text-right">
                    <div className="font-medium">4:05/km</div>
                    <div className="text-xs text-muted-foreground">1,567 usuarios</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">26-35 años</span>
                  <div className="text-right">
                    <div className="font-medium">4:12/km</div>
                    <div className="text-xs text-muted-foreground">3,234 usuarios</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">36-45 años</span>
                  <div className="text-right">
                    <div className="font-medium">4:25/km</div>
                    <div className="text-xs text-muted-foreground">2,456 usuarios</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">45+ años</span>
                  <div className="text-right">
                    <div className="font-medium">4:45/km</div>
                    <div className="text-xs text-muted-foreground">1,347 usuarios</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Por Género</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Hombres</span>
                  <div className="text-right">
                    <div className="font-medium">4:08/km</div>
                    <div className="text-xs text-muted-foreground">4,567 usuarios</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Mujeres</span>
                  <div className="text-right">
                    <div className="font-medium">4:18/km</div>
                    <div className="text-xs text-muted-foreground">4,037 usuarios</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Distribución</div>
                    <div className="flex justify-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <span className="text-sm">53% H</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent rounded-full" />
                        <span className="text-sm">47% M</span>
                      </div>
                    </div>
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
