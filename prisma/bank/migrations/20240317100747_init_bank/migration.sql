-- CreateTable
CREATE TABLE "bank" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "bank_pkey" PRIMARY KEY ("id")
);
