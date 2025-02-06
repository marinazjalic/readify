import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist. Please verify credentials." },
        { status: 404 }
      );
    }

    const correctPassword = await bcrypt.compare(body.password, user.password);
    if (correctPassword) {
      //delete the password from user before returning
      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error validating user." },
      { status: 500 }
    );
  }
}
