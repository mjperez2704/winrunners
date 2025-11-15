"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, TrendingUp, Users, Calendar } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const vo2Data = [
  { mes: "Ene", promedio: 42, maximo: 58, minimo: 28 },
  { mes: "Feb", promedio: 43, maximo: 59, minimo: 30 },
  { mes: "Mar", promedio: 44, maximo: 60, minimo: 32 },
  { mes: "Abr", promedio: 46, maximo: 62, minimo: 34 },
  { mes: "May", promedio: 47, maximo: 63, minimo: 35 },
  { mes: "Jun", promedio: 48, maximo: 65, minimo: 36 },
]

const categorias = [
  { nivel: "Elite", rango: "> 55", usuarios: 234, color: "bg-purple-500" },
  { nivel: "Excelente", rango: "50-55", usuarios: 567, color: "bg-blue-500" },
  { nivel: "Bueno", rango: "45-50", usuarios: 1243, color: "bg-green-500" },
  { nivel: "Regular", rango: "40-45", usuarios: 2156, color: "bg-yellow-500" },
  { nivel: "Bajo", rango: "< 40", usuarios: 847, color: "bg-red-500" },
]

export default function VO2MaxPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">VO2 Máx Estimado</h1>
          <p className="text-muted-foreground">Análisis de capacidad aeróbica de los corredores</p>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Generar Reporte
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VO2 Máx Promedio</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47.5 ml/kg/min</div>
            <p className="text-xs text-green-500">+2.3% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Analizados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,047</div>
            <p className="text-xs text-muted-foreground">Con al menos 10 carreras</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mejora Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+8.2%</div>
            <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Análisis Realizados</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23,456</div>
            <p className="text-xs text-green-500">+156 hoy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolución VO2 Máx</CardTitle>
            <CardDescription>Tendencia de los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vo2Data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="promedio" stroke="#3b82f6" strokeWidth={2} name="Promedio" />
                <Line type="monotone" dataKey="maximo" stroke="#10b981" strokeWidth={2} name="Máximo" />
                <Line type="monotone" dataKey="minimo" stroke="#ef4444" strokeWidth={2} name="Mínimo" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Nivel</CardTitle>
            <CardDescription>Clasificación de corredores según VO2 máx</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categorias.map((cat) => (
              <div key={cat.nivel} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                    <span className="font-medium">{cat.nivel}</span>
                    <span className="text-sm text-muted-foreground">({cat.rango} ml/kg/min)</span>
                  </div>
                  <span className="font-bold">{cat.usuarios.toLocaleString()}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${cat.color}`}
                    style={{ width: `${(cat.usuarios / 5047) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros de Análisis</CardTitle>
          <CardDescription>Personaliza el análisis de VO2 máx</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Rango de Edad</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las edades</SelectItem>
                  <SelectItem value="18-25">18-25 años</SelectItem>
                  <SelectItem value="26-35">26-35 años</SelectItem>
                  <SelectItem value="36-45">36-45 años</SelectItem>
                  <SelectItem value="46+">46+ años</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Género</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Nivel de Actividad</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="beginner">Principiante</SelectItem>
                  <SelectItem value="intermediate">Intermedio</SelectItem>
                  <SelectItem value="advanced">Avanzado</SelectItem>
                  <SelectItem value="elite">Elite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Período</Label>
              <Select defaultValue="6m">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Último mes</SelectItem>
                  <SelectItem value="3m">Últimos 3 meses</SelectItem>
                  <SelectItem value="6m">Últimos 6 meses</SelectItem>
                  <SelectItem value="1y">Último año</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button>Aplicar Filtros</Button>
            <Button variant="outline">Limpiar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
