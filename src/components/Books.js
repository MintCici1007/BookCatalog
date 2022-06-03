const books = [
  {
    author: "Martin, Robert",
    isbn: "978-0137081073",
    name: "The Clean Coder: A Code of Conduct for Professional Programmers",
    pubYear: 2011,
    rating: 9,
  },
  {
    author: "Martin, Robert 1",
    isbn: "978-0137081073",
    name: "The Clean Coder: A Code of Conduct for Professional Programmers",
    pubYear: 2011,
    rating: 8,
  },
  {
    author: "Martin, Robert 2",
    isbn: "978-0137081073",
    name: "The Clean Coder: A Code of Conduct for Professional Programmers",
    pubYear: 2011,
    rating: 7,
  },
];

const Books = () => {
  return (
    <>
      {books.map((book) => (
        <h3>{book.author}</h3>
      ))}
    </>
  );
};

export default Books;
