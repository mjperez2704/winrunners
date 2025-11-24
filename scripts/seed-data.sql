-- Script para poblar las tablas de Supabase con datos de ejemplo

-- Poblar tabla de profiles (corredores)
INSERT INTO profiles (id, email, full_name, display_name, city, country, experience_level, total_km_run, total_runs, created_at, is_verified, subscription_type)
VALUES
  (gen_random_uuid(), 'maria.gonzalez@email.com', 'María González', 'MaríaG', 'Madrid', 'España', 'avanzado', 1247, 45, '2024-01-15', true, 'ORO'),
  (gen_random_uuid(), 'juan.perez@email.com', 'Juan Pérez', 'JuanP', 'Barcelona', 'España', 'intermedio', 892, 32, '2024-02-03', true, 'PLATA'),
  (gen_random_uuid(), 'ana.martin@email.com', 'Ana Martín', 'AnaM', 'Valencia', 'España', 'principiante', 234, 8, '2024-01-28', false, 'GRATIS'),
  (gen_random_uuid(), 'carlos.ruiz@email.com', 'Carlos Ruiz', 'CarlosR', 'Sevilla', 'España', 'avanzado', 2156, 78, '2023-12-10', true, 'PLATINUM'),
  (gen_random_uuid(), 'laura.sanchez@email.com', 'Laura Sánchez', 'LauraS', 'Bilbao', 'España', 'intermedio', 567, 19, '2024-03-05', true, 'ORO')
ON CONFLICT DO NOTHING;

-- Poblar tabla de events (eventos deportivos)
INSERT INTO events (id, title, description, event_type, distance_km, start_date, end_date, max_participants, current_participants, entry_fee_eur, is_virtual, is_active, created_at, location)
VALUES
  (gen_random_uuid(), 'Carrera 5K Primavera', 'Carrera recreativa de 5 kilómetros en el parque central', 'Carrera', 5, '2024-03-25 08:00:00', '2024-03-25 10:00:00', 500, 234, 0, false, true, now(), '{"city": "Madrid", "address": "Parque Central"}'),
  (gen_random_uuid(), 'Maratón Ciudad 2024', 'Maratón oficial de 42K por las calles de la ciudad', 'Maratón', 42, '2024-04-15 06:00:00', '2024-04-15 14:00:00', 1000, 567, 25, false, true, now(), '{"city": "Madrid", "address": "Centro de la Ciudad"}'),
  (gen_random_uuid(), 'Trail Running Montaña', 'Carrera de montaña de 15 kilómetros con desnivel', 'Trail', 15, '2024-04-20 07:00:00', '2024-04-20 12:00:00', 300, 123, 15, false, true, now(), '{"city": "Madrid", "address": "Reserva Natural"}'),
  (gen_random_uuid(), 'Carrera Nocturna 10K', 'Carrera nocturna de 10 kilómetros', 'Carrera', 10, '2024-02-28 20:00:00', '2024-02-28 22:00:00', 500, 456, 10, false, false, now(), '{"city": "Madrid", "address": "Paseo Central"}'),
  (gen_random_uuid(), 'Media Maratón Verano', 'Media maratón de 21 kilómetros', 'Media Maratón', 21, '2024-01-15 07:00:00', '2024-01-15 11:00:00', 800, 789, 20, false, false, now(), '{"city": "Barcelona", "address": "Costa"}')
ON CONFLICT DO NOTHING;

-- Poblar tabla de badges
INSERT INTO badges (id, name, description, criteria, rarity, points, icon_url, is_active, created_at)
VALUES
  (gen_random_uuid(), 'Primera Carrera', 'Completa tu primera carrera', '{"runs_completed": 1}', 'Común', 50, 'trophy', true, now()),
  (gen_random_uuid(), 'Maratonista', 'Completa 100 carreras', '{"runs_completed": 100}', 'Épico', 500, 'medal', true, now()),
  (gen_random_uuid(), 'Velocista', 'Corre 5K en menos de 20 minutos', '{"distance": 5, "time_under": 1200}', 'Raro', 200, 'zap', true, now()),
  (gen_random_uuid(), 'Racha de Fuego', 'Mantén una racha de 30 días', '{"streak_days": 30}', 'Legendario', 1000, 'flame', true, now()),
  (gen_random_uuid(), 'Explorador', 'Corre en 10 ubicaciones diferentes', '{"unique_locations": 10}', 'Raro', 300, 'target', true, now()),
  (gen_random_uuid(), 'Campeón', 'Gana una temporada', '{"season_wins": 1}', 'Legendario', 2000, 'crown', true, now())
ON CONFLICT DO NOTHING;

-- Poblar tabla de sponsors (patrocinadores)
INSERT INTO sponsors (id, name, description, tier, logo_url, website_url, contract_start, contract_end, total_investment_eur, is_active, created_at)
VALUES
  (gen_random_uuid(), 'Nike Running', 'Marca líder en calzado deportivo', 'PLATINUM', 'nike-logo.jpg', 'https://nike.com', '2024-01-15', '2024-12-31', 50000, true, now()),
  (gen_random_uuid(), 'Gatorade', 'Bebidas deportivas y energéticas', 'GOLD', 'gatorade-logo.jpg', 'https://gatorade.com', '2024-02-01', '2024-11-30', 30000, true, now()),
  (gen_random_uuid(), 'Adidas', 'Ropa y calzado deportivo', 'PLATINUM', 'adidas-logo.jpg', 'https://adidas.com', '2024-01-20', '2024-12-31', 45000, true, now()),
  (gen_random_uuid(), 'PowerBar', 'Barras energéticas y suplementos', 'SILVER', 'powerbar-logo.jpg', 'https://powerbar.com', '2024-05-01', '2024-10-31', 15000, true, now())
ON CONFLICT DO NOTHING;
