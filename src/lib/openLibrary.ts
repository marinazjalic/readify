const OPEN_LIBRARY_API_BASE = "https://openlibrary.org";

export async function searchBooks(
  filter: string,
  query: string,
  limit: number,
  offset: number
) {
  const response = await fetch(
    `${OPEN_LIBRARY_API_BASE}/search.json?${filter}=${encodeURIComponent(
      query
    )}&limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error("Error: Failed to fetch books from Open Library API. ");
  }
  return response.json();
}

export async function getBookDetails(key: string) {
  const response = await fetch(`${OPEN_LIBRARY_API_BASE}/works/${key}.json`);
  if (!response.ok) {
    throw new Error("Error: Failed to fetch books from Open Library API.");
  }
  return response.json();
}
