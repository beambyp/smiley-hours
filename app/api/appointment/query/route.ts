import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { psychologistEmail } = await request.json();

        if (!psychologistEmail) {
            console.error("Email is required");
            return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
        }
        const records = await prisma.medicalRecord.findMany({
            where: {
                psychologistEmail: psychologistEmail,
            },
            select: {
                userEmail: true,
            },
        });
        const userEmail = records.map((x) => x.userEmail);
        return new Response(JSON.stringify(userEmail), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: `An error occurred while getting the userEmail. ${error}` }), { status: 500 });
    }
}