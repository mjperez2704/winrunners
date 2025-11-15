"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, Search, Plus, Users, Trophy, TrendingUp } from "lucide-react"

const challenges = [
  {
    id: 1,
    sponsor: "Nike Running",
    challenge: "Maratón de Octubre",
    participants: 12847,
    goal: 15000,
    progress: 85.6,
    prizes: 10,
    investment: "€5,000",
    engagement: 94.2,
    status: "active",
    endDate: "2024-10-31",
  },
  {
    id: 2,
    sponsor: "Gatorade",
    challenge: "Desafío Hydration",
    participants: 8432,
    goal: 10000,
    progress: 84.3,
    prizes: 50,
    investment: "€3,000",
    engagement: 91.5,
    status: "active",
    endDate: "2024-09-30",
  },
  {
    id: 3,
    sponsor: "Adidas",
    challenge: "Ultra Trail Challenge",
    participants: 5234,
    goal: 8000,
    progress: 65.4,
    prizes: 5,
    investment: "€4,000",
    engagement: 88.7,
    status: "active",
    endDate: "2024-11-15",
  },
]

export default function RetosPatrocinadoresPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Participación en Retos</h1>
        <p className="text-muted-foreground">Gestiona la participación de patrocinadores en desafíos y competencias</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Retos Patrocinados</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
            <p className="text-xs text-green-400 mt-1">+5 este mes</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Participantes Totales</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">26.5K</div>
            <p className="text-xs text-green-400 mt-1">+18.2% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Premios Entregados</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">65</div>
            <p className="text-xs text-muted-foreground mt-1">En retos completados</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Engagement Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">91.5%</div>
            <p className="text-xs text-green-400 mt-1">Excelente participación</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Retos con Patrocinio</CardTitle>
          <CardDescription>Desafíos patrocinados por empresas con premios y recompensas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar retos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-input"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px] bg-background border-input">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="upcoming">Próximo</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Reto
            </Button>
          </div>

          <div className="space-y-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="bg-muted/30 border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{challenge.challenge}</h3>
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                          Activo
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Patrocinado por {challenge.sponsor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{challenge.investment}</p>
                      <p className="text-xs text-muted-foreground">Inversión total</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Participantes</p>
                      <p className="text-lg font-semibold text-foreground">{challenge.participants.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Meta</p>
                      <p className="text-lg font-semibold text-foreground">{challenge.goal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Premios</p>
                      <p className="text-lg font-semibold text-foreground">{challenge.prizes}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Engagement</p>
                      <p className="text-lg font-semibold text-green-400">{challenge.engagement}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Finaliza</p>
                      <p className="text-lg font-semibold text-foreground">{challenge.endDate}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progreso de participación</span>
                      <span className="font-medium text-foreground">{challenge.progress}%</span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
