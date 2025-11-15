import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET - Obtener amigos
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

    const { data: friendships, error } = await supabase
      .from("friendships")
      .select(`
        *,
        friend:friend_id(id, display_name, avatar_url, country, total_km_run)
      `)
      .eq("user_id", user.id)
      .eq("status", "accepted")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, friends: friendships })
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}

// POST - Enviar solicitud de amistad
export async function POST(request: Request) {
  try {
    const { friendId } = await request.json()
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("friendships")
      .insert({
        user_id: user.id,
        friend_id: friendId,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      friendship: data,
      message: "Solicitud enviada",
    })
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}
