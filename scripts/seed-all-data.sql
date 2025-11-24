-- ================================================
-- SCRIPT DE POBLADO COMPLETO DE BASE DE DATOS
-- WinRunners Platform - Todos los módulos
-- ================================================

-- Limpiar datos existentes (opcional - comentar si no quieres borrar)
-- TRUNCATE profiles, runs, events, badges, challenges, sponsors, leagues, seasons, rewards CASCADE;

-- ================================================
-- 1. USUARIOS/PERFILES (profiles)
-- ================================================
INSERT INTO profiles (
  id,
  email,
  full_name,
  display_name,
  city,
  country,
  birth_date,
  gender,
  avatar_url,
  experience_level,
  subscription_type,
  total_km_run,
  total_runs,
  total_time_seconds,
  is_verified,
  is_suspended,
  created_at
) VALUES
-- Usuarios activos
(gen_random_uuid(), 'maria.gonzalez@email.com', 'María González', 'Maria_G', 'Madrid', 'España', '1992-05-15', 'female', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', 'avanzado', 'PREMIUM', 1245.8, 156, 428760, true, false, NOW() - INTERVAL '6 months'),
(gen_random_uuid(), 'carlos.ruiz@email.com', 'Carlos Ruiz', 'CarlosR', 'Barcelona', 'España', '1988-08-22', 'male', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', 'intermedio', 'ORO', 892.4, 98, 298320, true, false, NOW() - INTERVAL '4 months'),
(gen_random_uuid(), 'ana.martinez@email.com', 'Ana Martínez', 'AnaMtz', 'Valencia', 'España', '1995-03-10', 'female', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', 'avanzado', 'PLATINUM', 1580.2, 187, 512460, true, false, NOW() - INTERVAL '8 months'),
(gen_random_uuid(), 'luis.fernandez@email.com', 'Luis Fernández', 'LuisF', 'Sevilla', 'España', '1990-11-30', 'male', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luis', 'principiante', 'PLATA', 245.6, 32, 94320, true, false, NOW() - INTERVAL '2 months'),
(gen_random_uuid(), 'elena.torres@email.com', 'Elena Torres', 'ElenaTorres', 'Bilbao', 'España', '1994-07-18', 'female', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', 'intermedio', 'ORO', 678.9, 76, 234720, true, false, NOW() - INTERVAL '5 months'),
(gen_random_uuid(), 'javier.lopez@email.com', 'Javier López', 'JaviL', 'Málaga', 'España', '1987-01-25', 'male', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Javier', 'avanzado', 'PREMIUM', 1892.5, 201, 598320, true, false, NOW() - INTERVAL '1 year'),
(gen_random_uuid(), 'sofia.garcia@email.com', 'Sofía García', 'SofiaG', 'Zaragoza', 'España', '1991-09-14', 'female', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia', 'intermedio', 'PLATINUM', 1023.7, 124, 378960, true, false, NOW() - INTERVAL '7 months'),
(gen_random_uuid(), 'diego.sanchez@email.com', 'Diego Sánchez', 'DiegoS', 'Granada', 'España', '1993-04-08', 'male', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego', 'principiante', 'GRATIS', 123.4, 18, 51840, false, false, NOW() - INTERVAL '1 month'),
(gen_random_uuid(), 'laura.ramirez@email.com', 'Laura Ramírez', 'LauraR', 'Córdoba', 'España', '1996-12-03', 'female', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura', 'intermedio', 'ORO', 789.3, 89, 267840, true, false, NOW() - INTERVAL '6 months'),
(gen_random_uuid(), 'pablo.moreno@email.com', 'Pablo Moreno', 'PabloM', 'Toledo', 'España', '1989-06-19', 'male', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pablo', 'avanzado', 'PREMIUM', 1456.8, 168, 498960, true, false, NOW() - INTERVAL '9 months'),
-- Usuarios adicionales para mayor variedad
(gen_random_uuid(), 'isabel.diaz@email.com', 'Isabel Díaz', 'IsabelD', 'Murcia', 'España', '1992-02-27', 'female', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabel', 'intermedio', 'PLATA', 456.2, 52, 156480, true, false, NOW() - INTERVAL '3 months'),
(gen_random_uuid(), 'miguel.herrera@email.com', 'Miguel Herrera', 'MiguelH', 'Alicante', 'España', '1991-10-11', 'male', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel', 'avanzado', 'PLATINUM', 1678.4, 189, 567840, true, false, NOW() - INTERVAL '10 months'),
(gen_random_uuid(), 'carmen.castro@email.com', 'Carmen Castro', 'CarmenC', 'Santander', 'España', '1994-08-05', 'female', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carmen', 'principiante', 'GRATIS', 189.5, 24, 72960, false, false, NOW() - INTERVAL '2 months'),
(gen_random_uuid(), 'raul.ortiz@email.com', 'Raúl Ortiz', 'RaulO', 'Pamplona', 'España', '1988-05-22', 'male', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Raul', 'intermedio', 'ORO', 934.7, 103, 318240, true, false, NOW() - INTERVAL '5 months'),
(gen_random_uuid(), 'natalia.rubio@email.com', 'Natalia Rubio', 'NataliaR', 'Oviedo', 'España', '1993-11-16', 'female', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Natalia', 'avanzado', 'PREMIUM', 1789.3, 198, 589320, true, false, NOW() - INTERVAL '11 months');

-- ================================================
-- 2. PATROCINADORES (sponsors)
-- ================================================
INSERT INTO sponsors (
  id,
  name,
  logo_url,
  tier,
  description,
  website_url,
  total_investment_eur,
  contract_start,
  contract_end,
  is_active,
  created_at
) VALUES
(gen_random_uuid(), 'Nike Running', 'https://logo.clearbit.com/nike.com', 'PLATINUM', 'Marca líder mundial en equipamiento deportivo', 'https://nike.com', 250000, '2024-01-01', '2025-12-31', true, NOW() - INTERVAL '6 months'),
(gen_random_uuid(), 'Adidas Sports', 'https://logo.clearbit.com/adidas.com', 'PLATINUM', 'Innovación y rendimiento en running', 'https://adidas.com', 200000, '2024-03-01', '2025-12-31', true, NOW() - INTERVAL '4 months'),
(gen_random_uuid(), 'Gatorade', 'https://logo.clearbit.com/gatorade.com', 'GOLD', 'Hidratación deportiva profesional', 'https://gatorade.com', 150000, '2024-02-15', '2025-12-31', true, NOW() - INTERVAL '5 months'),
(gen_random_uuid(), 'Garmin', 'https://logo.clearbit.com/garmin.com', 'GOLD', 'Tecnología GPS y smartwatches', 'https://garmin.com', 120000, '2024-04-01', '2025-12-31', true, NOW() - INTERVAL '3 months'),
(gen_random_uuid(), 'Decathlon', 'https://logo.clearbit.com/decathlon.com', 'SILVER', 'Equipamiento deportivo accesible', 'https://decathlon.com', 75000, '2024-05-01', '2025-06-30', true, NOW() - INTERVAL '2 months'),
(gen_random_uuid(), 'Polar', 'https://logo.clearbit.com/polar.com', 'SILVER', 'Monitores de frecuencia cardíaca', 'https://polar.com', 60000, '2024-06-01', '2025-06-30', true, NOW() - INTERVAL '1 month'),
(gen_random_uuid(), 'PowerBar', 'https://logo.clearbit.com/powerbar.com', 'SILVER', 'Nutrición deportiva especializada', 'https://powerbar.com', 50000, '2024-03-15', '2025-03-15', true, NOW() - INTERVAL '4 months');

-- ================================================
-- 3. EVENTOS DEPORTIVOS (events)
-- ================================================
INSERT INTO events (
  id,
  title,
  description,
  event_type,
  distance_km,
  start_date,
  end_date,
  location,
  max_participants,
  current_participants,
  entry_fee_eur,
  is_virtual,
  image_url,
  sponsor_id,
  is_active,
  created_at
) VALUES
(gen_random_uuid(), 'Maratón de Madrid 2024', 'Maratón oficial por las calles de Madrid', 'marathon', 42.195, '2024-12-15 09:00:00', '2024-12-15 15:00:00', '{"city": "Madrid", "country": "España", "venue": "Plaza de Colón"}', 5000, 3847, 45.00, false, 'https://images.unsplash.com/photo-1502904550040-7534597429ae', (SELECT id FROM sponsors WHERE name = 'Nike Running' LIMIT 1), true, NOW() - INTERVAL '2 months'),
(gen_random_uuid(), 'Media Maratón Barcelona', 'Recorre los monumentos icónicos de Barcelona', 'half_marathon', 21.097, '2024-12-08 08:30:00', '2024-12-08 12:00:00', '{"city": "Barcelona", "country": "España", "venue": "Arc de Triomf"}', 3000, 2456, 35.00, false, 'https://images.unsplash.com/photo-1486218119243-13883505764c', (SELECT id FROM sponsors WHERE name = 'Adidas Sports' LIMIT 1), true, NOW() - INTERVAL '1 month'),
(gen_random_uuid(), 'Carrera Virtual 10K Global', 'Corre desde donde estés y compite globalmente', '10k', 10.0, '2024-12-01 00:00:00', '2024-12-31 23:59:59', '{"city": "Virtual", "country": "Global", "venue": "Tu ubicación"}', 10000, 6234, 15.00, true, 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8', (SELECT id FROM sponsors WHERE name = 'Garmin' LIMIT 1), true, NOW() - INTERVAL '3 weeks'),
(gen_random_uuid(), 'Trail Running Sierra Nevada', 'Desafío de montaña con vistas espectaculares', 'trail', 25.0, '2025-01-20 07:00:00', '2025-01-20 14:00:00', '{"city": "Granada", "country": "España", "venue": "Sierra Nevada"}', 500, 287, 55.00, false, 'https://images.unsplash.com/photo-1551632811-561732d1e306', (SELECT id FROM sponsors WHERE name = 'Decathlon' LIMIT 1), true, NOW() - INTERVAL '2 weeks'),
(gen_random_uuid(), 'Carrera 5K Familia', 'Evento familiar para todos los niveles', '5k', 5.0, '2024-12-22 10:00:00', '2024-12-22 12:00:00', '{"city": "Valencia", "country": "España", "venue": "Jardín del Turia"}', 2000, 1523, 10.00, false, 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3', (SELECT id FROM sponsors WHERE name = 'Gatorade' LIMIT 1), true, NOW() - INTERVAL '1 week'),
(gen_random_uuid(), 'Ultramaratón Camino de Santiago', 'Reto extremo de 100km por el Camino', 'ultra', 100.0, '2025-02-10 06:00:00', '2025-02-11 00:00:00', '{"city": "Santiago de Compostela", "country": "España", "venue": "Camino Francés"}', 200, 98, 120.00, false, 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5', (SELECT id FROM sponsors WHERE name = 'Nike Running' LIMIT 1), true, NOW() - INTERVAL '1 month');

-- ================================================
-- 4. LIGAS Y TEMPORADAS (leagues, seasons)
-- ================================================
INSERT INTO leagues (
  id,
  name,
  min_points,
  max_points,
  promotion_spots,
  relegation_spots,
  created_at
) VALUES
(gen_random_uuid(), 'Bronce', 0, 1000, 3, 0, NOW()),
(gen_random_uuid(), 'Plata', 1001, 2500, 3, 3, NOW()),
(gen_random_uuid(), 'Oro', 2501, 5000, 3, 3, NOW()),
(gen_random_uuid(), 'Platinum', 5001, 10000, 3, 3, NOW()),
(gen_random_uuid(), 'Diamante', 10001, 999999, 0, 3, NOW());

INSERT INTO seasons (
  id,
  name,
  description,
  start_date,
  end_date,
  is_active,
  created_at
) VALUES
(gen_random_uuid(), 'Temporada Otoño 2024', 'Temporada competitiva de otoño', '2024-09-01', '2024-11-30', false, NOW() - INTERVAL '3 months'),
(gen_random_uuid(), 'Temporada Invierno 2024-2025', 'Temporada competitiva de invierno', '2024-12-01', '2025-02-28', true, NOW() - INTERVAL '1 week'),
(gen_random_uuid(), 'Temporada Primavera 2025', 'Temporada competitiva de primavera', '2025-03-01', '2025-05-31', false, NOW());

-- ================================================
-- 5. BADGES Y LOGROS (badges)
-- ================================================
INSERT INTO badges (
  id,
  name,
  description,
  icon_url,
  rarity,
  points,
  criteria,
  is_active,
  created_at
) VALUES
(gen_random_uuid(), 'Primera Carrera', 'Completa tu primera carrera registrada', 'https://api.iconify.design/mdi:medal.svg', 'common', 10, '{"type": "first_run", "value": 1}', true, NOW()),
(gen_random_uuid(), 'Maratonista', 'Completa un maratón de 42km', 'https://api.iconify.design/mdi:run-fast.svg', 'epic', 500, '{"type": "distance", "value": 42.195}', true, NOW()),
(gen_random_uuid(), '100 Carreras', 'Completa 100 carreras', 'https://api.iconify.design/mdi:counter.svg', 'rare', 200, '{"type": "total_runs", "value": 100}', true, NOW()),
(gen_random_uuid(), 'Racha de Fuego', 'Corre 7 días consecutivos', 'https://api.iconify.design/mdi:fire.svg', 'rare', 150, '{"type": "streak", "value": 7}', true, NOW()),
(gen_random_uuid(), 'Velocista', 'Corre 5km en menos de 20 minutos', 'https://api.iconify.design/mdi:lightning-bolt.svg', 'rare', 180, '{"type": "pace", "distance": 5, "time": 1200}', true, NOW()),
(gen_random_uuid(), '1000 Kilómetros', 'Alcanza 1000km totales', 'https://api.iconify.design/mdi:trophy.svg', 'legendary', 1000, '{"type": "total_distance", "value": 1000}', true, NOW()),
(gen_random_uuid(), 'Campeón de Liga', 'Gana una temporada de liga', 'https://api.iconify.design/mdi:crown.svg', 'legendary', 800, '{"type": "league_champion", "value": 1}', true, NOW()),
(gen_random_uuid(), 'Madrugador', 'Corre antes de las 6 AM', 'https://api.iconify.design/mdi:weather-sunrise.svg', 'common', 50, '{"type": "early_bird", "hour": 6}', true, NOW());

-- ================================================
-- 6. DESAFÍOS/RETOS (challenges)
-- ================================================
INSERT INTO challenges (
  id,
  title,
  description,
  challenge_type,
  start_date,
  end_date,
  target_value,
  reward_points,
  reward_badge_id,
  sponsor_id,
  participants_count,
  completed_count,
  is_active,
  created_at
) VALUES
(gen_random_uuid(), 'Desafío 100K Diciembre', 'Corre 100 kilómetros durante diciembre', 'distance', '2024-12-01', '2024-12-31', 100.0, 500, (SELECT id FROM badges WHERE name = '1000 Kilómetros' LIMIT 1), (SELECT id FROM sponsors WHERE name = 'Nike Running' LIMIT 1), 2847, 1234, true, NOW() - INTERVAL '1 week'),
(gen_random_uuid(), 'Reto de Velocidad 5K', 'Mejora tu tiempo en 5K', 'speed', '2024-12-01', '2024-12-31', 5.0, 300, (SELECT id FROM badges WHERE name = 'Velocista' LIMIT 1), (SELECT id FROM sponsors WHERE name = 'Garmin' LIMIT 1), 1523, 687, true, NOW() - INTERVAL '2 weeks'),
(gen_random_uuid(), 'Racha de 30 Días', 'Corre al menos 30 días consecutivos', 'streak', '2024-12-01', '2024-12-31', 30.0, 800, (SELECT id FROM badges WHERE name = 'Racha de Fuego' LIMIT 1), (SELECT id FROM sponsors WHERE name = 'Adidas Sports' LIMIT 1), 3456, 234, true, NOW() - INTERVAL '1 week'),
(gen_random_uuid(), 'Media Maratón Virtual', 'Completa una media maratón desde donde estés', 'distance', '2024-12-15', '2025-01-15', 21.097, 400, (SELECT id FROM badges WHERE name = 'Maratonista' LIMIT 1), (SELECT id FROM sponsors WHERE name = 'Gatorade' LIMIT 1), 892, 156, true, NOW());

-- ================================================
-- 7. RECOMPENSAS (rewards)
-- ================================================
INSERT INTO rewards (
  id,
  title,
  description,
  reward_type,
  points_cost,
  stock_quantity,
  image_url,
  sponsor_id,
  is_active,
  created_at
) VALUES
(gen_random_uuid(), 'Descuento 20% Nike Store', 'Código de descuento para la tienda oficial de Nike', 'discount', 500, 1000, 'https://logo.clearbit.com/nike.com', (SELECT id FROM sponsors WHERE name = 'Nike Running' LIMIT 1), true, NOW()),
(gen_random_uuid(), 'Zapatillas Adidas Ultraboost', 'Zapatillas de running premium', 'physical', 5000, 50, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', (SELECT id FROM sponsors WHERE name = 'Adidas Sports' LIMIT 1), true, NOW()),
(gen_random_uuid(), 'Smartwatch Garmin Forerunner', 'Reloj GPS con monitor de frecuencia cardíaca', 'physical', 15000, 20, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1', (SELECT id FROM sponsors WHERE name = 'Garmin' LIMIT 1), true, NOW()),
(gen_random_uuid(), 'Pack de Hidratación Gatorade', 'Pack de 12 botellas de Gatorade variadas', 'physical', 300, 500, 'https://logo.clearbit.com/gatorade.com', (SELECT id FROM sponsors WHERE name = 'Gatorade' LIMIT 1), true, NOW()),
(gen_random_uuid(), 'Vale 50€ Decathlon', 'Vale de compra para cualquier producto Decathlon', 'voucher', 2500, 200, 'https://logo.clearbit.com/decathlon.com', (SELECT id FROM sponsors WHERE name = 'Decathlon' LIMIT 1), true, NOW()),
(gen_random_uuid(), 'Entrada VIP Evento Premium', 'Acceso VIP a eventos exclusivos de WinRunners', 'experience', 8000, 30, 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14', NULL, true, NOW());

-- ================================================
-- 8. CARRERAS/RUTAS (runs) - Ejemplos
-- ================================================
-- Nota: Solo agregamos algunas carreras de ejemplo
-- En producción, estas serán registradas por los usuarios a través de la app móvil

DO $$
DECLARE
  user_id_var uuid;
BEGIN
  -- Obtener algunos IDs de usuarios
  FOR user_id_var IN SELECT id FROM profiles LIMIT 5
  LOOP
    -- Insertar 3 carreras de ejemplo por usuario
    INSERT INTO runs (
      id,
      user_id,
      title,
      description,
      distance_km,
      duration_seconds,
      average_pace_min_km,
      average_speed_km_h,
      started_at,
      ended_at,
      start_location,
      end_location,
      gps_route,
      elevation_gain_m,
      average_heart_rate,
      calories_burned,
      source,
      privacy,
      is_valid,
      validation_status,
      likes_count,
      comments_count,
      created_at
    ) VALUES
    (gen_random_uuid(), user_id_var, 'Carrera Matutina', 'Entrenamiento de resistencia', 10.5, 3600, 5.71, 10.5, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '1 hour', '{"lat": 40.4168, "lng": -3.7038, "city": "Madrid"}', '{"lat": 40.4200, "lng": -3.7100, "city": "Madrid"}', '{"type": "LineString", "coordinates": [[40.4168, -3.7038], [40.4200, -3.7100]]}', 85.0, 145, 450, 'manual', 'public', true, 'approved', 5, 2, NOW() - INTERVAL '2 days'),
    (gen_random_uuid(), user_id_var, 'Intervalos de Velocidad', 'Entrenamiento de velocidad 5x1km', 7.2, 2400, 5.56, 10.8, NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days' + INTERVAL '40 minutes', '{"lat": 40.4168, "lng": -3.7038, "city": "Madrid"}', '{"lat": 40.4180, "lng": -3.7080, "city": "Madrid"}', '{"type": "LineString", "coordinates": [[40.4168, -3.7038], [40.4180, -3.7080]]}', 35.0, 165, 320, 'strava', 'public', true, 'approved', 8, 3, NOW() - INTERVAL '5 days'),
    (gen_random_uuid(), user_id_var, 'Carrera Larga Fin de Semana', 'Preparación para media maratón', 18.5, 6300, 5.68, 10.57, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days' + INTERVAL '1 hour 45 minutes', '{"lat": 40.4168, "lng": -3.7038, "city": "Madrid"}', '{"lat": 40.4300, "lng": -3.7200, "city": "Madrid"}', '{"type": "LineString", "coordinates": [[40.4168, -3.7038], [40.4300, -3.7200]]}', 145.0, 155, 850, 'garmin', 'public', true, 'approved', 12, 5, NOW() - INTERVAL '7 days');
  END LOOP;
END $$;

-- ================================================
-- 9. PUNTOS DE USUARIOS (user_points)
-- ================================================
INSERT INTO user_points (
  id,
  user_id,
  available_points,
  total_points,
  lifetime_points,
  created_at,
  updated_at
)
SELECT
  gen_random_uuid(),
  id,
  FLOOR(RANDOM() * 5000 + 1000)::integer,
  FLOOR(RANDOM() * 10000 + 2000)::integer,
  FLOOR(RANDOM() * 15000 + 3000)::integer,
  NOW(),
  NOW()
FROM profiles;

-- ================================================
-- 10. NOTIFICACIONES (notifications) - Ejemplos
-- ================================================
INSERT INTO notifications (
  id,
  user_id,
  notification_type,
  title,
  body,
  reference_type,
  reference_id,
  is_read,
  sent_at,
  created_at
)
SELECT
  gen_random_uuid(),
  p.id,
  'achievement',
  '¡Nuevo badge desbloqueado!',
  'Has completado el desafío "100K Diciembre"',
  'badge',
  (SELECT id FROM badges WHERE name = '1000 Kilómetros' LIMIT 1),
  false,
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
FROM profiles p
LIMIT 5;

-- ================================================
-- FIN DEL SCRIPT
-- ================================================

-- Verificar datos insertados
SELECT 'Profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'Sponsors', COUNT(*) FROM sponsors
UNION ALL
SELECT 'Events', COUNT(*) FROM events
UNION ALL
SELECT 'Leagues', COUNT(*) FROM leagues
UNION ALL
SELECT 'Seasons', COUNT(*) FROM seasons
UNION ALL
SELECT 'Badges', COUNT(*) FROM badges
UNION ALL
SELECT 'Challenges', COUNT(*) FROM challenges
UNION ALL
SELECT 'Rewards', COUNT(*) FROM rewards
UNION ALL
SELECT 'Runs', COUNT(*) FROM runs
UNION ALL
SELECT 'User Points', COUNT(*) FROM user_points
UNION ALL
SELECT 'Notifications', COUNT(*) FROM notifications;
