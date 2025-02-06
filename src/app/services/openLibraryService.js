const OPEN_LIBRARY_API_BASE = "https://openlibrary.org";

export async function searchBooks(query) {
  const response = await fetch(
    `${OPEN_LIBRARY_API_BASE}/search.json?title=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error("Error: Failed to fetch books from Open Library API. ");
  }
  return response.json();
}
