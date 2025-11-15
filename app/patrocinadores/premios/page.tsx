"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Gift, Search, Plus, Trophy, Package, DollarSign, Users } from "lucide-react"

const prizes = [
  {
    id: 1,
    sponsor: "Nike Running",
    prize: "Nike Air Zoom Pegasus 40",
    type: "physical",
    value: "€150",
    quantity: 10,
    claimed: 7,
    challenge: "Maratón de Octubre",
    status: "active",
  },
  {
    id: 2,
    sponsor: "Gatorade",
    challenge: "Desafío Hydration",
    prize: "Pack Gatorade Premium",
    type: "physical",
    value: "€50",
    quantity: 50,
    claimed: 32,
    status: "active",
  },
  {
    id: 3,
    sponsor: "Adidas",
    challenge: "Ultra Trail Challenge",
    prize: "Adidas Ultraboost 23",
    type: "physical",
    value: "€180",
    quantity: 5,
    claimed: 3,
    status: "active",
  },
  {
    id: 4,
    sponsor: "PowerBar",
    challenge: "Reto Energético",
    prize: "Cupón €25 PowerBar",
    type: "voucher",
    value: "€25",
    quantity: 100,
    claimed: 64,
    status: "active",
  },
]

const typeColors = {
  physical: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  voucher: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  discount: "bg-green-500/10 text-green-400 border-green-500/30",
}

export default function PremiosPatrocinadoresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Premios y Recompensas</h1>
        <p className="text-muted-foreground">
          Gestiona los premios que ofrecen los patrocinadores en retos y competencias
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Premios Disponibles</CardTitle>
            <Gift className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">165</div>
            <p className="text-xs text-muted-foreground mt-1">En 23 retos activos</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Premios Reclamados</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">106</div>
            <p className="text-xs text-green-400 mt-1">64.2% tasa de reclamación</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">€24.5K</div>
            <p className="text-xs text-muted-foreground mt-1">En premios activos</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Participantes</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8,432</div>
            <p className="text-xs text-green-400 mt-1">+12% esta semana</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Catálogo de Premios</CardTitle>
          <CardDescription>Premios ofrecidos por patrocinadores en retos y competencias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar premios..."
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
                <SelectItem value="physical">Físico</SelectItem>
                <SelectItem value="voucher">Cupón</SelectItem>
                <SelectItem value="discount">Descuento</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Premio
            </Button>
          </div>

          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="text-muted-foreground">Premio</TableHead>
                  <TableHead className="text-muted-foreground">Patrocinador</TableHead>
                  <TableHead className="text-muted-foreground">Reto/Competencia</TableHead>
                  <TableHead className="text-muted-foreground">Tipo</TableHead>
                  <TableHead className="text-muted-foreground">Valor</TableHead>
                  <TableHead className="text-muted-foreground">Disponibles</TableHead>
                  <TableHead className="text-muted-foreground">Reclamados</TableHead>
                  <TableHead className="text-muted-foreground">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prizes.map((prize) => (
                  <TableRow key={prize.id} className="border-border hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Package className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{prize.prize}</p>
                          <p className="text-xs text-muted-foreground">ID: {prize.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{prize.sponsor}</TableCell>
                    <TableCell className="text-foreground">{prize.challenge}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={typeColors[prize.type as keyof typeof typeColors]}>
                        {prize.type === "physical" ? "Físico" : prize.type === "voucher" ? "Cupón" : "Descuento"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{prize.value}</TableCell>
                    <TableCell className="text-foreground">{prize.quantity - prize.claimed}</TableCell>
                    <TableCell className="text-foreground">{prize.claimed}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                        Activo
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
