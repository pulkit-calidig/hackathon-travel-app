/*
  Warnings:

  - Added the required column `status` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "status" INTEGER NOT NULL;
