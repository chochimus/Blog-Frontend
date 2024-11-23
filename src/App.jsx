import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Blogs from "./components/Blogs";
import About from "./components/About";
import Blog from "./components/Blog";

const App = () => {
  const padding = { padding: 5 };

  return (
    <Router>
      <div>
        <Link style={padding} to="/blogs">
          home
        </Link>
        <Link style={padding} to="/about">
          about me
        </Link>
      </div>
      <Routes>
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
