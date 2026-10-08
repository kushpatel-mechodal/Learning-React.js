import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../features/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout()); //Store updated information to use dispatch
      })
      .catch((error) => {
        console.log("Logout Error", error);
        return false;
      });
  };

  return (
    <button
      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-300 hover:text-white bg-red-500/10 hover:bg-red-600/80 border border-red-500/30 hover:border-red-600 rounded-full transition-all duration-200 cursor-pointer shadow-xs hover:shadow-red-500/20"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
