
-- Fix the function search path issue
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Fix profiles table - restrict to own profile only
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Fix alerts table - add clearance level check
DROP POLICY IF EXISTS "Authenticated users can view alerts" ON public.alerts;
DROP POLICY IF EXISTS "Authenticated users can update alerts" ON public.alerts;

CREATE POLICY "Users can view alerts based on clearance"
  ON public.alerts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND (
        profiles.clearance_level = 'admin' OR
        profiles.clearance_level = 'analyst' OR
        (profiles.clearance_level = 'operator' AND alerts.severity != 'critical')
      )
    )
  );

CREATE POLICY "Analysts and admins can update alerts"
  ON public.alerts
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.clearance_level IN ('admin', 'analyst')
    )
  );

-- Add restrictive policies for write operations on threat_feeds
CREATE POLICY "Only admins can insert threat feeds"
  ON public.threat_feeds
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.clearance_level = 'admin'
    )
  );

CREATE POLICY "Only admins can update threat feeds"
  ON public.threat_feeds
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.clearance_level = 'admin'
    )
  );

CREATE POLICY "Only admins can delete threat feeds"
  ON public.threat_feeds
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.clearance_level = 'admin'
    )
  );

-- Add restrictive policies for enrichment_data
CREATE POLICY "Only admins and analysts can insert enrichment data"
  ON public.enrichment_data
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.clearance_level IN ('admin', 'analyst')
    )
  );

CREATE POLICY "Only admins can update enrichment data"
  ON public.enrichment_data
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.clearance_level = 'admin'
    )
  );

CREATE POLICY "Only admins can delete enrichment data"
  ON public.enrichment_data
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.clearance_level = 'admin'
    )
  );

-- Add restrictive policies for alerts creation and deletion
CREATE POLICY "Analysts and admins can insert alerts"
  ON public.alerts
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.clearance_level IN ('admin', 'analyst')
    )
  );

CREATE POLICY "Only admins can delete alerts"
  ON public.alerts
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid()
      AND profiles.clearance_level = 'admin'
    )
  );
