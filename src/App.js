import { useState, useEffect } from "react";
import { mapValues, groupBy, omit } from "lodash";
import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";

import Header from "./components/Header";
import Years from "./components/Years";

import RecommendedBook from "./components/RecommendedBook";

function App() {
  const booksCollectionRef = collection(db, "books");
  const [years, setYears] = useState([]);
  const [recommendedBook, setRecommendedBook] = useState({});
  // first time going to website
  useEffect(() => {
    getBooks();
  }, []);

  // function to group by options
  const booksGroupBy = async (options) => {
    let orderData = [];
    const orderResponse = await getDocs(booksCollectionRef);
    const orders = orderResponse.docs;
    orderData = orders.map((doc) => ({ id: doc.id, ...doc.data() }));

    let grouped = mapValues(groupBy(orderData, options), (clist) =>
      clist.map((year) => omit(year, options))
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

  const getBooks = async () => {
    let orderData = [];
    const orderResponse = await getDocs(booksCollectionRef);
    const orders = orderResponse.docs;
    orderData = orders.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Handle recommended book
    let books = [...orderData];

    const date = new Date();
    const currentYear = date.getFullYear();
    const booksMin3Years = books.filter(
      (book) => currentYear - book.pubYear <= 3
    );

    const bestRating = booksMin3Years.reduce((prevBook, currentBook) => {
      return prevBook.rating > currentBook.rating
        ? prevBook.rating
        : currentBook.rating;
    });

    const filteredBook = booksMin3Years.filter(
      (book) => book.rating === bestRating
    );

    if (filteredBook.length > 1) {
      const randomPosition = Math.floor(Math.random() * filteredBook.length);
      setRecommendedBook(filteredBook[randomPosition]);
    } else {
      setRecommendedBook(filteredBook[0]);
    }

    // Modify based on requirement 3, group by Pubyear and sort by name asc
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

    if (+rating > 10 || +rating < 0) {
      alert("Book rating should be between 0 and 10.");
      return;
    }

    const isIsbnValid = (isbnCode) => {
      if (isbnCode.length !== 10) return false;
      let sum = 0;
      [...isbnCode].forEach((c, index) => {
        // Handle the last element of isbn
        if (index === 9 && c === "X") {
          sum += (10 - index) * 10;
        } else {
          if (Number.isInteger(+c)) sum += (10 - index) * +c;
          else return false;
        }
      });

      if (sum % 11 === 0) return true;

      return false;
    };

    if (isbn && !isIsbnValid(isbn)) {
      alert("ISBN is invalid");
      return;
    }

    await addDoc(booksCollectionRef, {
      name: name.trim(),
      author: author.trim(),
      pubYear: +pubYear,
      rating: +rating,
      isbn: isbn,
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

  // Edit book
  const updateBook = async (id) => {
    if (!name || name.length > 100) {
      alert("Edit Book name should be between 0 and 100 characters.");
      return;
    }
    if (!author) {
      alert("Edit Book author should have at least one.");
      return;
    }
    if (pubYear && pubYear < 1800) {
      alert("Edit Publication year should be > 1800.");
      return;
    }

    if (+rating > 10 || +rating < 0) {
      alert("Edit Book rating should be between 0 and 10.");
      return;
    }

    const isIsbnValid = (isbnCode) => {
      if (isbnCode.length !== 10) return false;
      let sum = 0;
      [...isbnCode].forEach((c, index) => {
        // Handle the last element of isbn
        if (index === 9 && c === "X") {
          sum += (10 - index) * 10;
        } else {
          if (Number.isInteger(+c)) sum += (10 - index) * +c;
          else return false;
        }
      });

      if (sum % 11 === 0) return true;

      return false;
    };

    if (isbn && !isIsbnValid(isbn)) {
      alert("Edit ISBN is invalid");
      return;
    }
    const bookDoc = doc(db, "books", id);
    await updateDoc(bookDoc, {
      name: name.trim(),
      author: author.trim(),
      pubYear: +pubYear,
      rating: +rating,
      isbn: isbn,
    });

    await getBooks();

    setName("");
    setauthor("");
    setpubYear(0);
    setRating(0);
    setIsbn("");
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
          value="Submit Add Book"
          className="btn btn-block"
          onClick={addBookFirestore}
        />
      </form>
      <h1>Recommended Book</h1>
      {recommendedBook ? (
        <RecommendedBook recommendedBook={recommendedBook} />
      ) : (
        <p>No book to recommend</p>
      )}
      <button className="btn" onClick={() => booksGroupBy("pubYear")}>
        Group by Years
      </button>
      <button className="btn" onClick={() => booksGroupBy("rating")}>
        Group by Rating
      </button>
      <button className="btn" onClick={() => booksGroupBy("author")}>
        Group by Author
      </button>
      {years.length > 0 ? (
        <Years years={years} onDelete={deleteBookEvent} onEdit={updateBook} />
      ) : (
        "No Books to show"
      )}
    </div>
  );
}

export default App;
