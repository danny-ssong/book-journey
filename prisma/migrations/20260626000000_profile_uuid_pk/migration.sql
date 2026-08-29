-- profile PK를 int → uuid(= auth.users.id)로 전환한다.
--
-- cross-schema FK(profile.id → auth.users.id)는 일부러 만들지 않는다.
-- Prisma가 cross-schema 참조를 introspect하지 못해(P4002) drift 검증이 막히기 때문.
-- auth.users ↔ public.profile 정합성은 다음 마이그레이션의 트리거가 담당한다.


-- ① 기존 cross-schema FK 제거 (전환 전 로컬 부트스트랩이 붙여두던 것)
ALTER TABLE public.profile
  DROP CONSTRAINT IF EXISTS profile_user_id_auth_fkey;

ALTER TABLE public.post
  DROP CONSTRAINT IF EXISTS post_user_id_auth_fkey;

-- ② profile.user_id unique 제거 (PK로 대체)
-- prisma db push는 이걸 CONSTRAINT가 아니라 순수 INDEX로 만든다.
-- DROP CONSTRAINT만으로는 no-op이 되어 id에 중복 unique 인덱스가 남으므로 INDEX도 함께 제거한다.
ALTER TABLE public.profile
  DROP CONSTRAINT IF EXISTS profile_user_id_key;

DROP INDEX IF EXISTS public.profile_user_id_key;

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

-- 복합 PK(profile_id, author_id)는 profile_id 컬럼을 DROP할 때 함께 사라진다. 재생성 필요.
ALTER TABLE public.profile_most_read_author
  ADD CONSTRAINT profile_most_read_author_pkey PRIMARY KEY (profile_id, author_id);

-- ⑤ profile PK: int 제거, user_id → id(uuid) 승격
ALTER TABLE public.profile
  DROP CONSTRAINT IF EXISTS profile_pkey;

ALTER TABLE public.profile
  DROP COLUMN id;             -- serial sequence도 함께 제거됨

ALTER TABLE public.profile
  RENAME COLUMN user_id TO id;

ALTER TABLE public.profile
  ADD PRIMARY KEY (id);

-- ⑥ (profile.id → auth.users.id FK 추가) — 의도적으로 제외. 파일 상단 주석 참고.

-- ⑦ post.user_id → profile.id FK 재부착
-- 이름은 Prisma 관례(post_user_id_fkey)를 따른다. 다른 이름을 쓰면 migrate diff가
-- 매번 drift로 보고한다. baseline에는 같은 이름의 FK가 이미 있고(profile.user_id 참조)
-- 운영에는 없으므로, DROP IF EXISTS 후 재생성해 양쪽 경로를 동일한 결과로 수렴시킨다.
ALTER TABLE public.post
  DROP CONSTRAINT IF EXISTS post_user_id_fkey;

ALTER TABLE public.post
  ADD CONSTRAINT post_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES public.profile(id) ON DELETE NO ACTION;

-- ⑧ profile_most_read_author FK 복원
-- ON UPDATE CASCADE는 Prisma가 required relation에 적용하는 기본값이다.
-- 생략하면 NO ACTION이 되어 migrate diff가 매번 drift로 보고한다.
ALTER TABLE public.profile_most_read_author
  ADD CONSTRAINT profile_most_read_author_profile_id_fkey
  FOREIGN KEY (profile_id) REFERENCES public.profile(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- ⑨ 인덱스 재생성
DROP INDEX IF EXISTS public.profile_most_read_author_profile_id_idx;
CREATE INDEX profile_most_read_author_profile_id_idx
  ON public.profile_most_read_author(profile_id);

