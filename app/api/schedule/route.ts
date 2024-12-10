import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get All Doctor Schedule 
export async function GET(request: Request) { 
    try{
        const { searchParams } = new URL(request.url)
        const user = searchParams.get('user');
        if (user == null) {
            return new Response(
                JSON.stringify({ error: "User not provided" }),
                { status: 400 } 
            );
        }
        const schedule = await prisma.psychologistShift.findMany({
            where: {
                psychologistEmail: user,
            },
        })
        const tableData = schedule.map((shift) => {
            const availableDateStart = new Date(shift.availableDateStart);
            const availableDateEnd = new Date(shift.availableDateEnd);  
            return {
              date: availableDateStart.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }), 
              startTime: availableDateStart.toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              endTime: availableDateEnd.toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
              }),
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