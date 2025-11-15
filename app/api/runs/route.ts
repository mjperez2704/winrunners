import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET - Obtener carreras del usuario
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const {
      data: runs,
      error,
      count,
    } = await supabase
      .from("runs")
      .select("*", { count: "exact" })
      .eq("user_id", user.id)
      .order("started_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, runs, total: count })
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}

// POST - Crear nueva carrera
export async function POST(request: Request) {
  try {
    const runData = await request.json()
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Calcular métricas automáticas
    const averageSpeedKmH = (runData.distance_km / runData.duration_seconds) * 3600
    const averagePaceMinKm = runData.duration_seconds / 60 / runData.distance_km

    const { data, error } = await supabase
      .from("runs")
      .insert({
        ...runData,
        user_id: user.id,
        average_speed_km_h: averageSpeedKmH,
        average_pace_min_km: averagePaceMinKm,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      run: data,
      message: "Carrera registrada exitosamente",
    })
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}
