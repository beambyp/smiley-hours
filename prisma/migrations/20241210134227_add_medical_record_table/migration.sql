-- CreateTable
CREATE TABLE "MedicalRecord" (
    "recordID" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "psychologistEmail" TEXT NOT NULL,
    "treatmentDate" TIMESTAMP(3) NOT NULL,
    "symptom" VARCHAR(1024) NOT NULL,
    "diagnosis" VARCHAR(1024) NOT NULL,
    "advice" VARCHAR(1024) NOT NULL,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("recordID")
);

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_psychologistEmail_fkey" FOREIGN KEY ("psychologistEmail") REFERENCES "PsychologistInfo"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
