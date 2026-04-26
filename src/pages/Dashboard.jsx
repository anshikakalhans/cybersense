import { useSelector } from 'react-redux'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const abuseData = [
  { name: 'Google DNS', score: 0 },
  { name: 'Cloudflare', score: 2 },
  { name: 'Known Spam IP', score: 95 },
  { name: 'Tor Exit Node', score: 78 },
  { name: 'Clean Server', score: 5 },
]

const breachData = [
  { name: 'LinkedIn', value: 700 },
  { name: 'Adobe', value: 153 },
  { name: 'Canva', value: 137 },
  { name: 'Twitter', value: 200 },
  { name: 'Others', value: 400 },
]

const COLORS = ['#34d399', '#60a5fa', '#f87171', '#fbbf24', '#a78bfa']

function Dashboard() {
  const darkMode = useSelector((state) => state.app.darkMode)

  return (
    <div className={`min-h-screen px-6 py-12 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <h1 className="text-3xl font-bold text-green-400 text-center mb-10">
        📊 Threat Dashboard
      </h1>

      {/* Bar Chart */}
      <div className={`max-w-3xl mx-auto rounded-xl p-6 mb-10 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
        <h2 className="text-xl font-semibold text-green-400 mb-6">IP Abuse Score Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={abuseData}>
            <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#4b5563'} />
            <YAxis stroke={darkMode ? '#9ca3af' : '#4b5563'} />
            <Tooltip
              contentStyle={{ backgroundColor: darkMode ? '#1f2937' : '#fff', border: 'none' }}
              labelStyle={{ color: darkMode ? '#fff' : '#000' }}
            />
            <Bar dataKey="score" fill="#34d399" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className={`max-w-3xl mx-auto rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
        <h2 className="text-xl font-semibold text-green-400 mb-6">Top Data Breaches (Millions of Records)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={breachData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}M`}
            >
              {breachData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Dashboard