import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { name, surname, dateOfBirth, gender, phoneNumber, email, password } = await request.json();
        const Role = "User";
        const isApprove = true;

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
        await prisma.userInfo.create({
            data: {
                email,
                name,
                surname,
                gender,
                dateOfBirth,
                phoneNumber,
            },
        });
        return new Response(JSON.stringify(newAccount), { status: 201 });
    } catch (error) {
        console.error("Error creating user account:", error);
        return new Response(JSON.stringify({ error: "An error occurred while creating the account." }), { status: 500 });
    }
}