-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
