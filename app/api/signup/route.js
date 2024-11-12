import { NextResponse } from "next/server";
import { UserSignupFunction } from "@/app/libs/data";
import bcrypt from 'bcrypt'

export async function POST(req){
    try{
        const {name,surname,dateofbirth,gender,phonenumber,email,password} = await req.json();
        const hashPassword = await bcrypt.hash(password,10)
        console.log(email)
        await UserSignupFunction({email, name, surname, gender, dateofbirth, phonenumber,password:hashPassword});
        return NextResponse.json({message: "Sign Up Successfully"},{status: 200})
    } 
    catch(error){
        return NextResponse.json({message: {error}},{status: 500})
    }
}