import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Post Create Doctor Schedule 
type Shift = {
    availableDateStart: Date | string; 
    availableDateEnd: Date | string;   
};
export async function POST(request: Request) {
    try{
        const { psychologistEmail, shifts } = await request.json(); 
        const shiftData: Array<{ psychologistEmail: string; availableDateStart: Date; availableDateEnd: Date }> =
        shifts.map(({ availableDateStart, availableDateEnd }: Shift) => ({
            psychologistEmail,
            availableDateStart: new Date(availableDateStart),
            availableDateEnd: new Date(availableDateEnd),     
        }));

        const createSchedule = await prisma.psychologistShift.createMany({
        data: shiftData,
        skipDuplicates: true, 
        });
        return new Response(JSON.stringify(createSchedule), { status: 200 });
    }
    catch(error){
        return new Response(
            JSON.stringify({ error: `An error occurred while create the schedule: ${error}` }), { status: 500 }
          );
    }
}