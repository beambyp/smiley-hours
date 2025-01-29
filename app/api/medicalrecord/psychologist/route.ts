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
            return {
                Name: x.userInfo.name + " " + x.userInfo.surname,
                symptom: x.symptom,
                diagnosis: x.diagnosis,
                advice: x.advice,
                appointmentDate: x.treatmentDate,
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
export async function POST(request: Request) {
    try{
        const {AppointmentID,psychologistemail,symptom,diagnosis,advice} = await request.json();
        if (!AppointmentID || !psychologistemail || !symptom || !diagnosis || !advice) {
            throw new Error("Missing required fields in the request body");
        }
        const appointment = await prisma.appointmentRecord.update({
            where: {
                appointmentID: AppointmentID,
            },
            data: {
                isDiagnosis: true,
            }, 
        });
        const medicalRecord = await prisma.medicalRecord.create({
            data:{
                userEmail: appointment.userEmail,
                psychologistEmail: psychologistemail,
                treatmentDate: appointment.appointmentDate,
                symptom: symptom,
                diagnosis: diagnosis,
                advice: advice,
            }
        })
        return new Response(JSON.stringify(medicalRecord), { status: 200 });
    }
    catch(error){
        return new Response(
            JSON.stringify({ error: `An error occurred while create the medical record: ${error}` }), { status: 500 }
          );
    }
}