/*
  Warnings:

  - Added the required column `commit` to the `Build` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Build" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "commit" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    CONSTRAINT "Build_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Build" ("createdAt", "id", "projectId", "status", "updatedAt") SELECT "createdAt", "id", "projectId", "status", "updatedAt" FROM "Build";
DROP TABLE "Build";
ALTER TABLE "new_Build" RENAME TO "Build";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
