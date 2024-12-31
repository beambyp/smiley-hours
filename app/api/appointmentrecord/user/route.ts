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
                userEmail: user,
                appointmentDate: {
                    gte: now, 
                },
            },
            include: {
                psychologistInfo: true
            },
        });

        const res = appointment.map(x => ({
            appointmentId: x.appointmentID,
            appointmentDate: x.appointmentDate,
            psychologistName: x.psychologistInfo.name + " " + x.psychologistInfo.surname,
            isCancel: x.isCancel,
            isSuccess: x.isSuccess,
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


// Cancel Appointment 
export async function POST(request: Request) {
    try{
        const {id} = await request.json();
        if(id == null){
            return new Response(
                JSON.stringify({ error: "AppointmentID Invalid" }),
                { status: 400 }
            );
        }
        const cancelAppointment = await prisma.appointmentRecord.update({
            where: {
              appointmentID: id,
            },
            data: {
              isCancel: true,
            },
          })
        return new Response(JSON.stringify(cancelAppointment), { status: 200 });
    }
    catch(error){
        return new Response(
            JSON.stringify({ error: `An error occurred while cancel the appointment: ${error}` }), { status: 500 }
          );
    }
}