/*
  Warnings:

  - You are about to drop the `_BookingToFlight` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookingId` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BookingToFlight" DROP CONSTRAINT "_BookingToFlight_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookingToFlight" DROP CONSTRAINT "_BookingToFlight_B_fkey";

-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "bookingId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_BookingToFlight";

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
