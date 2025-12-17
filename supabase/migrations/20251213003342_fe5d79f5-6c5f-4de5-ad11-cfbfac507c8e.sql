-- Create a temporary function to add an admin user (for initial setup)
-- This can be called once to set up the first admin, then removed for security

-- Note: After a user signs up, run this to make them an admin:
-- INSERT INTO public.user_roles (user_id, role) VALUES ('USER_UUID_HERE', 'admin');

-- For now, we'll create a policy that allows authenticated users to insert their own role
-- This will be used during initial setup only
CREATE POLICY "Users can insert their own initial role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);