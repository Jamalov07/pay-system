/*
  Warnings:

  - Added the required column `card_starts` to the `bank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `bank` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "wallet_type" AS ENUM ('card', 'account_number');

-- AlterTable
ALTER TABLE "bank" ADD COLUMN     "address" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "card_expiration" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "card_starts" INTEGER NOT NULL,
ADD COLUMN     "is_main" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" VARCHAR(50) NOT NULL;

-- CreateTable
CREATE TABLE "wallet" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "bank_id" UUID NOT NULL,
    "owner_id" UUID,
    "company_id" UUID,
    "type" "wallet_type" NOT NULL,
    "number" INTEGER NOT NULL,
    "expired_date" DATE NOT NULL,
    "password" INTEGER,
    "balance" BIGINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_history" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "from_wallet_id" UUID NOT NULL,
    "to_wallet_id" UUID NOT NULL,
    "money_amount" BIGINT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "payment_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "bank"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment_history" ADD CONSTRAINT "payment_history_to_wallet_id_fkey" FOREIGN KEY ("to_wallet_id") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment_history" ADD CONSTRAINT "payment_history_from_wallet_id_fkey" FOREIGN KEY ("from_wallet_id") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
