import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get All Doctor Schedule 
export async function POST(request: Request) { 
    try{
        const { psychologistEmail } = await request.json();
        const schedule = await prisma.psychologistShift.findMany({
            where: {
                psychologistEmail: psychologistEmail,
            },
        })
        const tableData = schedule.map((shift) => {
            const availableDateStart = new Date(shift.availableDateStart);
            const availableDateEnd = new Date(shift.availableDateEnd);  
            return {
              date: availableDateStart.toISOString().split('T')[0], 
              startTime: availableDateStart.toISOString().split('T')[1].slice(0, 5), 
              endTime: availableDateEnd.toISOString().split('T')[1].slice(0, 5),
            };
        });
        return new Response(JSON.stringify(tableData), { status: 200 });
    }
    catch(error){
        return new Response(
            JSON.stringify({ error: `An error occurred while getting the schedule information: ${error}` }), { status: 500 }
          );
    }
}
