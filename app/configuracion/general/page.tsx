"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Save, Globe, Mail, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GeneralPage() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "Los cambios se han aplicado correctamente.",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configuración General</h1>
          <p className="text-muted-foreground">Ajustes globales de la aplicación</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Información de la Aplicación
            </CardTitle>
            <CardDescription>Datos básicos de WinRunners</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="app-name">Nombre de la Aplicación</Label>
                <Input id="app-name" defaultValue="WinRunners" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="app-version">Versión</Label>
                <Input id="app-version" defaultValue="2.4.1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="app-description">Descripción</Label>
              <Textarea
                id="app-description"
                defaultValue="La app de running número 1 para corredores competitivos"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" defaultValue="WinRunners Inc." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Configuración Regional
            </CardTitle>
            <CardDescription>Idioma, zona horaria y formato</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Idioma Predeterminado</Label>
                <Select defaultValue="es">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Zona Horaria</Label>
                <Select defaultValue="utc">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                    <SelectItem value="est">EST (GMT-5)</SelectItem>
                    <SelectItem value="pst">PST (GMT-8)</SelectItem>
                    <SelectItem value="cet">CET (GMT+1)</SelectItem>
                    <SelectItem value="jst">JST (GMT+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sistema de Medición</Label>
                <Select defaultValue="metric">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Métrico (km)</SelectItem>
                    <SelectItem value="imperial">Imperial (millas)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Formato de Fecha</Label>
                <Select defaultValue="dmy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Configuración de Email
            </CardTitle>
            <CardDescription>Servidor SMTP y correos del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">Servidor SMTP</Label>
                <Input id="smtp-host" defaultValue="smtp.gmail.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-port">Puerto</Label>
                <Input id="smtp-port" type="number" defaultValue="587" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-user">Usuario</Label>
                <Input id="smtp-user" defaultValue="noreply@winrunners.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-pass">Contraseña</Label>
                <Input id="smtp-pass" type="password" defaultValue="••••••••" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="from-email">Email de Remitente</Label>
              <Input id="from-email" defaultValue="noreply@winrunners.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-email">Email de Soporte</Label>
              <Input id="support-email" defaultValue="support@winrunners.com" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Usar SSL/TLS</Label>
                <p className="text-sm text-muted-foreground">Conexión segura con el servidor</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Button variant="outline">Enviar Email de Prueba</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades de la Aplicación</CardTitle>
            <CardDescription>Habilitar o deshabilitar características</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Registro de Nuevos Usuarios</Label>
                <p className="text-sm text-muted-foreground">Permitir crear nuevas cuentas</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Feed Social</Label>
                <p className="text-sm text-muted-foreground">Interacciones entre usuarios</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo Mantenimiento</Label>
                <p className="text-sm text-muted-foreground">Mostrar mensaje de mantenimiento a usuarios</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Exportación de Datos</Label>
                <p className="text-sm text-muted-foreground">Permitir que usuarios exporten sus datos</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo Oscuro Forzado</Label>
                <p className="text-sm text-muted-foreground">Aplicar tema oscuro a todos los usuarios</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Límites y Restricciones
            </CardTitle>
            <CardDescription>Configuración de límites del sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="max-runs-day">Máximo de carreras por día</Label>
                <Input id="max-runs-day" type="number" defaultValue="10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-file-size">Tamaño máximo de archivo (MB)</Label>
                <Input id="max-file-size" type="number" defaultValue="50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Tiempo de sesión (minutos)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-rate-limit">Límite de API (req/min)</Label>
                <Input id="api-rate-limit" type="number" defaultValue="100" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Restablecer Valores</Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Guardar Todos los Cambios
          </Button>
        </div>
      </div>
    </div>
  )
}
