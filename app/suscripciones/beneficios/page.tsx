"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, TrendingUp, Gift, Award, Trophy, Target, Plus, BarChart3 } from "lucide-react"

const beneficiosPorPlan = {
  GRATIS: {
    publicidad: { activo: true, config: "Anuncios completos" },
    multiplicadorPuntos: { activo: true, valor: 1 },
    accesoCompetencias: { activo: true, config: "Solo ligas básicas" },
    estadisticas: { activo: true, config: "Básicas" },
    soporte: { activo: false },
  },
  PLATA: {
    publicidad: { activo: true, config: "50% reducida" },
    multiplicadorPuntos: { activo: true, valor: 1.5 },
    accesoCompetencias: { activo: true, config: "Todas las ligas" },
    estadisticas: { activo: true, config: "Avanzadas" },
    badgeExclusivo: { activo: true },
    soporte: { activo: false },
  },
  ORO: {
    publicidad: { activo: false },
    multiplicadorPuntos: { activo: true, valor: 2 },
    accesoCompetencias: { activo: true, config: "Todas + prioritario" },
    estadisticas: { activo: true, config: "Completas con análisis" },
    badgeExclusivo: { activo: true },
    soporte: { activo: true, config: "Prioritario" },
  },
  PLATINUM: {
    publicidad: { activo: false },
    multiplicadorPuntos: { activo: true, valor: 2.5 },
    accesoCompetencias: { activo: true, config: "Todas + eventos exclusivos" },
    estadisticas: { activo: true, config: "Completas + IA" },
    entrenamiento: { activo: true, config: "Personalizado" },
    recompensas: { activo: true, config: "Exclusivas" },
    badgeExclusivo: { activo: true },
    soporte: { activo: true, config: "Prioritario" },
  },
  PREMIUM: {
    publicidad: { activo: false },
    multiplicadorPuntos: { activo: true, valor: 3 },
    accesoCompetencias: { activo: true, config: "VIP total" },
    estadisticas: { activo: true, config: "Completas + IA avanzada" },
    entrenamiento: { activo: true, config: "Coach virtual AI" },
    recompensas: { activo: true, config: "Premium legendarias" },
    badgeExclusivo: { activo: true },
    soporte: { activo: true, config: "24/7" },
  },
}

export default function BeneficiosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gestión de Beneficios</h1>
        <p className="text-muted-foreground mt-1">Configura los beneficios de cada plan de suscripción</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Beneficios Activos</CardTitle>
            <Check className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground mt-1">En todos los planes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recompensas Canjeadas</CardTitle>
            <Gift className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,456</div>
            <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              +15.3% este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Badges Otorgados</CardTitle>
            <Award className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,234</div>
            <p className="text-xs text-muted-foreground mt-1">Badges exclusivos</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="publicidad" className="space-y-4">
        <TabsList>
          <TabsTrigger value="publicidad">Publicidad</TabsTrigger>
          <TabsTrigger value="puntos">Puntos y Recompensas</TabsTrigger>
          <TabsTrigger value="acceso">Acceso y Funciones</TabsTrigger>
          <TabsTrigger value="badges">Badges Exclusivos</TabsTrigger>
        </TabsList>

        <TabsContent value="publicidad" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Publicidad por Plan</CardTitle>
              <CardDescription>Define qué planes tienen publicidad y con qué frecuencia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(beneficiosPorPlan).map(([plan, beneficios]) => (
                <div key={plan} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{plan}</h3>
                      <Badge variant={beneficios.publicidad.activo ? "destructive" : "default"}>
                        {beneficios.publicidad.activo ? "Con Publicidad" : "Sin Publicidad"}
                      </Badge>
                    </div>
                    {beneficios.publicidad.config && (
                      <p className="text-sm text-muted-foreground">{beneficios.publicidad.config}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch checked={!beneficios.publicidad.activo} />
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="puntos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Multiplicadores de Puntos</CardTitle>
              <CardDescription>Configura cuántos puntos ganan los usuarios por completar retos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(beneficiosPorPlan).map(([plan, beneficios]) => (
                <div key={plan} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">{plan}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Los usuarios ganan puntos multiplicados por {beneficios.multiplicadorPuntos.valor}x
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        step="0.1"
                        defaultValue={beneficios.multiplicadorPuntos.valor}
                        className="w-20 text-center"
                      />
                      <span className="text-sm text-muted-foreground">x</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Guardar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recompensas Exclusivas</CardTitle>
                  <CardDescription>Recompensas especiales disponibles por plan</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Agregar Recompensa
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["ORO", "PLATINUM", "PREMIUM"].map((plan) => (
                  <div key={plan} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Gift className="w-5 h-5 text-primary" />
                        <div>
                          <h4 className="font-medium">{plan}</h4>
                          <p className="text-sm text-muted-foreground">
                            {plan === "ORO"
                              ? "Acceso a recompensas premium"
                              : plan === "PLATINUM"
                                ? "Recompensas exclusivas + descuentos"
                                : "Recompensas legendarias + beneficios VIP"}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Gestionar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="acceso" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Acceso a Competencias y Eventos</CardTitle>
              <CardDescription>Define qué eventos y competencias pueden acceder por plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(beneficiosPorPlan).map(([plan, beneficios]) => (
                <div key={plan} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">{plan}</h3>
                    </div>
                    <Badge>{beneficios.accesoCompetencias.config}</Badge>
                  </div>
                  <div className="grid gap-2 ml-8">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Ligas regulares</span>
                    </div>
                    {plan !== "GRATIS" && (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Torneos especiales</span>
                      </div>
                    )}
                    {(plan === "ORO" || plan === "PLATINUM" || plan === "PREMIUM") && (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Acceso prioritario a eventos</span>
                      </div>
                    )}
                    {(plan === "PLATINUM" || plan === "PREMIUM") && (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Eventos exclusivos</span>
                      </div>
                    )}
                    {plan === "PREMIUM" && (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Acceso VIP total</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estadísticas y Análisis</CardTitle>
              <CardDescription>Nivel de acceso a estadísticas según el plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(beneficiosPorPlan).map(([plan, beneficios]) => (
                <div key={plan} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-medium">{plan}</h4>
                      <p className="text-sm text-muted-foreground">{beneficios.estadisticas.config}</p>
                    </div>
                  </div>
                  <Switch checked={beneficios.estadisticas.activo} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Badges Exclusivos por Plan</CardTitle>
                  <CardDescription>Badges especiales que obtienen los usuarios según su suscripción</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Crear Badge
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {["PLATA", "ORO", "PLATINUM", "PREMIUM"].map((plan) => (
                  <div key={plan} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          plan === "PLATA"
                            ? "bg-slate-500/20"
                            : plan === "ORO"
                              ? "bg-yellow-500/20"
                              : plan === "PLATINUM"
                                ? "bg-cyan-500/20"
                                : "bg-purple-500/20"
                        }`}
                      >
                        <Award
                          className={`w-6 h-6 ${
                            plan === "PLATA"
                              ? "text-slate-300"
                              : plan === "ORO"
                                ? "text-yellow-400"
                                : plan === "PLATINUM"
                                  ? "text-cyan-400"
                                  : "text-purple-400"
                          }`}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">Badge {plan}</h4>
                        <p className="text-xs text-muted-foreground">Visible en perfil</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">8,234 otorgados</span>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
