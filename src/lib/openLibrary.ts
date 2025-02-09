const OPEN_LIBRARY_API_BASE = "https://openlibrary.org";

export async function searchBooks(filter: string, query: string) {
  const response = await fetch(
    `${OPEN_LIBRARY_API_BASE}/search.json?${filter}=${encodeURIComponent(
      query
    )}&limit=10` //temp limit
  );
  if (!response.ok) {
    throw new Error("Error: Failed to fetch books from Open Library API. ");
  }
  return response.json();
}
