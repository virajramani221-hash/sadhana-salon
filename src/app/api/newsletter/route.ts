import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email },
    });

    return NextResponse.json(
      { success: true, subscriber },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
