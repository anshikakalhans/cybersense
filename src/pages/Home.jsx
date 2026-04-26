import { useSelector } from 'react-redux'

function Home() {
  const darkMode = useSelector((state) => state.app.darkMode)

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <h1 className="text-5xl font-bold text-green-400 mb-4">
          🛡️ CyberSense
        </h1>
        <p className={`text-xl max-w-xl mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Investigate cyber threats, check data breaches, and stay secure — all in one place.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-3xl">
          
          <div className={`rounded-xl p-6 text-left hover:border hover:border-green-400 transition ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <h2 className="text-green-400 text-xl font-semibold mb-2">🔍 IP / Domain Search</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Look up any IP address or domain and check if it's associated with malicious activity.
            </p>
          </div>

          <div className={`rounded-xl p-6 text-left hover:border hover:border-green-400 transition ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <h2 className="text-green-400 text-xl font-semibold mb-2">📧 Breach Checker</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Check if your email address has ever appeared in a known data breach.
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home