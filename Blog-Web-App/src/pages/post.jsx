import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/service";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth?.userData || state.user?.userData);

  const isAuthor =
    post && userData
      ? post.userId === userData.$id || post.userid === userData.$id
      : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      }).finally(() => {
        setLoading(false);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      service.deletePost(post.$id).then((status) => {
        if (status) {
          if (post.image) {
            service.deleteFile(post.image);
          }
          navigate("/");
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-400 font-medium">Loading post...</p>
      </div>
    );
  }

  return post ? (
    <div className="py-8 sm:py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Articles
            </Link>
          </div>

          {/* Post Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                {post.status || "Article"}
              </span>

              {/* Author Actions */}
              {isAuthor && (
                <div className="flex items-center gap-2">
                  <Link
                    to={`/edit-post/${post.$id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-indigo-300 hover:text-indigo-200 border border-indigo-500/30 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-indigo-500/20"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </Link>

                  <button
                    onClick={deletePost}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>

          {/* Featured Image Showcase (High-Definition Display) */}
          {post.image && (
            <div className="relative mb-10 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-pink-600/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition duration-500 pointer-events-none" />
              <div className="relative overflow-hidden rounded-2xl border border-gray-700/70 shadow-2xl bg-gray-950 flex flex-col items-center justify-center min-h-[280px]">
                {/* Ambient Blurred Backdrop */}
                <div
                  className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-110 pointer-events-none"
                  style={{
                    backgroundImage: `url(${service.getFilePreview(post.image)})`,
                  }}
                />

                {/* High Definition Original Image */}
                <a
                  href={service.getFilePreview(post.image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 block w-full text-center group/img cursor-zoom-in p-2 sm:p-4"
                  title="Click to view original full-resolution image"
                >
                  <img
                    src={service.getFilePreview(post.image)}
                    alt={post.title}
                    className="w-auto max-w-full max-h-[640px] mx-auto object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover/img:scale-[1.01]"
                    style={{
                      imageRendering: "-webkit-optimize-contrast",
                    }}
                    loading="eager"
                  />
                  <span className="absolute bottom-4 right-4 bg-gray-900/85 backdrop-blur-md text-gray-300 text-xs px-3 py-1.5 rounded-lg border border-gray-700/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 shadow-md">
                    <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    Full Resolution HD
                  </span>
                </a>
              </div>
            </div>
          )}

          {/* Article Body */}
          <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 sm:p-10 border border-gray-700/60 shadow-2xl">
            <article className="prose prose-invert max-w-none text-gray-200 text-lg leading-relaxed [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-white [&>h1]:mt-6 [&>h1]:mb-3 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-5 [&>h2]:mb-2 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-white [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-4 [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-300 [&>a]:text-indigo-400 [&>a]:underline [&>table]:w-full [&>table]:border [&>table]:border-gray-700">
              {parse(post.content || "")}
            </article>

            {/* Post Bottom Bar */}
            <div className="mt-12 pt-6 border-t border-gray-700/60 flex items-center justify-between text-sm text-gray-400">
              <span>Thank you for reading!</span>
              <Link
                to="/"
                className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline flex items-center gap-1"
              >
                Explore more articles &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}