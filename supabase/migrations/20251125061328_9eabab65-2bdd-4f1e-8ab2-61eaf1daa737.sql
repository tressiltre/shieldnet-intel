-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  organization TEXT,
  clearance_level TEXT DEFAULT 'operator',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create IOC (Indicators of Compromise) table
CREATE TABLE public.iocs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  indicator TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('ip', 'domain', 'url', 'hash', 'email')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  source TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  first_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'false_positive')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create threat feeds table
CREATE TABLE public.threat_feeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT,
  feed_type TEXT NOT NULL,
  last_updated TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
  total_indicators INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT,
  ioc_id UUID REFERENCES public.iocs(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'acknowledged', 'resolved')),
  acknowledged_by UUID REFERENCES auth.users(id),
  acknowledged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create enrichment data table
CREATE TABLE public.enrichment_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ioc_id UUID REFERENCES public.iocs(id) ON DELETE CASCADE,
  data_type TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.iocs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrichment_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- RLS Policies for IOCs (all authenticated users can read, only creators can update/delete)
CREATE POLICY "Authenticated users can view IOCs" ON public.iocs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert IOCs" ON public.iocs FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own IOCs" ON public.iocs FOR UPDATE TO authenticated USING (auth.uid() = created_by);
CREATE POLICY "Users can delete own IOCs" ON public.iocs FOR DELETE TO authenticated USING (auth.uid() = created_by);

-- RLS Policies for threat feeds (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view feeds" ON public.threat_feeds FOR SELECT TO authenticated USING (true);

-- RLS Policies for alerts
CREATE POLICY "Authenticated users can view alerts" ON public.alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update alerts" ON public.alerts FOR UPDATE TO authenticated USING (true);

-- RLS Policies for enrichment data
CREATE POLICY "Authenticated users can view enrichment" ON public.enrichment_data FOR SELECT TO authenticated USING (true);

-- Create indexes for performance
CREATE INDEX idx_iocs_type ON public.iocs(type);
CREATE INDEX idx_iocs_severity ON public.iocs(severity);
CREATE INDEX idx_iocs_created_at ON public.iocs(created_at DESC);
CREATE INDEX idx_iocs_indicator ON public.iocs(indicator);
CREATE INDEX idx_alerts_severity ON public.alerts(severity);
CREATE INDEX idx_alerts_status ON public.alerts(status);
CREATE INDEX idx_alerts_created_at ON public.alerts(created_at DESC);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_iocs_updated_at BEFORE UPDATE ON public.iocs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();