import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Appointment
export async function POST(request: Request) {
    try{
    let appointmentRecord;
    const {userEmail,psychologistEmail,role,appointmentDate,symptom} = await request.json();
    if(role == "User"){ //User
        const user = await prisma.userInfo.findUnique({
            where: { email: userEmail },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const now = new Date();
        const nowISO = now.toISOString();
        const appointmentDateObj = new Date(appointmentDate);
        const appointmentDateISO = appointmentDateObj.toISOString();
        const consentForm = await prisma.consentFormRecord.create({
            data: {
                userEmail,
                name: user.name,
                surname: user.surname,
                dateSigned: nowISO,
            },
        });

        if (!consentForm) {
            throw new Error("Failed to create consent form");
        }
        appointmentRecord = await prisma.appointmentRecord.create({
            data:{
                userEmail,
                psychologistEmail,
                appointmentDate: appointmentDateISO,
                consentFormID: consentForm.consentFormID,
                symptom,
                isCancel: false,
                isSuccess: true,
                isDiagnosis: false,
                createDate: now,
            }
        })
    }
    else{ //Psychologist 
        const user = await prisma.psychologistInfo.findUnique({
            where: { email: psychologistEmail },
        });
        if (!user) {
            throw new Error("Psychologist not found");
        }
        const now = new Date();
        const nowISO = now.toISOString();
        const appointmentDateObj = new Date(appointmentDate);
        const appointmentDateISO = appointmentDateObj.toISOString();
        appointmentRecord = await prisma.appointmentRecord.create({
            data:{
                userEmail,
                psychologistEmail,
                appointmentDate: appointmentDateISO,
                consentFormID: null,
                symptom: symptom,
                isCancel: false,
                isSuccess: false,
                isDiagnosis: false,
                createDate: nowISO,
            }
        })
    }
    return new Response(JSON.stringify(appointmentRecord), { status: 200 });
    } catch (error) {
        console.error("Error creating appointment:", error);
        return new Response(JSON.stringify({ error: "An error occurred while creating the appointment." }), { status: 500 });
    }
}