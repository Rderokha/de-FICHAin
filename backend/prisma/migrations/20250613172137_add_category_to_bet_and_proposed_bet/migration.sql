-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "creatorAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Bet" ("category", "createdAt", "creatorAddress", "description", "id", "options", "status", "title") SELECT "category", "createdAt", "creatorAddress", "description", "id", "options", "status", "title" FROM "Bet";
DROP TABLE "Bet";
ALTER TABLE "new_Bet" RENAME TO "Bet";
CREATE TABLE "new_ProposedBet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "creatorAddress" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending'
);
INSERT INTO "new_ProposedBet" ("category", "createdAt", "creatorAddress", "description", "id", "options", "status", "title") SELECT "category", "createdAt", "creatorAddress", "description", "id", "options", "status", "title" FROM "ProposedBet";
DROP TABLE "ProposedBet";
ALTER TABLE "new_ProposedBet" RENAME TO "ProposedBet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
