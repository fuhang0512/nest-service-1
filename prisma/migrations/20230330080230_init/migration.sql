/*
  Warnings:

  - Added the required column `body` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "body" TEXT NOT NULL;
