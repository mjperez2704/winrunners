import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ isAdmin: false, error: 'Not authenticated' }, { status: 401 })
  }

  // Check if user is an admin
  const { data: adminUser, error: adminError } = await supabase
    .from('admin_users')
    .select('id, role, is_active, permissions')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .single()

  if (adminError || !adminUser) {
    return NextResponse.json({ isAdmin: false, error: 'Not an admin' }, { status: 403 })
  }

  return NextResponse.json({
    isAdmin: true,
    user: {
      id: user.id,
      email: user.email,
      role: adminUser.role,
      permissions: adminUser.permissions,
    },
  })
}
