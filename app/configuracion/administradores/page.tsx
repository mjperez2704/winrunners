"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, UserPlus, Shield, Crown, Settings, Trash2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

const administradores = [
  {
    id: 1,
    nombre: "Admin Principal",
    email: "admin@winrunners.com",
    rol: "Super Admin",
    estado: "Activo",
    ultimoAcceso: "Hace 5 min",
  },
  {
    id: 2,
    nombre: "María González",
    email: "maria.g@winrunners.com",
    rol: "Admin",
    estado: "Activo",
    ultimoAcceso: "Hace 2 horas",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    email: "carlos.r@winrunners.com",
    rol: "Moderador",
    estado: "Activo",
    ultimoAcceso: "Hace 1 día",
  },
  {
    id: 4,
    nombre: "Ana López",
    email: "ana.l@winrunners.com",
    rol: "Soporte",
    estado: "Activo",
    ultimoAcceso: "Hace 3 días",
  },
]

const permisos = [
  { modulo: "Usuarios", lectura: true, escritura: true, eliminacion: false },
  { modulo: "Competencias", lectura: true, escritura: true, eliminacion: true },
  { modulo: "Tracking", lectura: true, escritura: false, eliminacion: false },
  { modulo: "Gamificación", lectura: true, escritura: true, eliminacion: false },
  { modulo: "Suscripciones", lectura: true, escritura: true, eliminacion: false },
  { modulo: "Patrocinadores", lectura: true, escritura: false, eliminacion: false },
  { modulo: "Configuración", lectura: true, escritura: false, eliminacion: false },
]

export default function AdministradoresPage() {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const handleInvite = () => {
    setIsOpen(false)
    toast({
      title: "Invitación enviada",
      description: "Se ha enviado un email de invitación al nuevo administrador.",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Administradores</h1>
          <p className="text-muted-foreground">Controla quién tiene acceso al panel de administración</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invitar Administrador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invitar Nuevo Administrador</DialogTitle>
              <DialogDescription>
                Envía una invitación por email para agregar un nuevo administrador al sistema
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" placeholder="Juan Pérez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="juan@winrunners.com" />
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select defaultValue="moderador">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderador">Moderador</SelectItem>
                    <SelectItem value="soporte">Soporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleInvite}>Enviar Invitación</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Administradores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Activos en el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Acceso total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Gestión completa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moderadores</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Acceso limitado</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Administradores</CardTitle>
          <CardDescription>Todos los usuarios con acceso al panel de administración</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {administradores.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                      {admin.nombre.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{admin.nombre}</p>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        admin.rol === "Super Admin"
                          ? "border-purple-500 text-purple-500"
                          : admin.rol === "Admin"
                            ? "border-blue-500 text-blue-500"
                            : admin.rol === "Moderador"
                              ? "border-green-500 text-green-500"
                              : "border-yellow-500 text-yellow-500"
                      }
                    >
                      {admin.rol === "Super Admin" && <Crown className="mr-1 h-3 w-3" />}
                      {admin.rol === "Admin" && <Shield className="mr-1 h-3 w-3" />}
                      {admin.rol === "Moderador" && <Settings className="mr-1 h-3 w-3" />}
                      {admin.rol}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{admin.ultimoAcceso}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    {admin.id !== 1 && (
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Roles y Permisos</CardTitle>
          <CardDescription>Define los permisos de cada rol de administrador</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Seleccionar Rol</Label>
              <Select defaultValue="admin">
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderador">Moderador</SelectItem>
                  <SelectItem value="soporte">Soporte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4">Módulo</th>
                    <th className="text-center p-4">Lectura</th>
                    <th className="text-center p-4">Escritura</th>
                    <th className="text-center p-4">Eliminación</th>
                  </tr>
                </thead>
                <tbody>
                  {permisos.map((permiso) => (
                    <tr key={permiso.modulo} className="border-t">
                      <td className="p-4 font-medium">{permiso.modulo}</td>
                      <td className="text-center p-4">
                        <input type="checkbox" defaultChecked={permiso.lectura} className="w-4 h-4" />
                      </td>
                      <td className="text-center p-4">
                        <input type="checkbox" defaultChecked={permiso.escritura} className="w-4 h-4" />
                      </td>
                      <td className="text-center p-4">
                        <input type="checkbox" defaultChecked={permiso.eliminacion} className="w-4 h-4" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <Button>Guardar Permisos</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>Últimas acciones de los administradores</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { admin: "Admin Principal", accion: "Modificó configuración general", tiempo: "Hace 5 min" },
              { admin: "María González", accion: "Suspendió usuario #4521", tiempo: "Hace 1 hora" },
              { admin: "Carlos Rodríguez", accion: "Creó nueva competencia", tiempo: "Hace 3 horas" },
              { admin: "Ana López", accion: "Respondió ticket de soporte", tiempo: "Hace 5 horas" },
            ].map((actividad, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{actividad.admin}</p>
                  <p className="text-sm text-muted-foreground">{actividad.accion}</p>
                </div>
                <span className="text-sm text-muted-foreground">{actividad.tiempo}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
