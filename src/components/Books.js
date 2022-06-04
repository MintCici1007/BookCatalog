import Book from "./Book";

const Books = ({ books, onDelete }) => {
  return (
    <>
      {books.map((book) => (
        <Book key={book.name} book={book} onDelete={onDelete} />
      ))}
    </>
  );
};

export default Books;
