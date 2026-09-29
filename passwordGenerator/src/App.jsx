import { useCallback, useEffect, useState, useRef } from "react";
// import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  //use for other reference to useRef hook can be use
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFfGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz";

    if (number) {
      str += "0123456789";
    }

    if (character) {
      str += "!@#$%^&*-_+=[]{}~`";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); //math.floor remove demial number and math.random generate new string
      password += str.charAt(char);
    }

    setPassword(password);
  }, [length, number, character, setPassword]); // The dependency array in useCallback when the function use for optimization.

  const copyPassword = useCallback( () => {
    passwordRef.current?.select() ;
    window.navigator.clipboard.writeText(password);
  }, [password]);


  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]); //use array in useEffect when the method is call and re render ui
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-xl">
          <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">
            Password Generator
          </h1>

          <div className="flex shadow-lg rounded-lg overflow-hidden">
            <input
              type="text"
              value={password}
              className="w-full py-3 px-4 bg-white text-gray-800 outline-none"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />

            <button
              className="px-6 py-3 bg-orange-500 text-white font-semibold hover:bg-orange-600 transition cursor-pointer"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>

          <div className="flex shadow-sm gap-x-2">
            <div className="flex item-center gap-x-1">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="text-white text-1xl">Length: {length}</label>
            </div>
            <div className="flex item-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={number}
                id="number"
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
              />
              <label className="text-white text-1xl">Numbers</label>

              <div className="flex item-center gap-x-1">
                <input
                  type="checkbox"
                  defaultChecked={character}
                  id="character"
                  onChange={() => {
                    setCharacter((prev) => !prev);
                  }}
                />
                <label className="text-white text-1xl">Characters</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
