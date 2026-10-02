import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const { userid } = useParams(); //useParams for read dynamic parameter value
  return (
    <div className="bg-gray-600 text-white text-center text-2xl p-5">
      User: {userid}{" "}
    </div>
  );
}

export default User;
