-- Insertar administradores de prueba
INSERT INTO admin_users (
  id,
  email,
  full_name,
  role,
  is_active,
  permissions,
  created_at,
  updated_at
) VALUES
  (
    gen_random_uuid(),
    'admin@winrunners.com',
    'Admin Principal',
    'super_admin',
    true,
    '{"usuarios": {"read": true, "write": true, "delete": true}, "competencias": {"read": true, "write": true, "delete": true}, "tracking": {"read": true, "write": true, "delete": true}, "gamificacion": {"read": true, "write": true, "delete": true}, "suscripciones": {"read": true, "write": true, "delete": true}, "patrocinadores": {"read": true, "write": true, "delete": true}, "configuracion": {"read": true, "write": true, "delete": true}}',
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    'maria.g@winrunners.com',
    'María González',
    'admin',
    true,
    '{"usuarios": {"read": true, "write": true, "delete": false}, "competencias": {"read": true, "write": true, "delete": true}, "tracking": {"read": true, "write": false, "delete": false}, "gamificacion": {"read": true, "write": true, "delete": false}, "suscripciones": {"read": true, "write": true, "delete": false}, "patrocinadores": {"read": true, "write": false, "delete": false}, "configuracion": {"read": true, "write": false, "delete": false}}',
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    'carlos.r@winrunners.com',
    'Carlos Rodríguez',
    'moderador',
    true,
    '{"usuarios": {"read": true, "write": true, "delete": false}, "competencias": {"read": true, "write": true, "delete": false}, "tracking": {"read": true, "write": false, "delete": false}, "gamificacion": {"read": true, "write": true, "delete": false}, "suscripciones": {"read": false, "write": false, "delete": false}, "patrocinadores": {"read": true, "write": false, "delete": false}, "configuracion": {"read": false, "write": false, "delete": false}}',
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    'ana.l@winrunners.com',
    'Ana López',
    'soporte',
    true,
    '{"usuarios": {"read": true, "write": false, "delete": false}, "competencias": {"read": true, "write": false, "delete": false}, "tracking": {"read": true, "write": false, "delete": false}, "gamificacion": {"read": true, "write": false, "delete": false}, "suscripciones": {"read": true, "write": false, "delete": false}, "patrocinadores": {"read": true, "write": false, "delete": false}, "configuracion": {"read": false, "write": false, "delete": false}}',
    now(),
    now()
  )
ON CONFLICT (email) DO NOTHING;
