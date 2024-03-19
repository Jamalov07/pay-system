-- CreateTable
CREATE TABLE "increment_wallet_number" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "num" TEXT NOT NULL DEFAULT '000000000000000000',

    CONSTRAINT "increment_wallet_number_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "increment_card_number" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "num" TEXT NOT NULL DEFAULT '000000000000',

    CONSTRAINT "increment_card_number_pkey" PRIMARY KEY ("id")
);
