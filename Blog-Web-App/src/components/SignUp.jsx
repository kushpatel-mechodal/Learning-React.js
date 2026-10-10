import { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");
    setLoading(true);

    try {
      const userData = await authService.createAccount(data);

      if (userData) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-220px)] py-8 px-4">
      <div className="relative w-full max-w-md mx-auto">
        {/* Ambient Gradient Glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Card Body */}
        <div className="relative bg-gray-800/85 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-gray-700/60 shadow-2xl">
          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <span className="inline-block hover:scale-105 transition-transform duration-200">
              <Logo width="70px" />
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200 underline-offset-4 hover:underline"
            >
              Sign In
            </Link>
          </p>

          {/* Error Alert */}
          {error && (
            <div className="mt-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2.5 text-red-300 text-sm animate-fade-in">
              <svg
                className="w-5 h-5 text-red-400 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(signup)} className="mt-6">
            <div className="space-y-4">
              <Input
                label="Full Name"
              placeholder="Enter your Name"
                {...register("name", {
                  required: true,
                })}
              />

              <Input
              label="Email: "
              placeholder="Enter your Email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  },
                })}
              />

              <Input
              label="Password: "
              placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
