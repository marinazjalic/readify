import Header from "@/components/Header";
import Carousel from "@/components/carousel/Carousel";
import getAllBooks from "@/actions/books/getAllBooks";
import Newsletter from "@/components/newsletter/Newsletter";

export default async function Home() {
  const books = await getAllBooks();
  const thrillers = books.filter((book) => book.genres.includes("Thriller"));
  const romance = books.filter((book) => book.genres.includes("Romance"));

  return (
    <div className="bg-cream-100 pt-7">
      <Header />
      <div className="flex">
        <Newsletter />
        <div className="w-[70%]">
          <Carousel text="Top Rated" books={books} />
          <Carousel text="Thrillers" books={thrillers} />
          <Carousel text="Romance" books={romance} />
        </div>
      </div>
    </div>
  );
}
