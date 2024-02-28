// src/app/api/users/route.ts

import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }) {
    try {
        const { id } = params;
        const parsedInt = parseInt(id);
        const user = await prisma.user.findUnique({
            where: {
                id: parsedInt,
            },
        });

        if (user) {
            return NextResponse.json({ data: user }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }) {
    try {
        const { id } = params;
        const parsedInt = parseInt(id);

        const user = await prisma.user.delete({
            where: {
                id: parsedInt,
            },
        });
        return NextResponse.json({ data: user }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { email, name, password } = await req.json();
    const { id } = params;
    const parsedInt = parseInt(id);
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parsedInt,
            },
            data: {
                email,
                name,
                password,
            },
        });

        return NextResponse.json({ data: updatedUser }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
