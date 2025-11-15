"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Download, Mail, Calendar } from "lucide-react"

const reportesRecientes = [
  { nombre: "Reporte Mensual - Marzo 2024", fecha: "01/04/2024", tipo: "PDF", tamano: "2.4 MB" },
  { nombre: "Análisis Trimestral Q1", fecha: "31/03/2024", tipo: "Excel", tamano: "5.8 MB" },
  { nombre: "Estadísticas Semanales", fecha: "25/03/2024", tipo: "PDF", tamano: "1.2 MB" },
]

export default function ReportesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reportes Exportables</h1>
          <p className="text-muted-foreground">Genera y descarga reportes personalizados</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Generar Nuevo Reporte</CardTitle>
            <CardDescription>Configura los parámetros del reporte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Reporte</Label>
              <Select defaultValue="completo">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completo">Reporte Completo</SelectItem>
                  <SelectItem value="usuarios">Solo Usuarios</SelectItem>
                  <SelectItem value="actividad">Solo Actividad</SelectItem>
                  <SelectItem value="rendimiento">Rendimiento</SelectItem>
                  <SelectItem value="financiero">Financiero</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Período</Label>
              <Select defaultValue="mes">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semana">Última semana</SelectItem>
                  <SelectItem value="mes">Último mes</SelectItem>
                  <SelectItem value="trimestre">Último trimestre</SelectItem>
                  <SelectItem value="ano">Último año</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Formato de Exportación</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Secciones a Incluir</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="usuarios" defaultChecked />
                  <label htmlFor="usuarios" className="text-sm cursor-pointer">
                    Estadísticas de Usuarios
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="actividad" defaultChecked />
                  <label htmlFor="actividad" className="text-sm cursor-pointer">
                    Actividad y Carreras
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rendimiento" defaultChecked />
                  <label htmlFor="rendimiento" className="text-sm cursor-pointer">
                    Análisis de Rendimiento (VO2, TSS)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="competencias" />
                  <label htmlFor="competencias" className="text-sm cursor-pointer">
                    Competencias y Ligas
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="gamificacion" />
                  <label htmlFor="gamificacion" className="text-sm cursor-pointer">
                    Gamificación y Badges
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="financiero" />
                  <label htmlFor="financiero" className="text-sm cursor-pointer">
                    Datos Financieros (Suscripciones)
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Nombre del Reporte</Label>
              <Input placeholder="Reporte Mensual - Abril 2024" />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Generar y Descargar
              </Button>
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Enviar por Email
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reportes Programados</CardTitle>
            <CardDescription>Automatiza la generación de reportes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Frecuencia</Label>
              <Select defaultValue="mensual">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diario">Diario</SelectItem>
                  <SelectItem value="semanal">Semanal</SelectItem>
                  <SelectItem value="mensual">Mensual</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Día de Generación</Label>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Primer día del período</SelectItem>
                  <SelectItem value="ultimo">Último día del período</SelectItem>
                  <SelectItem value="15">Día 15</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Destinatarios</Label>
              <Input placeholder="admin@winrunners.com, manager@winrunners.com" />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="auto-envio" />
              <label htmlFor="auto-envio" className="text-sm cursor-pointer">
                Enviar automáticamente por email
              </label>
            </div>

            <Button className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              Programar Reporte
            </Button>

            <div className="pt-4 space-y-2">
              <h4 className="text-sm font-medium">Reportes Activos</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Reporte Mensual Completo</p>
                    <p className="text-xs text-muted-foreground">Cada 1° del mes a las 08:00</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Estadísticas Semanales</p>
                    <p className="text-xs text-muted-foreground">Cada lunes a las 09:00</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reportes Recientes</CardTitle>
          <CardDescription>Historial de reportes generados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reportesRecientes.map((reporte) => (
              <div key={reporte.nombre} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{reporte.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {reporte.fecha} • {reporte.tipo} • {reporte.tamano}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
