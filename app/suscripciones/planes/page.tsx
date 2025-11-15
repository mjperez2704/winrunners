"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Crown, Plus, Edit, Trash2, Check, X, Zap, Star, Sparkles, Gem } from "lucide-react"

const planes = [
  {
    id: 1,
    nombre: "GRATIS",
    precio: 0,
    periodo: "mes",
    usuarios: 8234,
    activo: true,
    color: "gray",
    icon: Crown,
    beneficios: [
      { nombre: "Publicidad", incluido: true, nota: "Anuncios en la app" },
      { nombre: "Recompensas por retos", incluido: true, nota: "Puntos x1" },
      { nombre: "Acceso a competencias", incluido: true, nota: "Solo ligas básicas" },
      { nombre: "Estadísticas básicas", incluido: true },
      { nombre: "Sin ads", incluido: false },
    ],
  },
  {
    id: 2,
    nombre: "PLATA",
    precio: 4.99,
    periodo: "mes",
    usuarios: 2156,
    activo: true,
    color: "slate",
    icon: Zap,
    beneficios: [
      { nombre: "Publicidad reducida", incluido: true, nota: "50% menos ads" },
      { nombre: "Recompensas por retos", incluido: true, nota: "Puntos x1.5" },
      { nombre: "Acceso a competencias", incluido: true, nota: "Todas las ligas" },
      { nombre: "Estadísticas avanzadas", incluido: true },
      { nombre: "Badge exclusivo", incluido: true },
    ],
  },
  {
    id: 3,
    nombre: "ORO",
    precio: 9.99,
    periodo: "mes",
    usuarios: 1423,
    activo: true,
    color: "yellow",
    icon: Star,
    beneficios: [
      { nombre: "Sin publicidad", incluido: true },
      { nombre: "Recompensas por retos", incluido: true, nota: "Puntos x2" },
      { nombre: "Acceso prioritario a eventos", incluido: true },
      { nombre: "Análisis de rendimiento", incluido: true },
      { nombre: "Soporte prioritario", incluido: true },
      { nombre: "Badge ORO exclusivo", incluido: true },
    ],
  },
  {
    id: 4,
    nombre: "PLATINUM",
    precio: 19.99,
    periodo: "mes",
    usuarios: 456,
    activo: true,
    color: "cyan",
    icon: Sparkles,
    beneficios: [
      { nombre: "Sin publicidad", incluido: true },
      { nombre: "Recompensas por retos", incluido: true, nota: "Puntos x2.5" },
      { nombre: "Eventos exclusivos", incluido: true },
      { nombre: "Entrenamiento personalizado", incluido: true },
      { nombre: "Recompensas exclusivas", incluido: true },
      { nombre: "Badge PLATINUM único", incluido: true },
    ],
  },
  {
    id: 5,
    nombre: "PREMIUM",
    precio: 29.99,
    periodo: "mes",
    usuarios: 189,
    activo: true,
    color: "purple",
    icon: Gem,
    beneficios: [
      { nombre: "Sin publicidad", incluido: true },
      { nombre: "Recompensas por retos", incluido: true, nota: "Puntos x3" },
      { nombre: "Todos los eventos", incluido: true, nota: "Acceso VIP" },
      { nombre: "Coach virtual AI", incluido: true },
      { nombre: "Recompensas premium", incluido: true },
      { nombre: "Badge PREMIUM legendario", incluido: true },
      { nombre: "Soporte 24/7", incluido: true },
    ],
  },
]

export default function PlanesPage() {
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      gray: { bg: "bg-gray-500/10", text: "text-gray-400", border: "border-gray-500/20" },
      slate: { bg: "bg-slate-400/10", text: "text-slate-300", border: "border-slate-400/20" },
      yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" },
      cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
      purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    }
    return colors[color] || colors.gray
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Planes de Suscripción</h1>
        <p className="text-muted-foreground mt-1">Gestiona los planes disponibles y sus beneficios</p>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="activos" className="flex-1">
          <TabsList>
            <TabsTrigger value="activos">Planes Activos</TabsTrigger>
            <TabsTrigger value="todos">Todos los Planes</TabsTrigger>
          </TabsList>
        </Tabs>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Crear Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Plan</DialogTitle>
              <DialogDescription>Configura un nuevo plan de suscripción</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre del Plan</Label>
                  <Input placeholder="ej: GOLD" />
                </div>
                <div className="space-y-2">
                  <Label>Precio Mensual</Label>
                  <Input type="number" placeholder="9.99" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Input placeholder="Descripción del plan" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Crear Plan</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {planes.map((plan) => {
          const Icon = plan.icon
          const colors = getColorClasses(plan.color)
          return (
            <Card key={plan.id} className={`${colors.border} border-2 hover:shadow-lg transition-shadow`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${colors.bg}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{plan.nombre}</CardTitle>
                      <CardDescription>{plan.usuarios.toLocaleString()} usuarios</CardDescription>
                    </div>
                  </div>
                  <Badge variant={plan.activo ? "default" : "secondary"}>{plan.activo ? "Activo" : "Inactivo"}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">€{plan.precio}</span>
                    <span className="text-muted-foreground">/{plan.periodo}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Beneficios incluidos:</p>
                  <ul className="space-y-1">
                    {plan.beneficios.slice(0, 4).map((beneficio, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        {beneficio.incluido ? (
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="text-muted-foreground">
                          {beneficio.nombre}
                          {beneficio.nota && <span className="text-xs ml-1">({beneficio.nota})</span>}
                        </span>
                      </li>
                    ))}
                    {plan.beneficios.length > 4 && (
                      <li className="text-sm text-muted-foreground ml-6">
                        +{plan.beneficios.length - 4} beneficios más
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedPlan(plan)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Editar Plan: {plan.nombre}</DialogTitle>
                        <DialogDescription>Modifica los detalles y beneficios del plan</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Nombre del Plan</Label>
                            <Input defaultValue={plan.nombre} />
                          </div>
                          <div className="space-y-2">
                            <Label>Precio</Label>
                            <Input type="number" defaultValue={plan.precio} />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label>Beneficios del Plan</Label>
                          {plan.beneficios.map((beneficio, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 border rounded-lg">
                              <Switch defaultChecked={beneficio.incluido} />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{beneficio.nombre}</p>
                                {beneficio.nota && <p className="text-xs text-muted-foreground">{beneficio.nota}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancelar</Button>
                        <Button>Guardar Cambios</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 bg-transparent">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comparativa de Planes</CardTitle>
          <CardDescription>Vista completa de beneficios por plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Beneficio</th>
                  {planes.map((plan) => (
                    <th key={plan.id} className="text-center py-3 px-4">
                      {plan.nombre}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Precio Mensual</td>
                  {planes.map((plan) => (
                    <td key={plan.id} className="text-center py-3 px-4">
                      €{plan.precio}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Publicidad</td>
                  {planes.map((plan) => (
                    <td key={plan.id} className="text-center py-3 px-4">
                      {plan.nombre === "GRATIS" ? (
                        <span className="text-red-400">Con ads</span>
                      ) : plan.nombre === "PLATA" ? (
                        <span className="text-yellow-400">Reducida</span>
                      ) : (
                        <span className="text-green-400">Sin ads</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Multiplicador de Puntos</td>
                  {planes.map((plan) => (
                    <td key={plan.id} className="text-center py-3 px-4">
                      {plan.nombre === "GRATIS"
                        ? "x1"
                        : plan.nombre === "PLATA"
                          ? "x1.5"
                          : plan.nombre === "ORO"
                            ? "x2"
                            : plan.nombre === "PLATINUM"
                              ? "x2.5"
                              : "x3"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
