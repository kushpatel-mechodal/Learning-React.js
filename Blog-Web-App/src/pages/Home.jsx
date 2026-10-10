import React, { useState, useEffect } from "react";
import service from "../appwrite/service";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth?.status);

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

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <Container>
          <div className="max-w-md mx-auto p-8 bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/60 shadow-xl">
            <h1 className="text-2xl font-extrabold text-white mb-3">
              {authStatus ? "No Posts Available" : "Welcome to BlogApp"}
            </h1>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {authStatus
                ? "Start writing your first blog post and share your thoughts with others."
                : "Login or Sign Up to explore insightful posts and publish your own articles."}
            </p>
            <Link
              to={authStatus ? "/add-post" : "/login"}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-opacity"
            >
              {authStatus ? "+ Create Post" : "Login to Read Posts"}
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 sm:py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Latest Articles
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Discover interesting stories and blogs from our writers
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div key={post.$id} className="h-full">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
