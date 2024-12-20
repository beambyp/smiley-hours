-- AddForeignKey
ALTER TABLE "AppointmentRecord" ADD CONSTRAINT "AppointmentRecord_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "UserInfo"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
