/*
  Warnings:

  - You are about to drop the column `packageId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Itinerary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookingId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_packageId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "packageId",
ADD COLUMN     "bookingId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Itinerary";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
