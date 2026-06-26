BEGIN;

-- ① schema-extras가 추가한 cross-schema FK 제거
ALTER TABLE public.profile
  DROP CONSTRAINT IF EXISTS profile_user_id_auth_fkey;

ALTER TABLE public.post
  DROP CONSTRAINT IF EXISTS post_user_id_auth_fkey;

-- ② profile.user_id unique 제약 제거 (PK로 대체)
ALTER TABLE public.profile
  DROP CONSTRAINT IF EXISTS profile_user_id_key;

-- ③ profile_most_read_author FK 제거 (profile.id int 참조 중)
ALTER TABLE public.profile_most_read_author
  DROP CONSTRAINT IF EXISTS profile_most_read_author_profile_id_fkey;

-- ④ profile_most_read_author.profile_id: int → uuid 데이터 변환
ALTER TABLE public.profile_most_read_author
  ADD COLUMN profile_id_new uuid;

UPDATE public.profile_most_read_author pma
SET profile_id_new = p.user_id
FROM public.profile p
WHERE p.id = pma.profile_id;

-- NULL 체크: JOIN 실패한 row가 있으면 롤백
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.profile_most_read_author WHERE profile_id_new IS NULL
  ) THEN
    RAISE EXCEPTION 'profile_most_read_author에 매핑 실패한 row 존재 — 운영 DB 데이터 확인 필요';
  END IF;
END $$;

ALTER TABLE public.profile_most_read_author
  DROP COLUMN profile_id;

ALTER TABLE public.profile_most_read_author
  RENAME COLUMN profile_id_new TO profile_id;

ALTER TABLE public.profile_most_read_author
  ALTER COLUMN profile_id SET NOT NULL;

-- ⑤ profile PK: int 제거, user_id → id(uuid) 승격
ALTER TABLE public.profile
  DROP CONSTRAINT IF EXISTS profile_pkey;

ALTER TABLE public.profile
  DROP COLUMN id;             -- serial sequence도 함께 제거됨

ALTER TABLE public.profile
  RENAME COLUMN user_id TO id;

ALTER TABLE public.profile
  ADD PRIMARY KEY (id);

-- ⑥ profile.id → auth.users.id FK 추가
ALTER TABLE public.profile
  ADD CONSTRAINT profile_id_auth_fkey
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- ⑦ post.user_id → profile.id FK 추가
ALTER TABLE public.post
  ADD CONSTRAINT post_user_id_profile_fkey
  FOREIGN KEY (user_id) REFERENCES public.profile(id) ON DELETE NO ACTION;

-- ⑧ profile_most_read_author FK 복원
ALTER TABLE public.profile_most_read_author
  ADD CONSTRAINT profile_most_read_author_profile_id_fkey
  FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON DELETE CASCADE;

-- ⑨ 인덱스 재생성
DROP INDEX IF EXISTS public.profile_most_read_author_profile_id_idx;
CREATE INDEX profile_most_read_author_profile_id_idx
  ON public.profile_most_read_author(profile_id);

COMMIT;
