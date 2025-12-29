// // import Nav from "./components/Nav";
// import FilterBar from "./components/FilterBar";
// import AddTaskController from "../src/controller/AddTaskController";
// import TablePage from "./pages/TaskPage";
// import type { Task } from "./services/types";

// function App() {
//   // const handleAddTask = () => {
//   //   console.log("Add task clicked");
//   // };

//   return (
//     <>
//       {/* <Nav onAddTask={handleAddTask} /> */}
//       <AddTaskController onAddTask={function (data: Omit<Task, "id" | "createdAt">): void {
//         throw new Error("Function not implemented.");
//       } }/>
//       <FilterBar />
//       <TablePage />
//     </>
//   );
// }

// export default App;



import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/Notfound';
import { ToastRenderer } from './components/ToastRenderer';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastRenderer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
