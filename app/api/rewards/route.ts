import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: rewards, error } = await supabase
      .from("rewards")
      .select(`
        *,
        sponsors:sponsor_id(name, logo_url)
      `)
      .eq("is_active", true)
      .order("points_cost", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, rewards })
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}
