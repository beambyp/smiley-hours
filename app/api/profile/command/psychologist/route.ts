import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Edit Information of psychologist profile
export async function POST(request: Request) {
    try {
        const {name,surname,dateOfBirth,gender,phoneNumber,citizenID,licenseNumber,address,workplace,specialization,isSpecializeAdult,isSpecializeChildAndTeen,isSpecializeElder,email, oldPassword, newPassword, psychologistPhoto } = await request.json();
        // Check if the email already exists
        const existingUser = await prisma.userAccount.findUnique({
            where: { email },
        });
        if (existingUser) {
            // Compare the old password with the stored hashed password
            const isPasswordCorrect = await bcrypt.compare(oldPassword, existingUser.password);
            
            if (!isPasswordCorrect) {
                return new Response(JSON.stringify({ error: "The password is incorrect." }), { status: 400 });
            }
        }
        const newInfo = await prisma.userAccount.update({
            where: { email },
            data: {
                password: await bcrypt.hash(newPassword, 10),
            },
        });
        await prisma.psychologistInfo.update({
            where: { email },
            data: {
                citizenID,
                name,
                surname,
                phoneNumber,
                gender,
                dateOfBirth,
                address,
                workplace,
                specialization,
                isSpecializeAdult,
                isSpecializeChildAndTeen,
                isSpecializeElder,
                licenseNumber,
                psychologistPhoto,
        }});
        return new Response(JSON.stringify(newInfo), { status: 201 });
    } catch (error) {
        console.error("Error creating user account:", error);
        return new Response(JSON.stringify({ error: "An error occurred while editing the account." }), { status: 500 });
    }
}
