-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProposedBet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "creatorAddress" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending'
);
INSERT INTO "new_ProposedBet" ("createdAt", "creatorAddress", "description", "id", "options", "title") SELECT "createdAt", "creatorAddress", "description", "id", "options", "title" FROM "ProposedBet";
DROP TABLE "ProposedBet";
ALTER TABLE "new_ProposedBet" RENAME TO "ProposedBet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
