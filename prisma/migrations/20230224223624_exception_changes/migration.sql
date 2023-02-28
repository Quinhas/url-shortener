/*
  Warnings:

  - The `headers` column on the `exceptions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `params` column on the `exceptions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `body` column on the `exceptions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "exceptions" DROP COLUMN "headers",
ADD COLUMN     "headers" JSONB,
DROP COLUMN "params",
ADD COLUMN     "params" JSONB,
DROP COLUMN "body",
ADD COLUMN     "body" JSONB;
