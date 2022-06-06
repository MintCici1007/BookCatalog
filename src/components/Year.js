import Book from "./Book";

const Year = ({ year, onDelete, onEdit }) => {
  const yearUi = Object.keys(year);
  const books = year[yearUi];

  return (
    <div className="year">
      {yearUi != 0 ? (
        <h2 style={{ color: "blue" }}>{yearUi}</h2>
      ) : (
        <h2 style={{ color: "blue" }}>Books without Publication Year</h2>
      )}

      {books.map((book) => (
        <Book key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default Year;
