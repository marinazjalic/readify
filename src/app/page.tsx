import Header from "@/components/Header";
import Carousel from "@/components/carousel/Carousel";
import getAllBooks from "@/actions/books/getAllBooks";
import Newsletter from "@/components/Newsletter";

export default async function Home() {
  const books = await getAllBooks();

  return (
    <div>
      <Header />
      <div className="flex">
        <Newsletter />
        <div className="w-[70%]">
          <Carousel text="temp" books={books} />
          <Carousel text="temp" books={books} />
          <Carousel text="temp" books={books} />
        </div>
      </div>
    </div>
  );
}
