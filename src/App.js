import { useState, useEffect } from "react";
import { mapValues, groupBy, omit } from "lodash";
import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase-config";

import Header from "./components/Header";
import Years from "./components/Years";

function App() {
  const booksCollectionRef = collection(db, "books");
  const [years, setYears] = useState([]);

  // first time going to website
  useEffect(() => {
    console.log("useEffect called");
    getBooks();
  }, []);

  const getBooks = async () => {
    console.log("getBooks called");
    let orderData = [];
    const orderResponse = await getDocs(booksCollectionRef);
    const orders = orderResponse.docs;
    orderData = orders.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Modify based on requirement 3
    let grouped = mapValues(groupBy(orderData, "pubYear"), (clist) =>
      clist.map((year) => omit(year, "pubYear"))
    );

    const keys = Object.keys(grouped);

    keys.forEach((key) => {
      grouped[key].sort((firstItem, secondItem) => {
        return firstItem.name.toLowerCase() < secondItem.name.toLowerCase()
          ? -1
          : firstItem.name.toLowerCase() > secondItem.name.toLowerCase()
          ? 1
          : 0;
      });
    });

    const entries = Object.entries(grouped);
    entries.sort((firstArray, secondArray) => {
      return secondArray[0] - firstArray[0];
    });

    const arrOfObj = entries.map(([key, value]) => {
      return { [key]: value };
    });

    setYears(arrOfObj);
  };

  // add book
  const [name, setName] = useState("");
  const [author, setauthor] = useState("");
  const [pubYear, setpubYear] = useState(0);
  const [rating, setRating] = useState(0);
  const [isbn, setIsbn] = useState("");
  // Add book to Firebase
  const addBookFirestore = async () => {
    if (!name || name.length > 100) {
      alert("Book name should be between 0 and 100 characters.");
      return;
    }
    if (!author) {
      alert("Book author should have at least one.");
      return;
    }
    if (pubYear && pubYear < 1800) {
      alert("Publication year should be > 1800.");
      return;
    }

    if (+rating > 10 || +rating <0) {
      alert("Book rating should be between 0 and 10.");
      return;
    }

    await addDoc(booksCollectionRef, {
      name: name.trim(),
      author: author.trim(),
      pubYear: +pubYear,
      rating: +rating,
      isbn: isbn.trim(),
    });

    await getBooks();
  };

  // onSubmit
  const onSubmit = (e) => {
    e.preventDefault();

    setName("");
    setauthor("");
    setpubYear(0);
    setRating(0);
    setIsbn("");
  };

  // Delete book
  const deleteBookEvent = async (id) => {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
    await getBooks();
  };

  return (
    <div className="container">
      <Header title="Book Catalog" />
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            placeholder="Add Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label>Author</label>
          <input
            type="text"
            placeholder="Add author"
            value={author}
            onChange={(e) => setauthor(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label>Publication Year</label>
          <input
            type="number"
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
      {years.length > 0 ? (
        <Years years={years} onDelete={deleteBookEvent} />
      ) : (
        "No Books to show"
      )}
    </div>
  );
}

export default App;
