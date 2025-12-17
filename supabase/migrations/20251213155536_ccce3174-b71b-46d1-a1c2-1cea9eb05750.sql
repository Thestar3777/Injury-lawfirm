-- Drop the unsafe policy that allows users to assign any role
DROP POLICY IF EXISTS "Users can insert their own initial role" ON public.user_roles;

-- Create a new policy that only allows users to insert the 'user' role for themselves
CREATE POLICY "Users can only insert user role for themselves"
ON public.user_roles
FOR INSERT
WITH CHECK (
  auth.uid() = user_id 
  AND role = 'user'::app_role
);

-- Ensure admins can insert any role (for granting admin privileges)
CREATE POLICY "Admins can insert any role"
ON public.user_roles
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));