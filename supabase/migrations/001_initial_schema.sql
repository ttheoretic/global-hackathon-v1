-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  company_name TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback_sources table
CREATE TABLE feedback_sources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('app_store', 'google_play', 'website', 'social_media', 'survey', 'email', 'other')) NOT NULL,
  url TEXT,
  api_key TEXT,
  config JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback_items table
CREATE TABLE feedback_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  source_id UUID REFERENCES feedback_sources(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  sentiment TEXT CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  category TEXT,
  tags TEXT[],
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source_created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create ai_analyses table
CREATE TABLE ai_analyses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  feedback_items UUID[] NOT NULL,
  analysis_type TEXT CHECK (analysis_type IN ('summary', 'sentiment', 'categorization', 'insights')) NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan TEXT CHECK (plan IN ('free', 'pro', 'enterprise')) NOT NULL,
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due')) DEFAULT 'active',
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_feedback_sources_user_id ON feedback_sources(user_id);
CREATE INDEX idx_feedback_sources_type ON feedback_sources(type);
CREATE INDEX idx_feedback_items_user_id ON feedback_items(user_id);
CREATE INDEX idx_feedback_items_source_id ON feedback_items(source_id);
CREATE INDEX idx_feedback_items_sentiment ON feedback_items(sentiment);
CREATE INDEX idx_feedback_items_created_at ON feedback_items(created_at);
CREATE INDEX idx_ai_analyses_user_id ON ai_analyses(user_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feedback_sources_updated_at BEFORE UPDATE ON feedback_sources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feedback_items_updated_at BEFORE UPDATE ON feedback_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own feedback sources" ON feedback_sources FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own feedback sources" ON feedback_sources FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own feedback sources" ON feedback_sources FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own feedback sources" ON feedback_sources FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own feedback items" ON feedback_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own feedback items" ON feedback_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own feedback items" ON feedback_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own feedback items" ON feedback_items FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own AI analyses" ON ai_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own AI analyses" ON ai_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own subscriptions" ON subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own subscriptions" ON subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  
  -- Create free subscription for new user
  INSERT INTO public.subscriptions (user_id, plan, current_period_start, current_period_end)
  VALUES (NEW.id, 'free', NOW(), NOW() + INTERVAL '1 year');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
