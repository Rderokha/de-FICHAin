/*
  Warnings:

  - The primary key for the `Bet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Bet` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Bet` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `options` on the `Bet` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "creatorAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL
);
INSERT INTO "new_Bet" ("creatorAddress", "description", "id", "options", "status", "title") SELECT "creatorAddress", "description", "id", "options", "status", "title" FROM "Bet";
DROP TABLE "Bet";
ALTER TABLE "new_Bet" RENAME TO "Bet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
