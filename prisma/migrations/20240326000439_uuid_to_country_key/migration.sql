/*
  Warnings:

  - You are about to drop the column `key` on the `Country` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Country_key_key";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "key";
