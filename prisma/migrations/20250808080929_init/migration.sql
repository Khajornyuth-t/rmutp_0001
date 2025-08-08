-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobile" TEXT NOT NULL CHECK (length("mobile") = 10),
    "cardId" TEXT NOT NULL CHECK (length("cardId") = 13)
);
