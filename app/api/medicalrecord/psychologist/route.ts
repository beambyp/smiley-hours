import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get All Medical Record (Psychologist)
export async function GET(request: Request) { 
    try {
        const { searchParams } = new URL(request.url); 
        const user = searchParams.get('user'); 
        if (user == null) {
            return new Response(
                JSON.stringify({ error: "User not provided" }),
                { status: 400 }
            );
        }

        const record = await prisma.medicalRecord.findMany({
            where: {
                psychologistEmail: user,
            },
            include: {
                userInfo: true
            },
        });
        
        const res = record.map((x) => {
            const availableDateStart = new Date(x.treatmentDate);
            const availableDateEnd = new Date(x.treatmentDate); 
            availableDateEnd.setHours(availableDateEnd.getHours() + 1);
            return {
                Name: x.userInfo.name + " " + x.userInfo.surname,
                symptom: x.symptom,
                diagnosis: x.diagnosis,
                advice: x.advice,
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
            JSON.stringify({ error: `An error occurred while getting the medical record information: ${error}` }),
            { status: 500 }
        );
    }
}

// Create Medical Record (Psychologist)
// export async function POST(request: Request) {
//     try{
//         const {id} = await request.json();
//         if(id == null){
//             return new Response(
//                 JSON.stringify({ error: "AppointmentID Invalid" }),
//                 { status: 400 }
//             );
//         }
//         const cancelAppointment = await prisma.appointmentRecord.update({
//             where: {
//               appointmentID: id,
//             },
//             data: {
//               isCancel: true,
//             },
//           })
//         return new Response(JSON.stringify(cancelAppointment), { status: 200 });
//     }
//     catch(error){
//         return new Response(
//             JSON.stringify({ error: `An error occurred while cancel the appointment: ${error}` }), { status: 500 }
//           );
//     }
// }