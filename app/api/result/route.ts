import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get All Appointment for psychologist that does not diagnosis 
export async function GET(request: Request) { 
    try {
        const { searchParams } = new URL(request.url); 
        const user = searchParams.get('user'); 
        const now = new Date();

        if (user == null) {
            return new Response(
                JSON.stringify({ error: "User not provided" }),
                { status: 400 }
            );
        }

        const appointment = await prisma.appointmentRecord.findMany({
            where: {
                psychologistEmail: user,
                isSuccess: true,
                appointmentDate: {
                    lte: now, 
                },
                isDiagnosis: false,
            },
            include: {
                userInfo: true
            },
        });

        const res = appointment.map((x) => {
            return {
                AppointmentID: x.appointmentID,
                UserEmail: x.userInfo.email,
                Name: x.userInfo.name + " " + x.userInfo.surname,
                symptom: x.symptom,
                appointmentDate: x.appointmentDate,
                };
        });
        return new Response(JSON.stringify(res), { status: 200 });

    } catch (error) {
        return new Response(
            JSON.stringify({ error: `An error occurred while getting the appointment information: ${error}` }),
            { status: 500 }
        );
    }
}