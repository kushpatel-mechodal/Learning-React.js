import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center gap-2 select-none" style={{ width: width === "100%" ? "100%" : "auto" }}>
      <span className="inline-block font-bold text-xl tracking-tight bg-linear-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
        BlogApp
      </span>
    </div>
  );
}

export default Logo;
