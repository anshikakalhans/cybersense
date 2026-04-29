import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/store";

function Navbar() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.app.darkMode);

  return (
    <nav
      className={`px-6 py-4 flex items-center justify-between ${darkMode ? "bg-gray-800" : "bg-white shadow-md"}`}
    >
      {/*Logo*/}
      <Link to="/" className="text-green-400 text-2xl font-bold">
        🛡️CyberSense
      </Link>

      {/*Nav Links*/}

      <div className="flex items-center gap-6">
        <Link
          to="/"
          className={`hover:text-green-400 transition ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Home
        </Link>

        <Link
          to="/search"
          className={`hover:text-green-400 transition ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          IP/Domain Search
        </Link>
        <Link
          to="/breach"
          className={`hover:text-green-400 transition ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Breach Checker
        </Link>

        <Link
          to="/dashboard"
          className={`hover:text-green-400 transition ${darkMode ? "text-gray-300" : "text-gray-700"}`}
        >
          Dashboard
        </Link>

        {/*Dark Mode Toggle*/}

        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="text-xl hover:scale-110 transition"
          title="Toggle Dark Mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
