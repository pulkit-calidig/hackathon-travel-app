/*
  Warnings:

  - You are about to drop the column `flightId` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Itinerary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "flightId",
DROP COLUMN "status";
