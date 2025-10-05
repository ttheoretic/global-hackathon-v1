-- Foreign Key Constraints für Demo temporär entfernen
-- Führe dieses SQL im Supabase Dashboard aus

-- Entferne Foreign Key Constraints
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
ALTER TABLE feedback_sources DROP CONSTRAINT IF EXISTS feedback_sources_user_id_fkey;
ALTER TABLE feedback_items DROP CONSTRAINT IF EXISTS feedback_items_user_id_fkey;
ALTER TABLE ai_analyses DROP CONSTRAINT IF EXISTS ai_analyses_user_id_fkey;
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;

-- Optional: Auch die user_id Spalten temporär nullable machen
ALTER TABLE feedback_sources ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE feedback_items ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE ai_analyses ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE subscriptions ALTER COLUMN user_id DROP NOT NULL;
