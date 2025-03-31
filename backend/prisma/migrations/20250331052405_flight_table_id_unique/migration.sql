/*
  Warnings:

  - A unique constraint covering the columns `[bookingId]` on the table `Flight` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Flight_bookingId_key" ON "Flight"("bookingId");
