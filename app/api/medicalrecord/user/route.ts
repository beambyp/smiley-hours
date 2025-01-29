import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get All Medical Record (User)
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
                userEmail: user,
            },
            include: {
                psychologistInfo: true
            },
        });
        
        const res = record.map((x) => {
            return {
                Name: x.psychologistInfo.name + " " + x.psychologistInfo.surname,
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