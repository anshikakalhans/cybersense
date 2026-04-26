import { useState } from 'react'
import { useSelector } from 'react-redux'

function BreachChecker() {
  const darkMode = useSelector((state) => state.app.darkMode)
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCheck = async () => {
    if (!email.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const response = await fetch(
        `https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`
      )
      if (response.status === 404) {
        setResult([])
      } else if (response.ok) {
        const data = await response.json()
        const breaches = data?.exposures?.breaches || []
        setResult(breaches)
      } else {
        setError('API error. Please try again.')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen px-6 py-12 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <h1 className="text-3xl font-bold text-green-400 text-center mb-8">
        📧 Breach Checker
      </h1>

      <div className="flex justify-center gap-3 mb-10">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`px-4 py-2 rounded-lg w-80 outline-none border focus:border-green-400 ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
        />
        <button
          onClick={handleCheck}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
        >
          Check
        </button>
      </div>

      {loading && <p className="text-center text-gray-400">Checking...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {result !== null && (
        <div className="max-w-xl mx-auto">
          {result.length === 0 ? (
            <div className={`rounded-xl p-6 text-center ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <p className="text-green-400 text-xl font-semibold">✅ Good news!</p>
              <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                This email was not found in any known breach.
              </p>
            </div>
          ) : (
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
              <p className="text-red-400 text-xl font-semibold mb-4">
                ⚠️ Found in {result.length} breach(es)!
              </p>
              <div className="space-y-3">
                {result.map((breach, index) => (
                  <div key={index} className={`border rounded-lg p-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <p className="font-medium">{breach}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BreachChecker