import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30" // días

    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - Number.parseInt(period))

    // Estadísticas de carreras
    const { data: runs, error: runsError } = await supabase
      .from("runs")
      .select("*")
      .eq("user_id", user.id)
      .eq("is_valid", true)
      .gte("started_at", startDate.toISOString())

    if (runsError) {
      return NextResponse.json({ error: runsError.message }, { status: 400 })
    }

    const stats = {
      total_runs: runs.length,
      total_distance_km: runs.reduce((sum, run) => sum + Number.parseFloat(run.distance_km), 0),
      total_time_seconds: runs.reduce((sum, run) => sum + run.duration_seconds, 0),
      average_pace:
        runs.length > 0
          ? runs.reduce((sum, run) => sum + Number.parseFloat(run.average_pace_min_km), 0) / runs.length
          : 0,
      average_distance:
        runs.length > 0 ? runs.reduce((sum, run) => sum + Number.parseFloat(run.distance_km), 0) / runs.length : 0,
      longest_run: Math.max(...runs.map((r) => Number.parseFloat(r.distance_km)), 0),
      fastest_pace: Math.min(...runs.map((r) => Number.parseFloat(r.average_pace_min_km)), 0),
    }

    return NextResponse.json({ success: true, stats, period })
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}
