"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Trophy, Target, Award, Zap, Star, Crown, Medal, Save, Plus, Trash2 } from "lucide-react"

export default function ConfiguracionPage() {
  const [puntosCarrera, setPuntosCarrera] = useState("100")
  const [puntosKm, setPuntosKm] = useState("10")
  const [puntosRacha, setPuntosRacha] = useState("50")
  const [multiplicadorElite, setMultiplicadorElite] = useState("2.0")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Configuración de Competencias</h1>
        <p className="text-muted-foreground text-pretty">
          Configura el sistema de puntuación, ligas y reglas de competencia
        </p>
      </div>

      <Tabs defaultValue="puntuacion" className="space-y-6">
        <TabsList>
          <TabsTrigger value="puntuacion">Sistema de Puntuación</TabsTrigger>
          <TabsTrigger value="ligas">Configuración de Ligas</TabsTrigger>
          <TabsTrigger value="reglas">Reglas y Criterios</TabsTrigger>
          <TabsTrigger value="premios">Premios y Recompensas</TabsTrigger>
        </TabsList>

        <TabsContent value="puntuacion" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Puntos Base */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Puntos Base
                </CardTitle>
                <CardDescription>Configuración de puntos por actividad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="puntos-carrera">Puntos por Carrera Completada</Label>
                  <Input
                    id="puntos-carrera"
                    type="number"
                    value={puntosCarrera}
                    onChange={(e) => setPuntosCarrera(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Puntos otorgados al completar una carrera</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="puntos-km">Puntos por Kilómetro</Label>
                  <Input id="puntos-km" type="number" value={puntosKm} onChange={(e) => setPuntosKm(e.target.value)} />
                  <p className="text-xs text-muted-foreground">Puntos por cada kilómetro recorrido</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="puntos-racha">Bonus por Racha Diaria</Label>
                  <Input
                    id="puntos-racha"
                    type="number"
                    value={puntosRacha}
                    onChange={(e) => setPuntosRacha(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Puntos adicionales por mantener racha de 7 días</p>
                </div>

                <div className="space-y-2">
                  <Label>Puntos por Objetivo Completado</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Input type="number" placeholder="Diario" defaultValue="25" />
                      <p className="text-xs text-muted-foreground mt-1">Diario</p>
                    </div>
                    <div>
                      <Input type="number" placeholder="Semanal" defaultValue="100" />
                      <p className="text-xs text-muted-foreground mt-1">Semanal</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Multiplicadores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Multiplicadores
                </CardTitle>
                <CardDescription>Bonificaciones por rendimiento y liga</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mult-elite">Multiplicador Liga Élite</Label>
                  <Input
                    id="mult-elite"
                    type="number"
                    step="0.1"
                    value={multiplicadorElite}
                    onChange={(e) => setMultiplicadorElite(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Multiplicador de puntos para Liga Élite</p>
                </div>

                <div className="space-y-2">
                  <Label>Multiplicadores por Liga</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Liga Élite</span>
                      </div>
                      <Input type="number" step="0.1" defaultValue="2.0" className="w-20" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">Liga Diamante</span>
                      </div>
                      <Input type="number" step="0.1" defaultValue="1.5" className="w-20" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Medal className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Liga Oro</span>
                      </div>
                      <Input type="number" step="0.1" defaultValue="1.2" className="w-20" />
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Liga Plata</span>
                      </div>
                      <Input type="number" step="0.1" defaultValue="1.0" className="w-20" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Bonus por Rendimiento</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Nuevo récord personal</span>
                      <Input type="number" defaultValue="200" className="w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Top 10 en carrera</span>
                      <Input type="number" defaultValue="150" className="w-20" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Podio (Top 3)</span>
                      <Input type="number" defaultValue="300" className="w-20" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuración Avanzada */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración Avanzada</CardTitle>
              <CardDescription>Opciones adicionales del sistema de puntuación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Decaimiento de Puntos</Label>
                  <p className="text-sm text-muted-foreground">Los puntos disminuyen si no hay actividad</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bonus por Consistencia</Label>
                  <p className="text-sm text-muted-foreground">Puntos extra por actividad regular</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Penalización por Inactividad</Label>
                  <p className="text-sm text-muted-foreground">Reducir puntos después de 30 días sin actividad</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Bonus por Participación Social</Label>
                  <p className="text-sm text-muted-foreground">Puntos por interacciones en el feed</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Restablecer Valores</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Guardar Configuración
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="ligas" className="space-y-6">
          <div className="grid gap-6">
            {/* Liga Élite */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <Crown className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <CardTitle>Liga Élite</CardTitle>
                      <CardDescription>Los mejores corredores de la temporada</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Activa</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Cupos Disponibles</Label>
                    <Input type="number" defaultValue="50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Puntos Mínimos</Label>
                    <Input type="number" defaultValue="2000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Duración (días)</Label>
                    <Input type="number" defaultValue="90" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Requisitos de Entrada</Label>
                  <Textarea
                    placeholder="Describe los requisitos..."
                    defaultValue="Top 50 en puntuación general de la temporada"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Premios y Beneficios</Label>
                  <Textarea placeholder="Describe los premios..." defaultValue="Trofeo Dorado + €500 en equipamiento" />
                </div>
              </CardContent>
            </Card>

            {/* Liga Diamante */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-400/20">
                      <Star className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <CardTitle>Liga Diamante</CardTitle>
                      <CardDescription>Corredores de alto rendimiento</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-gray-400/20 text-gray-600 border-gray-400/30">Activa</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Cupos Disponibles</Label>
                    <Input type="number" defaultValue="150" />
                  </div>
                  <div className="space-y-2">
                    <Label>Puntos Mínimos</Label>
                    <Input type="number" defaultValue="1500" />
                  </div>
                  <div className="space-y-2">
                    <Label>Duración (días)</Label>
                    <Input type="number" defaultValue="90" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Requisitos de Entrada</Label>
                  <Textarea
                    placeholder="Describe los requisitos..."
                    defaultValue="Top 200 en puntuación general de la temporada"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Premios y Beneficios</Label>
                  <Textarea
                    placeholder="Describe los premios..."
                    defaultValue="Trofeo Plateado + Descuentos Exclusivos + Badge Especial"
                  />
                </div>
              </CardContent>
            </Card>

            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar Nueva Liga
            </Button>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Guardar Cambios
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="reglas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reglas de Competencia</CardTitle>
              <CardDescription>Define las reglas y criterios para las competencias</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Criterios de Validación</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Verificación GPS Obligatoria</Label>
                        <p className="text-sm text-muted-foreground">Todas las carreras deben tener tracking GPS</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Velocidad Máxima Permitida</Label>
                        <p className="text-sm text-muted-foreground">Detectar velocidades anormales</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="25" className="w-20" />
                        <span className="text-sm">km/h</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Distancia Mínima para Puntos</Label>
                        <p className="text-sm text-muted-foreground">Distancia mínima para otorgar puntos</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="1" className="w-20" />
                        <span className="text-sm">km</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Sistema Anti-Trampa</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Detección de Patrones Sospechosos</Label>
                        <p className="text-sm text-muted-foreground">Analizar comportamientos anómalos</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Revisión Manual de Récords</Label>
                        <p className="text-sm text-muted-foreground">Verificar manualmente nuevos récords</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Límite de Carreras Diarias</Label>
                        <p className="text-sm text-muted-foreground">Máximo de carreras por día</p>
                      </div>
                      <Input type="number" defaultValue="5" className="w-20" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Promoción y Descenso</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Promoción Automática</Label>
                        <p className="text-sm text-muted-foreground">Ascender automáticamente al cumplir requisitos</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Descenso por Inactividad</Label>
                        <p className="text-sm text-muted-foreground">Descender después de período de inactividad</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Período de Gracia (días)</Label>
                        <p className="text-sm text-muted-foreground">Días antes de descenso por inactividad</p>
                      </div>
                      <Input type="number" defaultValue="30" className="w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Restablecer</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Guardar Reglas
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="premios" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Premios y Recompensas</CardTitle>
              <CardDescription>Configura los premios para cada liga y logro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      <h3 className="font-semibold">Campeón de Temporada</h3>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Premio Principal</Label>
                      <Input defaultValue="Trofeo Dorado + €500 en equipamiento" />
                    </div>
                    <div className="space-y-2">
                      <Label>Beneficios Adicionales</Label>
                      <Input defaultValue="Membresía Premium 1 año" />
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Medal className="h-5 w-5 text-gray-400" />
                      <h3 className="font-semibold">Top 10 de Temporada</h3>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Premio Principal</Label>
                      <Input defaultValue="Medalla Conmemorativa + €200 en equipamiento" />
                    </div>
                    <div className="space-y-2">
                      <Label>Beneficios Adicionales</Label>
                      <Input defaultValue="Badge Exclusivo + Descuentos" />
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Récord Personal</h3>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Premio Principal</Label>
                      <Input defaultValue="Badge de Récord + 200 puntos bonus" />
                    </div>
                    <div className="space-y-2">
                      <Label>Beneficios Adicionales</Label>
                      <Input defaultValue="Destacado en feed principal" />
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Agregar Nuevo Premio
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Guardar Premios
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
