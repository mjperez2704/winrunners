"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Heart, TrendingUp, Users } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const zonasData = [
  { zona: "Z1 Recuperación", min: 100, max: 130, usuarios: 1234, tiempo: 45, color: "#3b82f6" },
  { zona: "Z2 Aeróbica", min: 130, max: 150, usuarios: 3456, tiempo: 35, color: "#10b981" },
  { zona: "Z3 Tempo", min: 150, max: 170, usuarios: 2345, tiempo: 15, color: "#f59e0b" },
  { zona: "Z4 Umbral", min: 170, max: 185, usuarios: 1567, tiempo: 8, color: "#ef4444" },
  { zona: "Z5 Máxima", min: 185, max: 200, usuarios: 456, tiempo: 2, color: "#8b5cf6" },
]

const distribucionTiempo = zonasData.map((z) => ({ name: z.zona, value: z.tiempo }))

export default function ZonasPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Zonas de Ritmo y Frecuencia Cardíaca</h1>
          <p className="text-muted-foreground">Análisis de distribución de entrenamiento por zonas</p>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Generar Plan de Entrenamiento
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FC Máxima Promedio</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">185 bpm</div>
            <p className="text-xs text-muted-foreground">Calculado automáticamente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zona Más Usada</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Z2 Aeróbica</div>
            <p className="text-xs text-green-500">35% del tiempo total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Analizados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,058</div>
            <p className="text-xs text-muted-foreground">Con datos de FC</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance Óptimo</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-green-500">Usuarios en rango ideal</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Zonas de FC</CardTitle>
            <CardDescription>Usuarios activos por zona de entrenamiento</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={zonasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zona" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="usuarios" name="Usuarios">
                  {zonasData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tiempo por Zona</CardTitle>
            <CardDescription>Distribución del tiempo de entrenamiento</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribucionTiempo}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name.split(" ")[0]}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distribucionTiempo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={zonasData[index].color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Zonas de Frecuencia Cardíaca</CardTitle>
          <CardDescription>Definición y objetivos de cada zona</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {zonasData.map((zona) => (
              <div key={zona.zona} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: zona.color }} />
                    <h3 className="font-semibold">{zona.zona}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {zona.min}-{zona.max} bpm
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Usuarios activos:</span>
                    <span className="ml-2 font-medium">{zona.usuarios.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">% del tiempo:</span>
                    <span className="ml-2 font-medium">{zona.tiempo}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Beneficio:</span>
                    <span className="ml-2 font-medium">
                      {zona.zona.includes("Z1") && "Recuperación activa"}
                      {zona.zona.includes("Z2") && "Base aeróbica"}
                      {zona.zona.includes("Z3") && "Resistencia"}
                      {zona.zona.includes("Z4") && "Potencia"}
                      {zona.zona.includes("Z5") && "Velocidad máxima"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones de Entrenamiento</CardTitle>
          <CardDescription>Distribución ideal para diferentes objetivos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg space-y-2">
              <h4 className="font-semibold">Base Aeróbica</h4>
              <p className="text-sm text-muted-foreground">Para principiantes</p>
              <div className="space-y-1 text-sm">
                <div>Z1: 30%</div>
                <div>Z2: 50%</div>
                <div>Z3: 15%</div>
                <div>Z4: 5%</div>
                <div>Z5: 0%</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-2">
              <h4 className="font-semibold">Resistencia</h4>
              <p className="text-sm text-muted-foreground">Para intermedios</p>
              <div className="space-y-1 text-sm">
                <div>Z1: 20%</div>
                <div>Z2: 40%</div>
                <div>Z3: 25%</div>
                <div>Z4: 12%</div>
                <div>Z5: 3%</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-2">
              <h4 className="font-semibold">Competición</h4>
              <p className="text-sm text-muted-foreground">Para avanzados</p>
              <div className="space-y-1 text-sm">
                <div>Z1: 15%</div>
                <div>Z2: 35%</div>
                <div>Z3: 25%</div>
                <div>Z4: 18%</div>
                <div>Z5: 7%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
