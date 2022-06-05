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
      <p>Author: {book.author}</p>

      <p> Rating: {book.rating} </p>
      <p> ISBN: {book.isbn}</p>

      {/* {book.isbn ? <p> ISBN: {book.isbn} </p> : ""} */}
    </div>
  );
};

export default Book;
