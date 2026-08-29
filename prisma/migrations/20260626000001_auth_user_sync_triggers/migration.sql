-- auth.users ↔ public.profile 동기화 트리거.
--
-- cross-schema FK를 두지 않기로 했으므로(이전 마이그레이션 주석 참고)
-- FK가 보장하던 것을 트리거 두 개가 대신한다.
--   INSERT: 신규 가입 시 profile 자동 생성 (callback route와 중복 실행돼도 안전하도록 멱등)
--   DELETE: auth.users 삭제 시 profile 정리 (구 FK의 ON DELETE CASCADE 대체)
--
-- SECURITY DEFINER 함수는 search_path를 고정한다. 고정하지 않으면 호출자가
-- search_path를 조작해 정의자 권한으로 임의 함수를 실행시킬 수 있다.
-- 따라서 아래 식별자는 전부 스키마까지 명시한다.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.handle_deleted_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  DELETE FROM public.profile WHERE id = OLD.id;
  RETURN OLD;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_deleted_user();
