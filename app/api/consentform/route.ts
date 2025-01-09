import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Appointment
export async function POST(request: Request) {
    try{
    const {id,userEmail} = await request.json();
    const now = new Date().toISOString();
        if(id == null){
            return new Response(
                JSON.stringify({ error: "AppointmentID Invalid" }),
                { status: 400 }
            );
        }
        const user = await prisma.userInfo.findUnique({
            where: { email: userEmail },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const consentForm = await prisma.consentFormRecord.create({
            data: {
                userEmail,
                name: user.name,
                surname: user.surname,
                dateSigned: now,
            },
        });
        if(!consentForm){
            throw new Error("Error creating consent form");
        }
        const updateAppointment = await prisma.appointmentRecord.update({
            where: {
              appointmentID: id,
            },
            data: {
                consentFormID: consentForm.consentFormID,
                isSuccess: true,
            },
          });
        return new Response(JSON.stringify(updateAppointment), { status: 200 });
    } catch (error) {
        console.error("Error creating consent form:", error);
        return new Response(JSON.stringify({ error: "An error occurred while creating the consent form." }), { status: 500 });
    }
}