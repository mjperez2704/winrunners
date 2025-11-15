-- Script para crear un usuario administrador de prueba
-- NOTA: Este script es solo para desarrollo. NO usar en producción.

-- Función para crear usuario de prueba si no existe
DO $$
DECLARE
  test_user_id UUID;
BEGIN
  -- Intentar crear el usuario en auth.users si no existe
  -- NOTA: Esto podría no funcionar dependiendo de los permisos
  -- Es mejor crear el usuario manualmente desde el dashboard de Supabase
  
  -- Verificar si ya existe un admin
  IF NOT EXISTS (SELECT 1 FROM admin_users LIMIT 1) THEN
    -- Mensaje de ayuda
    RAISE NOTICE 'Para crear un usuario administrador:';
    RAISE NOTICE '1. Ve al dashboard de Supabase → Authentication → Users';
    RAISE NOTICE '2. Crea un usuario con email: jesuscalzado.sevilla86@gmail.com y una contraseña';
    RAISE NOTICE '3. Copia el UUID del usuario creado';
    RAISE NOTICE '4. Ejecuta: INSERT INTO admin_users (user_id, email, full_name, role, is_active) VALUES (''b0fba5d2-28ae-487d-8429-e266a3b6b975'', ''jesuscalzado.sevilla86@gmail.com'', ''Admin Principal'', ''super_admin'', true);';
  END IF;
END $$;

-- Alternativa: Si ya creaste un usuario en Supabase Auth, descomenta y actualiza esto:
/*
INSERT INTO admin_users (user_id, email, full_name, role, is_active)
VALUES (
  'REEMPLAZA_CON_UUID_REAL',  -- UUID del usuario de auth.users
  'admin@winrunners.com',
  'Administrador Principal',
  'super_admin',
  true
)
ON CONFLICT (email) DO NOTHING;
*/

COMMENT ON TABLE admin_users IS 'Usuarios de prueba - Email: admin@winrunners.com';
