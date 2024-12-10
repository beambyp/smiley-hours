-- CreateTable
CREATE TABLE "PsychologistShift" (
    "shiftID" SERIAL NOT NULL,
    "psychologistEmail" TEXT NOT NULL,
    "availableDateStart" TIMESTAMP(3) NOT NULL,
    "availableDateEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PsychologistShift_pkey" PRIMARY KEY ("shiftID")
);

-- AddForeignKey
ALTER TABLE "AppointmentRecord" ADD CONSTRAINT "AppointmentRecord_psychologistEmail_fkey" FOREIGN KEY ("psychologistEmail") REFERENCES "PsychologistInfo"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
