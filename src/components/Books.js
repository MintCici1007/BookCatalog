import Book from "./Book";

const Books = ({ books, onDelete }) => {
  let arrayBooks = [];
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].length; j++) {
      arrayBooks.push(books[i][j]);
    }
  }
  return (
    <>
      {books.map((book) => (
        <Book key={book.name} book={book} onDelete={onDelete} />
      ))}
    </>
  );
};

export default Books;
