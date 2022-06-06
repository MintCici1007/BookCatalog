const RecommendedBook = ({ recommendedBook }) => {
  return (
    <>
      <h2>Name: {recommendedBook.name}</h2>
      <p>Author: {recommendedBook.author}</p>

      <p> Rating: {recommendedBook.rating} </p>
      <p> ISBN: {recommendedBook.isbn}</p>
    </>
  );
};

export default RecommendedBook;
