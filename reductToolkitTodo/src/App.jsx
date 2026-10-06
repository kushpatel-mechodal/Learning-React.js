import "./App.css";
import AddTodo from "./components/addTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
