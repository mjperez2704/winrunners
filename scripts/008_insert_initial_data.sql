-- Insertar ligas predefinidas
INSERT INTO public.leagues (name, min_points, max_points) VALUES
  ('ELITE', 10000, NULL),
  ('DIAMANTE', 5000, 9999),
  ('ORO', 2000, 4999),
  ('PLATA', 500, 1999),
  ('BRONCE', 0, 499)
ON CONFLICT DO NOTHING;

-- Insertar badges iniciales
INSERT INTO public.badges (name, description, rarity, criteria, points) VALUES
  ('Primer Paso', 'Completa tu primera carrera', 'common', '{"type": "runs", "value": 1, "comparison": ">="}', 10),
  ('10K Runner', 'Corre 10 kilómetros en una sola carrera', 'uncommon', '{"type": "distance", "value": 10, "comparison": ">="}', 25),
  ('Media Maratón', 'Completa 21.1 km en una carrera', 'rare', '{"type": "distance", "value": 21.1, "comparison": ">="}', 50),
  ('Maratonista', 'Completa 42.2 km en una carrera', 'epic', '{"type": "distance", "value": 42.2, "comparison": ">="}', 100),
  ('Centurión', 'Corre 100 kilómetros acumulados', 'rare', '{"type": "total_distance", "value": 100, "comparison": ">="}', 75),
  ('Dedicación', 'Corre 30 días consecutivos', 'epic', '{"type": "streak", "value": 30, "comparison": ">="}', 150),
  ('Velocista', 'Corre a un ritmo promedio menor a 4:00 min/km', 'rare', '{"type": "pace", "value": 4, "comparison": "<="}', 60),
  ('Montañista', 'Gana 500m de elevación en una carrera', 'rare', '{"type": "elevation", "value": 500, "comparison": ">="}', 80),
  ('Madrugador', 'Completa una carrera antes de las 6:00 AM', 'uncommon', '{"type": "time", "value": 6, "comparison": "<"}', 30),
  ('Ultra Runner', 'Corre más de 50 km en una sola carrera', 'legendary', '{"type": "distance", "value": 50, "comparison": ">"}', 200)
ON CONFLICT DO NOTHING;

-- Insertar temporada inicial
INSERT INTO public.seasons (name, description, start_date, end_date, is_active) VALUES
  ('Primavera 2024', 'Primera temporada de competencias WinRunners', '2024-04-01', '2024-06-30', TRUE)
ON CONFLICT DO NOTHING;
