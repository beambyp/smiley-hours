import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get/Create the ChatRecord 
export async function POST(request: Request) {
    try{
    let chatID;
    const {userEmail,psychologistEmail} = await request.json();
    chatID = await prisma.chatRecord.findFirst({
        where: {
            AND: [
                { userEmail: userEmail },
                { psychologistEmail: psychologistEmail }
            ]
        }
    });
    if(chatID == null){
        chatID = await prisma.chatRecord.create({
            data: {
                userEmail: userEmail,
                psychologistEmail: psychologistEmail
            },
            select: {
                chatID: true
            }
        });
    }
    return new Response(JSON.stringify(chatID), { status: 200 });
    } catch (error) {
        console.error("Error creating appointment:", error);
        return new Response(JSON.stringify({ error: "An error occurred while creating the appointment." }), { status: 500 });
    }
}