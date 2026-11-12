import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const catalog = [
  {
    name: 'Fiction',
    books: [
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
      { title: '1984', author: 'George Orwell', publishedYear: 1949 },
      { title: 'Pride and Prejudice', author: 'Jane Austen', publishedYear: 1813 },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 },
    ],
  },
  {
    name: 'Science Fiction',
    books: [
      { title: 'Dune', author: 'Frank Herbert', publishedYear: 1965 },
      { title: 'Neuromancer', author: 'William Gibson', publishedYear: 1984 },
      { title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', publishedYear: 1969 },
      { title: 'Foundation', author: 'Isaac Asimov', publishedYear: 1951 },
    ],
  },
  {
    name: 'History',
    books: [
      { title: 'Sapiens', author: 'Yuval Noah Harari', publishedYear: 2011 },
      { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', publishedYear: 1997 },
      { title: 'The Guns of August', author: 'Barbara Tuchman', publishedYear: 1962 },
      { title: "A People's History of the United States", author: 'Howard Zinn', publishedYear: 1980 },
    ],
  },
  {
    name: 'Technology',
    books: [
      { title: 'Clean Code', author: 'Robert C. Martin', publishedYear: 2008 },
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt and David Thomas', publishedYear: 1999 },
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', publishedYear: 2017 },
      { title: 'Structure and Interpretation of Computer Programs', author: 'Harold Abelson and Gerald Sussman', publishedYear: 1985 },
    ],
  },
];

async function main() {
  // Clear first so the script can be re-run safely.
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();

  for (const genre of catalog) {
    await prisma.genre.create({
      data: { name: genre.name, books: { create: genre.books } },
    });
  }

  console.log('Seeded 4 genres and 16 books');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());