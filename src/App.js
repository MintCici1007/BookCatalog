import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

import Header from "./components/Header";
import Books from "./components/Books";
import AddBook from "./components/AddBook";

function App() {
  const booksCollectionRef = collection(db, "books");
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const data = await getDocs(booksCollectionRef);
    setBooks(data.docs.map((doc) => ({ ...doc.data() })));
  };

  // const addBookEvent = (book) => {
  //   const newBook = {
  //     id: book.name,
  //     ...book,
  //   };
  //   setBooks([...books, newBook]);
  // };

  // Delete book
  const deleteBookEvent = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="container">
      <Header title="Book Catalog" />
      <AddBook onAdd={getBooks} />
      {books.length > 0 ? (
        <Books books={books} onDelete={deleteBookEvent} />
      ) : (
        "no Book to show"
      )}
    </div>
  );
}

export default App;
