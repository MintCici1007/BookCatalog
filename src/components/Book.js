import { FaTimes } from "react-icons/fa";

const Book = ({ book, onDelete }) => {
  return (
    <div className="book">
      <h3>
        {" "}
        Name: {book.name}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(book.id)}
        />{" "}
      </h3>
      <p>author: {book.author}</p>

      <p> Publication Year: {book.pubYear} </p>

      <p> Rating: {book.rating} </p>

      {book.isbn ? <p> ISBN: {book.isbn} </p> : ""}
    </div>
  );
};

export default Book;
