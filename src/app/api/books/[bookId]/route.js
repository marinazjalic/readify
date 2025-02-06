import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const param = await params;
  const { bookId } = param;

  console.log("Reached");

  try {
    const book = await prisma.book.findUniqueOrThrow({
      where: {
        id: bookId,
      },
    });
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error: Failed to find book. " },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect;
  }
}
