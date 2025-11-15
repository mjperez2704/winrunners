import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET - Obtener desafíos activos
export async function GET() {
  try {
    const supabase = await createClient()

    const { data: challenges, error } = await supabase
      .from("challenges")
      .select("*")
      .eq("is_active", true)
      .gte("end_date", new Date().toISOString())
      .order("start_date", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, challenges })
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}
