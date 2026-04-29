import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const BreachChecker = lazy(() => import("./pages/BreachChecker"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const darkMode = useSelector((state) => state.app.darkMode);

  return (
    <BrowserRouter>
      <div
        className={
          darkMode ? "bg-gray-900 min-h-screen" : "bg-gray-100 min-h-screen"
        }
      >
        <Navbar />
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-green-400 text-xl animate-pulse">Loading...</p>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/breach" element={<BreachChecker />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <h1 className="text-orange-400 text-4xl font-bold">
                    404 - Page Not Found
                  </h1>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
