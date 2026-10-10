import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/service";
import { Link } from "react-router-dom";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.rows || []);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-400 font-medium">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="w-full py-8 sm:py-12">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              All Articles
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Explore the latest posts published by the community
            </p>
          </div>
          <Link
            to="/add-post"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-600/30"
          >
            <span>+ Create Post</span>
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/40 rounded-2xl border border-gray-700/60 p-8">
            <h2 className="text-xl font-bold text-white mb-2">No Posts Found</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
              Be the first to share an interesting story or article with the community.
            </p>
            <Link
              to="/add-post"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-opacity"
            >
              + Create New Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post.$id} className="h-full">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPost;
