"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Monitor, Search, Plus, MousePointerClick, TrendingUp } from "lucide-react"

const campaigns = [
  {
    id: 1,
    sponsor: "Nike Running",
    name: "Campaña Otoño 2024",
    type: "banner",
    placement: "feed",
    impressions: 245000,
    clicks: 8430,
    ctr: 3.44,
    budget: "€5,000",
    spent: "€3,245",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
  },
  {
    id: 2,
    sponsor: "Gatorade",
    name: "Hydration Challenge Promo",
    type: "video",
    placement: "pre-run",
    impressions: 128000,
    clicks: 5120,
    ctr: 4.0,
    budget: "€3,000",
    spent: "€2,100",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2024-11-30",
  },
  {
    id: 3,
    sponsor: "Adidas",
    name: "Ultraboost Launch",
    type: "native",
    placement: "stats",
    impressions: 189000,
    clicks: 6804,
    ctr: 3.6,
    budget: "€4,000",
    spent: "€2,800",
    status: "active",
    startDate: "2024-01-20",
    endDate: "2024-12-31",
  },
]

const typeColors = {
  banner: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  video: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  native: "bg-green-500/10 text-green-400 border-green-500/30",
}

export default function PublicidadPatrocinadoresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Publicidad y Campañas</h1>
        <p className="text-muted-foreground">Configura y monitorea las campañas publicitarias de los patrocinadores</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Impresiones Totales</CardTitle>
            <Monitor className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">562K</div>
            <p className="text-xs text-green-400 mt-1">+15.2% esta semana</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clicks Totales</CardTitle>
            <MousePointerClick className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">20.4K</div>
            <p className="text-xs text-green-400 mt-1">+8.7% esta semana</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">CTR Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3.63%</div>
            <p className="text-xs text-green-400 mt-1">Por encima del promedio</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Presupuesto Gastado</CardTitle>
            <CardDescription>Ver el presupuesto gastado en campañas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">€8.1K</div>
            <p className="text-xs text-muted-foreground mt-1">De €12K total</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Campañas Publicitarias</CardTitle>
          <CardDescription>Gestiona las campañas de publicidad de los patrocinadores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar campañas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-input"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px] bg-background border-input">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="banner">Banner</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="native">Nativo</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Campaña
            </Button>
          </div>

          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="text-muted-foreground">Campaña</TableHead>
                  <TableHead className="text-muted-foreground">Patrocinador</TableHead>
                  <TableHead className="text-muted-foreground">Tipo</TableHead>
                  <TableHead className="text-muted-foreground">Ubicación</TableHead>
                  <TableHead className="text-muted-foreground">Impresiones</TableHead>
                  <TableHead className="text-muted-foreground">Clicks</TableHead>
                  <TableHead className="text-muted-foreground">CTR</TableHead>
                  <TableHead className="text-muted-foreground">Presupuesto</TableHead>
                  <TableHead className="text-muted-foreground">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id} className="border-border hover:bg-muted/30">
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{campaign.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {campaign.startDate} - {campaign.endDate}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{campaign.sponsor}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={typeColors[campaign.type as keyof typeof typeColors]}>
                        {campaign.type === "banner" ? "Banner" : campaign.type === "video" ? "Video" : "Nativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground capitalize">{campaign.placement}</TableCell>
                    <TableCell className="text-foreground">{campaign.impressions.toLocaleString()}</TableCell>
                    <TableCell className="text-foreground">{campaign.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-green-400 font-medium">{campaign.ctr}%</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{campaign.spent}</span>
                          <span className="text-muted-foreground">{campaign.budget}</span>
                        </div>
                        <Progress
                          value={
                            (Number.parseFloat(campaign.spent.replace(/[€,]/g, "")) /
                              Number.parseFloat(campaign.budget.replace(/[€,]/g, ""))) *
                            100
                          }
                          className="h-1"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                        Activa
                      </Badge>
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
