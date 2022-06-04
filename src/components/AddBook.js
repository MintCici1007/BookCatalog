import { useLayoutEffect, useState } from "react";

const AddBook = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [authors, setAuthors] = useState("");
  const [pubYear, setpubYear] = useState("");
  const [rating, setRating] = useState(0);
  const [isbn, setIsbn] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    let convertedPubYear;

    if (pubYear) {
      convertedPubYear = +pubYear;
      if (convertedPubYear < 1800) {
        alert("Publication year should be > 1800");
        return;
      }
    }

    onAdd({ name, authors, pubYear: convertedPubYear, rating, isbn });

    setName("");
    setAuthors("");
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
        <label>Authors</label>
        <input
          type="text"
          placeholder="Add Authors"
          required
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
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

      <input type="submit" value="submitAddBook" className="btn btn-block" />
    </form>
  );
};

export default AddBook;
