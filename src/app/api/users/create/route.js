import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// route.js file contains:
// user creation

const prisma = new PrismaClient();

// export async function GET(request) {
//   console.log("Get request reached");

//   try {
//     const users = await prisma.user.findMany();
//     return new Response(JSON.stringify(users), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

export async function POST(request) {
  console.log("reached");

  const body = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    console.log(body);
    const user = await prisma.user.create({
      data: {
        ...body,
      },
    });
    delete user.password;
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.log("ERROR");
    if ((error.code = "P2002")) {
      return NextResponse.json(
        { error: "Error: email already in use." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Error: could not create user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
