import { useState } from "react";
import { mapValues, groupBy, omit } from "lodash";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

import Header from "./components/Header";
import Books from "./components/Books";
import AddBook from "./components/AddBook";

function App() {
  const booksCollectionRef = collection(db, "books");
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    // const data = await getDocs(booksCollectionRef);
    // setBooks(data.docs.map((doc) => ({ ...doc.data() })));

    // const q = query(
    //   booksCollectionRef,
    //   orderBy("year", "desc"),
    //   orderBy("name", "asc")
    // );

    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    const orderData = [];
    const orderResponse = await getDocs(booksCollectionRef);
    const orders = orderResponse.docs;
    orders.forEach((order) => orderData.push(order.data()));
    let grouped = mapValues(groupBy(orderData, "pubYear"), (clist) =>
      clist.map((book) => omit(book, "pubYear"))
    );
    // console.log(grouped);

    const keys = Object.keys(grouped);

    keys.forEach((key) => {
      grouped[key].sort((firstItem, secondItem) => {
        return firstItem.name < secondItem.name
          ? -1
          : firstItem.name > secondItem.name
          ? 1
          : 0;
      });
    });

    const entries = Object.entries(grouped);
    entries.sort((firstArray, secondArray) => {
      return secondArray[0] - firstArray[0];
    });
    console.log(entries);
  };

  // const addBookEvent = (book) => {
  //   const newBook = {
  //     id: book.name,
  //     ...book,
  //   };
  //   setBooks([...books, newBook]);
  // };

  // Delete book
  const deleteBookEvent = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="container">
      <Header title="Book Catalog" />
      <AddBook onAdd={getBooks} />
      {books.length > 0 ? (
        <Books books={books} onDelete={deleteBookEvent} />
      ) : (
        "no Book to show"
      )}
    </div>
  );
}

export default App;
