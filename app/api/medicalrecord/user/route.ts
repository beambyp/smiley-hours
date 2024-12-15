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
            const availableDateStart = new Date(x.treatmentDate);
            const availableDateEnd = new Date(x.treatmentDate); 
            availableDateEnd.setHours(availableDateEnd.getHours() + 1);
            return {
                Name: x.psychologistInfo.name + " " + x.psychologistInfo.surname,
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