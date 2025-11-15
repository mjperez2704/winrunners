"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Activity, TrendingUp, AlertTriangle, Target } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const tssData = [
  { dia: "Lun", tss: 45, carga: 42, forma: 8 },
  { dia: "Mar", tss: 72, carga: 48, forma: 12 },
  { dia: "Mié", tss: 38, carga: 46, forma: 14 },
  { dia: "Jue", tss: 85, carga: 52, forma: 16 },
  { dia: "Vie", tss: 55, carga: 51, forma: 18 },
  { dia: "Sáb", tss: 120, carga: 61, forma: 22 },
  { dia: "Dom", tss: 95, carga: 68, forma: 25 },
]

const cargaSemanal = [
  { semana: "S1", aguda: 320, cronica: 280, ratio: 1.14 },
  { semana: "S2", aguda: 350, cronica: 295, ratio: 1.19 },
  { semana: "S3", aguda: 380, cronica: 315, ratio: 1.21 },
  { semana: "S4", aguda: 420, cronica: 342, ratio: 1.23 },
]

export default function TSSPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training Stress Score (TSS)</h1>
          <p className="text-muted-foreground">Monitoreo de carga de entrenamiento y fatiga</p>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Exportar Análisis
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TSS Promedio Diario</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72.8</div>
            <p className="text-xs text-green-500">+5.2% vs semana anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carga Aguda (7d)</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">420</div>
            <p className="text-xs text-muted-foreground">Rango óptimo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ratio Aguda/Crónica</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.23</div>
            <p className="text-xs text-yellow-500">Zona amarilla - precaución</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios en Riesgo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-red-500">Sobreentrenamiento detectado</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>TSS y Carga de Entrenamiento</CardTitle>
            <CardDescription>Análisis de la última semana</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={tssData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="tss"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  name="TSS Diario"
                />
                <Area
                  type="monotone"
                  dataKey="carga"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.4}
                  name="Carga Acumulada"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ratio Aguda/Crónica</CardTitle>
            <CardDescription>Indicador de riesgo de lesión</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cargaSemanal}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semana" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="aguda"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Carga Aguda (7d)"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="cronica"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Carga Crónica (28d)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="ratio"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Ratio A:C"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">0.8-1.3: Zona óptima</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm">1.3-1.5: Precaución</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm">&gt;1.5: Alto riesgo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertas de Sobreentrenamiento</CardTitle>
          <CardDescription>Usuarios que requieren atención</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { nombre: "Carlos Rodríguez", ratio: 1.68, tss: 520, estado: "Crítico" },
              { nombre: "María González", ratio: 1.54, tss: 480, estado: "Alto" },
              { nombre: "Juan Pérez", ratio: 1.42, tss: 445, estado: "Moderado" },
            ].map((usuario) => (
              <div key={usuario.nombre} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{usuario.nombre}</p>
                  <p className="text-sm text-muted-foreground">
                    Ratio A:C: {usuario.ratio} | TSS Semanal: {usuario.tss}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      usuario.estado === "Crítico"
                        ? "bg-red-500/20 text-red-500"
                        : usuario.estado === "Alto"
                          ? "bg-orange-500/20 text-orange-500"
                          : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {usuario.estado}
                  </span>
                  <Button variant="outline" size="sm">
                    Revisar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Análisis TSS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Período de Análisis</Label>
              <Select defaultValue="4w">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1w">1 semana</SelectItem>
                  <SelectItem value="2w">2 semanas</SelectItem>
                  <SelectItem value="4w">4 semanas</SelectItem>
                  <SelectItem value="12w">12 semanas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Umbral de Alerta</Label>
              <Select defaultValue="1.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.3">1.3 (Conservador)</SelectItem>
                  <SelectItem value="1.5">1.5 (Estándar)</SelectItem>
                  <SelectItem value="1.7">1.7 (Agresivo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Nivel de Usuario</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="beginner">Principiante</SelectItem>
                  <SelectItem value="intermediate">Intermedio</SelectItem>
                  <SelectItem value="advanced">Avanzado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
