import Header from "@/components/Header";
import Carousel from "@/components/carousel/Carousel";
import getAllBooks from "@/actions/books/getAllBooks";

export default async function Home() {
  const books = await getAllBooks();

  return (
    <div>
      <br />
      <Header />
      <div className="w-[70%]">
        <Carousel text="temp" books={books} />
        <Carousel text="temp" books={books} />
        <Carousel text="temp" books={books} />
      </div>
    </div>
  );
}
