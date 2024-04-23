/*
  Warnings:

  - You are about to drop the `MinutesLeft` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MinutesLeft" DROP CONSTRAINT "MinutesLeft_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "minutesLeft" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "MinutesLeft";
