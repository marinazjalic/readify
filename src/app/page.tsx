import Header from "@/components/Header";
import Carousel from "@/components/carousel/Carousel";
import "./index.css";
import getAllBooks from "@/actions/books/getAllBooks";

export default async function Home() {
  const books = await getAllBooks();

  return (
    <div>
      <br />
      <Header />
      <div className="home-page-left">
        <Carousel text="all" books={books} />
        <Carousel text="all" books={books} />
        <Carousel text="all" books={books} />
      </div>
    </div>
  );
}
