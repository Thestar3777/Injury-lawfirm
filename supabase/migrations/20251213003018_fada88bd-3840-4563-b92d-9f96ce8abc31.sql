-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - admins can view all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create CMS content table
CREATE TABLE public.cms_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT NOT NULL UNIQUE,
    content JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on cms_content
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;

-- Everyone can read CMS content (for the public site)
CREATE POLICY "Anyone can read CMS content"
ON public.cms_content
FOR SELECT
USING (true);

-- Only admins can update CMS content
CREATE POLICY "Admins can update CMS content"
ON public.cms_content
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can insert CMS content
CREATE POLICY "Admins can insert CMS content"
ON public.cms_content
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for CMS images
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-images', 'cms-images', true);

-- Storage policies for CMS images
CREATE POLICY "Anyone can view CMS images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'cms-images');

CREATE POLICY "Admins can upload CMS images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'cms-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update CMS images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'cms-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete CMS images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'cms-images' AND public.has_role(auth.uid(), 'admin'));

-- Trigger to update timestamp
CREATE OR REPLACE FUNCTION public.update_cms_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_cms_content_timestamp
BEFORE UPDATE ON public.cms_content
FOR EACH ROW
EXECUTE FUNCTION public.update_cms_content_updated_at();

-- Insert default content for homepage sections
INSERT INTO public.cms_content (section_key, content) VALUES
('hero', '{"headline": "INJURED? WE FIGHT FOR YOU.", "subheadline": "Over $500 Million Recovered for Injury Victims. No Fee Unless We Win.", "cta_primary": "Free Case Review", "cta_secondary": "Call 24/7"}'),
('attorney', '{"name": "Robert Justice", "title": "Founding Partner", "experience": "25+ Years of Experience", "description": "With over two decades of experience fighting for injury victims, Robert Justice has built a reputation as one of the most formidable personal injury attorneys in the nation."}'),
('contact', '{"phone": "1-800-555-1234", "email": "contact@justicelaw.com", "address": "1000 Justice Plaza, Suite 500", "city": "Los Angeles", "state": "CA", "zip": "90071"}'),
('firm', '{"name": "Justice & Associates", "tagline": "No Fee Unless We Win"}');