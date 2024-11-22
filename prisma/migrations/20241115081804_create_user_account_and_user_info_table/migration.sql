/*
  Warnings:

  - You are about to drop the column `LicenseNumber` on the `PsychologistInfo` table. All the data in the column will be lost.
  - You are about to drop the column `PsychologistPhoto` on the `PsychologistInfo` table. All the data in the column will be lost.
  - Added the required column `licenseNumber` to the `PsychologistInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PsychologistInfo" DROP COLUMN "LicenseNumber",
DROP COLUMN "PsychologistPhoto",
ADD COLUMN     "licenseNumber" TEXT NOT NULL,
ADD COLUMN     "psychologistPhoto" TEXT;

-- CreateTable
CREATE TABLE "UserAccount" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "isApprove" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_email_key" ON "UserAccount"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_email_key" ON "UserInfo"("email");
