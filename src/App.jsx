import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  redirect,
} from "react-router-dom";
import Blogs from "./components/Blogs";
import About from "./components/About";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { postLogout } from "./services/logout";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);
  const padding = { padding: 5 };

  const postLogoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      window.localStorage.removeItem("loggedBlogAppUser");
      setUser(null);
    },
    onError: (error) => {
      alert("unexpected error occured");
    },
  });

  const handleLogout = async () => {
    postLogoutMutation.mutate();
    redirect("/blogs");
  };

  return (
    <Router>
      <nav className="bg-gray-900 text-white h-16">
        <div className="container mx-auto flex justify-between items-center h-full">
          <div className="flex items-center gap-10">
            <span className="flex items-center gap-2 font-bold text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" />
              </svg>
              Me-lately
            </span>
            <Link to="/" className="hover:text-gray-500">
              home
            </Link>
            <Link to="/about" className="hover:text-gray-500">
              about
            </Link>
          </div>
          <div className="flex items-center gap-5">
            {user ? (
              <>
                <p>hello, {user}</p>
                <button
                  onClick={handleLogout}
                  className="bg-cyan-700 rounded px-3 py-1 hover:bg-cyan-800"
                >
                  log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-cyan-700 rounded px-3 py-1 hover:bg-cyan-800"
                >
                  log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-cyan-700 rounded px-3 py-1 hover:bg-cyan-800"
                >
                  sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/blogs/:id" element={<Blog user={user} />} />
        <Route path="/" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
