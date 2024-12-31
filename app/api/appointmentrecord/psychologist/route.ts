import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get All Appointment
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
                appointmentDate: {
                    gte: now, 
                },
            },
            include: {
                userInfo: true
            },
        });

        const res = appointment.map(x => ({
            appointmentId: x.appointmentID,
            appointmentDate: x.appointmentDate,
            psychologistName: x.userInfo.name + " " + x.userInfo.surname,
            isCancel: x.isCancel,
            isSuccess: x.isSuccess,
            symptom: x.symptom,
        })).sort((a, b) => {
            const dateA = new Date(a.appointmentDate);
            const dateB = new Date(b.appointmentDate);

            return dateA.getTime() - dateB.getTime();
        });

        return new Response(JSON.stringify(res), { status: 200 });

    } catch (error) {
        return new Response(
            JSON.stringify({ error: `An error occurred while getting the appointment information: ${error}` }),
            { status: 500 }
        );
    }
}
