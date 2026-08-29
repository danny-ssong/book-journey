-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL,
    "isbn" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "contents" VARCHAR NOT NULL,
    "url" VARCHAR NOT NULL,
    "publisher" VARCHAR NOT NULL,
    "thumbnail_url" VARCHAR NOT NULL,
    "published_at" TIMESTAMP(6) NOT NULL,
    "author_id" INTEGER,

    CONSTRAINT "book_pkey" PRIMARY KEY ("isbn")
);

-- CreateTable
CREATE TABLE "post" (
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "content" VARCHAR,
    "rating" INTEGER NOT NULL,
    "start_date" TIMESTAMP(6) NOT NULL,
    "is_private" BOOLEAN NOT NULL,
    "deleted_at" TIMESTAMP(6),
    "user_id" UUID,
    "book_isbn" VARCHAR,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "nickname" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL DEFAULT 'user',
    "avatar_url" VARCHAR,
    "bio" VARCHAR,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_most_read_author" (
    "profile_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "profile_most_read_author_pkey" PRIMARY KEY ("profile_id","author_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "author_name_key" ON "author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_nickname_key" ON "profile"("nickname");

-- CreateIndex
CREATE INDEX "profile_most_read_author_author_id_idx" ON "profile_most_read_author"("author_id");

-- CreateIndex
CREATE INDEX "profile_most_read_author_profile_id_idx" ON "profile_most_read_author"("profile_id");

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profile"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_book_isbn_fkey" FOREIGN KEY ("book_isbn") REFERENCES "book"("isbn") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile_most_read_author" ADD CONSTRAINT "profile_most_read_author_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile_most_read_author" ADD CONSTRAINT "profile_most_read_author_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

