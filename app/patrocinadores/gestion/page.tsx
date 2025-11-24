"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Search, Plus, Edit, Trash2, Eye, TrendingUp, DollarSign } from 'lucide-react'

const tierColors = {
  PLATINUM: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  GOLD: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  SILVER: "bg-gray-500/10 text-gray-400 border-gray-500/30",
}

const statusColors = {
  active: "bg-green-500/10 text-green-400 border-green-500/30",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  inactive: "bg-gray-500/10 text-gray-400 border-gray-500/30",
}

export default function GestionPatrocinadoresPage() {
  const [sponsors, setSponsors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTier, setFilterTier] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    async function loadSponsors() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('sponsors')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        
        const mappedData = data?.map(sponsor => ({
          id: sponsor.id,
          name: sponsor.name,
          logo: sponsor.logo_url || '/placeholder.svg',
          tier: sponsor.tier || 'SILVER',
          status: sponsor.is_active ? 'active' : 'inactive',
          investment: `€${(sponsor.total_investment_eur || 0).toLocaleString()}`,
          campaigns: Math.floor(Math.random() * 5) + 1, // Temporal
          participants: Math.floor(Math.random() * 15000), // Temporal
          roi: `+${Math.floor(Math.random() * 200) + 100}%`, // Temporal
          startDate: sponsor.contract_start?.split('T')[0] || '',
          endDate: sponsor.contract_end?.split('T')[0] || ''
        })) || []
        
        setSponsors(mappedData)
      } catch (error) {
        console.error('Error loading sponsors:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadSponsors()
  }, [])

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-muted-foreground">Cargando patrocinadores...</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestión de Patrocinadores</h1>
        <p className="text-muted-foreground">Administra patrocinadores, contratos y relaciones comerciales</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Patrocinadores Activos</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{sponsors.length}</div>
            <p className="text-xs text-green-400 mt-1">Desde base de datos</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inversión Total</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">€0</div>
            <p className="text-xs text-green-400 mt-1">0.00% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Campañas Activas</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0</div>
            <p className="text-xs text-muted-foreground mt-1">En 0 patrocinadores</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ROI Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">+0%</div>
            <p className="text-xs text-green-400 mt-1">Excelente desempeño</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Patrocinadores Registrados</CardTitle>
          <CardDescription>Gestiona la información de todos los patrocinadores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar patrocinadores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-input"
              />
            </div>
            <Select value={filterTier} onValueChange={setFilterTier}>
              <SelectTrigger className="w-full md:w-[180px] bg-background border-input">
                <SelectValue placeholder="Nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los niveles</SelectItem>
                <SelectItem value="PLATINUM">Platinum</SelectItem>
                <SelectItem value="GOLD">Gold</SelectItem>
                <SelectItem value="SILVER">Silver</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px] bg-background border-input">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Patrocinador
            </Button>
          </div>

          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="text-muted-foreground">Patrocinador</TableHead>
                  <TableHead className="text-muted-foreground">Nivel</TableHead>
                  <TableHead className="text-muted-foreground">Estado</TableHead>
                  <TableHead className="text-muted-foreground">Inversión</TableHead>
                  <TableHead className="text-muted-foreground">Campañas</TableHead>
                  <TableHead className="text-muted-foreground">Participantes</TableHead>
                  <TableHead className="text-muted-foreground">ROI</TableHead>
                  <TableHead className="text-muted-foreground">Vigencia</TableHead>
                  <TableHead className="text-muted-foreground text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sponsors.map((sponsor) => (
                  <TableRow key={sponsor.id} className="border-border hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                          <Building2 className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{sponsor.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {sponsor.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={tierColors[sponsor.tier as keyof typeof tierColors]}>
                        {sponsor.tier}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[sponsor.status as keyof typeof statusColors]}>
                        {sponsor.status === "active"
                          ? "Activo"
                          : sponsor.status === "pending"
                            ? "Pendiente"
                            : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{sponsor.investment}</TableCell>
                    <TableCell className="text-foreground">{sponsor.campaigns}</TableCell>
                    <TableCell className="text-foreground">{sponsor.participants.toLocaleString()}</TableCell>
                    <TableCell className="text-green-400 font-medium">{sponsor.roi}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {sponsor.startDate} - {sponsor.endDate}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
