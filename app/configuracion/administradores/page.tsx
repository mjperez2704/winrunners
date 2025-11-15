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
import { Users, UserPlus, Shield, Crown, Settings, Trash2 } from 'lucide-react'
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface AdminUser {
  id: string
  email: string
  full_name: string
  role: string
  is_active: boolean
  last_login_at: string | null
  permissions: any
  created_at: string
}

export default function AdministradoresPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [administradores, setAdministradores] = useState<AdminUser[]>([])
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [newAdmin, setNewAdmin] = useState({
    full_name: "",
    email: "",
    role: "moderador"
  })
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    loadAdministradores()
  }, [])

  const loadAdministradores = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAdministradores(data || [])
    } catch (error) {
      console.error('Error loading admins:', error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los administradores",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInvite = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .insert([{
          email: newAdmin.email,
          full_name: newAdmin.full_name,
          role: newAdmin.role,
          is_active: true,
          permissions: getDefaultPermissions(newAdmin.role)
        }])
        .select()

      if (error) throw error

      setIsOpen(false)
      setNewAdmin({ full_name: "", email: "", role: "moderador" })
      await loadAdministradores()
      
      toast({
        title: "Administrador agregado",
        description: "El nuevo administrador ha sido creado exitosamente.",
      })
    } catch (error) {
      console.error('Error adding admin:', error)
      toast({
        title: "Error",
        description: "No se pudo agregar el administrador",
        variant: "destructive"
      })
    }
  }

  const handleEdit = async () => {
    if (!selectedAdmin) return

    try {
      const { error } = await supabase
        .from('admin_users')
        .update({
          full_name: selectedAdmin.full_name,
          email: selectedAdmin.email,
          role: selectedAdmin.role,
          is_active: selectedAdmin.is_active
        })
        .eq('id', selectedAdmin.id)

      if (error) throw error

      setIsEditOpen(false)
      setSelectedAdmin(null)
      await loadAdministradores()
      
      toast({
        title: "Administrador actualizado",
        description: "Los cambios se guardaron exitosamente.",
      })
    } catch (error) {
      console.error('Error updating admin:', error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el administrador",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este administrador?')) return

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id)

      if (error) throw error

      await loadAdministradores()
      
      toast({
        title: "Administrador eliminado",
        description: "El administrador ha sido eliminado del sistema.",
      })
    } catch (error) {
      console.error('Error deleting admin:', error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el administrador",
        variant: "destructive"
      })
    }
  }

  const getDefaultPermissions = (role: string) => {
    switch (role) {
      case 'super_admin':
        return {
          usuarios: { read: true, write: true, delete: true },
          competencias: { read: true, write: true, delete: true },
          tracking: { read: true, write: true, delete: true },
          gamificacion: { read: true, write: true, delete: true },
          suscripciones: { read: true, write: true, delete: true },
          patrocinadores: { read: true, write: true, delete: true },
          configuracion: { read: true, write: true, delete: true }
        }
      case 'admin':
        return {
          usuarios: { read: true, write: true, delete: false },
          competencias: { read: true, write: true, delete: true },
          tracking: { read: true, write: false, delete: false },
          gamificacion: { read: true, write: true, delete: false },
          suscripciones: { read: true, write: true, delete: false },
          patrocinadores: { read: true, write: false, delete: false },
          configuracion: { read: true, write: false, delete: false }
        }
      case 'moderador':
        return {
          usuarios: { read: true, write: true, delete: false },
          competencias: { read: true, write: true, delete: false },
          tracking: { read: true, write: false, delete: false },
          gamificacion: { read: true, write: true, delete: false },
          suscripciones: { read: false, write: false, delete: false },
          patrocinadores: { read: true, write: false, delete: false },
          configuracion: { read: false, write: false, delete: false }
        }
      default:
        return {
          usuarios: { read: true, write: false, delete: false },
          competencias: { read: true, write: false, delete: false },
          tracking: { read: true, write: false, delete: false },
          gamificacion: { read: true, write: false, delete: false },
          suscripciones: { read: true, write: false, delete: false },
          patrocinadores: { read: true, write: false, delete: false },
          configuracion: { read: false, write: false, delete: false }
        }
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin'
      case 'admin': return 'Admin'
      case 'moderador': return 'Moderador'
      case 'soporte': return 'Soporte'
      default: return role
    }
  }

  const getTimeAgo = (date: string | null) => {
    if (!date) return 'Nunca'
    const now = new Date()
    const loginDate = new Date(date)
    const diffMs = now.getTime() - loginDate.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `Hace ${diffMins} min`
    if (diffHours < 24) return `Hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`
    return `Hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`
  }

  const stats = {
    total: administradores.length,
    superAdmin: administradores.filter(a => a.role === 'super_admin').length,
    admin: administradores.filter(a => a.role === 'admin').length,
    moderador: administradores.filter(a => a.role === 'moderador').length
  }

  if (loading) {
    return <div className="p-6">Cargando...</div>
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
                Agrega un nuevo administrador al sistema
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input 
                  id="name" 
                  placeholder="Juan Pérez" 
                  value={newAdmin.full_name}
                  onChange={(e) => setNewAdmin({...newAdmin, full_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="juan@winrunners.com" 
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select 
                  value={newAdmin.role} 
                  onValueChange={(value) => setNewAdmin({...newAdmin, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
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
              <Button onClick={handleInvite}>Agregar Administrador</Button>
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
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Activos en el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Super Admins</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.superAdmin}</div>
            <p className="text-xs text-muted-foreground">Acceso total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.admin}</div>
            <p className="text-xs text-muted-foreground">Gestión completa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moderadores</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.moderador}</div>
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
                      {admin.full_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{admin.full_name}</p>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        admin.role === "super_admin"
                          ? "border-purple-500 text-purple-500"
                          : admin.role === "admin"
                            ? "border-blue-500 text-blue-500"
                            : admin.role === "moderador"
                              ? "border-green-500 text-green-500"
                              : "border-yellow-500 text-yellow-500"
                      }
                    >
                      {admin.role === "super_admin" && <Crown className="mr-1 h-3 w-3" />}
                      {admin.role === "admin" && <Shield className="mr-1 h-3 w-3" />}
                      {admin.role === "moderador" && <Settings className="mr-1 h-3 w-3" />}
                      {getRoleLabel(admin.role)}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{getTimeAgo(admin.last_login_at)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedAdmin(admin)
                        setIsEditOpen(true)
                      }}
                    >
                      Editar
                    </Button>
                    {admin.role !== 'super_admin' && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(admin.id)}
                      >
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

      {/* Dialog de Editar */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Administrador</DialogTitle>
            <DialogDescription>
              Modifica los datos del administrador
            </DialogDescription>
          </DialogHeader>
          {selectedAdmin && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre Completo</Label>
                <Input 
                  id="edit-name" 
                  value={selectedAdmin.full_name}
                  onChange={(e) => setSelectedAdmin({...selectedAdmin, full_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input 
                  id="edit-email" 
                  type="email" 
                  value={selectedAdmin.email}
                  onChange={(e) => setSelectedAdmin({...selectedAdmin, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Rol</Label>
                <Select 
                  value={selectedAdmin.role} 
                  onValueChange={(value) => setSelectedAdmin({...selectedAdmin, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderador">Moderador</SelectItem>
                    <SelectItem value="soporte">Soporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
