import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Appointment
export async function POST(request: Request) {
    try{
    const {userEmail,psychologistEmail,appointmentDate,symptom} = await request.json();
    const user = await prisma.userInfo.findUnique({
        where: { email: userEmail },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const now = new Date().toISOString();
    const appointmentDateISO = new Date(appointmentDate).toISOString();
    const consentForm = await prisma.consentFormRecord.create({
        data: {
            userEmail,
            name: user.name,
            surname: user.surname,
            dateSigned: now,
        },
    });
    const appointmentRecord = await prisma.appointmentRecord.create({
        data:{
            userEmail,
            psychologistEmail,
            appointmentDate: appointmentDateISO,
            consentFormID: consentForm.consentFormID,
            symptom,
            isCancel: false,
            isSuccess: true,
            createDate: now,
        }
    })
    return new Response(JSON.stringify(appointmentRecord), { status: 200 });
    } catch (error) {
        console.error("Error creating user account:", error);
        return new Response(JSON.stringify({ error: "An error occurred while creating the appointment." }), { status: 500 });
    }
}