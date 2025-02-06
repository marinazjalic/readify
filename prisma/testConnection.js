// prisma/testConnection.js
const { PrismaClient } = require("@prisma/client"); // Use require instead of import

const prisma = new PrismaClient();

async function main() {
  // Test by querying a collection or model
  const books = await prisma.book.findMany();
  console.log("Books from DB:", books);
}

main()
  .catch((e) => {
    console.error("Error connecting to the database", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
