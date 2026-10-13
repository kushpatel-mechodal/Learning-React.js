import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    //debouncing code
    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get("/api/products?search=" + search, {
          signal: controller.signal,
        });

        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        //cancel old api request
        if (axios.isCancel(error)) {
          console.log("Request cancelled", error.message);
          return;
        }

        setError(true);
        setLoading(false);
      }
    }, 500);

    // cleanup function
    return () => {
      clearTimeout(timer);
      controller.abort(); //unmount the cancel api request
    };
  }, [search]);

  return (
    <>
      <div className="w-full flex justify-center items-center pt-8 pb-2 px-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-5 py-3.5 bg-slate-900 text-slate-100 placeholder-slate-500 rounded-2xl border border-slate-800 hover:border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all duration-200 text-sm shadow-xl shadow-black/40"
        />
      </div>

      {/* conditional rendring */}

      {loading && (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-4 bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-base font-medium text-slate-300 animate-pulse tracking-wide">
              Loading products...
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
          <div className="flex flex-col items-center max-w-sm w-full bg-slate-900 border border-red-500/30 p-8 rounded-2xl shadow-xl text-center">
            <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center text-2xl font-bold mb-4">
              ⚠️
            </div>
            <h2 className="text-xl font-semibold text-slate-100 mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Unable to fetch products. Please ensure the backend server is
              running.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition duration-200 shadow-lg shadow-red-600/20 active:scale-95"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-2xl flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              Apis in React.js
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sm font-medium text-slate-400">
              <span>Number of Products:</span>
              <span className="font-semibold text-indigo-400">
                {products.length}
              </span>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-indigo-400/80 bg-indigo-950/60 px-2.5 py-1 rounded-md border border-indigo-800/40">
                    ID #{product.id}
                  </span>
                  <h3 className="text-xl font-bold text-white capitalize mt-3 group-hover:text-indigo-300 transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-sm text-slate-400">Price</span>
                  <span className="text-lg font-bold text-emerald-400">
                    ₹{product.price?.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

