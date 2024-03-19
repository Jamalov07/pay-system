/*
  Warnings:

  - You are about to alter the column `card_starts` on the `bank` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(4)`.

*/
-- AlterTable
ALTER TABLE "bank" ALTER COLUMN "card_starts" SET DATA TYPE VARCHAR(4);
