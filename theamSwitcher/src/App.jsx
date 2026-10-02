import { useState, useEffect } from "react";
import "./App.css";
// import { TheamContext } from "./context/theam";
import { TheamProvider } from "./context/theam";
import ThemeBtn from "./components/TheamBtn";
import Card from "./components/Card";

function App() {
  const [theamMode, setTheamMode] = useState("light");

  const lightTheam = () => {
    setTheamMode("light");
  };

  const darkTheam = () => {
    setTheamMode("dark");
  };

  //change the theam

  useEffect(() => {
    document.querySelector('html').classList.remove("light","dark");
    document.querySelector('html').classList.add(theamMode);
  }, [theamMode]);


  return (
    // direct access theamprovider values and methods
    <TheamProvider value={{ theamMode, darkTheam, lightTheam }}> 
      <div className="flex flex-wrap min-h-screen items-center dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn/>
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card/>
          </div>
        </div>
      </div>
    </TheamProvider>
  );
}

export default App;
