import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

//filtering for home page carousels - new & upcoming releases, top rated books
export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const filterBy = searchParams.get("filter");
    const currentDate = new Date();
    var filteredBooks = [];

    switch (filterBy) {
      //show books released within the last month
      case "NEW_RELEASE":
        const lastMonth = new Date(currentDate);
        lastMonth.setMonth(currentDate.getMonth() - 1);
        filteredBooks = await prisma.book.findMany({
          where: {
            publish_date: {
              gte: lastMonth,
              lte: currentDate,
            },
          },
        });
        break;

      //will filter books for any release date in the future, and sort date in chronological order
      case "UPCOMING":
        filteredBooks = await prisma.book.findMany({
          where: {
            publish_date: {
              gte: currentDate,
            },
          },
          orderBy: {
            publish_date: "asc",
          },
        });
        break;
      case "TOP_RATED":
        filteredBooks = await prisma.book.findMany({
          where: {
            rating: {
              gte: 1, //change this later
            },
          },
          orderBy: {
            rating: "desc",
          },
        });
        break;
    }
    return NextResponse.json(filteredBooks, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error: Failed to filter books. " },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
