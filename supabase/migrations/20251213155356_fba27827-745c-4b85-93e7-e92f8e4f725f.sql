-- Create a security definer function to return only public CMS content fields
CREATE OR REPLACE FUNCTION public.get_public_cms_content(p_section_key text DEFAULT NULL)
RETURNS TABLE (
  id uuid,
  section_key text,
  content jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    c.id,
    c.section_key,
    c.content
  FROM public.cms_content c
  WHERE (p_section_key IS NULL OR c.section_key = p_section_key);
$$;

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can read CMS content" ON public.cms_content;

-- Create a new policy that only allows admins to SELECT (for admin panel)
CREATE POLICY "Only admins can read full CMS content"
ON public.cms_content
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));