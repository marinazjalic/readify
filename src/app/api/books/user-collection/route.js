import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const userId = searchParams.get("userId");
    const savedBooks = await prisma.savedBook.findMany({
      where: { userId: userId },
    });
    return NextResponse.json(savedBooks, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching books" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

//adding a saved book to user collection
//frontend will pass in userId, bookId
//progress and status will have default values

export async function POST(request) {
  try {
    const { userId, bookId } = await request.json();
    const savedBook = await prisma.savedBook.create({
      data: {
        userId,
        bookId,
        status: "TO_READ",
        progress: 0,
      },
    });
    return NextResponse.json(savedBook, { status: 201 });
  } catch (error) {
    console.log("Error saving book: ", error);
    return NextResponse.json({ error: "Error saving book" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// function for updating the status of a saved book
// can optionally update the progress too

// export async function PUT(request, { params })
// {
//     try {
//         const { id } = params;
//         const body = await request.json();
//     }
// }
