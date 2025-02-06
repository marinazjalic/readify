"use server";

import { prisma } from "@/lib/prisma";

const getAllBooks = async () => {
  return await prisma.book.findMany();
};

export default getAllBooks;
