import "./App.css";
import AddTodo from "./components/addTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Redux Toolkit Todo
        </h1>
        <AddTodo />
        <Todos />
      </div>
    </div>
  );
}

export default App;

