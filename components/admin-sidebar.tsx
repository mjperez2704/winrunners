"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { Users, Trophy, Activity, Bell, Gamepad2, BarChart3, Settings, Menu, X, ChevronRight, Calendar, Zap, Target, Crown, Building2 } from 'lucide-react'

const navigation = [
  {
    name: "Panel de Control",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Usuarios",
    href: "/usuarios",
    icon: Users,
    children: [
      { name: "Gestión de Corredores", href: "/usuarios/corredores" },
      { name: "Perfiles y Objetivos", href: "/usuarios/perfiles" },
      { name: "Moderación Social", href: "/usuarios/moderacion" },
    ],
  },
  {
    name: "Suscripciones",
    href: "/suscripciones",
    icon: Crown,
    children: [
      { name: "Planes", href: "/suscripciones/planes" },
      { name: "Usuarios Suscritos", href: "/suscripciones/usuarios" },
      { name: "Beneficios", href: "/suscripciones/beneficios" },
      { name: "Configuración", href: "/suscripciones/configuracion" },
    ],
  },
  {
    name: "Patrocinadores",
    href: "/patrocinadores",
    icon: Building2,
    children: [
      { name: "Gestión de Patrocinadores", href: "/patrocinadores/gestion" },
      { name: "Premios y Recompensas", href: "/patrocinadores/premios" },
      { name: "Publicidad y Campañas", href: "/patrocinadores/publicidad" },
      { name: "Participación en Retos", href: "/patrocinadores/retos" },
    ],
  },
  {
    name: "Competencias",
    href: "/competencias",
    icon: Trophy,
    children: [
      { name: "Eventos", href: "/competencias/eventos" },
      { name: "Temporadas", href: "/competencias/temporadas" },
      { name: "Ligas y Clasificaciones", href: "/competencias/ligas" },
      { name: "Configuración", href: "/competencias/configuracion" },
    ],
  },
  {
    name: "Tracking",
    href: "/tracking",
    icon: Activity,
    children: [
      { name: "Rutas y Mapas", href: "/tracking/rutas" },
      { name: "Estadísticas", href: "/tracking/estadisticas" },
      { name: "Heatmaps", href: "/tracking/heatmaps" },
    ],
  },
  {
    name: "Gamificación",
    href: "/gamificacion",
    icon: Gamepad2,
    children: [
      { name: "Badges y Logros", href: "/gamificacion/badges" },
      { name: "Desafíos", href: "/gamificacion/desafios" },
      { name: "Recompensas", href: "/gamificacion/recompensas" },
    ],
  },
  {
    name: "Notificaciones",
    href: "/notificaciones",
    icon: Bell,
    children: [
      { name: "Campañas de Eventos", href: "/notificaciones/eventos" },
      { name: "Push", href: "/notificaciones/push" },
    ],
  },
  {
    name: "Análisis",
    href: "/analisis",
    icon: Target,
    children: [
      { name: "Reportes", href: "/analisis/reportes" },
      { name: "Tss", href: "/analisis/tss" },
      { name: "Vo2max", href: "/analisis/vo2max" },
      { name: "Zonas", href: "/analisis/zonas" },
    ],
  },
  {
    name: "Integraciones",
    href: "/integraciones",
    icon: Zap,
    children: [
      { name: "Apple-Health", href: "/integraciones/apple-health" },
      { name: "Google-Fit", href: "/integraciones/google-fit" },
      { name: "Strava", href: "/integraciones/strava" },
      { name: "Validaciones", href: "/integraciones/validaciones" },
    ],
  },
  {
    name: "Configuración",
    href: "/configuracion",
    icon: Settings,
    children: [
      { name: "Administradores", href: "/configuracion/administradores" },
      { name: "General", href: "/configuracion/general" },
      { name: "Sistema", href: "/configuracion/sistema" },
    ],
  },
]

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  const toggleExpanded = (name: string) => {
    setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-card"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center px-2 pt-3 pb-2 border-b border-sidebar-border">
            <div className="relative flex-shrink-0">
              <Image
                src="/logo_win.png"
                alt="WinRunners Logo"
                width={200}
                height={160}
                className="object-contain mb-[-6px]"
              />
            </div>
            {/*<p className="text-xs text-muted-foreground leading-tight mt-[-2px]">Admin Panel</p>*/}
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <div>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-3 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                          pathname.startsWith(item.href) && "bg-sidebar-accent text-sidebar-foreground",
                        )}
                        onClick={() => toggleExpanded(item.name)}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="flex-1 text-left text-sm">{item.name}</span>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 transition-transform flex-shrink-0",
                            expandedItems.includes(item.name) && "rotate-90",
                          )}
                        />
                      </Button>
                      {expandedItems.includes(item.name) && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                  "w-full justify-start text-xs text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                                  pathname === child.href && "bg-sidebar-accent text-sidebar-foreground",
                                )}
                              >
                                {child.name}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-3 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                          pathname === item.href && "bg-sidebar-accent text-sidebar-foreground",
                        )}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{item.name}</span>
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </ScrollArea>

          <div className="px-3 py-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              onClick={handleLogout}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-sm">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </div>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
