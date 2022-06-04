import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const AddBook = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [author, setauthor] = useState("");
  const [pubYear, setpubYear] = useState("");
  const [rating, setRating] = useState(0);
  const [isbn, setIsbn] = useState("");

  const booksCollectionRef = collection(db, "books");

  useEffect(() => {
    onAdd();
  }, []);

  // Add book to Firebase
  const addBookFirestore = async () => {
    let convertedPubYear;

    if (pubYear) {
      convertedPubYear = +pubYear;
      if (convertedPubYear < 1800) {
        alert("Publication year should be > 1800");
        return;
      }
    }
    await addDoc(booksCollectionRef, {
      name: name,
      author: author,
      pubYear: +pubYear,
      rating: +rating,
      isbn: isbn,
    });
  };

  // onSubmit
  const onSubmit = (e) => {
    e.preventDefault();

    // let convertedPubYear;

    // onAdd({ name, author, pubYear: convertedPubYear, rating, isbn });

    setName("");
    setauthor("");
    setpubYear("");
    setRating(0);
    setIsbn("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Name</label>
        <input
          type="text"
          placeholder="Add Name"
          required
          maxLength="100"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>author</label>
        <input
          type="text"
          placeholder="Add author"
          required
          value={author}
          onChange={(e) => setauthor(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Publication Year</label>
        <input
          type="text"
          value={pubYear}
          onChange={(e) => setpubYear(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>Rating</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="0"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <div className="form-control">
        <label>ISBN</label>
        <input
          type="text"
          placeholder="Add ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="submitAddBook"
        className="btn btn-block"
        onClick={addBookFirestore}
      />
    </form>
  );
};

export default AddBook;
