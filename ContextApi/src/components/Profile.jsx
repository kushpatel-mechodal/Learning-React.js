import React, { useContext } from "react";
import userContext from "../context/userContext";

function Profile() {
  const { user, setUser } = useContext(userContext);

  if (!user) {
    return (
      <div className="text-center p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 font-medium">
        Please Login
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 font-semibold">
        <span>Welcome, {user.userName}!</span>
        <button
          type="button"
          onClick={() => setUser(null)}
          className="text-xs px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    );
  }
}

export default Profile;
