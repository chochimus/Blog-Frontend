import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../services/signup";
import { Link } from "react-router-dom";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const postSignupMutation = useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      if (error.response) {
        const { data } = error.response;

        // Handle validation errors
        if (data.errors) {
          const validationErrors = data.errors.reduce((acc, err) => {
            if (!acc[err.path]) {
              acc[err.path] = [];
            }
            acc[err.path].push(err.msg);
            return acc;
          }, {});
          setErrors(validationErrors);
          return;
        }

        // Handle other errors
        if (data.error) {
          alert(`Error: ${data.error}`);
          return;
        }

        // Fallback if no expected structure is found
        alert("An unexpected error occurred.");
      } else if (error.request) {
        alert("No response from the server. Please try again later.");
      } else {
        alert(`Error: ${error.message}`);
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    const credentials = {
      username,
      password,
      "confirm-password": confirmPassword,
    };
    postSignupMutation.mutate(credentials);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
        sign up
      </h2>
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-6">
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              username:{" "}
            </label>
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:outline-none"
            />
            {errors.username && (
              <ul className="mt-1 text-sm text-red-500">
                {errors.username.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              password:{" "}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:outline-none"
            />
            {errors.password && (
              <ul className="mt-1 text-sm text-red-500">
                {errors.password.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              confirm-password:{" "}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:outline-none"
            />
            {errors["confirm-password"] && (
              <ul className="mt-1 text-sm text-red-500">
                {errors["confirm-password"].map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          sign up
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
