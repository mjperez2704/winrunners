"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Zap } from "lucide-react"

export default function ConfiguracionSuscripcionesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configuración de Suscripciones</h1>
        <p className="text-muted-foreground mt-1">Ajusta las opciones generales del sistema de suscripciones</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="pagos">Pagos</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="politicas">Políticas</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Opciones básicas del sistema de suscripciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Renovación Automática</Label>
                  <p className="text-sm text-muted-foreground">Renovar suscripciones automáticamente al vencer</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Período de Gracia</Label>
                  <p className="text-sm text-muted-foreground">Días de acceso después del vencimiento</p>
                </div>
                <Input type="number" defaultValue="3" className="w-20 text-center" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Descuentos Activos</Label>
                  <p className="text-sm text-muted-foreground">Permitir códigos de descuento</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Trial Gratuito</Label>
                  <p className="text-sm text-muted-foreground">Ofrecer período de prueba gratuito</p>
                </div>
                <div className="flex items-center gap-3">
                  <Input type="number" defaultValue="7" className="w-20 text-center" />
                  <span className="text-sm text-muted-foreground">días</span>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Moneda Predeterminada</Label>
                <Select defaultValue="eur">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                    <SelectItem value="usd">USD - Dólar Estadounidense</SelectItem>
                    <SelectItem value="mxn">MXN - Peso Mexicano</SelectItem>
                    <SelectItem value="jpy">JPY - Yen Japonés</SelectItem>
                    <SelectItem value="cny">CNY - Yuan Chino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 flex justify-end">
                <Button>Guardar Cambios</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Pagos</CardTitle>
              <CardDescription>Gestiona los métodos de pago y procesadores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Métodos de Pago Aceptados</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Tarjeta de Crédito/Débito</p>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-sm text-muted-foreground">Pagos rápidos con PayPal</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Google Pay</p>
                        <p className="text-sm text-muted-foreground">Pago con Google</p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Apple Pay</p>
                        <p className="text-sm text-muted-foreground">Pago con Apple</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Procesador de Pagos</Label>
                <Select defaultValue="stripe">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="mercadopago">Mercado Pago</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>API Key de Stripe</Label>
                <Input type="password" placeholder="sk_live_..." />
              </div>

              <div className="pt-4 flex justify-end">
                <Button>Guardar Configuración</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones de Suscripciones</CardTitle>
              <CardDescription>Configura cuándo y cómo notificar a los usuarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Recordatorio de Renovación</Label>
                  <p className="text-sm text-muted-foreground">Notificar antes de que venza la suscripción</p>
                </div>
                <div className="flex items-center gap-3">
                  <Input type="number" defaultValue="3" className="w-20 text-center" />
                  <span className="text-sm text-muted-foreground">días antes</span>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Confirmación de Pago</Label>
                  <p className="text-sm text-muted-foreground">Enviar email cuando se procese un pago</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Pago Fallido</Label>
                  <p className="text-sm text-muted-foreground">Alertar cuando falle un pago</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Cambio de Plan</Label>
                  <p className="text-sm text-muted-foreground">Notificar cuando el usuario cambie de plan</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Cancelación de Suscripción</Label>
                  <p className="text-sm text-muted-foreground">Confirmar cuando se cancele una suscripción</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="pt-4 flex justify-end">
                <Button>Guardar Preferencias</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="politicas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Políticas y Términos</CardTitle>
              <CardDescription>Configura las políticas de suscripción y reembolsos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Reembolsos Permitidos</Label>
                  <p className="text-sm text-muted-foreground">Permitir solicitudes de reembolso</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Período de Reembolso</Label>
                  <p className="text-sm text-muted-foreground">Días permitidos para solicitar reembolso</p>
                </div>
                <div className="flex items-center gap-3">
                  <Input type="number" defaultValue="7" className="w-20 text-center" />
                  <span className="text-sm text-muted-foreground">días</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Cancelación Inmediata</Label>
                  <p className="text-sm text-muted-foreground">Permitir cancelar sin esperar al fin del período</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-3">
                <Label>Términos y Condiciones URL</Label>
                <Input placeholder="https://winrunners.com/terminos" />
              </div>

              <div className="space-y-3">
                <Label>Política de Privacidad URL</Label>
                <Input placeholder="https://winrunners.com/privacidad" />
              </div>

              <div className="pt-4 flex justify-end">
                <Button>Guardar Políticas</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
