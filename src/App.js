import Header from "./components/Header";
import Books from "./components/Books";

function App() {
  return (
    <div className="container">
      <Header title="Book Catalog" />
      <Books />
    </div>
  );
}

export default App;
