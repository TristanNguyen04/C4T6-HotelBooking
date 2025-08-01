/*
  Warnings:

  - You are about to drop the column `currency` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `baseRateInCurrency` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestName` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `includedTaxesAndFeesInCurrency` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomDescription` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomKey` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "currency",
DROP COLUMN "price",
ADD COLUMN     "baseRateInCurrency" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "guestName" TEXT NOT NULL,
ADD COLUMN     "guestNumber" TEXT NOT NULL,
ADD COLUMN     "includedTaxesAndFeesInCurrency" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "request" TEXT,
ADD COLUMN     "roomDescription" TEXT NOT NULL,
ADD COLUMN     "roomImage" TEXT,
ADD COLUMN     "roomKey" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
