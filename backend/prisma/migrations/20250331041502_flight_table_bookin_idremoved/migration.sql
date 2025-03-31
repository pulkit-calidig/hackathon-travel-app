/*
  Warnings:

  - You are about to drop the column `bookingId` on the `Flight` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_bookingId_fkey";

-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "bookingId";

-- CreateTable
CREATE TABLE "_BookingToFlight" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookingToFlight_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookingToFlight_B_index" ON "_BookingToFlight"("B");

-- AddForeignKey
ALTER TABLE "_BookingToFlight" ADD CONSTRAINT "_BookingToFlight_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingToFlight" ADD CONSTRAINT "_BookingToFlight_B_fkey" FOREIGN KEY ("B") REFERENCES "Flight"("id") ON DELETE CASCADE ON UPDATE CASCADE;
