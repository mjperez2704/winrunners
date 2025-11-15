import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { shipping_address } = await request.json()
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 })
    }

    // Obtener la recompensa
    const { data: reward, error: rewardError } = await supabase.from("rewards").select("*").eq("id", id).single()

    if (rewardError || !reward) {
      return NextResponse.json({ error: "Recompensa no encontrada" }, { status: 404 })
    }

    // Verificar puntos del usuario
    const { data: userPoints, error: pointsError } = await supabase
      .from("user_points")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (pointsError || !userPoints) {
      return NextResponse.json({ error: "No se pudieron verificar los puntos" }, { status: 400 })
    }

    if (userPoints.available_points < reward.points_cost) {
      return NextResponse.json({ error: "Puntos insuficientes" }, { status: 400 })
    }

    // Crear el canje
    const { data: redemption, error: redemptionError } = await supabase
      .from("reward_redemptions")
      .insert({
        user_id: user.id,
        reward_id: id,
        points_used: reward.points_cost,
        shipping_address,
      })
      .select()
      .single()

    if (redemptionError) {
      return NextResponse.json({ error: redemptionError.message }, { status: 400 })
    }

    // Actualizar puntos del usuario
    await supabase
      .from("user_points")
      .update({
        available_points: userPoints.available_points - reward.points_cost,
      })
      .eq("user_id", user.id)

    // Crear transacción de puntos
    await supabase.from("points_transactions").insert({
      user_id: user.id,
      points_change: -reward.points_cost,
      transaction_type: "redeemed",
      reference_type: "reward",
      reference_id: id,
      description: `Canje de ${reward.title}`,
    })

    return NextResponse.json({
      success: true,
      redemption,
      message: "Recompensa canjeada exitosamente",
    })
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
  }
}
