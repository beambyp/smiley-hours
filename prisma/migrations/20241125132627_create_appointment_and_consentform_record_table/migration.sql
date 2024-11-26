-- CreateTable
CREATE TABLE "AppointmentRecord" (
    "appointmentID" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "psychologistEmail" TEXT NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "consentFormID" INTEGER NOT NULL,
    "symptom" TEXT NOT NULL,
    "isCancel" BOOLEAN NOT NULL,
    "isSuccess" BOOLEAN NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ConsentFormRecord" (
    "consentFormID" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "dateSigned" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentRecord_appointmentID_key" ON "AppointmentRecord"("appointmentID");

-- CreateIndex
CREATE UNIQUE INDEX "ConsentFormRecord_consentFormID_key" ON "ConsentFormRecord"("consentFormID");

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_email_fkey" FOREIGN KEY ("email") REFERENCES "UserAccount"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PsychologistInfo" ADD CONSTRAINT "PsychologistInfo_email_fkey" FOREIGN KEY ("email") REFERENCES "UserAccount"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
