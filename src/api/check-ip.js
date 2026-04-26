export default async function handler(req, res) {
  const { ip } = req.query

  if (!ip) {
    return res.status(400).json({ error: 'IP address required' })
  }

  const response = await fetch(
    `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90`,
    {
      headers: {
        'Key': process.env.VITE_ABUSEIPDB_KEY,
        'Accept': 'application/json',
      },
    }
  )

  const data = await response.json()
  res.status(200).json(data)
}