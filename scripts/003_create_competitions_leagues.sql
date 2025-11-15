-- Tabla de temporadas
CREATE TABLE IF NOT EXISTS public.seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de ligas
CREATE TABLE IF NOT EXISTS public.leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (name IN ('ELITE', 'DIAMANTE', 'ORO', 'PLATA', 'BRONCE')),
  min_points INTEGER NOT NULL,
  max_points INTEGER,
  promotion_spots INTEGER DEFAULT 3,
  relegation_spots INTEGER DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de clasificación de usuarios
CREATE TABLE IF NOT EXISTS public.leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  season_id UUID NOT NULL REFERENCES public.seasons(id) ON DELETE CASCADE,
  league_id UUID NOT NULL REFERENCES public.leagues(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  total_distance_km DECIMAL(10,2) DEFAULT 0,
  total_runs INTEGER DEFAULT 0,
  total_time_seconds INTEGER DEFAULT 0,
  position INTEGER,
  previous_position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, season_id)
);

CREATE INDEX IF NOT EXISTS idx_leaderboard_season ON public.leaderboard(season_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_league ON public.leaderboard(league_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_points ON public.leaderboard(points DESC);

ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view seasons"
  ON public.seasons FOR SELECT
  USING (TRUE);

CREATE POLICY "Everyone can view leagues"
  ON public.leagues FOR SELECT
  USING (TRUE);

CREATE POLICY "Everyone can view leaderboard"
  ON public.leaderboard FOR SELECT
  USING (TRUE);

CREATE TRIGGER update_leaderboard_updated_at
  BEFORE UPDATE ON public.leaderboard
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
