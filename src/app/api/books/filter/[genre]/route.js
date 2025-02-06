import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

//filters books by genre
export async function GET(request, { params }) {
  const param = await params;
  const { genre } = param;
  try {
    const booksByGenre = await prisma.book.findMany({
      where: {
        genres: {
          has: genre,
        },
      },
    });
    return NextResponse.json(booksByGenre, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error: Could not filter books by genre. " },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
