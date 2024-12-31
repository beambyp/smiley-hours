import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: Request) { 
    try {
        const { email,role } = await request.json();
        const now = new Date();

        let appointment;
        let res;
        if(role=="User"){
            appointment = await prisma.appointmentRecord.findMany({
                where: {
                    userEmail: email,
                    isSuccess: true,
                    appointmentDate: {
                        //gte: now,
                        //lt: new Date(now.getTime() + 1 * 60 * 60 * 1000), 
                        gte: new Date(now.getTime() - 60 * 60 * 1000), // 1 hour before now
                        lt: new Date(now.getTime() + 60 * 60 * 1000), // 1 hour after now
                    },
                },
                include: {
                    psychologistInfo: true
                },
            });
            res = appointment.map(x => ({
                appointmentDate: x.appointmentDate,
                Name: x.psychologistInfo.name + " " + x.psychologistInfo.surname,
            }));
        }
        else{
            appointment = await prisma.appointmentRecord.findMany({
                where: {             
                    psychologistEmail: email,
                    isSuccess: true,
                    appointmentDate: {
                        gte: new Date(now.getTime() - 60 * 60 * 1000), // 1 hour before now
                        lt: new Date(now.getTime() + 60 * 60 * 1000), // 1 hour after now
                    },
                },
                include: {
                    userInfo: true
                },
            });
            res = appointment.map(x => ({
                appointmentDate: x.appointmentDate,
                Name: x.userInfo.name + " " + x.userInfo.surname,
            }));
        }
        return new Response(JSON.stringify(res), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: `An error occurred while getting the appointment information: ${error}` }),
            { status: 500 }
        );
    }
}
