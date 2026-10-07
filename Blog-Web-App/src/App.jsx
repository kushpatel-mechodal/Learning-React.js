import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("Get Current user error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <h1 className="text-xl font-semibold text-gray-300">Loading...</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-900 text-white">
        <div className="w-full block">
          <Header />
          <main className="min-h-[60vh] py-10 px-4 flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-center text-indigo-400 mb-4">
              A Blog Website
            </h1>
            {/* handle outlet */}
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
