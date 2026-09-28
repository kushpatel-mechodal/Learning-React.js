import { useState } from "react";
import Card from "./components/Card";

function App() {
  const [counter, setcounter] = useState(0);

  let myData = {
    name: "kush patel",
    age: 23,
  };

  let number = [1, 2, 3];

  const addValue = () => {
    if (counter < 20) {
      setcounter(prevCounter => prevCounter + 1);
      setcounter(prevCounter => prevCounter + 1);
    }
  };

  const removeValue = () => {
    if (counter > 0) {
      setcounter(counter - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center gap-6 flex-wrap p-4">
      {/* <h1 className="bg-green-400 text-black p-4 rounded-xl mb-4">
        Tailwind test
      </h1>

      <h2 className="text-3xl font-bold underline bg-green-400 text-info">
        Counter value: {counter}
      </h2> */}

      {/* <button onClick={addValue}>Add Value</button>
      <br />
      <button onClick={removeValue}>Remove Value</button> */}

      <Card userName="kush patel" btnText="Click me" />
      <Card userName="jay patel" btnText="Visit Me" />
    </div>
  );
}

export default App;
