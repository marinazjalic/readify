"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import "./index.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [books, setBooks] = useState([]);
  const [bookMap, setBookMap] = useState(new Map());
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
      const bookIds = data.map((book) => book.id);
      bookMap.set("all", bookIds);
      setBookMap(bookMap);
      setDataLoaded(true);
    } catch (error) {
      throw new Error("Failed to fetch books");
    }
  };

  const filterBooksByGenre = async (genre) => {
    try {
      const response = await fetch(`/api/books/filter/${genre}`);
      if (!response.ok) {
        throw new Error("Error: Failed to filter books by genre. ");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      throw new Error("Error: Failed to filter books by genre. ");
    }
  };

  const filterBooks = async (filter) => {
    try {
      const response = await fetch(`api/books/filter?filter=${filter}`);
      if (!response.ok) {
        throw new Error("Error: Failed to filter books for carousel. ");
      }
      const data = await response.json();
      console.log("FILTER BOOKS");
      console.log(data);
    } catch (error) {
      throw new Error("Error: Failed to filter books. ");
    }
  };

  // const loadCarouselData = async () => {
  //   try {
  //     const filters = ['NEW_RELEASES', 'UPCOMING', 'TOP_RATED'];
  //     const promises = filters.map((filter) =>)
  //   }
  // }

  //fix this
  useEffect(() => {
    fetchBooks();
    // filterBooksByGenre("Thriller");
    filterBooks("NEW_RELEASES");
    filterBooks("UPCOMING");
    filterBooks("TOP_RATED");
  }, []);

  const validateCredentials = async () => {
    try {
      const loginData = {
        email: email,
        password: password,
      };

      const response = await fetch("/api/users/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // console.log("parent map", bookMap);

  return (
    <div>
      <br />
      <Header />
      <div className="home-page-left">
        {dataLoaded && <Carousel text="all" map={bookMap} />}
        {dataLoaded && <Carousel text="all" map={bookMap} />}
        {dataLoaded && <Carousel text="all" map={bookMap} />}
      </div>
    </div>
  );
}
