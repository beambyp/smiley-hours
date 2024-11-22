-- CreateTable
CREATE TABLE "PsychologistInfo" (
    "email" TEXT NOT NULL,
    "citizenID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "LicenseNumber" TEXT NOT NULL,
    "PsychologistPhoto" TEXT,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "workplace" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "isSpecializeAdult" BOOLEAN NOT NULL,
    "isSpecializeChildAndTeen" BOOLEAN NOT NULL,
    "isSpecializeElder" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PsychologistInfo_email_key" ON "PsychologistInfo"("email");
