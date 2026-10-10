import React from "react";
import service from "../appwrite/service";
import { Link } from "react-router-dom";

function PostCard({ $id, title, image }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <div className="h-full flex flex-col bg-gray-800/80 hover:bg-gray-800/95 backdrop-blur-md rounded-2xl p-4 border border-gray-700/60 hover:border-indigo-500/50 shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1">
        <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 bg-gray-900/60 relative">
          {image ? (
            <img
              src={service.getFilePreview(image)}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              No Image
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2">
            {title}
          </h2>
          <div className="mt-4 pt-3 border-t border-gray-700/50 flex items-center justify-between text-xs text-gray-400">
            <span className="text-indigo-400 font-medium group-hover:underline flex items-center gap-1">
              Read Article &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;