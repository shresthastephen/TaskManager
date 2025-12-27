import Nav from "./components/Nav";
import FilterBar from "./components/FilterBar";

function App() {
  const handleAddTask = () => {
    console.log("Add task clicked");
  };

  return (
    <>
      <Nav onAddTask={handleAddTask} />
      <FilterBar />
    </>
  );
}

export default App;