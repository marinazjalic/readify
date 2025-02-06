import { searchBooks } from "../../../services/openLibraryService";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required. " },
      { status: 400 }
    );
  }

  try {
    console.log("reached");
    const books = await searchBooks(query);
    return NextResponse.json(books, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error: Failed to query books. " },
      { status: 500 }
    );
  }
}
