import { FaTimes } from "react-icons/fa";

const Book = ({ book, onDelete, onEdit }) => {
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
      {book.author ? <p>Author: {book.author}</p> : ""}

      {book.rating ? <p> Rating: {book.rating} </p> : ""}

      <p> ISBN: {book.isbn}</p>

      {/* {book.isbn ? <p> ISBN: {book.isbn} </p> : ""} */}
      <div className="btn" onClick= {() => onEdit(book.id) } >Edit</div>
    </div>
  );
};

export default Book;
