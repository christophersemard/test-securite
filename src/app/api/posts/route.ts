// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const { title, content } = await req.json();

    let token = req.headers.get("Authorization");
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7);
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        try {
            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                },
            });
            return NextResponse.json(newPost, { status: 201 });
        } catch (e) {
            return NextResponse.json({ error: e }, { status: 500 });
        }
    } catch (e) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}

export async function GET(req: Request) {
    try {
        const posts = await prisma.post.findMany({});
        console.log(posts);

        return NextResponse.json(posts, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
