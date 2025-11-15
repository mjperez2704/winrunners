-- Crear tabla de administradores
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'moderator', 'support')),
  permissions JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id)
);

-- Índices
CREATE INDEX idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_users_is_active ON admin_users(is_active);

-- RLS Policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Los administradores pueden ver otros administradores
CREATE POLICY "Admins can view other admins"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
      AND is_active = true
    )
  );

-- Solo super admins pueden crear/modificar administradores
CREATE POLICY "Super admins can manage admins"
  ON admin_users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
      AND role = 'super_admin'
      AND is_active = true
    )
  );

-- Trigger para actualizar updated_at
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insertar usuario administrador por defecto (IMPORTANTE: Cambiar estos datos en producción)
-- Primero necesitas crear el usuario en Supabase Auth, luego usar su UUID aquí
-- Ejemplo de insert (reemplaza 'USER_UUID' con el UUID real del usuario de auth.users):
-- INSERT INTO admin_users (user_id, email, full_name, role, is_active)
-- VALUES (
--   'USER_UUID',
--   'admin@winrunners.com',
--   'Administrador Principal',
--   'super_admin',
--   true
-- );

COMMENT ON TABLE admin_users IS 'Usuarios administradores del panel de control';
COMMENT ON COLUMN admin_users.role IS 'Roles: super_admin, admin, moderator, support';
COMMENT ON COLUMN admin_users.permissions IS 'Permisos personalizados adicionales en formato JSON';
