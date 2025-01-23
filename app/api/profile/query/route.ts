import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get Information of profile
export async function POST(request: Request) { 
    try{
        let profile;
        const { email,role } = await request.json();
        if(role == "User"){        
            profile = await prisma.userInfo.findUnique({
                where: { email: email },
            });
        }
        else{ // Psychologist
            profile = await prisma.psychologistInfo.findUnique({
                where: { email: email },
            });
        }
        return new Response(JSON.stringify(profile), { status: 200 });
    }
    catch(error){
        return new Response(
            JSON.stringify({ error: `An error occurred while getting the profile information: ${error}` }), { status: 500 }
          );
    }
}
