/*
  Warnings:

  - Added the required column `iataCode` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iataCode` to the `Origin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "iataCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Origin" ADD COLUMN     "iataCode" TEXT NOT NULL;
