// import Nav from "./components/Nav";
import FilterBar from "./components/FilterBar";
import AddTaskController from "../src/controller/AddTaskController";
import TablePage from "./pages/TaskPage";
import type { Task } from "./services/types";

function App() {
  // const handleAddTask = () => {
  //   console.log("Add task clicked");
  // };

  return (
    <>
      {/* <Nav onAddTask={handleAddTask} /> */}
      <AddTaskController onAddTask={function (data: Omit<Task, "id" | "createdAt">): void {
        throw new Error("Function not implemented.");
      } }/>
      <FilterBar />
      <TablePage />
    </>
  );
}

export default App;