-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "cardId" TEXT NOT NULL
);
-- AddLengthConstraints
ALTER TABLE "User" ADD CONSTRAINT "chk_mobile_length" CHECK (length("mobile") = 10);
ALTER TABLE "User" ADD CONSTRAINT "chk_cardId_length" CHECK (length("cardId") = 13);