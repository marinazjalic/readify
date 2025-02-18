"use server";

import { getBookDetails } from "@/lib/openLibrary";
import { BookDetails } from "@/types";
import { subjectMap } from "@/constants/constants";

//function for comparing subjects in api response to subjectMap
const getValidSubjects = (apiSubjects: string[]): string[] => {
  const validSubjects: string[] = [
    ...Array.from(subjectMap.keys()),
    ...Array.from(subjectMap.values()).flat(),
  ];
  const subjectSet: Set<string> = new Set(validSubjects);
  return apiSubjects
    .map((subject) => convertToCamelCase(subject))
    .filter((subject) => subjectSet.has(subject));
};

//resolves casing inconsistencies from api
const convertToCamelCase = (subject: string): string => {
  return subject
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export async function getBookByKey(
  key: string,
  bookOverview: BookDetails
): Promise<BookDetails> {
  try {
    const apiResponse = await getBookDetails(key);

    const filteredSubjects = apiResponse.subjects
      ? getValidSubjects(apiResponse.subjects)
      : [];

    const book: BookDetails = {
      ...bookOverview,
      genres: filteredSubjects,
      description:
        "description" in apiResponse
          ? apiResponse.description.value
          : "No description available. ",
    };
    return book;
  } catch (error) {
    throw new Error("Error: Failed to fetch book details. ");
  }
}
