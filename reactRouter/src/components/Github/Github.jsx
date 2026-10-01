import React from "react";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

// import React, { useState, useEffect } from "react";

function Github() {

    const data = useLoaderData();
    
  //   const [data, setData] = useState({});

  //   useEffect(() => {
  //     fetch("https://api.github.com/users/kushpatel")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         setData(data);
  //       });
  //   }, []);

  return (
    <div className="bg-gray-600 text-white text-center text-2xl p-5">
      Github Followers: {data.id}
    </div>
  );
}

export default Github;

export const GithubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/kushpatel");
  return response.json();
};
