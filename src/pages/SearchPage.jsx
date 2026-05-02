import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { checkIP } from "../services/apiService";

function SearchPage() {
  const darkMode = useSelector((state) => state.app.darkMode);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const debounceTimer = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setHistory(saved);
  }, []);

  const saveHistory = (newHistory) => {
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  useEffect(() => {
    if (!query.trim()) {
      setResult(null);
      setError(null);
      return;
    }
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      setResult(null);
      try {
        const data = await checkIP(query);
        setResult(data.data);
        const saved = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        if (!saved.includes(query) && query.length >= 7) {
          const updated = [query, ...saved].slice(0, 10);
          saveHistory(updated);
        }
      } catch (err) {
        setError("Invalid IP or API error. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 700);
    return () => clearTimeout(debounceTimer.current);
  }, [query]);

  const handleDelete = (index) => {
    const updated = history.filter((_, i) => i !== index);
    saveHistory(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(history[index]);
  };

  const handleEditSave = (index) => {
    const updated = [...history];
    updated[index] = editValue;
    saveHistory(updated);
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div
      className={`min-h-screen px-6 py-12 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <h1 className="text-3xl font-bold text-green-400 text-center mb-8">
        🔍 IP / Domain Search
      </h1>

      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Type IP address (e.g. 8.8.8.8)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`px-4 py-2 rounded-lg w-96 outline-none border focus:border-green-400 ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
        />
      </div>

      {loading && <p className="text-center text-gray-400">Searching...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {result && (
        <div
          className={`max-w-xl mx-auto rounded-xl p-6 mb-8 ${darkMode ? "bg-gray-800" : "bg-white shadow-md"}`}
        >
          <h2 className="text-green-400 text-xl font-semibold mb-4">
            Results for {result.ipAddress}
          </h2>
          <div
            className={`space-y-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            <p>
              🌍 <span className="font-medium">Country:</span>{" "}
              {result.countryName || result.countryCode || "N/A"}
            </p>
            <p>
              🏢 <span className="font-medium">ISP:</span> {result.isp}
            </p>
            <p>
              ⚠️ <span className="font-medium">Abuse Score:</span>{" "}
              {result.abuseConfidenceScore}%
            </p>
            <p>
              📊 <span className="font-medium">Total Reports:</span>{" "}
              {result.totalReports}
            </p>
            <p>
              🕒 <span className="font-medium">Last Reported:</span>{" "}
              {result.lastReportedAt || "Never"}
            </p>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div
          className={`max-w-xl mx-auto rounded-xl p-6 ${darkMode ? "bg-gray-800" : "bg-white shadow-md"}`}
        >
          <h2 className="text-green-400 text-lg font-semibold mb-4">
            🕘 Search History
          </h2>
          <div className="space-y-2">
            {history.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-lg px-3 py-2 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              >
                {editIndex === index ? (
                  <>
                    <input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className={`rounded px-2 py-1 text-sm outline-none border focus:border-green-400 w-40 ${darkMode ? "bg-gray-600 text-white border-gray-500" : "bg-white text-gray-900 border-gray-300"}`}
                    />
                    <button
                      onClick={() => handleEditSave(index)}
                      className="text-green-400 text-sm hover:text-green-300 ml-2"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      className="text-sm cursor-pointer hover:text-green-400 transition"
                      onClick={() => setQuery(item)}
                    >
                      {item}
                    </span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-400 text-xs hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-400 text-xs hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
