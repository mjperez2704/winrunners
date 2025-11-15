import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Obtener badges del usuario
    const { data: userBadges, error: badgesError } = await supabase
      .from("user_badges")
      .select(`
        *,
        badges:badge_id(*)
      `)
      .eq("user_id", user.id)

    if (badgesError) {
      return NextResponse.json({ error: badgesError.message }, { status: 400 })
    }

    // Obtener todos los badges disponibles
    const { data: allBadges, error: allBadgesError } = await supabase.from("badges").select("*").eq("is_active", true)

    if (allBadgesError) {
      return NextResponse.json({ error: allBadgesError.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      unlocked: userBadges,
      available: allBadges,
    })
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}
