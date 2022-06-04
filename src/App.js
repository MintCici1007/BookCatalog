import { useState } from "react";

import Header from "./components/Header";
import Books from "./components/Books";
import AddBook from "./components/AddBook";

function App() {
  const [books, setBooks] = useState([
    {
      id: 1,
      authors: "Martin, Robert",
      isbn: "978-0137081073",
      name: "The Clean Coder: A Code of Conduct for Professional Programmers",
      pubYear: 2011,
      rating: 9,
    },
    {
      id: 2,
      authors: "Martin, Robert 1",
      isbn: "978-0137081073",
      name: "The Clean Coder: A Code of Conduct for Professional Programmers",
      pubYear: 2011,
      rating: 8,
    },
    {
      id: 3,
      authors: "Martin, Robert 2",
      isbn: "978-0137081073",
      name: "The Clean Coder: A Code of Conduct for Professional Programmers",
      pubYear: 2011,
      rating: 7,
    },
  ]);

  // Add book
  const addBookEvent = (book) => {
    const newBook = {
      ...book,
    };
    setBooks([...books, newBook]);
  };

  // Delete book
  const deleteBookEvent = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="container">
      <Header title="Book Catalog" />
      <AddBook onAdd={addBookEvent} />
      {books.length > 0 ? (
        <Books books={books} onDelete={deleteBookEvent} />
      ) : (
        "no Book to show"
      )}
    </div>
  );
}

export default App;
