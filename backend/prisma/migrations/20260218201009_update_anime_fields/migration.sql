/*
  Warnings:

  - You are about to drop the column `notes` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Anime` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Anime_userId_idx";

-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "notes",
DROP COLUMN "score",
DROP COLUMN "status",
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "episodes" INTEGER,
ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "watchedDate" TIMESTAMP(3);
