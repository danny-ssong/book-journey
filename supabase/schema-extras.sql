-- Prisma가 처리 불가한 cross-schema 정의.
-- prisma db push 직후 seed-local.ts에서 자동 실행됨. 멱등하게 작성.

-- profile.id → auth.users.id (Prisma는 cross-schema FK를 지원하지 않음)
ALTER TABLE public.profile
  DROP CONSTRAINT IF EXISTS profile_id_auth_fkey;

ALTER TABLE public.profile
  ADD CONSTRAINT profile_id_auth_fkey
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 신규 유저 자동 profile 생성 트리거 (로컬 환경용)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profile (id, nickname, name, role, version, created_at, updated_at)
  VALUES (
    NEW.id,
    'user-' || substr(NEW.id::text, 1, 8),
    COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name',
      'anonymous'
    ),
    'user',
    1,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
