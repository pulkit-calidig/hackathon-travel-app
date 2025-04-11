-- DropForeignKey
ALTER TABLE "Stop" DROP CONSTRAINT "Stop_bookingId_fkey";

-- AddForeignKey
ALTER TABLE "Stop" ADD CONSTRAINT "Stop_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
