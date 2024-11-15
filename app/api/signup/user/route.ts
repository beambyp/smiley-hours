import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function POST(request: Request){
    const {name,surname,dateOfBirth,gender,phoneNumber,email,password} = await request.json();
    const Role = "User"
    const isApprove = true

    // TO-DO Check Existing User 
    // const checkAccount = await prisma.userAccount.findUnique(email);
    // if(checkAccount){
    //     return Response.json("This email already register.")
    // }
    const newAccount = await prisma.userAccount.create({
        data:{
            email,
            password,
            Role,
            isApprove,
        }
    })
    await prisma.userInfo.create({
        data:{
            email,
            name,
            surname,
            gender,
            dateOfBirth,
            phoneNumber,
        }
    })
    return Response.json(newAccount);
}