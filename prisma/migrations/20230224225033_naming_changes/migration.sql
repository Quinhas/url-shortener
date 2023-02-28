/*
  Warnings:

  - You are about to drop the column `dateTime` on the `exceptions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `exceptions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `urls` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `urls` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `urls` table. All the data in the column will be lost.
  - Added the required column `date_time` to the `exceptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `urls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `urls` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exceptions" DROP CONSTRAINT "fk_exception_user";

-- DropForeignKey
ALTER TABLE "urls" DROP CONSTRAINT "fk_url_user";

-- AlterTable
ALTER TABLE "exceptions" DROP COLUMN "dateTime",
DROP COLUMN "userId",
ADD COLUMN     "date_time" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "user_id" UUID;

-- AlterTable
ALTER TABLE "urls" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "fk_url_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exceptions" ADD CONSTRAINT "fk_exception_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
