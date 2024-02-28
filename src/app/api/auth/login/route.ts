// src/app/api/route.ts

import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        console.log(existingUser);

        if (!existingUser || existingUser.password != password) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 404 }
            );
        } else {
            const token = jwt.sign(
                { user: existingUser },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );

            return NextResponse.json(
                {
                    token,
                    isAdmin: existingUser.isAdmin,
                    name: existingUser.name,
                },
                { status: 200 }
            );
        }
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
