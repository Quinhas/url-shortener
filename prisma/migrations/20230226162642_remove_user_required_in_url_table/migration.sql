-- DropForeignKey
ALTER TABLE "urls" DROP CONSTRAINT "fk_url_user";

-- AlterTable
ALTER TABLE "urls" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "fk_url_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
