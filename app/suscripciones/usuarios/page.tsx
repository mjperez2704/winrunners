"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Crown, Search, Download, TrendingUp, Calendar, DollarSign } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const usuariosSuscritos = [
  {
    id: 1,
    nombre: "María González",
    email: "maria.g@email.com",
    plan: "PREMIUM",
    inicio: "2024-01-15",
    renovacion: "2025-01-15",
    estado: "activa",
    monto: 29.99,
  },
  {
    id: 2,
    nombre: "Carlos Ruiz",
    email: "carlos.r@email.com",
    plan: "ORO",
    inicio: "2024-03-20",
    renovacion: "2025-03-20",
    estado: "activa",
    monto: 9.99,
  },
  {
    id: 3,
    nombre: "Ana Martínez",
    email: "ana.m@email.com",
    plan: "PLATINUM",
    inicio: "2024-02-10",
    renovacion: "2025-02-10",
    estado: "activa",
    monto: 19.99,
  },
  {
    id: 4,
    nombre: "Luis Fernández",
    email: "luis.f@email.com",
    plan: "PLATA",
    inicio: "2024-05-05",
    renovacion: "2024-12-05",
    estado: "por_vencer",
    monto: 4.99,
  },
  {
    id: 5,
    nombre: "Elena Torres",
    email: "elena.t@email.com",
    plan: "ORO",
    inicio: "2023-11-30",
    renovacion: "2024-11-30",
    estado: "vencida",
    monto: 9.99,
  },
]

const dataIngresos = [
  { mes: "Ene", ingresos: 12450 },
  { mes: "Feb", ingresos: 15680 },
  { mes: "Mar", ingresos: 18920 },
  { mes: "Abr", ingresos: 21340 },
  { mes: "May", ingresos: 24570 },
  { mes: "Jun", ingresos: 28900 },
]

const dataSuscripciones = [
  { mes: "Ene", nuevas: 234, canceladas: 45 },
  { mes: "Feb", nuevas: 289, canceladas: 52 },
  { mes: "Mar", nuevas: 356, canceladas: 48 },
  { mes: "Abr", nuevas: 412, canceladas: 61 },
  { mes: "May", nuevas: 478, canceladas: 55 },
  { mes: "Jun", nuevas: 534, canceladas: 58 },
]

export default function UsuariosSuscritosPage() {
  const [filtroEstado, setFiltroEstado] = useState("todas")
  const [filtroPlan, setFiltroPlan] = useState("todos")

  const getPlanColor = (plan: string) => {
    const colors: Record<string, string> = {
      GRATIS: "bg-gray-500/10 text-gray-400",
      PLATA: "bg-slate-400/10 text-slate-300",
      ORO: "bg-yellow-500/10 text-yellow-400",
      PLATINUM: "bg-cyan-500/10 text-cyan-400",
      PREMIUM: "bg-purple-500/10 text-purple-400",
    }
    return colors[plan] || colors.GRATIS
  }

  const getEstadoBadge = (estado: string) => {
    const estados: Record<string, { variant: any; label: string }> = {
      activa: { variant: "default", label: "Activa" },
      por_vencer: { variant: "secondary", label: "Por Vencer" },
      vencida: { variant: "destructive", label: "Vencida" },
    }
    return estados[estado] || estados.activa
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Usuarios Suscritos</h1>
        <p className="text-muted-foreground mt-1">Gestiona y monitorea las suscripciones activas</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Suscritos</CardTitle>
            <Crown className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,458</div>
            <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +18.2% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€28,900</div>
            <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +21.5% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Por Renovar</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground mt-1">Próximos 7 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasa de Retención</CardTitle>
            <CardDescription>Comparativa de suscripciones mensuales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.2%</div>
            <p className="text-xs text-green-500 mt-1">+2.4% este mes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos Mensuales</CardTitle>
            <CardDescription>Evolución de ingresos por suscripciones</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dataIngresos}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="ingresos" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Nuevas vs Canceladas</CardTitle>
            <CardDescription>Comparativa de suscripciones mensuales</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataSuscripciones}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="nuevas" fill="hsl(var(--primary))" />
                <Bar dataKey="canceladas" fill="hsl(var(--destructive))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Suscripciones</CardTitle>
          <CardDescription>Gestiona las suscripciones de usuarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar por nombre o email..." className="pl-9" />
            </div>
            <Select value={filtroPlan} onValueChange={setFiltroPlan}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los Planes</SelectItem>
                <SelectItem value="GRATIS">GRATIS</SelectItem>
                <SelectItem value="PLATA">PLATA</SelectItem>
                <SelectItem value="ORO">ORO</SelectItem>
                <SelectItem value="PLATINUM">PLATINUM</SelectItem>
                <SelectItem value="PREMIUM">PREMIUM</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="activa">Activas</SelectItem>
                <SelectItem value="por_vencer">Por Vencer</SelectItem>
                <SelectItem value="vencida">Vencidas</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Fecha Inicio</TableHead>
                  <TableHead>Renovación</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuariosSuscritos.map((usuario) => {
                  const estadoInfo = getEstadoBadge(usuario.estado)
                  return (
                    <TableRow key={usuario.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{usuario.nombre}</p>
                          <p className="text-sm text-muted-foreground">{usuario.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPlanColor(usuario.plan)}>{usuario.plan}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{usuario.inicio}</TableCell>
                      <TableCell className="text-sm">{usuario.renovacion}</TableCell>
                      <TableCell className="font-medium">€{usuario.monto}</TableCell>
                      <TableCell>
                        <Badge variant={estadoInfo.variant}>{estadoInfo.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
