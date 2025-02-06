"use server";

const getAllBooks = async () => {
  return await prisma.book.findMany();
};
