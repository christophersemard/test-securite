// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/db";

export async function POST(req: Request) {
    const { email, name, password } = await req.json();
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: password,
            },
        });
        return NextResponse.json({ data: newUser }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const users = await prisma.user.findMany({});
        console.log(users);

        return NextResponse.json({ data: users }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
