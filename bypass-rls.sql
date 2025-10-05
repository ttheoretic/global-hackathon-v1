-- RLS für Demo-Zwecke umgehen
-- Führe dieses SQL im Supabase Dashboard aus

-- Temporär RLS deaktivieren
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_sources DISABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analyses DISABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions DISABLE ROW LEVEL SECURITY;

-- Oder RLS-Policies für den Service Role erweitern
-- (Alternative Lösung)

-- Service Role kann alles
CREATE POLICY "Service role can do everything" ON profiles FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role can do everything" ON feedback_sources FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role can do everything" ON feedback_items FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role can do everything" ON ai_analyses FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role can do everything" ON subscriptions FOR ALL TO service_role USING (true) WITH CHECK (true);
