import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const {name,surname,dateOfBirth,gender,phoneNumber,citizenID,licenseNumber,address,workplace,specialization,isSpecializeAdult,isSpecializeChildAndTeen,isSpecializeElder,email,password,psychologistPhoto } = await request.json();
        const Role = "Psychologist";
        const isApprove = false; //Approve Manual by Admin

        // Check if the email already exists
        const existingUser = await prisma.userAccount.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new Response(JSON.stringify({ error: "This email is already registered." }), { status: 400 });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newAccount = await prisma.userAccount.create({
            data: {
                email,
                password: hashPassword,
                Role,
                isApprove,
            },
        });
        await prisma.psychologistInfo.create({
            data: {
                email,
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
            },
        });
        return new Response(JSON.stringify(newAccount), { status: 201 });
    } catch (error) {
        console.error("Error creating user account:", error);
        return new Response(JSON.stringify({ error: "An error occurred while creating the account." }), { status: 500 });
    }
}