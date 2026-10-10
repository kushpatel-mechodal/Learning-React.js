import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/service";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector(
    (state) => state.auth?.userData || state.user?.userData,
  );

  const isAuthor =
    post && userData
      ? post.userId === userData.$id || post.userid === userData.$id
      : false;

  useEffect(() => {
    if (slug) {
      service
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          else navigate("/");
        })
        .finally(() => {
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
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border border-gray-700/60 rounded-xl p-2 bg-gray-800/40">
          {post.image && (
            <img
              src={service.getFilePreview(post.image)}
              alt={post.title}
              className="rounded-xl max-h-96 object-contain"
            />
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6 flex items-center gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-600 hover:bg-green-500" className="mr-2">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-600 hover:bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{post.title}</h1>
        </div>
        <div className="browser-css text-gray-200">
          {parse(post.content || "")}
        </div>
      </Container>
    </div>
  ) : null;
}