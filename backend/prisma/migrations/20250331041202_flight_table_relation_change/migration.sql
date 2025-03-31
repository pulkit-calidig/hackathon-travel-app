-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_bookingId_fkey";

-- DropIndex
DROP INDEX "Flight_bookingId_key";

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;
