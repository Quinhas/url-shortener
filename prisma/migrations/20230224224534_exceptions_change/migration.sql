/*
  Warnings:

  - You are about to drop the column `params` on the `exceptions` table. All the data in the column will be lost.
  - Added the required column `method` to the `exceptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exceptions" DROP COLUMN "params",
ADD COLUMN     "method" VARCHAR(5) NOT NULL,
ADD COLUMN     "query" JSONB;
