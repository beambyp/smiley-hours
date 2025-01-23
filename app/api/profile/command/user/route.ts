import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Edit Information of user profile
export async function POST(request: Request) {
    try {
        const { name, surname, dateOfBirth, gender, phoneNumber, email, oldPassword, newPassword } = await request.json();
        // Check if the email already exists
        const existingUser = await prisma.userAccount.findUnique({
            where: { email },
        });
        let hashPassword;
        if (existingUser) {
            hashPassword = await bcrypt.hash(oldPassword, 10);
            if(hashPassword != existingUser.password){
                return new Response(JSON.stringify({ error: "The password is incorrect." }), { status: 400 });
            }
        }
        const newInfo = await prisma.userAccount.update({
            where: { email },
            data: {
                password: await bcrypt.hash(newPassword, 10),
            },
        });
        await prisma.userInfo.update({
            where: { email },
            data: {
                name,
                surname,
                dateOfBirth,
                gender,
                phoneNumber,
        }});
        return new Response(JSON.stringify(newInfo), { status: 201 });
    } catch (error) {
        console.error("Error creating user account:", error);
        return new Response(JSON.stringify({ error: "An error occurred while editing the account." }), { status: 500 });
    }
}
