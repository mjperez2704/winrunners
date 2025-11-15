-- Tabla de amistades
CREATE TABLE IF NOT EXISTS public.friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  CHECK (user_id != friend_id),
  UNIQUE(user_id, friend_id)
);

-- Tabla de likes en carreras
CREATE TABLE IF NOT EXISTS public.run_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES public.runs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(run_id, user_id)
);

-- Tabla de comentarios en carreras
CREATE TABLE IF NOT EXISTS public.run_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES public.runs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  is_flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de reportes
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  reported_run_id UUID REFERENCES public.runs(id) ON DELETE CASCADE,
  reported_comment_id UUID REFERENCES public.run_comments(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL CHECK (report_type IN ('spam', 'inappropriate', 'cheating', 'harassment', 'other')),
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'dismissed')),
  resolved_by UUID REFERENCES public.profiles(id),
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_friendships_user ON public.friendships(user_id);
CREATE INDEX IF NOT EXISTS idx_friendships_friend ON public.friendships(friend_id);
CREATE INDEX IF NOT EXISTS idx_run_likes_run ON public.run_likes(run_id);
CREATE INDEX IF NOT EXISTS idx_run_comments_run ON public.run_comments(run_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);

ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.run_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.run_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own friendships"
  ON public.friendships FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can manage their own friendships"
  ON public.friendships FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view likes on public runs"
  ON public.run_likes FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can like runs"
  ON public.run_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view comments on public runs"
  ON public.run_comments FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can comment on runs"
  ON public.run_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own reports"
  ON public.reports FOR SELECT
  USING (auth.uid() = reporter_id);

CREATE POLICY "Users can create reports"
  ON public.reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

-- Trigger para actualizar contador de likes
CREATE OR REPLACE FUNCTION update_run_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.runs SET likes_count = likes_count + 1 WHERE id = NEW.run_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.runs SET likes_count = GREATEST(0, likes_count - 1) WHERE id = OLD.run_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_run_likes_count_trigger
  AFTER INSERT OR DELETE ON public.run_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_run_likes_count();

-- Trigger para actualizar contador de comentarios
CREATE OR REPLACE FUNCTION update_run_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.runs SET comments_count = comments_count + 1 WHERE id = NEW.run_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.runs SET comments_count = GREATEST(0, comments_count - 1) WHERE id = OLD.run_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_run_comments_count_trigger
  AFTER INSERT OR DELETE ON public.run_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_run_comments_count();

CREATE TRIGGER update_run_comments_updated_at
  BEFORE UPDATE ON public.run_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
