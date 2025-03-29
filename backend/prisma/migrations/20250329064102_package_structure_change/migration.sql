/*
  Warnings:

  - You are about to drop the column `city` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `packages` on the `Package` table. All the data in the column will be lost.
  - Added the required column `cityId` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "packages",
ADD COLUMN     "cityId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" "PackageType" NOT NULL;

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
