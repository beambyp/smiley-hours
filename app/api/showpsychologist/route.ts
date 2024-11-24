import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try{
        const info = await prisma.userAccount.findMany({
            where:{
                Role: "Psychologist",
                isApprove: true,
            },
            include: {
                psychologistinfo: true,
              },
        })
        const psychologistInfo = info.flatMap((user) => user.psychologistinfo || []);
        console.log(psychologistInfo); 
       return new Response(JSON.stringify(psychologistInfo), { status: 200 });
    }
    catch(error){
        return new Response(JSON.stringify({ error: "An error occurred while get the information" }), { status: 500 });
    }
}