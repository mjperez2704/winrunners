import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const seasonId = searchParams.get("season_id")
    const leagueId = searchParams.get("league_id")
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    const supabase = await createClient()

    let query = supabase
      .from("leaderboard")
      .select(`
        *,
        profiles:user_id(display_name, avatar_url, country)
      `)
      .order("points", { ascending: false })
      .limit(limit)

    if (seasonId) {
      query = query.eq("season_id", seasonId)
    }

    if (leagueId) {
      query = query.eq("league_id", leagueId)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, leaderboard: data })
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}
