-- DropIndex
DROP INDEX "AppointmentRecord_appointmentID_key";

-- DropIndex
DROP INDEX "ConsentFormRecord_consentFormID_key";

-- AlterTable
CREATE SEQUENCE appointmentrecord_appointmentid_seq;
ALTER TABLE "AppointmentRecord" ALTER COLUMN "appointmentID" SET DEFAULT nextval('appointmentrecord_appointmentid_seq'),
ADD CONSTRAINT "AppointmentRecord_pkey" PRIMARY KEY ("appointmentID");
ALTER SEQUENCE appointmentrecord_appointmentid_seq OWNED BY "AppointmentRecord"."appointmentID";

-- AlterTable
CREATE SEQUENCE consentformrecord_consentformid_seq;
ALTER TABLE "ConsentFormRecord" ALTER COLUMN "consentFormID" SET DEFAULT nextval('consentformrecord_consentformid_seq'),
ADD CONSTRAINT "ConsentFormRecord_pkey" PRIMARY KEY ("consentFormID");
ALTER SEQUENCE consentformrecord_consentformid_seq OWNED BY "ConsentFormRecord"."consentFormID";
