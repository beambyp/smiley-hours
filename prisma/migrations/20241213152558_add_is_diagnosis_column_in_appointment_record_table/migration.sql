-- AlterTable
ALTER TABLE "AppointmentRecord" ADD COLUMN     "isDiagnosis" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "UserInfo"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
