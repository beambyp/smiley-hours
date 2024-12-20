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
            const availableDateStart = new Date(x.appointmentDate);
            const availableDateEnd = new Date(x.appointmentDate); 
            availableDateEnd.setHours(availableDateEnd.getHours() + 1);
            return {
                AppointmentID: x.appointmentID,
                UserEmail: x.userInfo.email,
                Name: x.userInfo.name + " " + x.userInfo.surname,
                symptom: x.symptom,
                treatmentDate: availableDateStart.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }), 
                treatmentStartTime: availableDateStart.toLocaleTimeString("th-TH", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                treatmentEndTime: availableDateEnd.toLocaleTimeString("th-TH", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
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