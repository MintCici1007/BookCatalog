import Year from "./Year";

const Years = ({ years, onDelete }) => {
  // let arrayBooks = [];
  // for (let i = 0; i < books.length; i++) {
  //   for (let j = 0; j < books[i].length; j++) {
  //     arrayBooks.push(books[i][j]);
  //   }
  // }
  return (
    <>
      {years.map((year) => (
        <Year key={Object.keys(year)} year={year} onDelete={onDelete} />
      ))}
    </>
  );
};

export default Years;
