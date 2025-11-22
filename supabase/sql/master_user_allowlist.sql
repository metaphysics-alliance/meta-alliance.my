-- ============================================================================
-- Master User Allowlist & Role Assignment
-- ============================================================================
-- Purpose:
--   - Define an allowlist of Master Users (grand_master / master_admin).
--   - Ensure these users get elevated roles in public.users when they sign up.
--   - This runs against the shared Supabase project used by Tools + MVP.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.master_user_allowlist (
  email text PRIMARY KEY,
  role text NOT NULL CHECK (role IN ('grand_master', 'master_admin')),
  created_at timestamptz NOT NULL DEFAULT timezone('utc', now())
);

COMMENT ON TABLE public.master_user_allowlist IS 'Allowlist of Master / Admin users by email for elevated roles.';

-- Seed: Grand Master of Metaphysics Alliance
INSERT INTO public.master_user_allowlist (email, role)
VALUES ('sq@meta-alliance.my', 'grand_master')
ON CONFLICT (email) DO UPDATE
  SET role = EXCLUDED.role;

-- Function: apply_master_allowlist
-- After auth.users insert, ensure public.users.role is elevated if email is allowlisted.

CREATE OR REPLACE FUNCTION public.apply_master_allowlist()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.users u
  SET
    role = m.role,
    updated_at = timezone('utc', now())
  FROM public.master_user_allowlist m
  WHERE u.id = NEW.id
    AND lower(m.email) = lower(NEW.email);

  RETURN NEW;
END;
$$;

-- Trigger: run after handle_new_user so base users row exists
DROP TRIGGER IF EXISTS apply_master_allowlist ON auth.users;
CREATE TRIGGER apply_master_allowlist
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.apply_master_allowlist();

