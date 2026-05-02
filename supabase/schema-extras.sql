-- Prisma가 다루지 못하는 cross-schema 정의 모음.
-- prisma db push 직후, seed 데이터 적용 직전에 한 번 실행한다.
-- (멱등하게 작성 — 여러 번 실행해도 안전)
--
-- 1) profile.user_id → auth.users.id (ON DELETE CASCADE)
--    auth.users 삭제 시 profile도 함께 정리.
-- 2) post.user_id → auth.users.id (ON DELETE NO ACTION)
--    글쓴이 계정이 사라져도 post는 보존 — user_id는 그대로 두고 profile 조인은 LEFT.

-- Prisma가 schema.prisma의 Post.profile relation을 보고 자동 생성한
-- post.user_id → profile.user_id FK는 의미가 어긋난다 (글쓴이는 auth.users가 진실).
-- Prisma는 client-side join으로 동작하므로 DB FK가 없어도 코드 동작에 문제 없음.
ALTER TABLE public.post
  DROP CONSTRAINT IF EXISTS post_user_id_fkey;

ALTER TABLE public.profile
  DROP CONSTRAINT IF EXISTS profile_user_id_auth_fkey;

ALTER TABLE public.profile
  ADD CONSTRAINT profile_user_id_auth_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.post
  DROP CONSTRAINT IF EXISTS post_user_id_auth_fkey;

ALTER TABLE public.post
  ADD CONSTRAINT post_user_id_auth_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE NO ACTION ON UPDATE NO ACTION;
