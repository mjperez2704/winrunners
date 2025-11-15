-- Tabla de carreras/actividades
CREATE TABLE IF NOT EXISTS public.runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Morning Run',
  description TEXT,
  distance_km DECIMAL(10,2) NOT NULL,
  duration_seconds INTEGER NOT NULL,
  average_pace_min_km DECIMAL(5,2),
  average_speed_km_h DECIMAL(5,2),
  calories_burned INTEGER,
  elevation_gain_m DECIMAL(8,2),
  elevation_loss_m DECIMAL(8,2),
  average_heart_rate INTEGER,
  max_heart_rate INTEGER,
  min_heart_rate INTEGER,
  average_cadence INTEGER,
  max_cadence INTEGER,
  gps_route JSONB, -- Array de coordenadas [{lat, lng, timestamp, altitude, accuracy}]
  start_location JSONB, -- {lat, lng, address}
  end_location JSONB,
  weather_conditions JSONB, -- {temperature, humidity, weather, wind_speed}
  started_at TIMESTAMP WITH TIME ZONE NOT NULL,
  ended_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_valid BOOLEAN DEFAULT TRUE,
  is_flagged BOOLEAN DEFAULT FALSE,
  flag_reason TEXT,
  validation_status TEXT DEFAULT 'pending' CHECK (validation_status IN ('pending', 'approved', 'rejected', 'investigating')),
  validation_score DECIMAL(3,2), -- 0.00 - 1.00
  source TEXT DEFAULT 'app' CHECK (source IN ('app', 'apple_health', 'google_fit', 'strava')),
  source_id TEXT, -- ID externo de la integración
  privacy TEXT DEFAULT 'public' CHECK (privacy IN ('public', 'friends', 'private')),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_runs_user ON public.runs(user_id);
CREATE INDEX IF NOT EXISTS idx_runs_started_at ON public.runs(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_runs_distance ON public.runs(distance_km);
CREATE INDEX IF NOT EXISTS idx_runs_is_valid ON public.runs(is_valid);
CREATE INDEX IF NOT EXISTS idx_runs_source ON public.runs(source);

-- RLS
ALTER TABLE public.runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own runs"
  ON public.runs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own runs"
  ON public.runs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own runs"
  ON public.runs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own runs"
  ON public.runs FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Public runs are viewable by everyone"
  ON public.runs FOR SELECT
  USING (privacy = 'public' AND is_valid = TRUE);

-- Trigger para actualizar stats del perfil
CREATE OR REPLACE FUNCTION update_profile_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.is_valid = TRUE THEN
    UPDATE public.profiles
    SET 
      total_km_run = total_km_run + NEW.distance_km,
      total_runs = total_runs + 1,
      total_time_seconds = total_time_seconds + NEW.duration_seconds
    WHERE id = NEW.user_id;
  ELSIF TG_OP = 'UPDATE' AND NEW.is_valid != OLD.is_valid THEN
    IF NEW.is_valid = TRUE THEN
      UPDATE public.profiles
      SET 
        total_km_run = total_km_run + NEW.distance_km,
        total_runs = total_runs + 1,
        total_time_seconds = total_time_seconds + NEW.duration_seconds
      WHERE id = NEW.user_id;
    ELSE
      UPDATE public.profiles
      SET 
        total_km_run = GREATEST(0, total_km_run - NEW.distance_km),
        total_runs = GREATEST(0, total_runs - 1),
        total_time_seconds = GREATEST(0, total_time_seconds - NEW.duration_seconds)
      WHERE id = NEW.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profile_stats_trigger
  AFTER INSERT OR UPDATE OF is_valid ON public.runs
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_stats();

CREATE TRIGGER update_runs_updated_at
  BEFORE UPDATE ON public.runs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
